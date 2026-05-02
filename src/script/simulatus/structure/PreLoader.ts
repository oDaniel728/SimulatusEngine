import Loader from "./Loader";

export default abstract class PreLoader extends Loader {
    public static async main(): Promise<void> {}
}