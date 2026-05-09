/**
 * ColorApplier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/ColorApplier.ts.
 */

import { Properties } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";
import Color3Gradient from "../utils/Color3Gradient";

/**
 * ColorApplier
 *
 * Aplica uma cor ao texto de um elemento HTML.
 * 
 * @example
 * class SomeColorApplier extends ColorApplier {
 *     constructor() {
 *         super("red");
 *     }
 * }
 * // --- // --- //
 * boardElement.apply(new SomeColorApplier());
 */
export default class ColorApplier implements Applier {
    private _color: Properties["color"] = "inherit";
    private _gradient: Color3Gradient | null = null;

    /**
     * Pega a cor do texto.
     *
     * @public
     * @type {Properties["color"]}
     */
    public get color(): Properties["color"] {
        return this._color;
    }

    public set color(value: Properties["color"] | Color3 | Color3Gradient) {
        if (value instanceof Color3Gradient) {
            this._gradient = value;
            this._color = "transparent";
            return;
        }

        this._gradient = null;
        this._color = value?.toString();
    }

    /**
     * Cria uma instância de ColorApplier.
     *
     * @constructor
     * @param {(Properties["color"] | Color3 | Color3Gradient)} [color="inherit"] - A cor a ser aplicada. Pode ser uma string CSS, um objeto Color3 ou um objeto Color3Gradient. O valor padrão é "inherit".
     * @example
     * const applier1 = new ColorApplier("red");
     * const applier2 = new ColorApplier(new Color3(0, 255, 0));
     * const applier3 = new ColorApplier(new Color3Gradient(new Color3(255, 0, 0), new Color3(0, 0, 255)));
     */
    constructor(color: Properties["color"] | Color3 | Color3Gradient = "inherit") {
        this.color = color;
    }

    /**
     * Aplica a cor ao elemento HTML fornecido.
     *
     * @public
     * @param {{ style: Properties }} element - O BoardElement ou HTML Element a ser estilizado.
     * @example
     * const applier = new ColorApplier("purple");
     * applier.applyToElement(someHTMLElement);
     */
    public applyToElement(element: { style: Properties }): void {
        if (this._gradient) {
            element.style.background = this._gradient.toString();
            element.style.backgroundClip = "text";
            element.style.WebkitBackgroundClip = "text";
            element.style.color = "transparent";
            return;
        }

        element.style.color = this._color;
    }
}