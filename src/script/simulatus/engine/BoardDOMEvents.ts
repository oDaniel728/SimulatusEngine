import BoardElement from "../BoardElement";

export default class BoardDOMEvents {
    private board: BoardElement<HTMLElement>;
    public keysPressed: Set<string> = new Set();
    public listenersOfLoop: Set<() => void> = new Set();

    constructor(board: BoardElement<HTMLElement>) {
        this.board = board;

        this.onKeyDown((ev) => {
            this.keysPressed.add(ev.key);
        });

        this.onKeyUp((ev) => {
            this.keysPressed.delete(ev.key);
        });
    }

    public onLoad(listener: () => void): void {
        window.addEventListener("load", listener);
    }
    public offLoad(listener: () => void): void {
        window.removeEventListener("load", listener);
    }

    public onLoop(listener: () => void): void {
        this.listenersOfLoop.add(listener);
    }
    public offLoop(listener: () => void): void {
        this.listenersOfLoop.delete(listener);
    }

    public onExit(listener: () => void): void {
        window.addEventListener("beforeunload", listener);
    }
    public offExit(listener: () => void): void {
        window.removeEventListener("beforeunload", listener);
    }

    public onClick(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().addEventListener("click", listener);
    }
    public offClick(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().removeEventListener("click", listener);
    }
    public onceClick(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().addEventListener("click", listener, { once: true });
    }
    public onClickCapture(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().addEventListener("click", listener, true);
    }

    public onMouseMove(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().addEventListener("mousemove", listener);
    }
    public offMouseMove(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().removeEventListener("mousemove", listener);
    }
    public onceMouseMove(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().addEventListener("mousemove", listener, { once: true });
    }

    public onMouseDown(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().addEventListener("mousedown", listener);
    }
    public offMouseDown(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().removeEventListener("mousedown", listener);
    }

    public onMouseUp(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().addEventListener("mouseup", listener);
    }
    public offMouseUp(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().removeEventListener("mouseup", listener);
    }

    public onKeyDown(listener: (this: HTMLElement, ev: KeyboardEvent) => any): void {
        window.addEventListener("keydown", listener as EventListener);
    }
    public offKeyDown(listener: (this: HTMLElement, ev: KeyboardEvent) => any): void {
        window.removeEventListener("keydown", listener as EventListener);
    }

    public onKeyUp(listener: (this: HTMLElement, ev: KeyboardEvent) => any): void {
        window.addEventListener("keyup", listener as EventListener);
    }
    public offKeyUp(listener: (this: HTMLElement, ev: KeyboardEvent) => any): void {
        window.removeEventListener("keyup", listener as EventListener);
    }

    public onWheel(listener: (this: HTMLElement, ev: WheelEvent) => any): void {
        this.board.getElement().addEventListener("wheel", listener);
    }
    public offWheel(listener: (this: HTMLElement, ev: WheelEvent) => any): void {
        this.board.getElement().removeEventListener("wheel", listener);
    }

    public onResize(listener: (this: HTMLElement, ev: UIEvent) => any): void {
        // window resize listens on window
        // @ts-ignore
        window.addEventListener("resize", listener);
    }
    public offResize(listener: (this: HTMLElement, ev: UIEvent) => any): void {
        // @ts-ignore
        window.removeEventListener("resize", listener);
    }
    public onceResize(listener: (this: HTMLElement, ev: UIEvent) => any): void {
        // @ts-ignore
        window.addEventListener("resize", listener, { once: true });
    }

    public onAnimationEnd(listener: (this: HTMLElement, ev: AnimationEvent) => any): void {
        this.board.getElement().addEventListener("animationend", listener);
    }
    public offAnimationEnd(listener: (this: HTMLElement, ev: AnimationEvent) => any): void {
        this.board.getElement().removeEventListener("animationend", listener);
    }

    public onTransitionEnd(listener: (this: HTMLElement, ev: TransitionEvent) => any): void {
        this.board.getElement().addEventListener("transitionend", listener);
    }
    public offTransitionEnd(listener: (this: HTMLElement, ev: TransitionEvent) => any): void {
        this.board.getElement().removeEventListener("transitionend", listener);
    }

    public onInput(listener: (this: HTMLElement, ev: InputEvent) => any): void {
        this.board.getElement().addEventListener("input", listener);
    }
    public offInput(listener: (this: HTMLElement, ev: InputEvent) => any): void {
        this.board.getElement().removeEventListener("input", listener);
    }

