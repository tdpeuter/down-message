{
  description = "down-message";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
  flake-utils.lib.eachDefaultSystem
  (system:
    let
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    in {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          jetbrains.webstorm
          nodejs
          nodePackages.live-server
        ];

        shellHook = ''
          webstorm . && exit
        '';
      };
    }
  );
}
