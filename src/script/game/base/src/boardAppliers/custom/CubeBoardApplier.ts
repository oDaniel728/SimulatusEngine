import Applier from "@simulatus/engine/appliers/Applier";
import Color3 from "@simulatus/engine/utils/Color3";
import Easing from "@simulatus/engine/utils/Easing";
import StyleBuilder from "@simulatus/engine/appliers/StyleBuilder";
import { Properties } from "csstype";

export default class CubeBoardApplier implements Applier {
    private style = new StyleBuilder()
        .buildBorder(g => g.radius("10000px"))
        .buildTransition(g => g.duration(50).property("background-color").timingFunction(Easing.ExponentialOut))
        .buildPosition(g => g.zIndex(10000));

    applyToElement(element: { style: Properties; }): void {
        this.style.applyToElement(element);
    }

}