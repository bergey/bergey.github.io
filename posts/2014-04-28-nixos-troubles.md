---
title: Learning NixOS, Part I
author: Daniel
tags: Daniel, nixos
---
For the last couple of weeks I've been using NixOS[URL] as my primary OS.  At this point it's mostly doing what I want, but getting started was a bit rocky.  I should really add docs on the wiki to help the next person to come along and try to do similar things, but at the moment I'm not actually sure where the docs need improvement, or that I understand Nix well enough to write correct docs.  So this post is partly an attempt to work out what tripped me up, and partly notes to future-me, since usually by the time I understand something, I can't remember what seemed so difficult about it at first.  It's certainly not meant to be a Nix tutorial.
 
### Too much of a good thing
 
Nix offers a bunch of different features\:

- tools to manage multiple package versions / environments, much like GNU `stow` or python's `virtualenv`
- the option to roll back to a previous version of any environment (until manual garbage collection)
- a guarantee that the package version (hash) depends (transitively) on the versions of all dependencies (aka hermetic builds).  This allows reusing a package in multiple environments if and only if all dependencies match.
- tools to build the entire operating system, including config files, from a central config, with all the benefits above
- tools to deploy multiple machines with the same configuration / binaries, or distribute the compilation
 
I'd eventually like to use all of these, but I was hoping to learn one at a time.  I tried a clean-slate install of NixOS, because the feature I wanted most immediately was the whole-system rollback when upgrading breaks something.  In retrospect, I probably would have been less frustrated if I'd first installed `nix-env`, atop my existing Debian system, and learned the multiple-environments tools.  Then I could gradually uninstall the globally-available Debian versions in favor of environment-sandboxed versions managed by `nix-env`.  In the process, I'd get most of the rollback benefits---for userspace applications, which are mostly what break.  (Debian already provides rollback for kernels, which occasionally break.)
 
### xmonad / haskell
 
I immediately ran into trouble trying to install both xmonad (an X11 window manager written in haskell) and a copy of GHC (haskell compiler) set up for coding on Diagrams [URL].  XMonad is configured by writing haskell code.  To load the configuration, XMonad needs to compile the code.  If GHC isn't on PATH, or if the GHC on PATH doesn't match the one with which XMonad was compiled, the error messages are remarkably unhelpful.  The solution I eventually found was:

- install xmonad globally
- do not install haskell globally
- make a `nix-env` environment just for recompiling the XMonad config
- make a separate `nix-env` environment (eventually several) for other haskell projects
 
I should probably write this up for the wiki.
 
### Nixpkgs stability
 
I also very quickly ran into packages that I wanted to install, that aren't (yet) part of Nix.  Nix packages are plain text files stored in a git(hub) repo, so it looks pretty easy to add packages, install them through the usual machinery, and eventually push them upstream.  Again, I ran into trouble because I was installing all my packages globally instead of under `nix-env` environments.
 
I cloned the git repo, added my package derivation (Nix-speak for build instructions), and went to rebuild.  I pointed `nixos-rebuild` at the local checkout.  And then I got build failures because TeXLive couldn't be downloaded---totally unrelated to anything I'd changed.
 
I eventually found documentation to the effect that the unstable channel from which `nixos-rebuild --upgrade` usually pulls it's packages tracks the git repo, but it isn't actually git HEAD.  Instead, it's the last version where everything has actually been built successfully on the build farm.  Now that I understand it, I like this design.
 
So the recommended procedure is to have `nixos-rebuild` track the channel, and only use local commits atop git HEAD with `nix-env`.  This way I'm only trying to build untested bleeding-edge versions of the dependencies of packages I'm working on.
 
### Working with Nixpkgs
 
`nix-env` and friends create a temporary directory, unpack the source code to be built, fork a new shell (or equivalent), set PATH and other environment variables, and then try to build.  By default, they delete the directory and kill the shell, whether the build succeeded or fails.  This makes building a new package rather frustrating --- I can't see the generated files, or the working environment, and every command I add to print some information requires a full rebuild.  I get enough of this frustration using travis-ci.  It's especially fun when the Makefile downloads some *other* large package---though poorly behaved upstream Makefiles are obviously no criticism of Nix.  Fortunately, `nix-env -K` instructs the program to keep the temporary directory, and write a file with the environment variables.  This is mostly enough to inspect and manually step through the build, although you need to either `sudo -i` or change the permissions of the tempdir, since normal users don't have write permissions.
 
I still haven't figured out how to get `nix-env` to show me packages where any part of the name matches a given string.  I resort to grep in the Nixpkgs checkout, but there's got to be a better way.
