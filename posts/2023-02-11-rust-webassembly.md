---
title: golden tests for (de)serialization
author: Daniel
tags: Daniel, Rust, webapps
---

tldr; The future of Rust webapps is bright; the present is rocky.

My latest side project uses CRDTs to merge changes from multiple clients, while also allowing offline edits &amp; immediate local feedback. The <a href="https://crates.io/crates/automerge">Automerge CRDT library</a> is written in Rust, so I have been learning the ins &amp; outs of working with WebAssembly in the browser.

# Bundlers

I’m told that Webpack can be configured to import webassembly files, or JS files that transitively import webassembly, with the same syntax as normal ES6 imports. Unfortunately, I still don’t have the patience to learn to configure Webpack, and I will go to great lengths to avoid it. For <a href="https://github.com/bergey/tack">last year’s CRDT project</a> that meant using <a href="https://parceljs.org/docs/">Parcel</a>, which worked great until I tried to import WebAssembly. Alas, Parcel <a href="https://github.com/parcel-bundler/parcel/issues/1325">does not support wasm today</a> (Parcel v1 apparently did, and Automerge v0.1 was pure JS, which is how `tack` works, but for today I want to use the actively developed versions.)

So I’ve been trying something more quixotic – writing my entire client side in Rust, aside from the loading function below. `init` takes care of fetching &amp; loading the wasm file. I pass the URL of the server in from JS so that I don’t need to recompile the Rust code when deploying.

<!--more-->

``` javascript
import init, { start } from "./build/draft.js";

(async function () {
  await init();
  start("ws://localhost:3003/ws");
})()
```

I build the application with `wasm-pack build --target web` which outputs both the wasm file &amp; a JS file that loads it. No bundler required! A little care is required to preserve the relative path between the two files when deploying.

Eventually, I will probably want some of the other things that bundlers do, besides bundling – minifying, CSS processing, renaming files with a hash of their contents &amp; renaming all references, so I can set longer `Cache-Control: max-age`, putting all the asset names into a PWA manifest. I have some untested ideas of how to do this with Parcel, without requiring it to understand the WebAssembly load dance. For now, I can recomend `--target web` as a way to get started, deferring bundler config until there’s a program worth bundling.

# passing values between Rust &amp; JS

My understanding is that nothing interesting can be round-tripped between Rust &amp; JS. Or rather, Rust &amp; `bindgen` are justifiably untrusting, requiring that every value passed to JS has a lifetime bounded by `static` (in other words, that JS is free to hold on to it indefinitely), and treating every value incoming from JS as a `JsVal` which could be anything. Passing references without copying out the whole referenced value gets even hairier.

I’ve been handling this by not passing anything to JS if I can possibly help it. Rust functions which take no arguments, or only primitive values like numbers or strings, are fine. These can be easily exported and called from JS. Closures that own all their data are mostly fine – quite wordy to set up, but they can be passed to `add_event_listener` and all is well. I wrote a helper for half the wordiness:

``` rust
pub fn add_listener<El, Ev>(element: &El, event_name: &str, callback: &Closure<dyn FnMut(Ev)>)
where
    El: AsRef<EventTarget>,
{
    AsRef::<EventTarget>::as_ref(element)
        .add_event_listener_with_callback(event_name, callback.as_ref().unchecked_ref())
        .unwrap();
    // Can't callback.forget() here, because we can't express the WasmClosure constraint
}


// use like:
let handler = handle_keypress(&client);
add_listener(&document(), "keyup", &handler);
handler.forget();
```

This all works because my event handlers live for the life of the program, by design. It would be much worse in a program written in the React style, that dynamically creates DOM elements with event handlers. In that case, I would probably need the <a href="https://rustwasm.github.io/wasm-bindgen/reference/weak-references.html">–weak-refs option to wasm-bindgen</a> at least.

# global variables

Like most programs, mine has a global application state. That is to say, it <strong>should</strong> be unambiguous at any point what the current drawing is, what we need to render, whether or not we have a connection to the server, and so forth. Up until a couple of weeks ago, I was using `lazy_static` to put this global state in a global <strong>variable</strong>, or rather, a handful of variables.

In some ways, this worked great. Rendering functions could read what they needed, input callbacks could update the fields that they needed. These functions lived in files near the types they dealt with. Best of all, input calbacks were top-level functions with no arguments, so they could be exported &amp; called from JS. It was convenient to bind the callbacks to their targets in JS (after the `init()` call to WebAssembly), with much less ceremony than shown above.

Then I added a few more fields to the global state, and everything broke down. `lazy_static` wants global varibles to be thread-safe. I’m only using one thread (WebAssembly threads are too bleeding-edge even for me), but type checking is mostly local, and that’s a global property. For reasons that are not entirely clear to me, `JsVal` itself is not `Send`, and many types representing browser objects store a raw `JsVal`. Closures &amp; Websockets in particular gave me trouble.

So now all my state is wrapped in an `Arc&lt;Mutex&lt;_&gt;&gt;`, and my entrypoint does a great deal of knot-tying to ensure that each callback has a reference, including at least one reference that ends up referenced from the state struct itself. Several methods needed to move up to the global state module, or out of `impl` blocks into functions that take `Arc&lt;Mutex&lt;_&gt;&gt;` so that they can schedule future work, without holding the lock. I find it harder to understand, but the type checker can now confirm my claim that I only use one thread, so the lack of `Send` is not a problem.

These callbacks that hold a shared reference can’t be exported to JS directly. There are workarounds, but this was the point where I gave up, and started binding all my event handlers in Rust, boilerplatey as it is.
