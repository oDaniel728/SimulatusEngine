import BoardElement from "./BoardElement";
import Animation from "./Animation";

export default class Board extends BoardElement<HTMLDivElement> {
    constructor(board: HTMLDivElement | string) {
        super(typeof board === "string" ? document.querySelector(board) as HTMLDivElement : board);
        this.style.position = "relative";
    }

    public override getParent(): BoardElement<HTMLElement> | null {
        return null;
    }

    public setDocumentTitle(title: string): void {
        document.title = title;
    }

    public changeResolution(width: number, height: number): void {
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
    }

    public applyCSS(code: string): HTMLStyleElement {
        const style = document.createElement("style");
        style.textContent = code;
        document.head.appendChild(style);
        return style;
    }
    public removeCSS(style: HTMLStyleElement): void {
        if (style.parentElement === document.head) {
            document.head.removeChild(style);
        }
    }

    public applyAnimation(anim: Animation): HTMLStyleElement {
        return this.applyCSS(anim.export());
    }

    public setDocumentFavicon(iconUrl: string): void {
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }
        link.href = iconUrl;
    }
}