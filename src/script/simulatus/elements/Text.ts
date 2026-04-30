import Identifier from "../structure/Identifier";
import LanguageProvider from "../structure/providers/LanguageProvider";
export default class Text {
    public static translatable(key: Identifier): string {
        return LanguageProvider.get(key);
    }
    public static literal(text: string): string {
        return text;
    }
}