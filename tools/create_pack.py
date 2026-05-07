import os
from pathlib import Path
import sys
from typing import Any
import util
from builtins import print as prt

def print(*a: Any):
    prt("(pack-gen) [INFO]: ", ' '.join(map(str, a)))

class IFolder():
    def __init__(self, name: str, files: list["IFile"] | None = None, folders: list["IFolder"] | None = None):
        self.name = name
        self.files = files if files is not None else []
        self.folders = folders if folders is not None else []
        print("Initialized folder:", self.name)

    def add_file(self, file: "IFile"):
        self.files.append(file)
        print("Added file:", file.name, "to folder:", self.name)

    def add_folder(self, folder: "IFolder"):
        self.folders.append(folder)
        print("Added folder:", folder.name, "to folder:", self.name)

    def write(self, root: str):
        path = root + "/" + self.name
        os.makedirs(path, exist_ok=True)
        for file in self.files:
            file.write(path)
            print("Written file:", file.name, "to path:", path)
        for folder in self.folders:
            folder.write(path)
            print("Written folder:", folder.name, "to path:", path)

class IFile():
    def __init__(self, name: str, content: str):
        self.name = name
        self.content = content

    def write(self, path: str):
        if not os.path.exists(path):
            os.makedirs(path)
            print("Created directory:", path)
        with open(path + "/" + self.name, "w") as f:
            f.write(self.content)
            print("Written file:", self.name, "to path:", path)

template = "test-mod"

def copy_folder(src: str, dst: str):
    if not os.path.exists(dst):
        os.makedirs(dst)
        print("Created directory:", dst)
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            copy_folder(s, d)
            print("Copied folder:", s, "to", d)
        else:
            with open(s, "r") as f:
                content = f.read()
            with open(d, "w") as f:
                f.write(content)
            print("Copied file:", s, "to", d)

scripts_path: str = "src/script/game/"
class Pack():
    @staticmethod
    def __capitalize__(s: str):
        # word-after-word : WordAfterWord
        return "".join(word.capitalize() for word in s.split("-"))
    
    @staticmethod
    def __decapitalize__(s: str):
        # WordAfterWord : word-after-word
        return ''.join(['-' + c.lower() if c.isupper() else c for c in s]).lstrip('-')

    def __init__(self, namespace: str):
        self.namespace = self.__capitalize__(namespace)
        self.id = namespace
    
    def build(self):

        cap_template = self.__capitalize__(template)

        print(f"Unpacking template:")
        zipped_path = Path(f"src/core/template/{cap_template}.sepack")
        decompressed_path = Path(f"src/core/template/{cap_template}")
        from build_pack import decompress
        decompress(zipped_path, decompressed_path)

        print(f"Building pack with namespace: {self.namespace} and id: {self.id}")
        copy_path = f"{scripts_path}{self.namespace}"
        copy_folder(f"src/core/template/{cap_template}", copy_path)
        copy = Path(copy_path)
        util.replaceTextInFolder(cap_template, self.namespace, copy)
        util.changeFileNamesInFolder(cap_template, self.namespace, copy)
        util.replaceTextInFolder(template, self.id, copy)
        util.changeFileNamesInFolder(template, self.id, copy)

        print("Deleting template.")
        os.system(f"rm -rf {decompressed_path}") # type: ignore

        print("Pack built with success!")

def print_templates():
    templates = [f.stem for f in Path("src/core/template").glob("*.sepack")]
    print("Available templates:")
    for t in templates:
        print(f" - {Pack.__decapitalize__(t)}")

if __name__ == "__main__":
    namespace = sys.argv[1] if len(sys.argv) > 1 else "-h"

    if namespace == "-i":
        print("Interactive mode:")
        namespace = input("Enter namespace: ")
        
        print_templates()
        template = input("Enter template (test-mod): ") or template
        print("Using template:", template)
        
        Pack(namespace).build()
        sys.exit(0)

    if namespace == "-lt" or namespace == "--list-templates":
        print_templates()
        sys.exit(0)

    if (namespace == "-h" or namespace == "--help"):
        print(f"Usage: python {sys.argv[0]} <namespace> [-t=template_name | --template=template_name]")
        print(f"       python {sys.argv[0]} [-lt | --list-templates]")
        sys.exit(0)

    for arg in sys.argv[1:]:
        if arg.startswith("-t=") or arg.startswith("--template="):
            template = arg.split("=", 1)[1]
            print("Using template:", template) 
        elif arg.startswith("-"):
            print(f"Unknown argument: {arg}")
            sys.exit(1)

    Pack(namespace).build()