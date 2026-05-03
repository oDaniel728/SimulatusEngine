import Identifier from "core/structure/Identifier";
import AssetProvider from "core/structure/providers/AssetProvider";
import BaseLoader from "../BaseLoader";
import ImageAsset from "core/structure/assets/ImageAsset";
import Asset from "core/structure/assets/Asset";

export default class BaseAssetProvider {
    public static async ICON() {
        return await this.load<ImageAsset>("textures/icon.ico");
    }

    public static async load<A extends Asset>(path: string): Promise<A> {
        const id = Identifier.of(BaseLoader.ID, path);
        BaseLoader.LOGGER.info(`Loading ${id.toString()}`);
        const asset = await AssetProvider.loadAsset(id);
        BaseLoader.LOGGER.info(`Finished loading ${id.toString()}`);
        return AssetProvider.getAsset<A>(id);
    }

    public static async register(): Promise<void> {
        BaseLoader.LOGGER.info("Registering base assets...");
    }
    public static async after(): Promise<void> {
        BaseLoader.LOGGER.info("Setting document favicon...");
        BaseLoader.BOARD.setDocumentFavicon(await this.ICON());
        BaseLoader.LOGGER.info("Finished setting document favicon.");
    }
}