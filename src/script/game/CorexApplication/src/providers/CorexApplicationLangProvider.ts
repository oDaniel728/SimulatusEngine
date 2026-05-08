import LanguageProvider from "core/structure/providers/LanguageProvider";
import Registerable from "core/structure/Registerable";
import CorexApplicationLoader from "../CorexApplicationLoader";

export default class CorexApplicationLangProvider extends LanguageProvider implements Registerable {
    public static async register(): Promise<void> {
        CorexApplicationLoader.LOGGER.info("Registering languages...");
        this.registerLanguage("en_us");
        this.registerLanguage("pt_br");
        await this.loadLanguages(CorexApplicationLoader.ID);
    }
}
