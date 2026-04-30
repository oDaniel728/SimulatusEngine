import BoardElement from "./BoardElement";

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
}