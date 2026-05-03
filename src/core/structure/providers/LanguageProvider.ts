import Identifier from "../Identifier";
import Registries from "../Registries";
import Registry, { registryMap } from "../Registry";
import AssetProvider from "./AssetProvider";
import ObjectAsset from "../assets/ObjectAsset";
import EventList from "core/engine/utils/EventList";

const languageAssetModules = import.meta.glob('../../../script/game/**/assets/lang/*.json') as Record<string, () => Promise<unknown>>;

export default class LanguageProvider {
    public static get languages(): Map<string, Map<Identifier, string>> {
        return Registry.get(Registries.LANGUAGE) as unknown as Map<string, Map<Identifier, string>>;
    }
    public static knownLanguages: Set<string> = new Set();
    public static currentLanguage: string = "en_us";

    public static onLanguageChange = new EventList<(lang: string) => void>();
    
    public static registerLanguage(lang: string): void {
        this.knownLanguages.add(lang);
    }

    public static async loadLanguages(namespace: string): Promise<void> {
        for (const lang of this.knownLanguages) {
            await this.loadLanguage(lang, namespace);
        }
    }

    public static async loadLanguage(lang: string, namespace: string): Promise<void> {
        try {
            const asset = await AssetProvider.loadAsset(Identifier.of(namespace, `/lang/${lang}.json`));
            if (!(asset instanceof ObjectAsset)) {
                console.warn(`Language asset '${lang}' is not a JSON object asset.`);
                return;
            }
            const data = await asset.load();
            if (typeof data !== "object" || data === null || Array.isArray(data)) {
                console.warn(`Invalid language JSON in '${lang}' for namespace '${namespace}'.`);
                return;
            }

            const existing = this.languages.get(lang) ?? new Map<Identifier, string>();
            for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
                if (typeof value !== "string") {
                    continue;
                }
                const identifier = this.buildNamespacedIdentifier(namespace, key);
                if (!identifier) {
                    console.warn(`Invalid key '${key}' in language file for '${lang}'. Expected format 'namespace:name' or local key.`);
                    continue;
                }
                existing.set(identifier, value);
            }

            this.languages.set(lang, existing);
        } catch (error) {
            console.error(`Error loading language '${lang}':`, error);
        }
    }

    private static buildNamespacedIdentifier(namespace: string, key: string): Identifier | null {
        if (key.includes(":")) {
            try {
                return Identifier.fromString(key);
            } catch {
                return null;
            }
        }
        return Identifier.of(namespace, key);
    }

    public static async useLanguage(lang: string): Promise<void> {
        if (!LanguageProvider.languages.has(lang)) {
            console.warn(`Language '${lang}' has not been loaded yet.`);
            return;
        }
        console.info(`Switching to language '${lang}'.`);
        LanguageProvider.currentLanguage = lang;
        LanguageProvider.onLanguageChange.trigger(lang);
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