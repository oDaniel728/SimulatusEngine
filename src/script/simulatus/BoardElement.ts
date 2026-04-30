import * as CSS from "csstype";
import BoardDOMEvents from "./BoardDOMEvents";

export default class BoardElement<E extends HTMLElement = HTMLElement> {
    private el: E;
    public events: BoardDOMEvents;

    constructor();
    constructor(board: E);
    constructor(board?: E) {
        if (board === undefined) {
            this.el = document.createElement("div") as unknown as E;
        } else {
            this.el = board;
        }

        this.events = new BoardDOMEvents(this);

        this.initOnLoop();
    }

    public getElement(): E {
        return this.el;
    }

    protected wrap<T extends HTMLElement>(element: T): BoardElement<T> {
        return new BoardElement<T>(element);
    }

    protected unwrap(element: HTMLElement | BoardElement<HTMLElement>): HTMLElement {
        return element instanceof BoardElement ? element.getElement() : element;
    }

    public getParent(): BoardElement<HTMLElement> | null {
        const parentElement = this.el.parentElement;
        return parentElement ? this.wrap(parentElement) : null;
    }

    public getAncestors(): Set<BoardElement<HTMLElement>> {
        const ancestors = new Set<BoardElement<HTMLElement>>();
        let currentElement: HTMLElement | null = this.el;
        while (currentElement) {
            ancestors.add(this.wrap(currentElement));
            currentElement = currentElement.parentElement;
        }
        return ancestors;
    }

    public clear(): void {
        this.el.innerHTML = "";
    }

    public getElementFromPath(selector: string): BoardElement<HTMLElement> | null {
        const path = selector.split(".").map(part => part.trim()).filter(part => part.length > 0);
        let currentElement: HTMLElement | null = this.el;
        for (const part of path) {
            if (currentElement === null) {
                return null;
            }
            currentElement = currentElement.querySelector(part);
        }
        return currentElement ? this.wrap(currentElement) : null;
    }

    public appendChild(child: HTMLElement | BoardElement<HTMLElement>, id?: string, classes?: string[]): void {
        const childElement = this.unwrap(child);
        if (id) {
            childElement.id = id;
        }
        if (classes) {
            childElement.classList.add(...classes);
        }
        this.el.appendChild(childElement);
    }

    public removeChild(child: HTMLElement | BoardElement<HTMLElement>): void {
        this.el.removeChild(this.unwrap(child));
    }

    public getChildren(): Set<BoardElement<HTMLElement>> {
        return new Set(Array.from(this.el.children).filter((child): child is HTMLElement => child instanceof HTMLElement).map(child => this.wrap(child)));
    }

    public hasChild(child: HTMLElement | BoardElement<HTMLElement>): boolean {
        return this.el.contains(this.unwrap(child));
    }

    public forEachChild(callback: (child: BoardElement<HTMLElement>) => void): void {
        this.getChildren().forEach(callback);
    }

    public getChildById(id: string): BoardElement<HTMLElement> | null {
        const child = this.el.querySelector(`#${id}`);
        return child instanceof HTMLElement ? this.wrap(child) : null;
    }

    public getChildByClass(className: string): Set<BoardElement<HTMLElement>> {
        return new Set(Array.from(this.el.getElementsByClassName(className)).filter((child): child is HTMLElement => child instanceof HTMLElement).map(child => this.wrap(child)));
    }

    public getChildByTag(tagName: string): Set<BoardElement<HTMLElement>> {
        return new Set(Array.from(this.el.getElementsByTagName(tagName)).filter((child): child is HTMLElement => child instanceof HTMLElement).map(child => this.wrap(child)));
    }

    public getChildFromQuerySelection(selector: string): Set<BoardElement<HTMLElement>> {
        return new Set(Array.from(this.el.querySelectorAll(selector)).filter((child): child is HTMLElement => child instanceof HTMLElement).map(child => this.wrap(child)));
    }

    public getDescendants(): Set<BoardElement<HTMLElement>> {
        return new Set(Array.from(this.el.querySelectorAll("*")).filter((child): child is HTMLElement => child instanceof HTMLElement).map(child => this.wrap(child)));
    }

    public replaceChild(newChild: HTMLElement | BoardElement<HTMLElement>, oldChild: HTMLElement | BoardElement<HTMLElement>): void {
        this.el.replaceChild(this.unwrap(newChild), this.unwrap(oldChild));
    }

    public setStyleProperty<K extends keyof CSS.Properties>(property: K, value: CSS.Properties[K]): void {
        //@ts-ignore
        this.el.style[property] = value;
    }

    public setStyleVariable(variable: string, value: string): void {
        this.el.style.setProperty(`--${variable}`, value);
    }

    public overrideStyle(style: Partial<CSS.Properties>): void {
        for (const [property, value] of Object.entries(style)) {
            //@ts-ignore
            this.el.style[property] = value;
        }
    }

    public getStyleProperty<K extends keyof CSS.Properties>(property: K): CSS.Properties[K] {
        //@ts-ignore
        return this.el.style[property];
    }

    public getStyleVariable(variable: string): string {
        return this.el.style.getPropertyValue(`--${variable}`);
    }

    public getStyle(): CSS.Properties {
        return this.el.style as CSS.Properties;
    }

    public get style(): CSS.Properties {
        return this.getStyle();
    }
    public set style(style: CSS.Properties) {
        this.overrideStyle(style);
    }
    
    public applyStyles(styles: Partial<CSS.Properties>): void {
        this.overrideStyle(styles);
    }
    public removeStyles(): void {
        this.el.removeAttribute("style");
    }

    public applyClass(...classNames: string[]): void {
        this.el.classList.add(...classNames);
    }

    public removeClass(...classNames: string[]): void {
        this.el.classList.remove(...classNames);
    }

    public toggleClass(className: string): void {
        this.el.classList.toggle(className);
    }

    public setParent(parent: BoardElement<HTMLElement>): void {
        parent.appendChild(this.el);
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void {
        this.el.addEventListener(type, listener);
    }

    public removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void {
        this.el.removeEventListener(type, listener);
    }

    protected onLoop(): void {}

    private initOnLoop(): void {
        this.onLoop();
        [...this.events.listenersOfLoop].forEach((v) => { v(); });

        setTimeout(this.initOnLoop.bind(this), 1000 / 60); // 60 FPS
    }
    
}