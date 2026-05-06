import GameInjectionManifestStructure from "core/engine/utils/GameInjectionManifestStructure.js";
import BaseDOMLoader from "./src/BaseDOMLoader.js";
import BaseLoader from "./src/BaseLoader.js";
import BasePreLoader from "./src/BasePreLoader.js";
import BaseUnloader from "./src/BaseUnloader.js";

export async function main() {
    await new GameInjectionManifestStructure(
        BasePreLoader, BaseLoader, BaseDOMLoader, BaseUnloader
    ).register();
}
