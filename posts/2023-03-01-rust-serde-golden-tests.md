---
title: golden tests for (de)serialization
author: Daniel
tags: Daniel, rust, testing, macros
---

While defining the interface between my client & server for my [CRDT CAD project](https://draft.teallabs.org), I wanted to generate a whole bunch of tests, with matching serialization & deserialization tests for each example.  In other languages I've written loops that call the `testCase` function, whatever it is called, but the macro approach of rust's built in testing makes that harder.  I needed an excuse to learn Rust macros, though.  I want to share the result, which isn't long enough or general enough for a library, so blog post it is!

I'm specifically concerned with testing that, when I add more constructors to this `Message` type, the representation of existing types does not change.  (Yes, at some point I will consider flatbuffers &c.)  So I want to write out the current representation, commit that, and run future tests against it.  For each example, there are three tests, one that writes the golden file, one that tests serialization, and one that deserializes the file contents.  `cargo test` runs only the second two, while `cargo test -- --ignored` runs only the save variants.

The details of my message type aren't important, but it helps to know that `draft_shared` exports the type `Message`, which is the whole point.

```rust 
macro_rules! golden_tests {
    ($($name:ident: $msg:expr,)*) => {
    $(
        mod $name {
            use draft_shared::*;
            use super::*;

            use crate::filename;
            use ciborium;
            use std::io;

            #[test]
            fn serialize() -> io::Result<()> {
                let f_name = filename(stringify!($name));
                println!("{f_name}");
                let expected: Vec<u8> = std::fs::read(f_name)?;
                let mut actual: Vec<u8> = Vec::new();
                ciborium::ser::into_writer(&$msg, &mut actual).map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
                assert_eq!(&actual, &expected);
                Ok(())
            }

            #[test]
            fn deserialize() -> io::Result<()> {
                let file = std::fs::File::open(filename(stringify!($name)))?;
                let actual: Message = ciborium::de::from_reader(file).map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
                assert_eq!(actual, $msg);
                Ok(())
            }

            #[test]
            #[ignore]
            fn save() -> io::Result<()> {
                let file = std::fs::File::create(filename(stringify!($name)))?;
                ciborium::ser::into_writer(&$msg, file).map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
                Ok(())
            }
        }
    )*
    }
}

fn filename(name: &str) -> String {
    format!("golden/{name}.cbor").to_string()
}
```

It's a bit annoying that I need a module for each example, but we apparently don't have the ability to build identifiers from string templates like `"serialize_#{$name}"`.  Figuring out why that is will be a project for another day....  The module in turn forces a bunch of repeated imports.  This feels like an odd use of `--ignored`; I would prefer an explicit `--save`.  It's probably fine as long as this test suite only runs this style of test.  If you wanted to use `ignored` for something else, I think these tests could test some env var instead, with similar results.

Calling the macro looks like:

```rust 
golden_tests! {
    authn: Message::NotAuthenticatedError,
    made_up_example: Message::Some(other, constructor),
}
```

I got the core of the macro approach from  https://stackoverflow.com/questions/34662713/how-can-i-create-parameterized-tests-in-rust/34666891#34666891 .

I don't write golden tests like this when the only consumers of the interface are deployed in lockstep.  If they're in the same language, simple serialize-the-deserialize tests suffice.  When the client is in a different language, integration tests get harder, but are still more valuable than golden tests.  I like golden tests like these when the clients are developed by others, on a different timeline, so I can communicate changes with concrete encoded messages, or when I'm being especially careful about staged deploys to minimize downtime / errors.  (Or when I'm having fun thinking about how I *would* acheive these goals.)
