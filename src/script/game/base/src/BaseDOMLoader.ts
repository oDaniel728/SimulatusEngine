import DOMLoader from "@simulatus/structure/DOMLoader";
import BaseBoard from "./BaseBoard";
import BaseLoader from "./BaseLoader";
import Cube from "./custom/cube";

export default class BaseDOMLoader extends DOMLoader {
    public static readonly CUBE = new Cube();

    public static async main(): Promise<void> {
        BaseLoader.LOGGER.info("Loaded main function called.");
        BaseLoader.BOARD.appendChild(this.CUBE);
    }
}