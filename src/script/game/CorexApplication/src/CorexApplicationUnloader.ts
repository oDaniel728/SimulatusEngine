import Unloader from "core/structure/Unloader";
import CorexApplicationSession from "./CorexApplicationSession";
import CorexApplicationLoader from "./CorexApplicationLoader";

/**
 * CorexApplicationUnloader
 *
 * Class for the engine.
 */
export default class CorexApplicationUnloader extends Unloader {
    public static async main(): Promise<void> {
        CorexApplicationLoader.SESSION.save();
    }
}