    public onChange(listener: (this: HTMLElement, ev: Event) => any): void {
        this.board.getElement().addEventListener("change", listener);
    }
    public offChange(listener: (this: HTMLElement, ev: Event) => any): void {
        this.board.getElement().removeEventListener("change", listener);
    }

    public onFocus(listener: (this: HTMLElement, ev: FocusEvent) => any): void {
        this.board.getElement().addEventListener("focus", listener);
    }
    public offFocus(listener: (this: HTMLElement, ev: FocusEvent) => any): void {
        this.board.getElement().removeEventListener("focus", listener);
    }

    public onBlur(listener: (this: HTMLElement, ev: FocusEvent) => any): void {
        this.board.getElement().addEventListener("blur", listener);
    }
    public offBlur(listener: (this: HTMLElement, ev: FocusEvent) => any): void {
        this.board.getElement().removeEventListener("blur", listener);
    }

    public onContextMenu(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().addEventListener("contextmenu", listener);
    }
    public offContextMenu(listener: (this: HTMLElement, ev: MouseEvent) => any): void {
        this.board.getElement().removeEventListener("contextmenu", listener);
    }

    public onDrag(listener: (this: HTMLElement, ev: DragEvent) => any): void {
        this.board.getElement().addEventListener("drag", listener);
    }
    public offDrag(listener: (this: HTMLElement, ev: DragEvent) => any): void {
        this.board.getElement().removeEventListener("drag", listener);
    }

    public onDrop(listener: (this: HTMLElement, ev: DragEvent) => any): void {
        this.board.getElement().addEventListener("drop", listener);
    }
    public offDrop(listener: (this: HTMLElement, ev: DragEvent) => any): void {
        this.board.getElement().removeEventListener("drop", listener);
    }

    public onScroll(listener: (this: HTMLElement, ev: Event) => any): void {
        this.board.getElement().addEventListener("scroll", listener);
    }
    public offScroll(listener: (this: HTMLElement, ev: Event) => any): void {
        this.board.getElement().removeEventListener("scroll", listener);
    }

    public onTouchStart(listener: (this: HTMLElement, ev: TouchEvent) => any): void {
        this.board.getElement().addEventListener("touchstart", listener);
    }
    public offTouchStart(listener: (this: HTMLElement, ev: TouchEvent) => any): void {
        this.board.getElement().removeEventListener("touchstart", listener);
    }

    public onTouchMove(listener: (this: HTMLElement, ev: TouchEvent) => any): void {
        this.board.getElement().addEventListener("touchmove", listener);
    }
    public offTouchMove(listener: (this: HTMLElement, ev: TouchEvent) => any): void {
        this.board.getElement().removeEventListener("touchmove", listener);
    }

    public onTouchEnd(listener: (this: HTMLElement, ev: TouchEvent) => any): void {
        this.board.getElement().addEventListener("touchend", listener);
    }
    public offTouchEnd(listener: (this: HTMLElement, ev: TouchEvent) => any): void {
        this.board.getElement().removeEventListener("touchend", listener);
    }

    public onTouchCancel(listener: (this: HTMLElement, ev: TouchEvent) => any): void {
        this.board.getElement().addEventListener("touchcancel", listener);
    }
    public offTouchCancel(listener: (this: HTMLElement, ev: TouchEvent) => any): void {
        this.board.getElement().removeEventListener("touchcancel", listener);
    }

    public onPointerDown(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().addEventListener("pointerdown", listener);
    }
    public offPointerDown(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().removeEventListener("pointerdown", listener);
    }

    public onPointerMove(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().addEventListener("pointermove", listener);
    }
    public offPointerMove(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().removeEventListener("pointermove", listener);
    }

    public onPointerUp(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().addEventListener("pointerup", listener);
    }
    public offPointerUp(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().removeEventListener("pointerup", listener);
    }

    public onPointerCancel(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().addEventListener("pointercancel", listener);
    }
    public offPointerCancel(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().removeEventListener("pointercancel", listener);
    }

    public onPointerOver(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().addEventListener("pointerover", listener);
    }
    public offPointerOver(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().removeEventListener("pointerover", listener);
    }

    public onPointerOut(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().addEventListener("pointerout", listener);
    }
    public offPointerOut(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().removeEventListener("pointerout", listener);
    }

    public onPointerEnter(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().addEventListener("pointerenter", listener);
    }
    public offPointerEnter(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().removeEventListener("pointerenter", listener);
    }

    public onPointerLeave(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().addEventListener("pointerleave", listener);
    }
    public offPointerLeave(listener: (this: HTMLElement, ev: PointerEvent) => any): void {
        this.board.getElement().removeEventListener("pointerleave", listener);
    }

}