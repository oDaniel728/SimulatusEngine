import "../styles/main.scss";
import { forEachElementWithClass } from "./simulatus/utils/elementUtils";

forEachElementWithClass(":game-title", $ => {
    $.textContent = "Simulatus Engine";
});
