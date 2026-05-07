from pathlib import Path


def get_descendants_of(path: Path) -> list[Path]:
    descendants = list[Path]()
    for item in path.iterdir():
        descendants.append(item)
        if item.is_dir():
            descendants.extend(get_descendants_of(item))
    return descendants

def replaceTextInFolder(textToReplace: str, replacement: str, path: Path) -> None:
    for file in get_descendants_of(path):
        try:
            print(f"Processing file: {file}")
            if not file.is_file(): 
                print(f"Skipping file: {file} as it is not in the specified path: {path}")
                continue
            print(f"Processing file: {file}")
            if file.is_file():
                with file.open("r", encoding="utf-8") as f:
                    content = f.read()
                new_content = content.replace(textToReplace, replacement)
                print(f"Replaced '{textToReplace}' with '{replacement}' in file: {file}")
                with file.open("w", encoding="utf-8") as f:
                    f.write(new_content)
        except UnicodeDecodeError as e:
            print(f"Error processing file: {file}. Skipping. Error: {e}")

def changeFileNamesInFolder(textToReplace: str, replacement: str, path: Path) -> None:
    for file in get_descendants_of(path):
        if textToReplace in file.name:
            new_name = file.name.replace(textToReplace, replacement)
            new_path = file.parent / new_name
            file.rename(new_path)
            print(f"Renamed file: {file} to {new_path}")