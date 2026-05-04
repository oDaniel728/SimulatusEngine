import BoardElement from "../BoardElement";
import StyleClass from "../utils/StyleClass";
import Applier from "./Applier";
import BoardApplier from "./BoardApplier";

export default class StyleClassApplier implements BoardApplier {

    private styleClass: StyleClass;
    constructor(styleClass: StyleClass) {
        this.styleClass = styleClass;
    }

    public applyToBoardElement(element: BoardElement): void {
        this.styleClass.applyToBoardElement(element);
    }
}