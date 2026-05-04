/**
 * ChangeLanguageButton.ts
 *
 * Auto-generated documentation comment for script/game/base/src/elements/custom/ChangeLanguageButton.ts.
 */

import Color3 from "core/engine/utils/Color3";
import Button from "./Button";
import Vector2 from "core/engine/game/Vector2";
import LanguageProvider from "core/structure/providers/LanguageProvider";
import Text from "core/elements/Text";
import Identifier from "core/structure/Identifier";
import BaseLoader from "../../BaseLoader";
import Area2 from "core/engine/game/Area2";

/**
 * ChangeLanguageButton
 *
 * Class for the engine.
 */
export default class ChangeLanguageButton extends Button {
    private lang: string;
    constructor(text: Text, language: string, color: Color3, area: Area2, font?: { family: string; size: string; weight: string }) {
        super(
            { 
                color: color,
                hoverColor: color.applyBrightness(0.8), 
                clickColor: color.applyBrightness(0.5), 
                textColor: Color3.WHITE 
            }, 
            { 
                position: area.position, 
                size: area.size, 
                anchor: area.anchorPoint 
            }, 
            { 
                family: font?.family || "Arial", 
                size: font?.size || "20px", 
                weight: font?.weight || "bold" 
            }
        );
        this.lang = language;
        this.content = text
    }

    public onClick(): void {
        LanguageProvider.useLanguage(this.lang);
        super.onClick();
    }
}