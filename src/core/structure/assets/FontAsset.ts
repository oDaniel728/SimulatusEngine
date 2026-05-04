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

    constructor(id: Identifier, url: string) {
        super(id, url);
        this.className = FontAsset.fontNameFromIdentifier(id)
    }

    public static fontNameFromIdentifier(id: Identifier): string {
        return `font-${id.namespace}-${id.name.replace(/(?:\s+)|\/|\\/g, '-')}`;
    }

    public getType(): string {
        return "font";
    }

}