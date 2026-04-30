import Text from "@simulatus/elements/Text";
import Identifier from "@simulatus/structure/Identifier";
import Logger from "@simulatus/structure/Logger";
import LangProvider from "./providers/LangProvider";
import BaseBoard from "./BaseBoard";

export default class BaseLoader {
    public static readonly ID = "base";
    public static readonly LOGGER = new Logger(this.ID);
    public static readonly BOARD = new BaseBoard();

    public static async main(): Promise<void> {
        this.LOGGER.info("Loaded main function called.");
        await LangProvider.register();
        await LangProvider.useLanguage("pt_br");
        this.LOGGER.info(Text.translatable(Identifier.of(this.ID, "text")));
    }
}