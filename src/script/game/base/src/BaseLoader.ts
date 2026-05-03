import Text from "@simulatus/elements/Text";
import Identifier from "@simulatus/structure/Identifier";
import Logger from "@simulatus/structure/Logger";
import LangProvider from "./providers/LangProvider";
import BaseBoard from "./BaseBoard";
import Loader from "@simulatus/structure/Loader";
import BoardElement from "@simulatus/engine/BoardElement";
import BaseSession from "./BaseSession";

const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export default class BaseLoader extends Loader {
    public static readonly ID = "base";
    public static readonly LOGGER = new Logger(this.ID);
    public static BOARD = new BaseBoard();

    public static readonly SESSION = new BaseSession();

    public static async main(): Promise<void> {
        this.LOGGER.info("Loaded main function called.");

        await LangProvider.useLanguage("pt_br");
        this.SESSION.load();

        this.LOGGER.info(Text.translatable(Identifier.of(this.ID, "text")));
    }

    public static appendChild<E extends BoardElement>(child: E): E {
        this.BOARD.appendChild(child);
        this.LOGGER.info("Appended child:", child.toString());
        return child;
    }
}