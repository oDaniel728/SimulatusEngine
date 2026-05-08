import GameInjectionManifestStructure from "core/engine/utils/GameInjectionManifestStructure.js";
import CorexApplicationPreLoader from "./src/CorexApplicationPreLoader.js";
import CorexApplicationUnloader from "./src/CorexApplicationUnloader.js";
import CorexApplicationLoader from "./src/CorexApplicationLoader.js";
import CorexApplicationDOMLoader from "./src/CorexApplicationDOMLoader.js";

export async function main() {
    await new GameInjectionManifestStructure(
        CorexApplicationPreLoader,
        CorexApplicationLoader,
        CorexApplicationDOMLoader,
        CorexApplicationUnloader
    ).register();
}
