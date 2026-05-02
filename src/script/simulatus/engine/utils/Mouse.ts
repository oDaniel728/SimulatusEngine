import Vector2 from "../game/Vector2";
import EventList from "./EventList";

export default class Mouse {
    protected static position: Vector2 = new Vector2(0, 0);
    public static whenMoved = new EventList<(delta: Vector2) => void>();
    public static whenScrolled = new EventList<(delta: Vector2, event: WheelEvent) => void>();

    public static init(): void {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("wheel", this.onMouseWheel.bind(this), { passive: true });
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

    public static isLocked(): boolean {
        return document.pointerLockElement !== null;
    }
    public static getMousePosition(relativeTo?: HTMLElement): Vector2 {
        const position = this.position.clone();
        if (!relativeTo) {
            return position;
        }

        const rect = relativeTo.getBoundingClientRect();
        return position.subtract(new Vector2(rect.left, rect.top));
    }

    public static lock(element: HTMLElement): void {
        element.requestPointerLock();
    }
    public static unlock(): void {
        document.exitPointerLock();
    }
    public static hideCursor(element: HTMLElement): void {
        element.style.cursor = "none";
    }
    public static showCursor(element: HTMLElement): void {
        element.style.cursor = "";
    }
}