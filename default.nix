{ mkDerivation, base, hakyll, semigroups, stdenv }:
mkDerivation {
  pname = "teallabs";
  version = "0.1.0.0";
  src = ./.;
  isLibrary = false;
  isExecutable = true;
  executableHaskellDepends = [ base hakyll semigroups ];
  license = stdenv.lib.licenses.bsd3;
}
