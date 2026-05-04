/**
 * BasePreLoader.ts
 *
 * Auto-generated documentation comment for script/game/base/src/BasePreLoader.ts.
 */

import PreLoader from "core/structure/PreLoader";
import Registry from "core/structure/Registry";
import Mouse from "core/engine/utils/Mouse";
import LangProvider from "./providers/LangProvider";
import BaseAssetProvider from "./providers/BaseAssetProvider";

/**
 * BasePreLoader
 *
 * Class for the engine.
 */
export default class BasePreLoader extends PreLoader {
    public static async main(): Promise<void> {
        Registry.init();
        await BaseAssetProvider.register();
        await LangProvider.register();
        await BaseAssetProvider.after();
        Mouse.init();
    }
}