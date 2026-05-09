import { Properties } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";
import Color3Gradient from "../utils/Color3Gradient";

/**
 * BorderApplier
 *
 * Applier para bordas com todas as propriedades de estilo de borda.
 *
 * @example
 * const applier = new BorderApplier();
 * applier.border = "1px solid red";
 * applier.applyToElement(boardElement);
 */
export default class BorderApplier implements Applier {
    private _style = {} as Properties;

    /**
     * Obtém a borda completa.
     *
     * @public
     * @type {Properties["border"]}
     * @example
     * const applier = new BorderApplier();
     * applier.border = "1px solid red";
     * console.log(applier.border);
     */
    public get border(): Properties["border"] {
        return this._style.border;
    }

    /**
     * Define a borda completa.
     *
     * @public
     * @param {Properties["border"]} value - Valor da borda.
     * @example
     * const applier = new BorderApplier();
     * applier.border = "1px solid red";
     */
    public set border(value: Properties["border"]) {
        this._style.border = value;
    }

    /**
     * Obtém a largura da borda.
     *
     * @public
     * @type {Properties["borderWidth"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderWidth = "2px";
     * console.log(applier.borderWidth);
     */
    public get borderWidth(): Properties["borderWidth"] {
        return this._style.borderWidth;
    }

    /**
     * Define a largura da borda.
     *
     * @public
     * @param {Properties["borderWidth"]} value - Valor da largura da borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderWidth = "2px";
     */
    public set borderWidth(value: Properties["borderWidth"]) {
        this._style.borderWidth = value;
    }

    /**
     * Obtém o estilo da borda.
     *
     * @public
     * @type {Properties["borderStyle"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderStyle = "dashed";
     * console.log(applier.borderStyle);
     */
    public get borderStyle(): Properties["borderStyle"] {
        return this._style.borderStyle;
    }

    /**
     * Define o estilo da borda.
     *
     * @public
     * @param {Properties["borderStyle"]} value - Valor do estilo da borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderStyle = "dashed";
     */
    public set borderStyle(value: Properties["borderStyle"]) {
        this._style.borderStyle = value;
    }

    /**
     * Obtém a cor da borda.
     *
     * @public
     * @type {Properties["borderColor"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderColor = "red";
     * console.log(applier.borderColor);
     */
    public get borderColor(): Properties["borderColor"] {
        return this._style.borderColor;
    }

    /**
     * Define a cor da borda.
     *
     * @public
     * @param {Properties["borderColor"] | Color3} value - Valor da cor da borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderColor = new Color3(255, 0, 0);
     */
    public set borderColor(value: Properties["borderColor"] | Color3) {
        this._style.borderColor = value?.toString();
    }

    /**
     * Obtém o raio de borda.
     *
     * @public
     * @type {Properties["borderRadius"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderRadius = "8px";
     * console.log(applier.borderRadius);
     */
    public get borderRadius(): Properties["borderRadius"] {
        return this._style.borderRadius;
    }

    /**
     * Define o raio de borda.
     *
     * @public
     * @param {Properties["borderRadius"]} value - Valor do raio de borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderRadius = "8px";
     */
    public set borderRadius(value: Properties["borderRadius"]) {
        this._style.borderRadius = value;
    }

    /**
     * Obtém a largura da borda superior.
     *
     * @public
     * @type {Properties["borderTopWidth"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderTopWidth = "4px";
     * console.log(applier.borderTopWidth);
     */
    public get borderTopWidth(): Properties["borderTopWidth"] {
        return this._style.borderTopWidth;
    }

    /**
     * Define a largura da borda superior.
     *
     * @public
     * @param {Properties["borderTopWidth"]} value - Valor da largura superior.
     * @example
     * const applier = new BorderApplier();
     * applier.borderTopWidth = "4px";
     */
    public set borderTopWidth(value: Properties["borderTopWidth"]) {
        this._style.borderTopWidth = value;
    }

