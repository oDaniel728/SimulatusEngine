/**
 * LangProvider.ts
 *
 * Auto-generated documentation comment for script/game/base/src/providers/LangProvider.ts.
 */

import Identifier from "core/structure/Identifier";
import LanguageProvider from "core/structure/providers/LanguageProvider";
import BaseLoader from "../BaseLoader";
import Registerable from "core/structure/Registerable";

/**
 * LangProvider
 *
 * Class for the engine.
 */
export default class LangProvider extends LanguageProvider implements Registerable {
    public static async register(): Promise<void> {
        BaseLoader.LOGGER.info("Registering languages...");
        this.registerLanguage("en_us");
        this.registerLanguage("pt_br");
        await this.loadLanguages(BaseLoader.ID);
    }
}