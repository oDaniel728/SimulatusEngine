import { Properties, StandardLonghandPropertiesHyphen } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";
import Easing from "../utils/Easing";
import Animation from "../Animation";

class Builder {
    protected _style = {} as Properties;
    public get style(): Properties {
        return this._style;
    }
}

class BorderBuilder extends Builder {
    public width(value: Properties["borderWidth"]): this {
        this._style.borderWidth = value;
        return this;
    }

    public color(value: Properties["borderColor"] | Color3): this {
        this._style.borderColor = value?.toString();
        return this;
    }

    public radius(value: Properties["borderRadius"]): this {
        this._style.borderRadius = value;
        return this;
    }

    public type(value: Properties["borderStyle"]): this {
        this._style.borderStyle = value;
        return this;
    }
}

class ColorBuilder extends Builder {

    public color(value: Properties["color"] | Color3): this {
        this._style.color = value?.toString();
        return this;
    }

    public backgroundColor(value: Properties["backgroundColor"] | Color3): this {
        this._style.backgroundColor = value?.toString();
        return this;
    }
}

class PositionBuilder extends Builder {

    public width(value: Properties["width"]): this {
        this._style.width = value;
        return this;
    }

    public height(value: Properties["height"]): this {
        this._style.height = value;
        return this;
    }

    public position(value: Properties["position"]): this {
        this._style.position = value;
        return this;
    }

    public top(value: Properties["top"]): this {
        this._style.top = value;
        return this;
    }

    public left(value: Properties["left"]): this {
        this._style.left = value;
        return this;
    }

    public zIndex(value: Properties["zIndex"]): this {
        this._style.zIndex = value;
        return this;
    }
}

class TransformBuilder extends Builder {
    protected rotateDeg: number = 0;
    protected scaleXValue: number = 1;
    protected scaleYValue: number = 1;
    protected translateX: number = 0;
    protected translateY: number = 0;

    public get style(): Properties {
        return {
            transform: `rotate(${this.rotateDeg}deg) scale(${this.scaleXValue}, ${this.scaleYValue}) translate(${this.translateX}px, ${this.translateY}px)`,
        } as Properties
    }

    public rotate(value: number): this {
        this.rotateDeg = value;
        return this;
    }

    public scaleX(value: number): this {
        this.scaleXValue = value;
        return this;
    }

    public scaleY(value: number): this {
        this.scaleYValue = value;
        return this;
    }

    public scale(x: number, y: number): this {
        this.scaleXValue = x;
        this.scaleYValue = y;
        return this;
    }

    public translate(x: number, y: number): this {
        this.translateX = x;
        this.translateY = y;
        return this;
    }
}

class TransitionBuilder extends Builder {
    protected properties = new Set<string>();
    protected durationValue: number = 0;
    protected timingFunctionValue: Easing = Easing.Linear;
    protected delayValue: number = 0;

    public get style(): Properties {
        return {
            transitionProperty: Array.from(this.properties).join(", "),
            transitionDuration: `${this.durationValue}ms`,
            transitionTimingFunction: this.timingFunctionValue,
            transitionDelay: `${this.delayValue}ms`,
        } as Properties;
    }

    public property(...properties: (keyof StandardLonghandPropertiesHyphen)[]): this {
        properties.forEach((prop) => this.properties.add(prop));
        return this;
    }

    public duration(value: number): this {
        this.durationValue = value;
        return this;
    }

    public timingFunction(value: Easing): this {
        this.timingFunctionValue = value;
        return this;
    }

    public delay(value: number): this {
        this.delayValue = value;
        return this;
    }
}

