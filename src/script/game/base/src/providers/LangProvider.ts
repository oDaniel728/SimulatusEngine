import Identifier from "@simulatus/structure/Identifier";
import LanguageProvider from "@simulatus/structure/providers/LanguageProvider";
import BaseLoader from "../BaseLoader";
import Registries from "@simulatus/structure/Registries";
import Registry from "@simulatus/structure/Registry";

export default class LangProvider extends LanguageProvider {
    public static registerLang(id: Identifier, data: Record<string, string> = {}): void {
        BaseLoader.LOGGER.info(`Registering language: ${id}`);
    }
    public static async register(): Promise<void> {
        BaseLoader.LOGGER.info("Registering languages...");
        this.registerLanguage("en_us");
        this.registerLanguage("pt_br");
        await this.loadLanguages(BaseLoader.ID);
    }
}