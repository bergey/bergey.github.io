---
title: NixOS Install Options
author: Daniel
tags: Daniel, nixos
---

Nix can be overwhelming because it has so many different ways to
install software.  I'm going to muse aloud about 5 ways to
install packages.

### System Wide

System wide install is the closest to how other Linux distros handle
packages.  It's only available in NixOS, not if you're running Nix on
top of some other distribution. You can download the latest package
list and upgrade with `nixos-rebuild switch --upgrade`.  The complete
package list is stored in the file `/etc/nixos/configuration.nix`.

I think this is great — other distros I've used over the years haven't
made it easy to see all the packages I've requested, without the
clutter of all their dependencies.  It's also easy to version
control. Finally, NixOS adds options to the boot menu to boot into
previous configurations.  I haven't broken my system badly enough to
need this yet.

### User Profiles

User profiles are the first step into limiting which installed
software is available in a given context.

- You can have as many profiles as you want
- Only one profile is active at a time
- Each profile is upgraded and rolled back independently

<!--more-->

When you switch user profiles, it affects all running shells
and other programs.  This is good and bad. Sometimes I like the
simplicity, and other times I want to be working on two different
projects in two windows — say, when one is taking an hour to compile.
In general, I'm moving away from multiple Nix profiles.

The fact that user profiles are upgraded independantly is also good
and bad.  Upgrading everything takes more commands.  But sometimes I
like the fine-grained control.  I can roll back a buggy version, and
keep it back while upgrading other programs.

### nix-shell

`nix-shell` looks for a file in the current directory (`shell.nix` or
`default.nix`), and makes the specified packages available only in
that shell. With the `--pure` option, *only* these packages are
available, not anything else installed system-wide or in your Nix
profile.  These features are great for software development.  We can
check the `.nix` files into the git repo, and everyone can always
build in the same environment.  The downsides are multiple `.nix`
files if you want the same packages for multiple projects, and that
`nix-shell` always uses the newest version it knows of, which may not
be the same version you know worked yesterday.

### buildEnv

`buildEnv` environments are simply a way to group packages which are
installed in one of the ways above.  I have a group for half a dozen
programs I use for photography, which I install in my user
environment, and upgrade all together.  I also like that this keeps my
list of programs in a file which I can version control & sync between
computers.

### myEnvFun

`myEnvFun` environments have shell scope and upgrade only when you
ask, not on every use.  That is, like `buildEnv`, you can specify a
group of packages and assign them a name.  You install the resulting
group with `nix-env -i`, and upgrade it the same way. This provides a
single command, `load-env-someName`, which launches a subshell with
the specified packages available, much like `nix-shell`.  This is
convenient for sharing the same environment across several projects,
but it's less convenient to check the environment definition into
version control with the projects, and I have to assume that multiple
developers won't be running the same versions, since they will update
their install on different schedules.

### What I do
I find myself mostly using `nix-shell` for software development
(Haskell, mostly, but I may move my JavaScript development in that
direction), and a single Nix user environment, with a bunch of
`buildEnv` groups, for most userspace programs.
