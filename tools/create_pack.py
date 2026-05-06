import os
import sys
from typing import Any

def info(*a: Any):
    print("(pack-gen) [INFO]: ", ' '.join(map(str, a)))

class IFolder():
    def __init__(self, name: str, files: list["IFile"] | None = None, folders: list["IFolder"] | None = None):
        self.name = name
        self.files = files if files is not None else []
        self.folders = folders if folders is not None else []
        info("Initialized folder:", self.name)

    def add_file(self, file: "IFile"):
        self.files.append(file)
        info("Added file:", file.name, "to folder:", self.name)

    def add_folder(self, folder: "IFolder"):
        self.folders.append(folder)
        info("Added folder:", folder.name, "to folder:", self.name)

    def write(self, root: str):
        path = root + "/" + self.name
        os.makedirs(path, exist_ok=True)
        for file in self.files:
            file.write(path)
            info("Written file:", file.name, "to path:", path)
        for folder in self.folders:
            folder.write(path)
            info("Written folder:", folder.name, "to path:", path)


class IFile():
    def __init__(self, name: str, content: str):
        self.name = name
        self.content = content

    def write(self, path: str):
        if not os.path.exists(path):
            os.makedirs(path)
            info("Created directory:", path)
        with open(path + "/" + self.name, "w") as f:
            f.write(self.content)
            info("Written file:", self.name, "to path:", path)

scripts_path: str = "src/script/game/"
class Pack():
    @staticmethod
    def __capitalize__(s: str):
        # word-after-word : WordAfterWord
        return "".join(word.capitalize() for word in s.split("-"))

    def __init__(self, namespace: str):
        self.namespace = self.__capitalize__(namespace)
        self.id = namespace

    def build(self):
        info("Building pack with namespace:", self.namespace, "and id:", self.id)
        pack_folder = IFolder(scripts_path + self.namespace, [], [])

        pack_folder.add_file(IFile("manifest.ts", f"""\
import GameInjectionManifestStructure from \"core/engine/utils/GameInjectionManifestStructure.js\";
import BasePreLoader from \"@game/base/src/BasePreLoader.js\";
import BaseUnloader from \"@game/base/src/BaseUnloader.js\";
import {self.namespace}Loader from \"./src/{self.namespace}Loader.js\";
import {self.namespace}DOMLoader from \"./src/{self.namespace}DOMLoader.js\";

new GameInjectionManifestStructure(
    BasePreLoader,
    {self.namespace}Loader,
    {self.namespace}DOMLoader,
    BaseUnloader
).register();
"""))

        pack_folder.add_folder(IFolder("src", [
            IFile(f"{self.namespace}Board.ts", f"""\
import Board from \"core/engine/Board\";
export default class {self.namespace}Board extends Board {{
    constructor() {{
        super(\"#root\");
    }}
}}
"""),
            IFile(f"{self.namespace}Loader.ts", f"""\
import Identifier from \"core/structure/Identifier\";
import Logger from \"core/structure/Logger\";
import Text from \"core/elements/Text\";
import {self.namespace}LangProvider from \"./providers/{self.namespace}LangProvider\";
import {self.namespace}Board from \"./{self.namespace}Board\";
import Loader from \"core/structure/Loader\";
import BoardElement from \"core/engine/BoardElement\";
import {self.namespace}Session from \"./{self.namespace}Session\";

export default class {self.namespace}Loader extends Loader {{
    public static readonly ID = "{self.id}";
    public static readonly LOGGER = new Logger(this.ID);
    public static BOARD = new {self.namespace}Board();

    public static readonly SESSION = new {self.namespace}Session();

    public static async main(): Promise<void> {{
        this.LOGGER.info("Loaded main function called.");

        await {self.namespace}LangProvider.useLanguage("en_us");
        this.SESSION.load();

        this.LOGGER.info(Text.translatable(Identifier.of(this.ID, "text")));
    }}

    public static appendChild<E extends BoardElement>(child: E): E {{
        this.BOARD.appendChild(child);
        this.LOGGER.info("Appended child:", child.toString());
        return child;
    }}
}}
"""),
            IFile(f"{self.namespace}DOMLoader.ts", f"""\
import {self.namespace}Loader from \"./{self.namespace}Loader\";
import DOMLoader from \"core/structure/DOMLoader\";

export default class {self.namespace}DOMLoader extends DOMLoader {{
    public static async main(): Promise<void> {{
        {self.namespace}Loader.LOGGER.info("Loading Document");
    }}
}}
"""),
            IFile(f"{self.namespace}Session.ts", f"""\
import Session from \"core/engine/utils/Session\";
import Identifier from \"core/structure/Identifier\";
import {self.namespace}Loader from \"./{self.namespace}Loader\";

const initial{self.namespace}SessionData = {{
    score: 0,
}}

export type {self.namespace}SessionData = typeof initial{self.namespace}SessionData;

/**
 * {self.namespace}Session
 *
 * Default session implementation.
 */
export default class {self.namespace}Session extends Session<{self.namespace}SessionData> {{
    constructor() {{
        super(Identifier.of("{self.id}", "session"), initial{self.namespace}SessionData);
    }}

    public incrementScore(amount: number): void {{
        this.set("score", this.get("score") + amount);
    }}
}}
"""),
IFile(f"{self.namespace}Unloader.ts", f"""\
import Unloader from "core/structure/Unloader";
import {self.namespace}Session from "./{self.namespace}Session";
import {self.namespace}Loader from "./{self.namespace}Loader";

/**
 * {self.namespace}Unloader
 *
 * Class for the engine.
 */
export default class {self.namespace}Unloader extends Unloader {{
    public static async main(): Promise<void> {{
        {self.namespace}Loader.SESSION.save();
    }}
}}
""")
        ], [
            IFolder("providers", [
                IFile(f"{self.namespace}LangProvider.ts", f"""\
import LanguageProvider from \"core/structure/providers/LanguageProvider\";
import Registerable from \"core/structure/Registerable\";
import {self.namespace}Loader from \"../{self.namespace}Loader\";

export default class {self.namespace}LangProvider extends LanguageProvider implements Registerable {{
    public static async register(): Promise<void> {{
        {self.namespace}Loader.LOGGER.info("Registering languages...");
        this.registerLanguage("en_us");
        this.registerLanguage("pt_br");
        await this.loadLanguages({self.namespace}Loader.ID);
    }}
}}
"""),
            ], []),
        ]))

        pack_folder.add_folder(IFolder("assets", [], [
            IFolder("lang", [
                IFile("en_us.json", f"{{\n  \"{self.id}:text\": \"{self.namespace} loaded successfully.\"\n}}\n"),
                IFile("pt_br.json", f"{{\n  \"{self.id}:text\": \"{self.namespace} carregado com sucesso.\"\n}}\n"),
            ], []),
            IFolder("textures", [], []),
        ]))

        pack_folder.write(".")

if __name__ == "__main__":
    namespace = sys.argv[1] if len(sys.argv) > 1 else "-h"
    if (namespace == "-h" or namespace == "--help"):
        print(f"Usage: python {sys.argv[0]} [namespace]")
        sys.exit(0)
    Pack(namespace).build()