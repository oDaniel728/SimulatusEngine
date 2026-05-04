/**
 * AnimationApplier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/AnimationApplier.ts.
 */

import { Properties } from "csstype";
import Applier from "./Applier";
import Animation from "../Animation";

/**
 * AnimationApplier
 *
 * Class for the engine.
 */
export default class AnimationApplier implements Applier {

    constructor(public name: string) {}

    protected animation = new Animation(this.name);

    applyToElement(element: { style: Properties; }): void {
        
    }

}