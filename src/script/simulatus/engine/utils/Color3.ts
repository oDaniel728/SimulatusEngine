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

export default class Color3 {

    public static readonly TRANSPARENT = new Color3(0, 0, 0, 0);
    public static readonly BLACK = new Color3(0, 0, 0);
    public static readonly WHITE = new Color3(255, 255, 255);
    public static readonly RED = new Color3(255, 0, 0);
    public static readonly GREEN = new Color3(0, 255, 0);
    public static readonly BLUE = new Color3(0, 0, 255);

    private static readonly NAMED_COLORS: Record<string, string> = NAMED_COLORS;

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor();
    constructor(namedColor: NamedCSSColor);
    constructor(r: number, g: number, b: number);
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

    public toString(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

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

    public static fromRGB(r: number, g: number, b: number): Color3 {
        return new Color3(r, g, b);
    }
    
    public static fromRGBA(r: number, g: number, b: number, a: number): Color3 {
        return new Color3(r, g, b, a);
    }

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

    public sum(other: Color3): Color3 {
        return new Color3(
            Math.min(255, this.r + other.r),
            Math.min(255, this.g + other.g),
            Math.min(255, this.b + other.b),
            Math.min(1, this.a + other.a)
        );
    }
    
    public multiply(factor: number): Color3 {
        return new Color3(
            Math.min(255, this.r * factor),
            Math.min(255, this.g * factor),
            Math.min(255, this.b * factor),
            Math.min(1, this.a * factor)
        );
    }

    public applyBrightness(factor: number): Color3 {
        return new Color3(
            Math.min(255, this.r * factor),
            Math.min(255, this.g * factor),
            Math.min(255, this.b * factor),
            this.a
        );
    }

    public applySaturation(factor: number): Color3 {
        const gray = 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
        return new Color3(
            Math.min(255, gray + (this.r - gray) * factor),
            Math.min(255, gray + (this.g - gray) * factor),
            Math.min(255, gray + (this.b - gray) * factor),
            this.a
        );
    }

    public applyAlpha(factor: number): Color3 {
        return new Color3(this.r, this.g, this.b, Math.min(1, this.a * factor));
    }

    public applyContrast(factor: number): Color3 {
        const contrast = (factor - 1) * 255;
        return new Color3(
            Math.min(255, ((this.r - 128) * factor) + 128 + contrast),
            Math.min(255, ((this.g - 128) * factor) + 128 + contrast),
            Math.min(255, ((this.b - 128) * factor) + 128 + contrast),
            this.a
        );
    }

    public applyGrayscale(): Color3 {
        const gray = Math.round(0.299 * this.r + 0.587 * this.g + 0.114 * this.b);
        return new Color3(gray, gray, gray, this.a);
    }

    public applySepia(): Color3 {
        return new Color3(
            Math.min(255, (this.r * 0.393) + (this.g * 0.769) + (this.b * 0.189)),
            Math.min(255, (this.r * 0.349) + (this.g * 0.686) + (this.b * 0.168)),
            Math.min(255, (this.r * 0.272) + (this.g * 0.534) + (this.b * 0.131)),
            this.a
        );
    }

    public applyIntoHTMLElement(element: HTMLElement): void {
        element.style.backgroundColor = this.toString();
    }

    public applyToElement(element: { style: CSS.Properties }): void {
        element.style.backgroundColor = this.toString();
    }
}