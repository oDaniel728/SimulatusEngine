/**
 * BaseUnloader.ts
 *
 * Auto-generated documentation comment for script/game/base/src/BaseUnloader.ts.
 */

import Unloader from "core/structure/Unloader";
import BaseSession from "./BaseSession";
import BaseLoader from "./BaseLoader";

/**
 * BaseUnloader
 *
 * Class for the engine.
 */
export default class BaseUnloader extends Unloader {
    public static async main(): Promise<void> {
        BaseLoader.SESSION.save();
    }
}