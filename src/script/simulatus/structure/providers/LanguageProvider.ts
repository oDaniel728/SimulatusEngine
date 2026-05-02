import Identifier from "../Identifier";
import Registries from "../Registries";
import Registry, { registryMap } from "../Registry";

export default class LanguageProvider {
    public static get languages(): Map<string, Map<Identifier, string>> {
        return Registry.get(Registries.LANGUAGE) as unknown as Map<string, Map<Identifier, string>>;
    }
    public static knownLanguages: Set<string> = new Set();
    public static currentLanguage: string = "en_us";
    
    public static registerLanguage(lang: string): void {
        this.knownLanguages.add(lang);
    }

    public static async loadLanguages(namespace: string): Promise<void> {
        for (const lang of this.knownLanguages) {
            await this.loadLanguage(lang, `/script/game/${namespace}/assets/lang/`);
        }
    }

    public static async loadLanguage(lang: string, path: string): Promise<void> {
        if (this.languages.has(lang)) return;
        try {
            const response = await fetch(path + lang + ".json");
            if (!response.ok) {
                console.warn(`Language file for '${lang}' not found at ${path + lang + ".json"}`);
                return;
            }
            const data: Record<string, string> = await response.json();
            const tmp = [];
            for (const [key, value] of Object.entries(data)) {
                const [namespace, name] = key.split(":");
                if (!namespace || !name) {
                    console.warn(`Invalid key '${key}' in language file for '${lang}'. Expected format 'namespace:name'.`);
                    continue;
                }
                tmp.push([Identifier.fromString(key), value] as [Identifier, string]);
            };
            this.languages.set(
                lang, 
                new Map(tmp)
            );
        } catch (error) {
            console.error(`Error loading language '${lang}':`, error);
        }
    }

    public static async useLanguage(lang: string): Promise<void> {
        if (!LanguageProvider.languages.has(lang)) {
            console.warn(`Language '${lang}' has not been loaded yet.`);
            return;
        }
        LanguageProvider.currentLanguage = lang;
    }

    public static getCurrentLanguage(): string {
        return LanguageProvider.currentLanguage;
    }

    private static findIdentifierKey(langMap: Map<Identifier, string>, key: Identifier): Identifier | undefined {
        const keyString = key.toString();
        for (const existingKey of langMap.keys()) {
            if (existingKey.toString() === keyString) {
                return existingKey;
            }
        }
        return undefined;
    }

    public static get(key: Identifier): string {
        const langMap = this.languages.get(this.getCurrentLanguage());
        if (!langMap) {
            console.warn(`Current language '${this.currentLanguage}' not loaded. Returning key '${key}'.`);
            return key.toString();
        }
        const mapKey = this.findIdentifierKey(langMap, key) ?? key;
        const value = langMap.get(mapKey);
        if (!value) {
            console.warn(`Key '${key}' not found in language '${this.currentLanguage}'.`);
            return key.toString();
        }
        return value;
    }
}