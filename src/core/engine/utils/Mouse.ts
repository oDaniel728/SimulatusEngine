/**
 * Mouse.ts
 *
 * Auto-generated documentation comment for core/engine/utils/Mouse.ts.
 */

import BoardElement from "../BoardElement";
import Vector2 from "../game/Vector2";
import EventList from "./EventList";
import * as CSS from "csstype";

type StylableHTMLElement = { style: CSS.Properties };
type hasElement = { getElement(): HTMLElement };

/**
 * Mouse
 *
 * Class for the engine.
 */
export default class Mouse {

    public static readonly Util = class {
        public static isInsideOfBoardElement(bel: BoardElement): boolean {
            const rect = bel.getElement().getBoundingClientRect();
            const mousePos = Mouse.getMousePosition();
            return (
                mousePos.x >= rect.left &&
                mousePos.x <= rect.right &&
                mousePos.y >= rect.top &&
                mousePos.y <= rect.bottom
            );
        }
        public static isInsideOfElement(element: hasElement | HTMLElement): boolean {
            if ("getElement" in element) {
                element = element.getElement();
            }
            const rect = element.getBoundingClientRect();
            const mousePos = Mouse.getMousePosition();
            return (
                mousePos.x >= rect.left &&
                mousePos.x <= rect.right &&
                mousePos.y >= rect.top &&
                mousePos.y <= rect.bottom
            );
        }
    }

    public static readonly BUTTON = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    }

    protected static position: Vector2 = new Vector2(0, 0);
    public static whenMoved = new EventList<(delta: Vector2) => void>();
    public static whenScrolled = new EventList<(delta: Vector2, event: WheelEvent) => void>();

    public static button1Pressed: boolean = false;
    public static get leftButtonPressed(): boolean {
        return this.button1Pressed;
    }

    public static button2Pressed: boolean = false;
    public static get middleButtonPressed(): boolean {
        return this.button2Pressed;
    }

    public static button3Pressed: boolean = false;
    public static get rightButtonPressed(): boolean {
        return this.button3Pressed;
    }

    public static whenButtonPressed = new EventList<(button: number) => void>();
    public static whenButtonReleased = new EventList<(button: number) => void>();

    public static whenButton1Pressed = new EventList<() => void>();
    public static whenButton1Released = new EventList<() => void>();

    public static whenButton2Pressed = new EventList<() => void>();
    public static whenButton2Released = new EventList<() => void>();

    public static whenButton3Pressed = new EventList<() => void>();
    public static whenButton3Released = new EventList<() => void>();

    public static init(): void {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("wheel", this.onMouseWheel.bind(this), { passive: true });
        window.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
        window.addEventListener("contextmenu", (event) => event.preventDefault());
        this.position = new Vector2(0, 0);
    }

    private static onMouseMove(event: MouseEvent): void {
        const old = new Vector2(this.position.x, this.position.y);

        this.whenMoved.trigger(new Vector2(
            event.clientX - old.x,
            event.clientY - old.y
        ));

        this.position.x = event.clientX;
        this.position.y = event.clientY;
    }

    private static onMouseWheel(event: WheelEvent): void {
        this.whenScrolled.trigger(new Vector2(event.deltaX, event.deltaY), event);
    }

    private static onMouseDown(event: MouseEvent): void {
        this.position.x = event.clientX;
        this.position.y = event.clientY;

        if (event.button === 0 || event.button === 1 || event.button === 2) {
            event.preventDefault();
        }

        this.whenButtonPressed.trigger(event.button);
        switch (event.button) {
            case 0:
                this.button1Pressed = true;
                this.whenButton1Pressed.trigger();
                break;
            case 1:
                this.button2Pressed = true;
                this.whenButton2Pressed.trigger();
                break;
            case 2:
                this.button3Pressed = true;
                this.whenButton3Pressed.trigger();
                break;
        }
    }

    private static onMouseUp(event: MouseEvent): void {
        if (event.button === 0 || event.button === 1 || event.button === 2) {
            event.preventDefault();
        }

        this.whenButtonReleased.trigger(event.button);
        switch (event.button) {
            case 0:
                this.button1Pressed = false;
                this.whenButton1Released.trigger();
                break;
            case 1:
                this.button2Pressed = false;
                this.whenButton2Released.trigger();
                break;
            case 2:
                this.button3Pressed = false;
                this.whenButton3Released.trigger();
                break;
        }
    }

    public static isLocked(): boolean {
        return document.pointerLockElement !== null;
    }
    public static getMousePosition(relativeTo?: hasElement | HTMLElement): Vector2 {
        const position = this.position.clone();
        if (relativeTo && "getElement" in relativeTo) {
            relativeTo = relativeTo.getElement();
        }
        if (!relativeTo) {
            return position;
        }

        const rect = relativeTo.getBoundingClientRect();
        return position.subtract(new Vector2(rect.left, rect.top));
    }

    public static lock(element: hasElement | HTMLElement): void {
        if ("getElement" in element) {
            element.getElement().requestPointerLock();
            return;
        }
        element.requestPointerLock();
    }
    public static unlock(): void {
        document.exitPointerLock();
    }
    public static hideCursor(element: StylableHTMLElement | HTMLElement): void {
        element.style.cursor = "none";
    }
    public static showCursor(element: StylableHTMLElement | HTMLElement): void {
        element.style.cursor = "";
    }

    public static whenMouseEnters(element: hasElement | HTMLElement, callback: () => void): void {
        if ("getElement" in element) {
            element = element.getElement();
        }
        const handleMouseMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            if (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            ) {
                callback();
                window.removeEventListener("mousemove", handleMouseMove);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
    }
    public static whenMouseLeaves(element: hasElement | HTMLElement, callback: () => void): void {
        if ("getElement" in element) {
            element = element.getElement();
        }
        const handleMouseMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            if (
                mouseX < rect.left ||
                mouseX > rect.right ||
                mouseY < rect.top ||
                mouseY > rect.bottom
            ) {
                callback();
                window.removeEventListener("mousemove", handleMouseMove);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
    }
    public static whenMouseMovesInside(element: hasElement | HTMLElement, callback: (delta: Vector2) => void): void {
        if ("getElement" in element) {
            element = element.getElement();
        }
        let lastPosition: Vector2 | null = null;
        const handleMouseMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            if (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            ) {
                const currentPosition = new Vector2(mouseX, mouseY);
                if (lastPosition) {
                    const delta = currentPosition.subtract(lastPosition);
                    callback(delta);
                }
                lastPosition = currentPosition;
            } else {
                lastPosition = null;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
    }
    public static whenMouseClicksInside(element: hasElement | HTMLElement, callback: (event: MouseEvent) => void): void {
        if ("getElement" in element) {
            element = element.getElement();
        }
        const handleClick = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            if (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            ) {
                callback(event);
            }
        };
        window.addEventListener("click", handleClick);
    }
    public static whenMouseRightClicksInside(element: hasElement | HTMLElement, callback: (event: MouseEvent) => void): void {
        if ("getElement" in element) {
            element = element.getElement();
        }
        const handleContextMenu = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            if (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            ) {
                event.preventDefault();
                callback(event);
            }
        };
        window.addEventListener("contextmenu", handleContextMenu);
    }
    public static clearEventsOfElement(element: hasElement | HTMLElement): void {
        if ("getElement" in element) {
            element = element.getElement();
        }
        const clone = element.cloneNode(true) as HTMLElement;
        element.parentNode?.replaceChild(clone, element);
    }
}