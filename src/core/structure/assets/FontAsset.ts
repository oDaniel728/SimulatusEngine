/**
 * FontAsset.ts
 *
 * Auto-generated documentation comment for core/structure/assets/FontAsset.ts.
 */

import Identifier from "../Identifier";
import Asset from "./Asset";

/**
 * FontAsset
 *
 * Class for the engine.
 */
export default class FontAsset extends Asset {

    public readonly className: string;
    public static Instances = new Set<FontAsset>();
    public static styleElement: HTMLStyleElement | null = null;

    constructor(id: Identifier);
    constructor(id: Identifier, url: string);

    constructor(id: Identifier, url?: string) {
        super(id, url ?? `./script/game/${id.namespace}/assets/${id.name}`);
        FontAsset.Instances.add(this);
        if (!FontAsset.styleElement) {
            FontAsset.styleElement = document.createElement("style");
            FontAsset.styleElement.setAttribute("id", "simulatus-font-assets");
            document.head.appendChild(FontAsset.styleElement);
        }
        this.className = FontAsset.fontNameFromIdentifier(id)
    }

    public static getFontFaceCSS(): string {
        let css = "";
        for (const fontAsset of FontAsset.Instances) {
            css += fontAsset.fontFace;
        }
        return css;
    }

    public static updateStyleElement(): void {
        if (FontAsset.styleElement) {
            FontAsset.styleElement.textContent = FontAsset.getFontFaceCSS();
        }
    }

    public get suffix(): string {
        const parts = this.url.split(".");
        return parts[parts.length - 1].toLowerCase();
    }

    public get fontFormat(): string {
        switch (this.suffix) {
            case "woff":
                return "woff";
            case "woff2":
                return "woff2";
            case "ttf":
                return "truetype";
            case "otf":
                return "opentype";
            default:
                throw new Error(`Unsupported font format: .${this.suffix}`);
        }
    }

    public get fontFace(): string {
        return `
        @font-face {
            font-family: '${this.className}';
            src: url('${this.url}') format('${this.fontFormat}');
            font-weight: normal;
            font-style: normal;
        }
        `;
    }

    public static fontNameFromIdentifier(id: Identifier): string {
        return `font-${id.namespace}-${id.name.replace(/(?:\s+)|\/|\\/g, '-')}`;
    }

    public getType(): string {
        return "font";
    }

}