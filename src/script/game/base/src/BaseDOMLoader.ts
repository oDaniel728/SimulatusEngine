import BaseLoader from "./BaseLoader";
import Cube from "./custom/cube";

export default class BaseDOMLoader {
    public static readonly CUBE = new Cube();

    public static async main(): Promise<void> {
        BaseLoader.LOGGER.info("Loaded main function called.");
        BaseLoader.BOARD.appendChild(this.CUBE);
    }
}