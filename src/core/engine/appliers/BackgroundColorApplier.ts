/**
 * BackgroundColorApplier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/BackgroundColorApplier.ts.
 */

import { Properties } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";
import Color3Gradient from "../utils/Color3Gradient.js";

/**
 * BackgroundColorApplier
 *
 * Aplica uma cor de fundo a um elemento HTML.
 * 
 * @example
 * class SomeBackgroundColorApplier extends BackgroundColorApplier {
 *     constructor() {
 *         super("red");
 *     }
 * }
 * // --- // --- //
 * boardElement.apply(new SomeBackgroundColorApplier());
 */
export class BackgroundColorApplier implements Applier {
    private _backgroundColor: Properties["backgroundColor"] = "transparent";
    private _background: Color3Gradient | null = null;

    /**
     * Pega a cor de fundo.
     *
     * @public
     * @type {Properties["backgroundColor"]} - A cor de fundo atual.
     * 
     * @example
     * const applier = new BackgroundColorApplier("blue");
     * console.log(applier.backgroundColor); // Output: "blue"
     */
    public get backgroundColor(): Properties["backgroundColor"] {
        return this._backgroundColor;
    }

    public set backgroundColor(value: Properties["backgroundColor"] | Color3 | Color3Gradient) {
        if (value instanceof Color3) {
            this._backgroundColor = value.toString();
            return;
        } else if (value instanceof Color3Gradient) {
            this._background = value;
            return;
        }
        this._backgroundColor = value?.toString();
    }

    /**
     * Cria uma instância de BackgroundColorApplier.
     *
     * @constructor
     * @param {(Properties["backgroundColor"] | Color3 | Color3Gradient)} [backgroundColor="transparent"] - A cor de fundo a ser aplicada. Pode ser uma string CSS, um objeto Color3 ou um objeto Color3Gradient. O valor padrão é "transparent".
     * @example
     * const applier1 = new BackgroundColorApplier("green");
     * const applier2 = new BackgroundColorApplier(new Color3(255, 0, 0));
     * const applier3 = new BackgroundColorApplier(new Color3Gradient(new Color3(255, 0, 0), new Color3(0, 0, 255)));
     */
    constructor(backgroundColor: Properties["backgroundColor"] | Color3 | Color3Gradient = "transparent") {
        this.backgroundColor = backgroundColor;
    }

    /**
     * Aplica os estilos ao elemento HTML fornecido.
     *
     * @public
     * @param {{ style: Properties }} element 
     * 
     * @example
     * const applier = new BackgroundColorApplier("yellow");
     * // htmlElement
     * const element = document.getElementById("myElement");
     * if (element) {
     *     applier.applyToElement(element);
     * }
     * // BoardElement
     * const boardElement = new BoardElement();
     * boardElement.apply(new BackgroundColorApplier("yellow"));
     */
    public applyToElement(element: { style: Properties }): void {
        if (this._background) 
            element.style.background = this._background.toString();
        element.style.backgroundColor = this._backgroundColor;
    }
}
export default BackgroundColorApplier;