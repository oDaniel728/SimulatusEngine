import Identifier from "../structure/Identifier";
import LanguageProvider from "../structure/providers/LanguageProvider";

type LITERAL = "literal";
type TRANSLATABLE = "translatable";
type TEXT = LITERAL | TRANSLATABLE;

export default class Text<T extends LITERAL|TRANSLATABLE = TEXT> {
    public static readonly EMPTY = Text.literal("");
    public content: string;
    
    protected constructor(content: string) {
        this.content = content;
    }

    public static translatable(key: Identifier): Text<TRANSLATABLE> {
        return new Text(LanguageProvider.get(key));
    }
    public static literal(text: string | { toString(): string }): Text<LITERAL> {
        return new Text(text.toString());
    }

    public toString(): string {
        return this.content;
    }

    public static concat(...texts: Text<TEXT>[]): Text<LITERAL> {
        return Text.literal(texts.map(t => t.toString()).join(""));
    }
}