class FontBuilder extends Builder {
    public family(value: Properties["fontFamily"] | string): this {
        this._style.fontFamily = value;
        return this;
    }
    public size(value: Properties["fontSize"]): this {
        this._style.fontSize = value;
        return this;
    }
    public weight(value: Properties["fontWeight"]): this {
        this._style.fontWeight = value;
        return this;
    }
    public fontStyle(value: Properties["fontStyle"]): this {
        this._style.fontStyle = value;
        return this;
    }
    public lineHeight(value: Properties["lineHeight"]): this {
        this._style.lineHeight = value;
        return this;
    }
    public letterSpacing(value: Properties["letterSpacing"]): this {
        this._style.letterSpacing = value;
        return this;
    }
    public textAlign(value: Properties["textAlign"]): this {
        this._style.textAlign = value;
        return this;
    }
    public textDecoration(value: Properties["textDecoration"]): this {
        this._style.textDecoration = value;
        return this;
    }
    public textTransform(value: Properties["textTransform"]): this {
        this._style.textTransform = value;
        return this;
    }
    public textShadow(value: Properties["textShadow"]): this {
        this._style.textShadow = value;
        return this;
    }
    public whiteSpace(value: Properties["whiteSpace"]): this {
        this._style.whiteSpace = value;
        return this;
    }
    public wordBreak(value: Properties["wordBreak"]): this {
        this._style.wordBreak = value;
        return this;
    }
    public overflowWrap(value: Properties["overflowWrap"]): this {
        this._style.overflowWrap = value;
        return this;
    }
    public textOverflow(value: Properties["textOverflow"]): this {
        this._style.textOverflow = value;
        return this;
    }
    public textIndent(value: Properties["textIndent"]): this {
        this._style.textIndent = value;
        return this;
    }
    public textOrientation(value: Properties["textOrientation"]): this {
        this._style.textOrientation = value;
        return this;
    }
    public textCombineUpright(value: Properties["textCombineUpright"]): this {
        this._style.textCombineUpright = value;
        return this;
    }
    public textEmphasis(value: Properties["textEmphasis"]): this {
        this._style.textEmphasis = value;
        return this;
    }
    public textEmphasisPosition(value: Properties["textEmphasisPosition"]): this {
        this._style.textEmphasisPosition = value;
        return this;
    }
    public textEmphasisStyle(value: Properties["textEmphasisStyle"]): this {
        this._style.textEmphasisStyle = value;
        return this;
    }
    public textEmphasisColor(value: Properties["textEmphasisColor"]): this {
        this._style.textEmphasisColor = value;
        return this;
    }
    public textUnderlinePosition(value: Properties["textUnderlinePosition"]): this {
        this._style.textUnderlinePosition = value;
        return this;
    }
    public textUnderlineOffset(value: Properties["textUnderlineOffset"]): this {
        this._style.textUnderlineOffset = value;
        return this;
    }
    public textDecorationLine(value: Properties["textDecorationLine"]): this {
        this._style.textDecorationLine = value;
        return this;
    }
    public textDecorationStyle(value: Properties["textDecorationStyle"]): this {
        this._style.textDecorationStyle = value;
        return this;
    }
    public textDecorationColor(value: Properties["textDecorationColor"]): this {
        this._style.textDecorationColor = value;
        return this;
    }
    public textDecorationSkipInk(value: Properties["textDecorationSkipInk"]): this {
        this._style.textDecorationSkipInk = value;
        return this;
    }

    public content(value: Properties["content"]): this {
        this._style.content = value;
        return this;
    }
}

class BackgroundBuilder extends Builder {
    public image(value: Properties["backgroundImage"]): this {
        this._style.backgroundImage = value;
        return this;
    }

    public position(value: Properties["backgroundPosition"]): this {
        this._style.backgroundPosition = value;
        return this;
    }

    public size(value: Properties["backgroundSize"]): this {
        this._style.backgroundSize = value;
        return this;
    }

    public repeat(value: Properties["backgroundRepeat"]): this {
        this._style.backgroundRepeat = value;
        return this;
    }

    public attachment(value: Properties["backgroundAttachment"]): this {
        this._style.backgroundAttachment = value;
        return this;
    }

    public origin(value: Properties["backgroundOrigin"]): this {
        this._style.backgroundOrigin = value;
        return this;
    }

    public clip(value: Properties["backgroundClip"]): this {
        this._style.backgroundClip = value;
        return this;
    }
}

class AnimationBuilder extends Builder {
    protected nameValue: string = "";
    protected durationValue: number = 0;
    protected timingFunctionValue: Easing = Easing.Linear;
    protected delayValue: number = 0;
    protected iterationCountValue: number | "infinite" = 1;
    protected directionValue: Properties["animationDirection"] = "normal";
    protected fillModeValue: Properties["animationFillMode"] = "forwards";
    protected playStateValue: Properties["animationPlayState"] = "running";

