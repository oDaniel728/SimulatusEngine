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

//#region 

/**
 * GameInjector
 *
 * Class for the engine.
 */
export class GameInjector {
    public static async inject(
        preLoader: typeof PreLoader,
        loader: typeof Loader,
        domLoader: typeof DOMLoader,
        unloader: typeof Unloader
    ) {
        await preLoader.main();
        await loader.main();
        await domLoader.main();
        window.addEventListener("beforeunload", async () => {
            await unloader.main();
        });
    }
}

//#endregion

async function main(): Promise<void> {
    console.log("Hello, Simulatus Engine!");
    
    await GameInjector.inject(BasePreLoader, BaseLoader, BaseDOMLoader, BaseUnloader);
    document.getElementById("loading")?.classList.add("hidden");
    BoardElement.initAllLoops();
}

main();