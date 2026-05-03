import Text from "@simulatus/elements/Text";
import BoardElement from "./BoardElement";

export default class BoardTextElement extends BoardElement<HTMLDivElement> {
    private _text: Text = Text.EMPTY;
    constructor(text: Text = Text.EMPTY) {
        super();
        this.text = text;
    }

    public get text(): Text {
        return this._text;
    }

    public set text(value: Text) {
        this._text = value;
        this.getElement().textContent = this._text.toString();
    }

    public toString(): string {
        return this.getElement().textContent || "";
    }
}