    public get style(): Properties {
        return {
            animationName: this.nameValue,
            animationDuration: `${this.durationValue}ms`,
            animationTimingFunction: this.timingFunctionValue,
            animationDelay: `${this.delayValue}ms`,
            animationIterationCount: String(this.iterationCountValue),
            animationDirection: this.directionValue,
            animationFillMode: this.fillModeValue,
            animationPlayState: this.playStateValue,
        } as Properties;
    }

    public apply(animation: Animation): this {
        this.nameValue = animation.name;
        this.durationValue = animation.duration;
        this.timingFunctionValue = animation.timingFunction as Easing;
        this.delayValue = animation.delay;
        this.iterationCountValue = animation.iterationCount as number | "infinite";
        this.directionValue = animation.direction ?? "normal";
        this.fillModeValue = animation.fillMode ?? "forwards";
        this.playStateValue = animation.playState ?? "running";
        return this;
    }

    public name(value: string): this {
        this.nameValue = value;
        return this;
    }

    public duration(value: number): this {
        this.durationValue = value;
        return this;
    }

    public timingFunction(value: Easing): this {
        this.timingFunctionValue = value;
        return this;
    }

    public delay(value: number): this {
        this.delayValue = value;
        return this;
    }

    public iterationCount(value: number | "infinite"): this {
        this.iterationCountValue = value;
        return this;
    }

    public direction(value: Properties["animationDirection"]): this {
        this.directionValue = value;
        return this;
    }

    public fillMode(value: Properties["animationFillMode"]): this {
        this.fillModeValue = value;
        return this;
    }

    public playState(value: Properties["animationPlayState"]): this {
        this.playStateValue = value;
        return this;
    }
}

class AlignmentBuilder extends Builder {
    private horizontalValue: "left" | "center" | "right" = "left";
    private verticalValue: "top" | "center" | "bottom" = "top";

    public get style(): Properties {
        return {
            display: "flex",
            justifyContent: this.horizontalValue === "left" ? "flex-start" : this.horizontalValue === "center" ? "center" : "flex-end",
            alignItems: this.verticalValue === "top" ? "flex-start" : this.verticalValue === "center" ? "center" : "flex-end",
        } as Properties;
    }

    public horizontal(value: "left" | "center" | "right"): this {
        this.horizontalValue = value;
        return this;
    }

    public vertical(value: "top" | "center" | "bottom"): this {
        this.verticalValue = value;
        return this;
    }
}

export default class StyleBuilder implements Applier {

    public style = {} as Properties;
    constructor() {
    }

    protected apply(css: Properties): this {
        Object.assign(this.style, css);
        return this;
    }

    protected applyBuilder<B extends Builder>(builder: typeof Builder, generator: (instance: B) => void): this {
        const builderInstance: B = new builder() as B;
        generator(builderInstance);
        this.apply(builderInstance.style);
        return this;
    }

    public buildColor(generator: (builder: ColorBuilder) => void): this {
        return this.applyBuilder(ColorBuilder, generator);
    }

    public buildPosition(generator: (builder: PositionBuilder) => void): this {
        return this.applyBuilder(PositionBuilder, generator);
    }

    public buildBorder(generator: (builder: BorderBuilder) => void): this {
        return this.applyBuilder(BorderBuilder, generator);
    }

    public buildTransform(generator: (builder: TransformBuilder) => void): this {
        return this.applyBuilder(TransformBuilder, generator);
    }

    public buildTransition(generator: (builder: TransitionBuilder) => void): this {
        return this.applyBuilder(TransitionBuilder, generator);
    }

    public buildAnimation(generator: (builder: AnimationBuilder) => void): this {
        return this.applyBuilder(AnimationBuilder, generator);
    }

    public buildFont(generator: (builder: FontBuilder) => void): this {
        return this.applyBuilder(FontBuilder, generator);
    }

    public buildBackground(generator: (builder: BackgroundBuilder) => void): this {
        return this.applyBuilder(BackgroundBuilder, generator);
    }

    public buildAlignment(generator: (builder: AlignmentBuilder) => void): this {
        return this.applyBuilder(AlignmentBuilder, generator);
    }

    public setContent(content: string): this {
        this.style.content = content;
        return this;
    }

    applyToElement(element: { style: Properties; }): void {
        Object.assign(element.style, this.style);
    }
}