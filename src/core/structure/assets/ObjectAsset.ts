/**
 * ObjectAsset.ts
 *
 * Auto-generated documentation comment for core/structure/assets/ObjectAsset.ts.
 */

import Asset from "./Asset";
import Identifier from "../Identifier";

/**
 * ObjectAsset
 *
 * Class for the engine.
 */
export default class ObjectAsset extends Asset {
    public data: unknown | null = null;

    constructor(id: Identifier, url: string) {
        super(id, url);
    }

    public async load(): Promise<unknown> {
        if (this.data !== null) {
            return this.data;
        }

        const response = await fetch(this.url);
        if (!response.ok) {
            throw new Error(`Failed to load object asset '${this.id}' from ${this.url}`);
        }
        this.data = await response.json();
        return this.data;
    }

    public getType(): string {
        return "object";
    }
}