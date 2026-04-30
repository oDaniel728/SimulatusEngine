import BaseDOMLoader from "./script/game/base/src/BaseDOMLoader";
import BaseLoader from "./script/game/base/src/BaseLoader";
import "./styles/main.scss";

async function main(): Promise<void> {
    console.log("Hello, Simulatus Engine!");
    await BaseLoader.main();

    window.addEventListener("load", async () => {
        await BaseDOMLoader.main();
    });
}

main();