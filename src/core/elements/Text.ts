import Identifier from "../structure/Identifier";
import LanguageProvider from "../structure/providers/LanguageProvider";

type LITERAL = "literal";
type TRANSLATABLE = "translatable";
type TEXT = LITERAL | TRANSLATABLE;

export default class Text<T extends LITERAL|TRANSLATABLE = TEXT> {
    protected static alreadyExists = false;
    protected static Instances = new Set<Text>();
    private id: Identifier | null = null;
    public static readonly EMPTY = Text.literal("");
    private _content!: string;

    public get content(): string {
        return this._content;
    }

    public static updateAll() {
        for (const text of this.Instances) {
            text.update();
        }
    }

    public update() {
        if (!this.id) return;
        this._content = LanguageProvider.get(this.id) ?? this._content;
    }
    
    protected constructor(content: string | Identifier) {
        if (!Text.alreadyExists) {
            LanguageProvider.onLanguageChange.addEventListener(() => Text.updateAll());
            Text.alreadyExists = true;
        }
        if (typeof content === "string") {
            this._content = content;
        } else {
            this.id = content;
            this._content = LanguageProvider.get(content) ?? content.toString();
        }
        Text.Instances.add(this);
    }

    public static translatable(key: Identifier): Text<TRANSLATABLE> {
        return new Text(key);
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