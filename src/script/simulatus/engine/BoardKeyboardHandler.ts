import BoardElement from "./BoardElement";
import Key from "./utils/Key";

export default class BoardKeyboardHandler {

    protected keysPressed: Set<string> = new Set();

    constructor(bel?: BoardElement) {
        if (bel) {
            this.hook(bel.getElement());
        }
    }

    public isPressing(...keys: (string | Key)[]): boolean {
        return keys.every(key => this.keysPressed.has(key));
    }

    protected onKeyDown(event: KeyboardEvent): void {
        this.keysPressed.add(event.key);
    }

    protected onKeyUp(event: KeyboardEvent): void {
        this.keysPressed.delete(event.key);
    }

    protected hook(element: HTMLElement): void {
        element.addEventListener("keydown", this.onKeyDown);
        element.addEventListener("keyup", this.onKeyUp);
    }
}