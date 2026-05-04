/**
 * BaseDOMLoader.ts
 *
 * Auto-generated documentation comment for script/game/base/src/BaseDOMLoader.ts.
 */

import DOMLoader from "core/structure/DOMLoader";
import BaseBoard from "./BaseBoard";
import BaseLoader from "./BaseLoader";
import Cube from "./elements/custom/Cube";
import HelloWorldText from "./elements/custom/HelloWorldText";
import ScoreText from "./elements/custom/ScoreText";
import ScoreIncrementButton from "./elements/custom/ScoreIncrementButton";
import ChangeLanguageToEnglishButton from "./elements/custom/ChangeLanguageToEnglishButton";
import ChangeLanguageToPortugueseButton from "./elements/custom/ChangeLanguageToPortugueseButton";

/**
 * BaseDOMLoader
 *
 * Class for the engine.
 */
export default class BaseDOMLoader extends DOMLoader {
    public static readonly CUBE = new Cube();
    public static readonly HELLO_WORLD_TEXT = new HelloWorldText();
    public static readonly SCORE_TEXT = new ScoreText();
    public static readonly SCORE_INCREMENT_BUTTON = new ScoreIncrementButton();
    public static readonly CHANGE_LANGUAGE_TO_ENGLISH_BUTTON = new ChangeLanguageToEnglishButton();
    public static readonly CHANGE_LANGUAGE_TO_PORTUGUESE_BUTTON = new ChangeLanguageToPortugueseButton();

    public static async main(): Promise<void> {
        BaseLoader.LOGGER.info("Loaded main function called.");
        BaseLoader.appendChild(this.CUBE);
        BaseLoader.appendChild(this.HELLO_WORLD_TEXT);
        BaseLoader.appendChild(this.SCORE_TEXT);
        BaseLoader.appendChild(this.SCORE_INCREMENT_BUTTON);
        BaseLoader.appendChild(this.CHANGE_LANGUAGE_TO_ENGLISH_BUTTON);
        BaseLoader.appendChild(this.CHANGE_LANGUAGE_TO_PORTUGUESE_BUTTON);
    }
}