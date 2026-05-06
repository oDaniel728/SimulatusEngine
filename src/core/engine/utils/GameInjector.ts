import PreLoader from "core/structure/PreLoader.js";
import EventList from "./EventList.js";
import GameInjectionManifestStructure from "./GameInjectionManifestStructure.js";
import Loader from "core/structure/Loader.js";
import DOMLoader from "core/structure/DOMLoader.js";
import Unloader from "core/structure/Unloader.js";

export default class GameInjector {
    public static manifests: Map<string, GameInjectionManifestStructure> = new Map();

    public static async loadNamespace(name: string): Promise<void> {
        const manifest = GameInjector.manifests.get(name);
        if (!manifest) throw new Error(`Namespace ${name} not found`);
        await GameInjector.inject(
            manifest.preLoader,
            manifest.loader,
            manifest.domLoader,
            manifest.unloader
        );
    }

    public static async init() {
        GameInjector.beforeLoad.addEventListener(async () => {
            GameInjector.manifests.forEach(async (v, k) => {
                await GameInjector.loadNamespace(k);
            })
        });
        await GameInjector.beforeLoad.triggerAsync();
    }

    public static beforeLoad = new EventList<() => Promise<void>>();

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