    /**
     * Obtém a largura da borda direita.
     *
     * @public
     * @type {Properties["borderRightWidth"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderRightWidth = "4px";
     * console.log(applier.borderRightWidth);
     */
    public get borderRightWidth(): Properties["borderRightWidth"] {
        return this._style.borderRightWidth;
    }

    /**
     * Define a largura da borda direita.
     *
     * @public
     * @param {Properties["borderRightWidth"]} value - Valor da largura direita.
     * @example
     * const applier = new BorderApplier();
     * applier.borderRightWidth = "4px";
     */
    public set borderRightWidth(value: Properties["borderRightWidth"]) {
        this._style.borderRightWidth = value;
    }

    /**
     * Obtém a largura da borda inferior.
     *
     * @public
     * @type {Properties["borderBottomWidth"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderBottomWidth = "4px";
     * console.log(applier.borderBottomWidth);
     */
    public get borderBottomWidth(): Properties["borderBottomWidth"] {
        return this._style.borderBottomWidth;
    }

    /**
     * Define a largura da borda inferior.
     *
     * @public
     * @param {Properties["borderBottomWidth"]} value - Valor da largura inferior.
     * @example
     * const applier = new BorderApplier();
     * applier.borderBottomWidth = "4px";
     */
    public set borderBottomWidth(value: Properties["borderBottomWidth"]) {
        this._style.borderBottomWidth = value;
    }

    /**
     * Obtém a largura da borda esquerda.
     *
     * @public
     * @type {Properties["borderLeftWidth"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderLeftWidth = "4px";
     * console.log(applier.borderLeftWidth);
     */
    public get borderLeftWidth(): Properties["borderLeftWidth"] {
        return this._style.borderLeftWidth;
    }

    /**
     * Define a largura da borda esquerda.
     *
     * @public
     * @param {Properties["borderLeftWidth"]} value - Valor da largura esquerda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderLeftWidth = "4px";
     */
    public set borderLeftWidth(value: Properties["borderLeftWidth"]) {
        this._style.borderLeftWidth = value;
    }

    /**
     * Obtém o estilo da borda superior.
     *
     * @public
     * @type {Properties["borderTopStyle"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderTopStyle = "solid";
     * console.log(applier.borderTopStyle);
     */
    public get borderTopStyle(): Properties["borderTopStyle"] {
        return this._style.borderTopStyle;
    }

    /**
     * Define o estilo da borda superior.
     *
     * @public
     * @param {Properties["borderTopStyle"]} value - Valor do estilo superior.
     * @example
     * const applier = new BorderApplier();
     * applier.borderTopStyle = "solid";
     */
    public set borderTopStyle(value: Properties["borderTopStyle"]) {
        this._style.borderTopStyle = value;
    }

    /**
     * Obtém o estilo da borda direita.
     *
     * @public
     * @type {Properties["borderRightStyle"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderRightStyle = "dotted";
     * console.log(applier.borderRightStyle);
     */
    public get borderRightStyle(): Properties["borderRightStyle"] {
        return this._style.borderRightStyle;
    }

    /**
     * Define o estilo da borda direita.
     *
     * @public
     * @param {Properties["borderRightStyle"]} value - Valor do estilo direito.
     * @example
     * const applier = new BorderApplier();
     * applier.borderRightStyle = "dotted";
     */
    public set borderRightStyle(value: Properties["borderRightStyle"]) {
        this._style.borderRightStyle = value;
    }

    /**
     * Obtém o estilo da borda inferior.
     *
     * @public
     * @type {Properties["borderBottomStyle"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderBottomStyle = "double";
     * console.log(applier.borderBottomStyle);
     */
    public get borderBottomStyle(): Properties["borderBottomStyle"] {
        return this._style.borderBottomStyle;
    }

    /**
     * Define o estilo da borda inferior.
     *
     * @public
     * @param {Properties["borderBottomStyle"]} value - Valor do estilo inferior.
     * @example
     * const applier = new BorderApplier();
     * applier.borderBottomStyle = "double";
     */
    public set borderBottomStyle(value: Properties["borderBottomStyle"]) {
        this._style.borderBottomStyle = value;
    }

