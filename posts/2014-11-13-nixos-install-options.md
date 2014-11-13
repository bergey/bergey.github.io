Nix is pretty overwhelming because it has so many different ways to
install software.  It's hard to make recommendations because different
users want different things from Nix.  I haven't found any docs that
compare all these options, so I thought I'd write up my own take on
them.  I'm still adapting my habits to Nix; I expect in 6 months I'll
have different things to say.

Nix provides several features that aren't available with typical Linux
package managers:
- sandboxing & profiles
- rollbacks
- declarative builds

I'm going to muse aloud about these 5 ways to install packages:
- system wide
- in a user profile
- with buildEnv
- with myEnvFun
- in a nix-shell sandbox

System wide install is the closest to how other Linux distros handle
packages.  It's only available in NixOS, not if you're running Nix on
top of some other distribution. You can download the latest package
list and upgrade with `nixos-rebuild switch --upgrade` — roughly
equivalent to `apt-get update; apt-get upgrade`.  The complete package
list is stored in the file /etc/nixos/configuration.nix/.  I think
this is great — other distros I've used over the years haven't made it
easy to see all the packages I've requested, without the clutter of
all their dependencies.  It's also easy to version control. Finally,
NixOS adds options to the boot menu to boot into previous
configurations.  I haven't broken my system badly enough to need this
yet.

User profiles are the first step into limiting which installed
software is available in a given context.
- You can have as many profiles as you want
- Only one profile is active at a time
- Each profile is upgraded and rolled back independently

Whereas system-wide programs are always on your PATH, and the next two
options let you control what's available from a particular shell
instance, when you switch user profiles, it affects all running shells
and other programs.  This is good and bad. Sometimes I like the
simplicity, and other times I want to be working on two different
projects in two windows — say, when one is taking an hour to compile.
In general, I'm moving away from multiple Nix profiles.

The fact that user profiles are upgraded independantly is also good
and bad.  Upgrading everything takes more commands.  But I like the
fine-grained control with software that sometimes has a buggy version;
I can roll it back without rolling back everything else on my system,
and can continue upgrading other software while running an older
version of the affected package.  Likewise, when a build is broken
(Eg, texlive), other packages in the profile can still be upgraded —
whereas a broken system package will prevent the system from
upgrading.

Skipping to the end of my list, nix-shell looks for a file in the
current directory (shell.nix or default.nix), and makes the specified
packages available only in that shell. With the --pure option, *only*
these packages are available, not anything else installed system-wide
or in your Nix profile.  These features are great for software
development.  We can check the .nix files into the git repo, and
everyone can always build in the same environment.  The downsides are
multiple .nix files if you want the same packages for multiple
projects, and that nix-shell always uses the newest version of the
packages you request.  So if I run `nixos-rebuild switch --upgrade`
daily, some days I find myself updating my code for new package
versions, instead of whatever feature I planned to work on.

`buildEnv` environments are simply a way to group packages which are
installed in one of the ways above.  I have a group for half a dozen
programs I use for photography, which I install in my user
environment, and upgrade all together.  I also like that this keeps my
list of programs in a file which I can version control & sync between
computers.

`myEnvFun` environments have shell scope and upgrade only when you
ask, not on every use.  That is, like `buildEnv`, you can specify a
group of packages and assign them a name.  You install the resulting
group with `nix-env -i`, and upgrade it the same way.  When you run
`load-env-someName`, Nix launches a subshell with the specified
packages available, much like `nix-shell`.  This is convenient for
sharing the same environment across several projects, but it's less
convenient to check the environment definition into version control
with the projects, and I have to assume that multiple developers won't
be running the same versions, since they will update their install on
different schedules.

I find myself mostly using `nix-shell` for software development
(Haskell, mostly, but I may move my JavaScript development in that
direction), and a single Nix user environment, with a bunch of
`buildEnv` groups, for most userspace programs.

| Method        | Scope  | Rebuild   |
| nixos-rebuild | system | system    |
| nix-env -i    | user   | nix-env   |
| nix-shell     | shell  | every use |
| buildEnv      | user   | nix-env   |
| myEnvFun      | shell  | nix-env   | 
  
