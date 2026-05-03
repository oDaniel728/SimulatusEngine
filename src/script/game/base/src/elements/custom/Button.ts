import Text from "core/elements/Text";
import BoardElement from "core/engine/BoardElement";
import Area2 from "core/engine/game/Area2";
import Vector2 from "core/engine/game/Vector2";
import BaseLoader from "../../BaseLoader";
import BackgroundColorApplier from "core/engine/appliers/BackgroundColorApplier";
import Color3 from "core/engine/utils/Color3";
import ColorApplier from "core/engine/appliers/ColorApplier";
import StyleBuilder from "core/engine/appliers/StyleBuilder";
import BoardTextElement from "core/engine/BoardTextElement";
import Identifier from "core/structure/Identifier";
import Mouse from "core/engine/utils/Mouse";

export default class Button extends BoardTextElement {
    private area = new Area2(new Vector2(20, 60), new Vector2(200, 40), new Vector2(0, -1));
    private bg = new BackgroundColorApplier(Color3.RED)
    private color = new ColorApplier(Color3.WHITE);
    private bgcolor: Color3 = Color3.RED;
    private mouse_entered = false;
    private _style = new StyleBuilder()
        .buildFont(g => 
            g.family("Arial")
             .textAlign("center")
             .size("20px")
             .weight("bold")
        )
        .buildAlignment(g =>
            g.horizontal("center")
             .vertical("center")
        );

    public content = Text.translatable(Identifier.of(BaseLoader.ID, "text"));

    private colorScheme = {
        color: Color3.RED,
        hoverColor: Color3.RED.sum(new Color3(50, 50, 50)),
        clickColor: Color3.RED.applyDarkness(0.5),
        textColor: Color3.WHITE,
    }

    constructor()
    constructor(
        colorScheme: {
            color?: Color3,
            hoverColor?: Color3,
            clickColor?: Color3,
            textColor?: Color3,
        }, area?: {
            position?: Vector2,
            size?: Vector2,
            anchor?: Vector2,
        }, font?: {
            family?: string,
            size?: string,
            weight?: string,
        }
    )
    constructor(
        colorScheme?: {
            color?: Color3,
            hoverColor?: Color3,
            clickColor?: Color3,
            textColor?: Color3,
        },
        area?: {
            position?: Vector2,
            size?: Vector2,
            anchor?: Vector2,
        },
        font?: {
            family?: string,
            size?: string,
            weight?: string,
        }
    ) {
        super();
        if (colorScheme?.color) this.bgcolor = colorScheme.color;
        if (colorScheme?.textColor) this.color = new ColorApplier(colorScheme.textColor);
        if (area?.position) this.area = new Area2(area.position, this.area.size, this.area.anchorPoint);
        if (area?.size) this.area = new Area2(this.area.position, area.size, this.area.anchorPoint);
        if (area?.anchor) this.area = new Area2(this.area.position, this.area.size, area.anchor);
        if (font?.family || font?.size || font?.weight) {
            this._style = new StyleBuilder()
                .buildFont(g => 
                    g.family(font.family ?? "Arial")
                     .textAlign("center")
                     .size(font.size ?? "20px")
                     .weight(font.weight ?? "bold")
                )
                .buildAlignment(g =>
                    g.horizontal("center")
                     .vertical("center")
                );
        }
        Object.assign(this.colorScheme, colorScheme);
    }
    
    protected onClick() {
        this.bgcolor = this.colorScheme.clickColor;
        setTimeout(() => this.onMouseEnter(), 50);
    }

    protected onMouseEnter(): void {
        this.bgcolor = this.colorScheme.hoverColor;
    }

    protected onMouseLeave(): void {
        this.bgcolor = this.colorScheme.color;
    }

    protected onLoop(): void {
        this.bg = new BackgroundColorApplier(this.bgcolor);
        this.apply(this.bg);
    }

    protected onAddedAsChild(parent: BoardElement<HTMLElement>): void {
        this.apply(this.area);
        this.apply(this.color);
        this.apply(this._style);
        this.text = this.content;
        parent.getElement().addEventListener("mousedown", () => {
            if (Mouse.Util.isInsideOfBoardElement(this)) {
                this.onClick();
            }
        });

        parent.events.onMouseMove((ev) => {
            const isInside = Mouse.Util.isInsideOfBoardElement(this)
            if (isInside && !this.mouse_entered) {
                this.mouse_entered = true;
                this.onMouseEnter();
            }
            if (!isInside && this.mouse_entered) {
                this.mouse_entered = false;
                this.onMouseLeave();
            }
        })
    }

    public move(x: number, y: number): void;
    public move(delta: Vector2): void;
    public move(a: number | Vector2, b?: number): void {
        if (a instanceof Vector2) {
            this.area.position = this.area.position.add(a);
        } else if (typeof a === "number" && typeof b === "number") {
            this.area.position = this.area.position.add(new Vector2(a, b));
        }
        this.apply(this.area);
    }
}