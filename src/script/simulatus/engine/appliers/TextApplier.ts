import BoardApplier from "./BoardApplier";
import BoardElement from "../BoardElement";
import Text from "../../elements/Text";

export default class TextApplier implements BoardApplier {
    private _text: Text = Text.EMPTY;

    public get text(): Text {
        return this._text;
    }

    public set text(value: Text | string) {
        this._text = typeof value === "string" ? Text.literal(value) : value;
    }

    constructor(text: Text | string = Text.EMPTY) {
        this.text = text;
    }

    public applyToBoardElement(element: BoardElement): void {
        element.getElement().textContent = this._text.toString();
    }
}
