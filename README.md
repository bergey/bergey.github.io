Source files for the teallabs.org website.

# Hakyll

This is a static website compiled with [Hakyll](http://jaspervdj.be/hakyll/).  The [tutorials](http://jaspervdj.be/hakyll/tutorials.html) are a good start.

# Usage

> stack build
> stack exec teallabs -- watch
> ./site watch
> ./deploy

# Usage notes

Recompiling `Site.hs` by calling `stack build` is only necessary if `Site.hs`
has changed, which should be fairly rare.  `teallabs watch` converts
markdown to HTML, and a few other things, then launches a server so the
site can be previewed at `localhost:8000`.  While running, it also
rebuilds after any changes to the files.  `./deploy` uploads the
compiled site via ssh.  It also runs `teallabs build`, should you want to
live dangerously and not preview changes locally.
