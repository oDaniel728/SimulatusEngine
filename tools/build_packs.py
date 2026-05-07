from pathlib import Path
from build_pack import compress

def compress_packs():
    dist = Path("build/pack/")
    if not dist.exists():
        print(f"Error: Dist folder {dist} does not exist.")
        return
    
    for pack_folder in Path("src/script/game/").iterdir():
        if pack_folder.is_dir():
            print(f"Compressing {pack_folder}...")
            output_zip = dist / f"{pack_folder.name}.sepack"
            compress(pack_folder, output_zip)
            print(f"Compressed {pack_folder} to {output_zip}")

if __name__ == "__main__":
    compress_packs()
