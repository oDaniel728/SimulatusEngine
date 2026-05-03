import BasePreLoader from "@game/base/src/BasePreLoader";
import BaseDOMLoader from "@game/base/src/BaseDOMLoader";
import BaseLoader from "@game/base/src/BaseLoader";
import "./styles/main.scss";
import Loader from "core/structure/Loader";
import PreLoader from "core/structure/PreLoader";
import DOMLoader from "core/structure/DOMLoader";
import Unloader from "core/structure/Unloader";
import BaseUnloader from "@game/base/src/BaseUnloader";
import BoardElement from "core/engine/BoardElement";

//#region 

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