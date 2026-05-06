import DOMLoader from "core/structure/DOMLoader.js";
import Loader from "core/structure/Loader.js";
import PreLoader from "core/structure/PreLoader.js";
import Unloader from "core/structure/Unloader.js";
import GameInjector from "./GameInjector.js";

export default class GameInjectionManifestStructure {
    public preLoader: typeof PreLoader;
    public loader: typeof Loader;
    public domLoader: typeof DOMLoader;
    public unloader: typeof Unloader;

    private tryLog(message: string) {
        this.loader.LOGGER.info(message);
    }

    constructor(
        preLoader: typeof PreLoader,
        loader: typeof Loader,
        domLoader: typeof DOMLoader,
        unloader: typeof Unloader
    ) {
        this.preLoader = preLoader;
        this.loader = loader;
        this.domLoader = domLoader;
        this.unloader = unloader;
    }

    public register() {
        this.tryLog("Registering pack of data of name: " + this.loader.ID);
        GameInjector.inject(this.preLoader, this.loader, this.domLoader, this.unloader);
    }
}