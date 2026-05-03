import Text from "@simulatus/elements/Text";
import ChangeLanguageButton from "./ChangeLanguageButton";
import BaseLoader from "../../BaseLoader";
import Identifier from "@simulatus/structure/Identifier";
import Color3 from "@simulatus/engine/utils/Color3";
import Area2 from "@simulatus/engine/game/Area2";
import Vector2 from "@simulatus/engine/game/Vector2";

export default class ChangeLanguageToEnglishButton extends ChangeLanguageButton {
    constructor() {
        super(
            Text.translatable(Identifier.of(BaseLoader.ID, "change_language_to_english_button")),
            "en_us",
            Color3.BLUE,
            new Area2(new Vector2(20, 110), new Vector2(200, 40), new Vector2(0, -1)),
        );
    }
}