/**
 * Asset.ts
 *
 * Auto-generated documentation comment for core/structure/assets/Asset.ts.
 */

import Identifier from "../Identifier";

/**
 * Asset
 *
 * Abstract class for the engine.
 */
export default abstract class Asset {
    public readonly id: Identifier;
    public readonly url: string;

    constructor(id: Identifier, url: string) {
        this.id = id;
        this.url = url;
    }

    public abstract getType(): string;
}