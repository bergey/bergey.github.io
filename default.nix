{cabal, hakyll}:

cabal.mkDerivation (self: rec {
  pname = "teallabs";
  version = "1.0";
  src = ./.;
  isLibrary = false;
  isExecutable = true;
  noHaddock = true;
  buildDepends = [hakyll];
})