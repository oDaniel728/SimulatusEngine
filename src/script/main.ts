import "../styles/main.scss";
import Board from "./simulatus/Board";
import BoardElement from "./simulatus/BoardElement";
import { changeDocumentCSSVariable, changeElementCSSProperty, changeElementCSSVariable, forEachElementWithClass } from "./simulatus/utils/elementUtils";

forEachElementWithClass(":game-title", $ => {
    $.textContent = "Simulatus Engine";
});

class Cube extends BoardElement {
    public x: number = 100;
    public y: number = 100;

    constructor() {
        super();
        this.removeStyles();
        this.style.position = "absolute";
        this.style.top = `${this.y}px`;
        this.style.left = `${this.x}px`;
        this.style.width = "100px";
        this.style.height = "100px";
        this.style.backgroundColor = "#ff0000";
        this.style.border = 0;
    }

    protected onLoop(): void {
        this.style.top = `${this.y}px`;
        this.style.left = `${this.x}px`;
    }
}

class GameBoard extends Board {
    constructor() {
        super("#root");
        this.style.overflow = "hidden";
        this.setDocumentTitle("Simulatus Engine");
    }
}

function init() {
    const root = new GameBoard();

    const cube = new Cube();
    cube.setParent(root);

    root.events.onLoop(() => {
        const keysPressed = root.events.keysPressed;
        if (keysPressed.has("ArrowUp") || keysPressed.has("w"))
            cube.y -= 10;
        else if (keysPressed.has("ArrowDown") || keysPressed.has("s"))
            cube.y += 10;
        if (keysPressed.has("ArrowLeft") || keysPressed.has("a"))
            cube.x -= 10;
        else if (keysPressed.has("ArrowRight") || keysPressed.has("d"))
            cube.x += 10;
    });
}

document.addEventListener("DOMContentLoaded", init);