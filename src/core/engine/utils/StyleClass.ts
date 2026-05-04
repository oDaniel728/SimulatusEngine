import { Properties } from "csstype";
import Applier from "../appliers/Applier";
import BoardApplier from "../appliers/BoardApplier";
import BoardElement from "../BoardElement";
import { CSSLikeProperties } from "./StyleManager";

export default class StyleClass implements BoardApplier {
    public readonly className: string;
    protected properties: CSSLikeProperties;
    public readonly styleEl: HTMLStyleElement;
    public static set StyleElement(el: HTMLStyleElement) {
        this.lastStyleTag = el;
    }
    private elementsWithClass: Set<BoardElement> = new Set();
    private static Instances: Set<StyleClass> = new Set();
    protected static lastStyleTag: HTMLStyleElement | null = null;

    public static getInstances(): Set<StyleClass> {
        return this.Instances;
    }
    public static updateAll(): void {
        const content = new Set<String>();
        this.Instances.forEach(instance => {
            content.add(instance.toString());
        });
        if (this.lastStyleTag) {
            this.lastStyleTag.innerHTML = Array.from(content).join("\n");
        }
    }

    public getElement(): HTMLStyleElement {
        return this.styleEl;
    }

    constructor();
    constructor(properties: CSSLikeProperties);
    constructor(className: string, properties: CSSLikeProperties);
    constructor(className: string, properties: CSSLikeProperties);

    constructor(className?: string | CSSLikeProperties, properties?: CSSLikeProperties) {
        if (!StyleClass.lastStyleTag) {
            StyleClass.lastStyleTag = document.createElement("style");
            this.styleEl = StyleClass.lastStyleTag;
            document.head.appendChild(StyleClass.lastStyleTag);
        }
        this.className = typeof className === "string" ? className : "";
        this.properties = {};
        if (!className) {
            this.className = `style-class-${Math.random().toString(36).substr(2, 9)}`;
        } else if (typeof className === "object") {
            this.properties = className;
        } else if (properties) {
            this.properties = properties;
        }
        this.styleEl = StyleClass.lastStyleTag!;
        this.update();
        StyleClass.Instances.add(this);
    }

    applyToBoardElement(element: BoardElement): void {
        this.elementsWithClass.add(element);
        element.getElement().classList.add(this.className);
    }

    public update(): void {
        StyleClass.updateAll();
    }

    public toString(): string {
        const cssProperties = Object.entries(this.properties)
            .map(([key, value]) => `${key}: ${value};`)
            .join(" ");
        return `.${this.className} { ${cssProperties} }`;
    }

    public getProperties(): CSSLikeProperties {
        return {...this.properties};
    }
    
    public setProperties(newProperties: CSSLikeProperties): void {
        this.properties = newProperties;
        this.update();
    }

    public getProperty<K extends keyof CSSLikeProperties>(propertyName: K): CSSLikeProperties[K] {
        return this.properties[propertyName];
    }

    public setProperty<K extends keyof CSSLikeProperties>(propertyName: K, value: CSSLikeProperties[K]): void {
        this.properties[propertyName] = value;
        this.update();
    }

    public remove(element: BoardElement): void {
        this.elementsWithClass.delete(element);
        element.getElement().classList.remove(this.className);
    }
}