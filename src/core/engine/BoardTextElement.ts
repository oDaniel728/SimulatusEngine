/**
 * BoardTextElement.ts
 *
 * Auto-generated documentation comment for core/engine/BoardTextElement.ts.
 */

import Text from "core/elements/Text";
import LanguageProvider from "core/structure/providers/LanguageProvider";
import BoardElement from "./BoardElement";

/**
 * BoardTextElement
 *
 * Class for the engine.
 */
export default class BoardTextElement extends BoardElement<HTMLDivElement> {
    private _text: Text = Text.EMPTY;
    private readonly languageChangeListener: (lang: string) => void;

    constructor(text: Text = Text.EMPTY) {
        super();
        this.languageChangeListener = () => this.refreshText();
        LanguageProvider.onLanguageChange.addEventListener(this.languageChangeListener);
        this.text = text;
    }

    public get text(): Text {
        return this._text;
    }

    public set text(value: Text) {
        this._text = value;
        this.refreshText();
    }

    private refreshText(): void {
        this.getElement().textContent = this._text.toString();
    }

    protected deconstructor(): void {
        LanguageProvider.onLanguageChange.remove(this.languageChangeListener);
    }

    public toString(): string {
        return this.getElement().textContent || "";
    }
}