    /**
     * Obtém o estilo da borda esquerda.
     *
     * @public
     * @type {Properties["borderLeftStyle"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderLeftStyle = "groove";
     * console.log(applier.borderLeftStyle);
     */
    public get borderLeftStyle(): Properties["borderLeftStyle"] {
        return this._style.borderLeftStyle;
    }

    /**
     * Define o estilo da borda esquerda.
     *
     * @public
     * @param {Properties["borderLeftStyle"]} value - Valor do estilo esquerdo.
     * @example
     * const applier = new BorderApplier();
     * applier.borderLeftStyle = "groove";
     */
    public set borderLeftStyle(value: Properties["borderLeftStyle"]) {
        this._style.borderLeftStyle = value;
    }

    /**
     * Obtém a cor da borda superior.
     *
     * @public
     * @type {Properties["borderTopColor"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderTopColor = "blue";
     * console.log(applier.borderTopColor);
     */
    public get borderTopColor(): Properties["borderTopColor"] {
        return this._style.borderTopColor;
    }

    /**
     * Define a cor da borda superior.
     *
     * @public
     * @param {Properties["borderTopColor"] | Color3} value - Valor da cor superior.
     * @example
     * const applier = new BorderApplier();
     * applier.borderTopColor = new Color3(0, 0, 255);
     */
    public set borderTopColor(value: Properties["borderTopColor"] | Color3) {
        this._style.borderTopColor = value?.toString();
    }

    /**
     * Obtém a cor da borda direita.
     *
     * @public
     * @type {Properties["borderRightColor"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderRightColor = "green";
     * console.log(applier.borderRightColor);
     */
    public get borderRightColor(): Properties["borderRightColor"] {
        return this._style.borderRightColor;
    }

    /**
     * Define a cor da borda direita.
     *
     * @public
     * @param {Properties["borderRightColor"] | Color3} value - Valor da cor direita.
     * @example
     * const applier = new BorderApplier();
     * applier.borderRightColor = new Color3(0, 128, 0);
     */
    public set borderRightColor(value: Properties["borderRightColor"] | Color3) {
        this._style.borderRightColor = value?.toString();
    }

    /**
     * Obtém a cor da borda inferior.
     *
     * @public
     * @type {Properties["borderBottomColor"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderBottomColor = "black";
     * console.log(applier.borderBottomColor);
     */
    public get borderBottomColor(): Properties["borderBottomColor"] {
        return this._style.borderBottomColor;
    }

    /**
     * Define a cor da borda inferior.
     *
     * @public
     * @param {Properties["borderBottomColor"] | Color3} value - Valor da cor inferior.
     * @example
     * const applier = new BorderApplier();
     * applier.borderBottomColor = new Color3(0, 0, 0);
     */
    public set borderBottomColor(value: Properties["borderBottomColor"] | Color3) {
        this._style.borderBottomColor = value?.toString();
    }

    /**
     * Obtém a cor da borda esquerda.
     *
     * @public
     * @type {Properties["borderLeftColor"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderLeftColor = "purple";
     * console.log(applier.borderLeftColor);
     */
    public get borderLeftColor(): Properties["borderLeftColor"] {
        return this._style.borderLeftColor;
    }

    /**
     * Define a cor da borda esquerda.
     *
     * @public
     * @param {Properties["borderLeftColor"] | Color3} value - Valor da cor esquerda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderLeftColor = new Color3(128, 0, 128);
     */
    public set borderLeftColor(value: Properties["borderLeftColor"] | Color3) {
        this._style.borderLeftColor = value?.toString();
    }

    /**
     * Obtém a imagem de borda.
     *
     * @public
     * @type {Properties["borderImage"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderImage = "url(border.png) 30 round";
     * console.log(applier.borderImage);
     */
    public get borderImage(): Properties["borderImage"] {
        return this._style.borderImage;
    }

