import BasePreLoader from "@game/base/src/BasePreLoader";
import BaseDOMLoader from "@game/base/src/BaseDOMLoader";
import BaseLoader from "@game/base/src/BaseLoader";
import "./styles/main.scss";
import Loader from "@simulatus/structure/Loader";
import PreLoader from "@simulatus/structure/PreLoader";
import DOMLoader from "@simulatus/structure/DOMLoader";
import Unloader from "@simulatus/structure/Unloader";
import BaseUnloader from "@game/base/src/BaseUnloader";
import BoardElement from "@simulatus/engine/BoardElement";

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