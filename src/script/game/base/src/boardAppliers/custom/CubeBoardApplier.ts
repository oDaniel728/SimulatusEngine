import Applier from "core/engine/appliers/Applier";
import Color3 from "core/engine/utils/Color3";
import Easing from "core/engine/utils/Easing";
import StyleBuilder from "core/engine/appliers/StyleBuilder";
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