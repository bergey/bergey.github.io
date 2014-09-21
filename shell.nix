{ haskellPackages ? (import <nixpkgs> {}).haskellPackages }:

let inherit (haskellPackages) cabal hakyll callPackage;

in callPackage ./default.nix {}