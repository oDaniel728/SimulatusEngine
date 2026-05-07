from pathlib import Path

def compress(folder: Path, output: Path):
    import zipfile
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in folder.rglob('*'):
            zipf.write(file, file.relative_to(folder))
def decompress(zip_file: Path, output_folder: Path):
    import zipfile
    with zipfile.ZipFile(zip_file, 'r') as zipf:
        zipf.extractall(output_folder)

class Pack():
    def __init__(self, namespace: str):
        self.namespace = namespace
        self.path = Path("src/script/game") / self.namespace
    
    def build(self):
        print(f"Building pack with namespace: {self.namespace}")
        if not self.path.exists():
            print(f"Error: Pack folder {self.path} does not exist.")
            return
        output_zip = Path("build/pack/") / f"{self.namespace}.sepack"
        output_zip.parent.mkdir(exist_ok=True)
        compress(self.path, output_zip)
        print(f"Pack built successfully at {output_zip}")

    @staticmethod
    def decompress(zip_file: Path, output_folder: Path):
        print(f"Decompressing pack from {zip_file} to {output_folder}")
        if not zip_file.exists():
            print(f"Error: Zip file {zip_file} does not exist.")
            return
        decompress(zip_file, output_folder)
        print(f"Pack decompressed successfully to {output_folder}")

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2 or sys.argv[1] == "-i":
        sys.argv = [sys.argv[0], 
            input("Enter namespace: "),
        ]
    
    namespace = sys.argv[1]
    pack = Pack(namespace)
    pack.build()