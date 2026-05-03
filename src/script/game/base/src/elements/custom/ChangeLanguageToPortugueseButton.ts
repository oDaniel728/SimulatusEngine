import Text from "core/elements/Text";
import ChangeLanguageButton from "./ChangeLanguageButton";
import BaseLoader from "../../BaseLoader";
import Identifier from "core/structure/Identifier";
import Color3 from "core/engine/utils/Color3";
import Area2 from "core/engine/game/Area2";
import Vector2 from "core/engine/game/Vector2";

export default class ChangeLanguageToPortugueseButton extends ChangeLanguageButton {
    constructor() {
        super(
            Text.translatable(Identifier.of(BaseLoader.ID, "change_language_to_portuguese_button")),
            "pt_br",
            Color3.BLUE,
            new Area2(new Vector2(20, 110), new Vector2(200, 40), new Vector2(0, -1)),
        );
        this.move(0, 50);
    }
}