from pathlib import Path
import sys

from build_pack import decompress

def main(args: list[str]) -> None:
    py_file = args[0]
    if args[1] == "-i":
        print("Interactive mode:")
        pack_to_install = input("Enter pack to install: ")
        args = [py_file, pack_to_install]
        
    if (len(args) < 2 or args[1] == "-h" or args[1] == "--help"):
        print(f"usage: python {py_file} <pack_to_install>")
        sys.exit(1)

    print("Getting file...")
    
    pack_to_install = Path("packs") / (args[1] + ".sepack")
    
    print("File found: " + pack_to_install.resolve().__str__())

    if (not pack_to_install.exists()):
        print(f"File {pack_to_install} doesn't exist!")
        sys.exit(1)

    print("Decompressing pack...")
    decompress(pack_to_install, Path("src/script/game/%s" % pack_to_install.stem))
    print("Pack decompressed with success!")

if __name__ == "__main__":
    main(sys.argv)