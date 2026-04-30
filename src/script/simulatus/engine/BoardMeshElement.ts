import BoardElement from "./BoardElement";
import Area2 from "./game/Area2";
import * as CSS from "csstype";
import Vector2 from "./game/Vector2";
type CSSColor = CSS.Properties["backgroundColor"];

export default class BoardMeshElement extends BoardElement<HTMLElement> {
    public static readonly svgNS: string = "http://www.w3.org/2000/svg";

    public area: Area2;

    constructor() {
        super(
            document.createElementNS(BoardMeshElement.svgNS, "svg") as unknown as HTMLElement
        );

        this.area = new Area2();
        this.area._callback = () => this.syncAreaWithElement();
    }
    private syncAreaWithElement(): void {
        const el = this.getElement();
        el.setAttribute("width", String(this.area.w));
        el.setAttribute("height", String(this.area.h));
        el.style.left = `${this.area.x}px`;
        el.style.top = `${this.area.y}px`;
    }

    public rect(pos: Vector2 | Area2, size?: Vector2): this {
        const rect = document.createElementNS(BoardMeshElement.svgNS, "rect");
        if (pos instanceof Area2) {
            size = pos.size;
            pos = pos.position;
        }
        rect.setAttribute("x", String(pos.x));
        rect.setAttribute("y", String(pos.y));
        if (size) {
            rect.setAttribute("width", String(size.x));
            rect.setAttribute("height", String(size.y));
        }
        this.getElement().appendChild(rect);
        return this;
    }

    public circle(pos: Vector2, r: number): this {
        const circle = document.createElementNS(BoardMeshElement.svgNS, "circle");
        circle.setAttribute("cx", String(pos.x));
        circle.setAttribute("cy", String(pos.y));
        circle.setAttribute("r", String(r));
        this.getElement().appendChild(circle);
        return this;
    }

    public line(pos1: Vector2, pos2: Vector2): this {
        const line = document.createElementNS(BoardMeshElement.svgNS, "line");
        line.setAttribute("x1", String(pos1.x));
        line.setAttribute("y1", String(pos1.y));
        line.setAttribute("x2", String(pos2.x));
        line.setAttribute("y2", String(pos2.y));
        this.getElement().appendChild(line);
        return this;
    }

    public clear(): void {
        const el = this.getElement();
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    public fill(color: CSSColor): this {
        this.getElement().style.backgroundColor = color as string;
        return this;
    }

    public stroke(color: CSSColor, width: number = 1): this {
        const el = this.getElement();
        el.style.stroke = color as string;
        el.style.strokeWidth = `${width}px`;
        return this;
    }

    public export(): SVGSVGElement {
        const el = this.getElement();
        return el as unknown as SVGSVGElement;
    }
}