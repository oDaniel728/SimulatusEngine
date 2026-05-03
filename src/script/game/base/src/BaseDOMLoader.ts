import DOMLoader from "@simulatus/structure/DOMLoader";
import BaseBoard from "./BaseBoard";
import BaseLoader from "./BaseLoader";
import Cube from "./elements/custom/Cube";
import HelloWorldText from "./elements/custom/HelloWorldText";
import ScoreText from "./elements/custom/ScoreText";

export default class BaseDOMLoader extends DOMLoader {
    public static readonly CUBE = new Cube();
    public static readonly HELLO_WORLD_TEXT = new HelloWorldText();
    public static readonly SCORE_TEXT = new ScoreText();

    public static async main(): Promise<void> {
        BaseLoader.LOGGER.info("Loaded main function called.");
        BaseLoader.appendChild(this.CUBE);
        BaseLoader.appendChild(this.HELLO_WORLD_TEXT);
        BaseLoader.appendChild(this.SCORE_TEXT);
    }
}