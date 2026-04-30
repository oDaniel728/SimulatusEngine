import "../styles/main.scss";
import Animation from "./simulatus/Animation";
import Board from "./simulatus/Board";
import Shape2 from "./simulatus/game/Shape2";

class Cube extends Shape2 {
    constructor() {
        super();
        
        this.area.x = 100;
        this.area.y = 100;

        this.area.w = 100;
        this.area.h = 100;

        this.color = "red";
    }
}

class RotateAnimation extends Animation {
    constructor() {
        super("rotate");
        this.addTimestamp(0, {
            transform: "rotate(0deg)"
        });
        this.addTimestamp(100, {
            transform: "rotate(360deg)"
        });
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
    const rotateAnim = new RotateAnimation();
    root.applyAnimation(rotateAnim);

    const cube = new Cube();
    cube.setParent(root);

    root.events.onLoop(() => {
        const keysPressed = root.events.keysPressed;
        if (keysPressed.has("ArrowUp") || keysPressed.has("w"))
            cube.pos.up(10);
        else if (keysPressed.has("ArrowDown") || keysPressed.has("s"))
            cube.pos.down(10);
        if (keysPressed.has("ArrowLeft") || keysPressed.has("a"))
            cube.pos.left(10);
        else if (keysPressed.has("ArrowRight") || keysPressed.has("d"))
            cube.pos.right(10);
    });
    root.events.onKeyDown(ev => {
        if (ev.code.toLowerCase() === "space") {
            cube.playAnimation(rotateAnim)
        }
    });
}

document.addEventListener("DOMContentLoaded", init);