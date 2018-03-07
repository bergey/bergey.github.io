---
title: Many ways to load modules
author: Daniel
tags: Daniel, haskell
---
I've been confused for years by variations of the :load command in GHCi.  So much so it often keeps me from using GHCi.

The [GHC manual](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/ghci.html) mentions:

- :load
- :add
- :reload
- :module
- import

That's a lot of different commands!

<!--more-->

`import` is pretty much like in normal Haskell files

`:module` is a lot like import, but also allows removing imports, or replacing the entire set of imports.  `:module` is usually right for modules from upstream packages.

`:load` is usually right for modules in the current project.  Technically it both *loads* and *brings in scope*.  It loads the named module and all transitive dependencies, at which point it's possible to bring any of them into scope.  It brings in scope the named module (exports or top-level, depending).  A simple workflow would use `:load` whenever working on a local module, and never have more than one in scope.  Sufficient for type checking.  See below for a more complex workflow.

`:add` is like `:load`, but saves time by not re-loading already loaded modules.

`:reload` is the same as rerunning the last `:load` (or `:add`?) command.

`:module` works both for upstream modules and modules that have been loaded (named or transitively).  It changes what is in scope, but doesn't do any of the much slower steps of loading.  So for interactive development / testing, it could make sense to load the project, then switch back & forth with `:module`.

## Conclusions

The simple rules I've used in the past aren't actually too bad:

- Use `:load` (or `:l`) for modules in the current project
- Use `:module` or `:m` for upstream modules

I may try using `:add` and `:module` more to get faster feedback when I already have a good idea which modules are broken.  I'm looking forward to using the REPL more now that I understand how to get the same terms in scope as in the file I'm working on.
