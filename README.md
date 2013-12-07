Source files for the teallabs.org website.

# Hakyll

This is a static website compiled with [Hakyll](http://jaspervdj.be/hakyll/).  The [tutorials](http://jaspervdj.be/hakyll/tutorials.html) are a good start.

# Usage

> ghc site
> ./site build
> ./site preview
> ./deploy

# Usage notes

Recompiling `Site.hs` by calling `ghc` is only necessary if `Site.hs`
has changed, which should be fairly rare.  `site build` converts
markdown to HTML, and a few other things.  `site preview` launches a
server so the site can be previewed at `localhost:8000`.  `./deploy`
uploads the compiled site via ssh.  It also runs `site build`, should
you want to live dangerously and not preview changes locally.
