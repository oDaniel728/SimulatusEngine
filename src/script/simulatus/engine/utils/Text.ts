import Area2 from "../game/Area2";
import Vector2 from "../game/Vector2";
import HashMap from "./HashMap";

export default class Text {
    public static languages: HashMap<string, HashMap<string, string>> = new HashMap();
    public static currentLanguage: string = "en_us";
    
    public static register(): void {
        
    }
    
    public static measureText(text: string, font: string): Area2 {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Could not create canvas context for measuring text.");
        }
        ctx.font = font;
        const metrics = ctx.measureText(text);
        const width = metrics.width;
        const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        return new Area2(new Vector2(0, 0), new Vector2(width, height));
    }
}