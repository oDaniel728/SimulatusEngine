import PreLoader from "@simulatus/structure/PreLoader";
import Registry from "@simulatus/structure/Registry";
import Mouse from "@simulatus/engine/utils/Mouse";

export default class BasePreLoader extends PreLoader {
    public static async main(): Promise<void> {
        Registry.init();
        Mouse.init();
    }
}