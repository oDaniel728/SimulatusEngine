/**
 * BoardKeyboardHandler.ts
 *
 * Auto-generated documentation comment for core/engine/BoardKeyboardHandler.ts.
 */

import BoardElement from "./BoardElement";
import Key from "./utils/Key";

/**
 * BoardKeyboardHandler
 *
 * Class for the engine.
 */
export default class BoardKeyboardHandler {

    protected keysPressed: Set<string>;
    protected hooked: boolean = false;

    constructor(bel?: BoardElement) {
        this.keysPressed = new Set();
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.hook(document);
    }

    public isPressing(...keys: (string | Key)[]): boolean {
        for (const key of keys) {
            if (typeof key === "string") {
                if (this.keysPressed.has(key)) {
                    return true;
                }
            }
        }
        return false;
    }
    public isPressingAll(...keys: (string | Key)[]): boolean {
        for (const key of keys) {
            if (typeof key === "string") {
                if (!this.keysPressed.has(key)) {
                    return false;
                }
            }
        }
        return true;
    }

    protected onKeyDown(event: KeyboardEvent): void {
        this.keysPressed.add(event.code);
    }

    protected onKeyUp(event: KeyboardEvent): void {
        this.keysPressed.delete(event.code);
    }

    protected hook(element: HTMLElement | any): void {
        if (!this.hooked) {
            element.addEventListener("keydown", this.onKeyDown);
            element.addEventListener("keyup", this.onKeyUp);
            this.hooked = true;
        }
    }
}