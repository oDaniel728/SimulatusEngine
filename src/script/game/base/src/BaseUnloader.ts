import Unloader from "core/structure/Unloader";
import BaseSession from "./BaseSession";
import BaseLoader from "./BaseLoader";

export default class BaseUnloader extends Unloader {
    public static async main(): Promise<void> {
        BaseLoader.SESSION.save();
    }
}