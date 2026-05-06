/**
 * main.ts
 *
 * Auto-generated documentation comment for main.ts.
 */

import BasePreLoader from "@game/base/src/BasePreLoader.js";
import BaseDOMLoader from "@game/base/src/BaseDOMLoader.js";
import BaseLoader from "@game/base/src/BaseLoader.js";
import Loader from "core/structure/Loader.js";
import PreLoader from "core/structure/PreLoader.js";
import DOMLoader from "core/structure/DOMLoader.js";
import Unloader from "core/structure/Unloader.js";
import BaseUnloader from "@game/base/src/BaseUnloader.js";
import BoardElement from "core/engine/BoardElement.js";
import EventList from "core/engine/utils/EventList.js";
import GameInjectionManifestStructure from "core/engine/utils/GameInjectionManifestStructure.js";
import GameInjector from "core/engine/utils/GameInjector.js";

async function loadManifests(): Promise<void> {
    const otherManifests = import.meta.glob('./script/game/**/manifest.{ts,js}');
    for (const path in otherManifests) {
        await (await otherManifests[path]() as any).main();
    }
}

async function main(): Promise<void> {
    console.log("Hello, Simulatus Engine!");

    await loadManifests();
    await GameInjector.init();
    document.getElementById("loading")?.classList.add("hidden");
    BoardElement.initAllLoops();
}

main();