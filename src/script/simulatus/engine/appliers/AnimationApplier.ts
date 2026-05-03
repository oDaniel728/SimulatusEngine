import { Properties } from "csstype";
import Applier from "./Applier";
import Animation from "../Animation";

export default class AnimationApplier implements Applier {

    constructor(public name: string) {}

    protected animation = new Animation(this.name);

    applyToElement(element: { style: Properties; }): void {
        
    }

}