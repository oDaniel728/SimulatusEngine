/**
 * AssetProvider.ts
 *
 * Auto-generated documentation comment for core/structure/providers/AssetProvider.ts.
 */

import Identifier from "../Identifier";
import Registries from "../Registries";
import Registry from "../Registry";
import Asset from "../assets/Asset";
import ImageAsset from "../assets/ImageAsset";
import VideoAsset from "../assets/VideoAsset";
import SoundAsset from "../assets/SoundAsset";
import FontAsset from "../assets/FontAsset";
import ObjectAsset from "../assets/ObjectAsset";

const assetUrlMap = new Map<string, string>();

/**
 * AssetProvider
 *
 * Class for the engine.
 */
export default class AssetProvider {
    private static cache: Map<string, Asset> = new Map();
    private static readonly urlBase: string = "script/game/";

    public static async loadAsset(id: Identifier): Promise<Asset> {
        const key = id.toString();
        if (this.cache.has(key)) {
            return this.cache.get(key)!;
        }

        const url = assetUrlMap.get(key) ?? (this.urlBase + id.namespace + "/assets/" + id.name);
        const asset = this.createAsset(id, url);
        await this.preloadAsset(asset);

        this.cache.set(key, asset);
        Registry.get(Registries.ASSET).set(id, asset);
        return asset;
    }

    public static getAsset<A extends Asset>(id: Identifier): A {
        const key = id.toString();
        if (!this.cache.has(key)) {
            throw new Error(`Asset with id ${id} not loaded. Call loadAsset() first.`);
        }
        return this.cache.get(key)! as A;
    }

    public static hasAsset(id: Identifier): boolean {
        return this.cache.has(id.toString());
    }

    private static createAsset(id: Identifier, url: string): Asset {
        const extension = id.name.split(".").pop()?.toLowerCase();
        if (!extension) {
            throw new Error(`Unable to determine asset type for '${id}'.`);
        }

        if (["png", "jpg", "jpeg", "gif", "webp", "svg", "ico"].includes(extension)) {
            return new ImageAsset(id, url);
        }
        if (["mp4", "webm", "ogg"].includes(extension)) {
            return new VideoAsset(id, url);
        }
        if (["mp3", "wav", "ogg", "aac", "flac"].includes(extension)) {
            return new SoundAsset(id, url);
        }
        if (["ttf", "woff", "woff2", "otf", "eot"].includes(extension)) {
            return new FontAsset(id, url);
        }
        if (["json"].includes(extension)) {
            return new ObjectAsset(id, url);
        }

        throw new Error(`Unsupported asset format '${extension}' for '${id}'.`);
    }

    private static async preloadAsset(asset: Asset): Promise<void> {
        if (asset instanceof ImageAsset) {
            await asset.load();
            return;
        }
        if (asset instanceof VideoAsset) {
            await asset.load();
            return;
        }
        if (asset instanceof ObjectAsset) {
            await asset.load();
            return;
        }
        if (asset instanceof SoundAsset) {
            return;
        }
    }
}