/**
 * Color3.ts
 *
 * Auto-generated documentation comment for core/engine/utils/Color3.ts.
 */

import * as CSS from "csstype";

type NotUndefined<T> = T extends undefined ? never : T;
type CSSColor = NotUndefined<CSS.Properties["backgroundColor"]>
type NamedCSSColor = keyof typeof NAMED_COLORS;
const NAMED_COLORS = {
    red: "#ff0000",
    gold: "#ffd700",
    gray: "#808080",
    grey: "#808080",
    blue: "#0000ff",
    green: "#008000",
    white: "#ffffff",
    black: "#000000",
    orange: "#ffa500",
    yellow: "#ffff00",
    purple: "#800080",
    pink: "#ffc0cb",
    cyan: "#00ffff",
    magenta: "#ff00ff",
    brown: "#a52a2a"
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Color3
 *
 * Representa uma cor RGBA com componentes de vermelho, verde e azul no intervalo de 0 a 255,
 * e componente alpha no intervalo de 0 a 1.
 *
 * @example
 * const cor = new Color3(128, 64, 255);
 * console.log(cor.toString()); // rgba(128, 64, 255, 1)
 */
export class Color3 {

    /** Cor transparente (0, 0, 0, 0). */
    public static readonly TRANSPARENT = new Color3(0, 0, 0, 0);
    /** Cor preta (0, 0, 0). */
    public static readonly BLACK = new Color3(0, 0, 0);
    /** Cor branca (255, 255, 255). */
    public static readonly WHITE = new Color3(255, 255, 255);
    /** Cor vermelha (255, 0, 0). */
    public static readonly RED = new Color3(255, 0, 0);
    /** Cor verde (0, 255, 0). */
    public static readonly GREEN = new Color3(0, 255, 0);
    /** Cor azul (0, 0, 255). */
    public static readonly BLUE = new Color3(0, 0, 255);

    private static readonly NAMED_COLORS: Record<string, string> = NAMED_COLORS;

    private _r!: number;
    private _g!: number;
    private _b!: number;
    private _a!: number;

    /**
     * Componente vermelho da cor (0-255).
     *
     * @example
     * const cor = new Color3(200, 100, 50);
     * console.log(cor.r); // 200
     */
    public get r(): number {
        return Math.round(clamp(this._r, 0, 255));
    }
    /**
     * Componente verde da cor (0-255).
     *
     * @example
     * const cor = new Color3(50, 200, 100);
     * console.log(cor.g); // 200
     */
    public get g(): number {
        return Math.round(clamp(this._g, 0, 255));
    }
    /**
     * Componente azul da cor (0-255).
     *
     * @example
     * const cor = new Color3(50, 100, 200);
     * console.log(cor.b); // 200
     */
    public get b(): number {
        return Math.round(clamp(this._b, 0, 255));
    }
    /**
     * Componente alpha da cor (0-1).
     *
     * @example
     * const cor = new Color3(50, 100, 200, 0.5);
     * console.log(cor.a); // 0.5
     */
    public get a(): number {
        return clamp(this._a, 0, 1);
    }

    /**
     * Define o componente vermelho da cor em 0-255.
     *
     * @example
     * const cor = new Color3();
     * cor.r = 255;
     */
    public set r(value: number) {
        this._r = Math.round(clamp(value, 0, 255));
    }
    /**
     * Define o componente verde da cor em 0-255.
     *
     * @example
     * const cor = new Color3();
     * cor.g = 255;
     */
    public set g(value: number) {
        this._g = Math.round(clamp(value, 0, 255));
    }
    /**
     * Define o componente azul da cor em 0-255.
     *
     * @example
     * const cor = new Color3();
     * cor.b = 255;
     */
    public set b(value: number) {
        this._b = Math.round(clamp(value, 0, 255));
    }
    /**
     * Define a opacidade da cor em 0-1.
     *
     * @example
     * const cor = new Color3();
     * cor.a = 0.75;
     */
    public set a(value: number) {
        this._a = clamp(value, 0, 1);
    }

    /**
     * Cria uma nova cor RGBA padrão.
     *
     * @constructor
     * @example
     * const cor = new Color3();
     */
    constructor();
    /**
     * Cria uma nova cor a partir de um nome CSS reconhecido.
     *
     * @constructor
     * @param {NamedCSSColor} namedColor - Nome CSS válido da cor.
     * @example
     * const cor = new Color3("red");
     */
    constructor(namedColor: NamedCSSColor);

    /**
     * Cria uma nova cor RGB com alpha igual a 1.
     *
     * @constructor
     * @param {number} r - Componente vermelho (0-255).
     * @param {number} g - Componente verde (0-255).
     * @param {number} b - Componente azul (0-255).
     * @example
     * const cor = new Color3(128, 64, 255);
     */
    constructor(r: number, g: number, b: number);

    /**
     * Cria uma nova cor RGBA.
     *
     * @constructor
     * @param {number} r - Componente vermelho (0-255).
     * @param {number} g - Componente verde (0-255).
     * @param {number} b - Componente azul (0-255).
     * @param {number} a - Componente alpha (0-1).
     * @example
     * const cor = new Color3(128, 64, 255, 0.5);
     */
    constructor(r: number, g: number, b: number, a: number);
    constructor(r: number | string = 0, g: number = 0, b: number = 0, a: number = 1) {
        if (typeof r === "string") {
            const color = Color3.fromString(r);
            r = color.r;
            g = color.g;
            b = color.b;
            a = color.a;
        }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /**
     * Retorna a cor em formato CSS `rgba(...)`.
     *
     * @returns {string} - Representação da cor como string CSS.
     * @example
     * const cor = new Color3(100, 150, 200, 0.5);
     * console.log(cor.toString()); // rgba(100, 150, 200, 0.5)
     */
    public toString(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    /**
     * Cria uma cor a partir de uma string hexadecimal.
     *
     * @param {string} hex - Valor hexadecimal da cor, com ou sem `#`.
     * @returns {Color3}
     * @example
     * const cor = Color3.fromHex("#ff00ff");
     */
    public static fromHex(hex: string): Color3 {
        if (hex.startsWith("#")) {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex.split("").map(c => c + c).join("");
        }
        if (hex.length !== 6) {
            throw new Error("Invalid hex color format");
        }
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return new Color3(r, g, b);
    }

    /**
     * Cria uma cor RGB com alpha igual a 1.
     *
     * @param {number} r - Componente vermelho (0-255).
     * @param {number} g - Componente verde (0-255).
     * @param {number} b - Componente azul (0-255).
     * @returns {Color3}
     * @example
     * const cor = Color3.fromRGB(10, 20, 30);
     */
    public static fromRGB(r: number, g: number, b: number): Color3 {
        return new Color3(r, g, b);
    }
    
    /**
     * Cria uma cor RGBA.
     *
     * @param {number} r - Componente vermelho (0-255).
     * @param {number} g - Componente verde (0-255).
     * @param {number} b - Componente azul (0-255).
     * @param {number} a - Componente alpha (0-1).
     * @returns {Color3}
     * @example
     * const cor = Color3.fromRGBA(10, 20, 30, 0.7);
     */
    public static fromRGBA(r: number, g: number, b: number, a: number): Color3 {
        return new Color3(r, g, b, a);
    }

    /**
     * Cria uma cor a partir de valores HSL.
     *
     * @param {number} h - Matiz em graus (0-360).
     * @param {number} s - Saturação em porcentagem (0-100).
     * @param {number} l - Luminosidade em porcentagem (0-100).
     * @returns {Color3}
     * @example
     * const cor = Color3.fromHSL(180, 50, 50);
     */
    public static fromHSL(h: number, s: number, l: number): Color3 {
        s /= 100;
        l /= 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;
        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }
        return new Color3(Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255));
    }

    /**
     * Cria uma cor a partir de uma string reconhecida (nome CSS, HEX, RGB, RGBA ou HSL).
     *
     * @param {NamedCSSColor | string} colorString - String de cor suportada.
     * @returns {Color3}
     * @example
     * const cor = Color3.fromString("blue");
     */
    public static fromString(colorString: NamedCSSColor | string): Color3 {
        colorString = colorString.trim().toLowerCase();

        const checkRGBA = function() {
            const rgbaMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (rgbaMatch) {
                const r = parseInt(rgbaMatch[1]);
                const g = parseInt(rgbaMatch[2]);
                const b = parseInt(rgbaMatch[3]);
                const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
                return new Color3(r, g, b, a);
            }
        }
        const checkHex = function() {
            const hexMatch = colorString.match(/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/);
            if (hexMatch) {
                return Color3.fromHex(hexMatch[1]);
            }
        }
        const checkHSL = function() {
            const hslMatch = colorString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (hslMatch) {
                const h = parseInt(hslMatch[1]);
                const s = parseInt(hslMatch[2]);
                const l = parseInt(hslMatch[3]);
                return Color3.fromHSL(h, s, l);
            }
        }
        const checkNamedColor = function() {
            const namedHex = Color3.NAMED_COLORS[colorString];
            if (namedHex) {
                return Color3.fromHex(namedHex);
            }

            if (typeof document === "undefined") {
                return;
            }
            const div = document.createElement("div");
            div.style.color = colorString;
            if (div.style.color) {
                const rgbaMatch = div.style.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (rgbaMatch) {
                    const r = parseInt(rgbaMatch[1]);
                    const g = parseInt(rgbaMatch[2]);
                    const b = parseInt(rgbaMatch[3]);
                    const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
                    return new Color3(r, g, b, a);
                }
                const hexMatch = div.style.color.match(/^#?([a-fA-F0-9]{6})$/);
                if (hexMatch) {
                    return Color3.fromHex(hexMatch[1]);
                }
            }
        }
        const rgbaColor = checkRGBA();
        if (rgbaColor) {
            return rgbaColor;
        }
        const hslColor = checkHSL();
        if (hslColor) {
            return hslColor;
        }
        const hexColor = checkHex();
        if (hexColor) {
            return hexColor;
        }
        const namedColor = checkNamedColor();
        if (namedColor) {
            return namedColor;
        }
        throw new Error("Unsupported color format");
    }

    /**
     * Soma dois valores de cor component-wise.
     *
     * @param {Color3} other - A cor que será adicionada a esta cor.
     * @returns {Color3} - Nova cor resultante da soma.
     * @example
     * const cor = new Color3(100, 100, 100);
     * const resultado = cor.sum(new Color3(50, 50, 50));
     */
    public sum(other: Color3): Color3 {
        return new Color3(
            Math.min(255, this.r + other.r),
            Math.min(255, this.g + other.g),
            Math.min(255, this.b + other.b),
            Math.min(1, this.a + other.a)
        );
    }
    
    /**
     * Multiplica todos os componentes de cor pelo fator fornecido.
     *
     * @param {number} factor - Fator de multiplicação.
     * @returns {Color3}
     * @example
     * const cor = new Color3(100, 100, 100);
     * const resultado = cor.multiply(2);
     */
    public multiply(factor: number): Color3 {
        return new Color3(
            Math.min(255, this.r * factor),
            Math.min(255, this.g * factor),
            Math.min(255, this.b * factor),
            Math.min(1, this.a * factor)
        );
    }

    /**
     * Ajusta o brilho da cor.
     *
     * @param {number} factor - Fator de brilho.
     * @returns {Color3}
     * @example
     * const cor = new Color3(100, 100, 100);
     * const resultado = cor.applyBrightness(1.2);
     */
    public applyBrightness(factor: number): Color3 {
        return new Color3(
            Math.min(255, this.r * factor),
            Math.min(255, this.g * factor),
            Math.min(255, this.b * factor),
            this.a
        );
    }
    /**
     * Ajusta a escuridão da cor.
     *
     * @param {number} factor - Fator de escurecimento.
     * @returns {Color3}
     * @example
     * const cor = new Color3(100, 100, 100);
     * const resultado = cor.applyDarkness(0.3);
     */
    public applyDarkness(factor: number): Color3 {
        return new Color3(
            Math.max(0, this.r * (1 - factor)),
            Math.max(0, this.g * (1 - factor)),
            Math.max(0, this.b * (1 - factor)),
            this.a
        );
    }

    /**
     * Ajusta a saturação da cor.
     *
     * @param {number} factor - Fator de saturação.
     * @returns {Color3}
     * @example
     * const cor = new Color3(100, 150, 200);
     * const resultado = cor.applySaturation(1.5);
     */
    public applySaturation(factor: number): Color3 {
        const gray = 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
        return new Color3(
            Math.min(255, gray + (this.r - gray) * factor),
            Math.min(255, gray + (this.g - gray) * factor),
            Math.min(255, gray + (this.b - gray) * factor),
            this.a
        );
    }

    /**
     * Ajusta o alpha da cor, mantendo os componentes RGB.
     *
     * @param {number} factor - Fator de alpha.
     * @returns {Color3}
     * @example
     * const cor = new Color3(100, 150, 200, 1);
     * const resultado = cor.applyAlpha(0.5);
     */
    public applyAlpha(factor: number): Color3 {
        return new Color3(this.r, this.g, this.b, Math.min(1, this.a * factor));
    }

    /**
     * Ajusta o contraste da cor.
     *
     * @param {number} factor - Fator de contraste.
     * @returns {Color3}
     * @example
     * const cor = new Color3(100, 150, 200);
     * const resultado = cor.applyContrast(1.2);
     */
    public applyContrast(factor: number): Color3 {
        const contrast = (factor - 1) * 255;
        return new Color3(
            Math.min(255, ((this.r - 128) * factor) + 128 + contrast),
            Math.min(255, ((this.g - 128) * factor) + 128 + contrast),
            Math.min(255, ((this.b - 128) * factor) + 128 + contrast),
            this.a
        );
    }

    /**
     * Converte a cor para tons de cinza.
     *
     * @returns {Color3}
     * @example
     * const cor = new Color3(100, 150, 200);
     * const resultado = cor.applyGrayscale();
     */
    public applyGrayscale(): Color3 {
        const gray = Math.round(0.299 * this.r + 0.587 * this.g + 0.114 * this.b);
        return new Color3(gray, gray, gray, this.a);
    }

    /**
     * Converte a cor para o estilo sépia.
     *
     * @returns {Color3}
     * @example
     * const cor = new Color3(100, 150, 200);
     * const resultado = cor.applySepia();
     */
    public applySepia(): Color3 {
        return new Color3(
            Math.min(255, (this.r * 0.393) + (this.g * 0.769) + (this.b * 0.189)),
            Math.min(255, (this.r * 0.349) + (this.g * 0.686) + (this.b * 0.168)),
            Math.min(255, (this.r * 0.272) + (this.g * 0.534) + (this.b * 0.131)),
            this.a
        );
    }

    /**
     * Aplica esta cor como `background-color` em um elemento HTML.
     *
     * @param {HTMLElement} element - Elemento alvo.
     * @example
     * const cor = new Color3(255, 0, 0);
     * cor.applyIntoHTMLElement(document.body);
     */
    public applyIntoHTMLElement(element: HTMLElement): void {
        element.style.backgroundColor = this.toString();
    }

    /**
     * Aplica esta cor como `background-color` em um objeto com estilo CSS.
     *
     * @param {{ style: CSS.Properties }} element - Elemento alvo.
     * @example
     * const elemento = { style: {} as CSS.Properties };
     * new Color3(0, 255, 0).applyToElement(elemento);
     */
    public applyToElement(element: { style: CSS.Properties }): void {
        element.style.backgroundColor = this.toString();
    }
}

export default Color3;