import * as CSS from "csstype";
import Easing from "./utils/Easing";

type AnimationDirection = CSS.Properties["animationDirection"];
type AnimationFillMode = CSS.Properties["animationFillMode"];
type AnimationPlayState = CSS.Properties["animationPlayState"];

export default class Animation {
    public name: string;
    public steps: Map<string, CSS.Properties>;
    public duration: number = 1000;
    public timingFunction: string | Easing = Easing.Linear;
    public delay: number = 0;
    public iterationCount: string | number = 1;
    public direction: AnimationDirection = "normal";
    public fillMode: AnimationFillMode = "forwards";
    public playState: AnimationPlayState = "running";

    constructor(name: string) {
        this.name = name;
        this.steps = new Map<string, CSS.Properties>();
    }

    public toString(): string {
        return `Animation(name: ${this.name})`;
    }

    public addTimestamp(timestamp: number, properties: CSS.Properties): this {
        this.steps.set(`${timestamp}%`, properties);
        return this
    }

    public export(): string {
        let keyframes = `@keyframes ${this.name} {\n`;
        for (const [timestamp, properties] of this.steps) {
            keyframes += `  ${timestamp} {\n`;
            for (const [prop, value] of Object.entries(properties)) {
                const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
                keyframes += `    ${cssProp}: ${value};\n`;
            }
            keyframes += `  }\n`;
        }
        keyframes += `}`;
        return keyframes;
    }
}