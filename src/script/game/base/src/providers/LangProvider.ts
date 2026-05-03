import Identifier from "@simulatus/structure/Identifier";
import LanguageProvider from "@simulatus/structure/providers/LanguageProvider";
import BaseLoader from "../BaseLoader";
import Registerable from "@simulatus/structure/Registerable";

export default class LangProvider extends LanguageProvider implements Registerable {
    public static async register(): Promise<void> {
        BaseLoader.LOGGER.info("Registering languages...");
        this.registerLanguage("en_us");
        this.registerLanguage("pt_br");
        await this.loadLanguages(BaseLoader.ID);
    }
}