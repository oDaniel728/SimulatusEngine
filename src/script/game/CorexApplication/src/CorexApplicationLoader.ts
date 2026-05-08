import Identifier from "core/structure/Identifier";
import Logger from "core/structure/Logger";
import Text from "core/elements/Text";
import CorexApplicationLangProvider from "./providers/CorexApplicationLangProvider";
import CorexApplicationBoard from "./CorexApplicationBoard";
import Loader from "core/structure/Loader";
import BoardElement from "core/engine/BoardElement";
import CorexApplicationSession from "./CorexApplicationSession";

export default class CorexApplicationLoader extends Loader {
    public static readonly ID = "corex-application";
    public static readonly LOGGER = new Logger(this.ID);
    public static BOARD = new CorexApplicationBoard();

    public static readonly SESSION = new CorexApplicationSession();

    public static async main(): Promise<void> {
        this.LOGGER.info("Loaded main function called.");
        
        await CorexApplicationLangProvider.useLanguage("en_us");
        this.SESSION.load();

        this.LOGGER.info(Text.translatable(Identifier.of(this.ID, "hello_world")));
    }

    public static appendChild<E extends BoardElement>(child: E): E {
        this.BOARD.appendChild(child);
        this.LOGGER.info("Appended child:", child.toString());
        return child;
    }
}
