import { StandardLonghandPropertiesHyphen } from "csstype";
import StyleClass from "./StyleClass";
import BoardElement from "../BoardElement";

export type CSSLikeProperties = StandardLonghandPropertiesHyphen;
export type HasSomeHTMLElement = { getElement() : HTMLElement }

export default class StyleManager {

    private static get styleClassInstances() {
        return StyleClass.getInstances();
    }
    public static getInstances(): Set<StyleClass> {
        return this.styleClassInstances;
    }

    public static updateAll(): void {
        this.styleClassInstances.forEach(instance => instance.update());
    }

    public static createClass(className: string, properties: CSSLikeProperties): StyleClass {
        const cls = new StyleClass(className, properties);
        return cls;
    }

    public static applyClass(element: HTMLElement | HasSomeHTMLElement, styleClass: StyleClass): void {
        const el = element instanceof HTMLElement ? element : element.getElement();
        el.classList.add(styleClass.className);
    }
}