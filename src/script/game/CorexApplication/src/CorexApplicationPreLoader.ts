import PreLoader from "core/structure/PreLoader";
import CorexApplicationLoader from "./CorexApplicationLoader";
import CorexApplicationLangProvider from "./providers/CorexApplicationLangProvider.js";

export default class CorexApplicationPreLoader extends PreLoader {
    public static async main(): Promise<void> {
        CorexApplicationLoader.LOGGER.info("Preloading resources...");
        await CorexApplicationLangProvider.register();
    }
}
