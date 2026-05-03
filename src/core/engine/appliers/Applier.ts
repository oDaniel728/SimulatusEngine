import * as CSS from "csstype";

type StylableHTMLElement = { style: CSS.Properties };

export default interface Applier {
    applyToElement(element: StylableHTMLElement): void;
}