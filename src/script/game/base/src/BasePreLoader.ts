import PreLoader from "@simulatus/structure/PreLoader";
import Registry from "@simulatus/structure/Registry";
import Mouse from "@simulatus/engine/utils/Mouse";
import LangProvider from "./providers/LangProvider";
import BaseAssetProvider from "./providers/BaseAssetProvider";

export default class BasePreLoader extends PreLoader {
    public static async main(): Promise<void> {
        Registry.init();
        await BaseAssetProvider.register();
        await LangProvider.register();
        await BaseAssetProvider.after();
        Mouse.init();
    }
}