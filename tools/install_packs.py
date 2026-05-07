from pathlib import Path
import sys

from build_pack import decompress

def main(args: list[str]) -> None:
    print("Getting zipped packs")
    fs: list[Path] = []
    for file in Path("packs/").iterdir():
        if file.suffix != ".sepack":
            print("Pack " + file.stem + " is not a .sepack file!")
            continue

        print("Found " + file.stem + ";")
        fs.append(file)

    if len(fs) == 0:
        print("No packs found!")
        sys.exit(0)

    print("Got packs;")

    for file in fs:
        decompress(file, Path("src/script/game/%s" % file.stem))

if __name__ == "__main__":
    main(sys.argv)