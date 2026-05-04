/**
 * Applier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/Applier.ts.
 */

import * as CSS from "csstype";

type StylableHTMLElement = { style: CSS.Properties };

/**
 * Applier
 *
 * Interface for the engine.
 */
export default interface Applier {
    applyToElement(element: StylableHTMLElement): void;
}