    /**
     * Define a imagem de borda.
     *
     * @public
     * @param {Properties["borderImage"] | Color3Gradient} value - Valor da imagem de borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderImage = new Color3Gradient(...);
     */
    public set borderImage(value: Properties["borderImage"] | Color3Gradient) {
        this._style.borderImage = value instanceof Color3Gradient ? value.toString() : value;
    }

    /**
     * Obtém a fonte da imagem de borda.
     *
     * @public
     * @type {Properties["borderImageSource"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageSource = "url(border.png)";
     * console.log(applier.borderImageSource);
     */
    public get borderImageSource(): Properties["borderImageSource"] {
        return this._style.borderImageSource;
    }

    /**
     * Define a fonte da imagem de borda.
     *
     * @public
     * @param {Properties["borderImageSource"] | Color3Gradient} value - Valor da fonte da imagem de borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageSource = "url(border.png)";
     */
    public set borderImageSource(value: Properties["borderImageSource"] | Color3Gradient) {
        this._style.borderImageSource = value instanceof Color3Gradient ? value.toString() : value;
    }

    /**
     * Obtém o corte da imagem de borda.
     *
     * @public
     * @type {Properties["borderImageSlice"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageSlice = "30";
     * console.log(applier.borderImageSlice);
     */
    public get borderImageSlice(): Properties["borderImageSlice"] {
        return this._style.borderImageSlice;
    }

    /**
     * Define o corte da imagem de borda.
     *
     * @public
     * @param {Properties["borderImageSlice"]} value - Valor do corte de imagem de borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageSlice = "30";
     */
    public set borderImageSlice(value: Properties["borderImageSlice"]) {
        this._style.borderImageSlice = value;
    }

    /**
     * Obtém a largura da imagem de borda.
     *
     * @public
     * @type {Properties["borderImageWidth"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageWidth = "10px";
     * console.log(applier.borderImageWidth);
     */
    public get borderImageWidth(): Properties["borderImageWidth"] {
        return this._style.borderImageWidth;
    }

    /**
     * Define a largura da imagem de borda.
     *
     * @public
     * @param {Properties["borderImageWidth"]} value - Valor da largura da imagem de borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageWidth = "10px";
     */
    public set borderImageWidth(value: Properties["borderImageWidth"]) {
        this._style.borderImageWidth = value;
    }

    /**
     * Obtém o deslocamento da imagem de borda.
     *
     * @public
     * @type {Properties["borderImageOutset"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageOutset = "5px";
     * console.log(applier.borderImageOutset);
     */
    public get borderImageOutset(): Properties["borderImageOutset"] {
        return this._style.borderImageOutset;
    }

    /**
     * Define o deslocamento da imagem de borda.
     *
     * @public
     * @param {Properties["borderImageOutset"]} value - Valor do deslocamento da imagem de borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageOutset = "5px";
     */
    public set borderImageOutset(value: Properties["borderImageOutset"]) {
        this._style.borderImageOutset = value;
    }

    /**
     * Obtém a repetição da imagem de borda.
     *
     * @public
     * @type {Properties["borderImageRepeat"]}
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageRepeat = "round";
     * console.log(applier.borderImageRepeat);
     */
    public get borderImageRepeat(): Properties["borderImageRepeat"] {
        return this._style.borderImageRepeat;
    }

    /**
     * Define a repetição da imagem de borda.
     *
     * @public
     * @param {Properties["borderImageRepeat"]} value - Valor da repetição da imagem de borda.
     * @example
     * const applier = new BorderApplier();
     * applier.borderImageRepeat = "round";
     */
    public set borderImageRepeat(value: Properties["borderImageRepeat"]) {
        this._style.borderImageRepeat = value;
    }

    /**
     * Aplica o estilo de borda ao elemento fornecido.
     *
     * @public
     * @param {{ style: Properties }} element - Elemento cujo estilo será atualizado.
     * @example
     * const applier = new BorderApplier();
     * applier.border = "1px solid red";
     * applier.applyToElement(boardElement);
     */
    public applyToElement(element: { style: Properties }): void {
        Object.assign(element.style, this._style);
    }
}
