---
title: Applicatives and Monoids
author: Daniel
tags: Daniel, haskell
---
I'm tinkering with bits of a new Haskell Postgres library. It's very much not ready for others to use, but I'm using an interesting type, new to me, which I want to share. Maybe someone can point me at prior art, also.

The main idea is that as we build up decoding functions, we want to collect type names at the same time. We'll use the type names at runtime, to check that Postgres sends what Haskell expects. If not, we'll use them in an error message.

<!--more-->

We want the application programmer to write something like:

``` haskell
instance FromSql MyType where
    fromSql = MyType <$> readInt <*> readString
```

Many Haskell SQL libraries provide this Applicative style. (Even if we later automate this boilerplate for most types, the Applicative style is useful for custom decoders.)

The library should let the application programmer assemble any set of primitive types into any Haskell representation, while ensuring that the type names will match the value decoding functions. (And of course also that the runtime behavior matches the Haskell type.)

Intuitively, the types Postgres sends should not depend on the specific values. Practically, we want to check the Postgres type names match before decoding any values. 

Monad turns out to be too flexible. If we let applications assemble decoders using monadic bind, we can't analyze the decoder to pull out the type names soon enough.[^1] So we want:


``` haskell
data Decoder a = Decoder [TypeName] (IO' a)
instance Applicative Decoder
```

(`IO'` can make FFI calls to libpq, and carries some state necessary to those calls.)

This Applicative wasn't immediately clear to me.  The code for `<*>` was easy, but I didn't trust my intuition that it is law abiding. So I wrote an informal proof, and then, for good measure, a [formal proof][]

Along the way, I realized that this works for any Monoid where I wrote `[TypeName]`, and any Applicative where I wrote `IO'`. The proofs depend on exactly those properties. 

``` haskell
data Monoidal m f a = Monoidal m (f a)
instance (Monoid m, Applicative f) => Applicative (Monoidal m f)
```

I don't yet know of another useful specialization for particular `m` and `f`. If you do, please email me!

[^1]: If we made Decoder a monad, we'd be dealing with functions of type `a -> Decoder b`. The expected TypeNames now depend on the value of a, not just the type. That means at best we can interleave TypeName checking with decoding. Instead of reporting all errors in a query, we can report only the first.

[formal proof]: https://github.com/bergey/crispy-broccoli/blob/ea8916e7e199b79cb144b92f33434eae851f8909/test/Applicative.v
