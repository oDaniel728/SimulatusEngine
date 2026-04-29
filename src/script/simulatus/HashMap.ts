
/**
 * Estrutura de dados HashMap simples baseada em `Map` do JavaScript.
 * Fornece métodos utilitários convenientes para manipulação e conversão.
 *
 * @typeParam K - Tipo das chaves
 * @typeParam V - Tipo dos valores
 */
export default class HashMap<K, V> {
    private hmap: Map<K, V>;

    /**
     * Cria uma nova instância de `HashMap` vazia.
     */
    constructor() {
        this.hmap = new Map<K, V>();
    }

    /**
     * Define o `value` para a `key` informada.
     * @param key - Chave a ser usada
     * @param value - Valor a ser armazenado
     */
    public set(key: K, value: V): void {
        this.hmap.set(key, value);
    }

    /**
     * Recupera o valor associado à `key`.
     * Se a chave não existir, retorna `undefined` ou o `defaultValue` quando fornecido.
     *
     * @param key - Chave a procurar
     * @returns Valor associado ou `undefined`
     */
    public get(key: K): V | undefined;
    /**
     * Recupera o valor associado à `key`, retornando `defaultValue` se não existir.
     * @param key - Chave a procurar
     * @param defaultValue - Valor padrão a retornar caso a chave não exista
     * @returns Valor associado ou `defaultValue`
     */
    public get(key: K, defaultValue: V): V;
    public get(key: K, defaultValue?: V): V | undefined {
        return this.hmap.get(key) ?? defaultValue;
    }

    /**
     * Encontra a primeira chave cujo valor é estritamente igual (`===`) ao valor informado.
     * @param value - Valor a buscar
     * @returns Chave encontrada ou `undefined` se não houver correspondência
     */
    public getKeyFromValue(value: V): K | undefined {
        for (const [key, val] of this.hmap.entries()) {
            if (val === value) {
                return key;
            }
        }
        return undefined;
    }

    /**
     * Verifica se a `key` existe no mapa.
     * @param key - Chave a verificar
     * @returns `true` se existir, caso contrário `false`
     */
    public has(key: K): boolean {
        return this.hmap.has(key);
    }

    /**
     * Remove a entrada associada à `key`.
     * @param key - Chave a remover
     * @returns `true` se a entrada foi removida, caso contrário `false`
     */
    public delete(key: K): boolean {
        return this.hmap.delete(key);
    }

    /**
     * Remove todas as entradas do mapa.
     */
    public clear(): void {
        this.hmap.clear();
    }

    /**
     * Retorna o número de entradas no mapa.
     * @returns Quantidade de entradas
     */
    public size(): number {
        return this.hmap.size;
    }

    /**
     * Retorna um iterador das chaves do mapa.
     */
    public keys(): IterableIterator<K> {
        return this.hmap.keys();
    }

    /**
     * Retorna um iterador dos valores do mapa.
     */
    public values(): IterableIterator<V> {
        return this.hmap.values();
    }

    /**
     * Retorna um iterador de pares `[key, value]`.
     */
    public entries(): IterableIterator<[K, V]> {
        return this.hmap.entries();
    }

    /**
     * Executa a `callback` para cada entrada do mapa.
     * @param callback - Função chamada com `(value, key, map)` para cada par
     */
    public forEach(callback: (value: V, key: K, map: Map<K, V>) => void): void {
        this.hmap.forEach(callback);
    }

    /**
     * Retorna uma representação em string do mapa no formato `{key: value, ...}`.
     */
    public toString(): string {
        let result = "{";
        for (const [key, value] of this.hmap.entries()) {
            result += `${key}: ${value}, `;
        }
        return result.slice(0, -2) + "}";
    }

    /**
     * Converte o mapa para uma lista de pares `[key, value]`.
     * @returns Array de pares
     */
    public toList(): [K, V][] {
        return Array.from(this.hmap.entries());
    }

    /**
     * Converte o mapa para um objeto cujas chaves são as representações em string das chaves originais.
     * @returns Objeto com pares chave-valor
     */
    public toObject(): { [key: string]: V } {
        const obj: { [key: string]: V } = {};
        for (const [key, value] of this.hmap.entries()) {
            obj[String(key)] = value;
        }
        return obj;
    }

    /**
     * Retorna duas listas separadas: uma com as chaves e outra com os valores.
     * @returns Tupla contendo `[keys[], values[]]`
     */
    public toSeparateLists(): [K[], V[]] {
        const keys: K[] = [];
        const values: V[] = [];
        for (const [key, value] of this.hmap.entries()) {
            keys.push(key);
            values.push(value);
        }
        return [keys, values];
    }

    /**
     * Retorna um Map com as chaves e valores
     *
     * @returns Map com as chaves e valores 
     */
    public toMap(): Map<K, V> {
        return new Map(this.hmap);
    }

    /**
     * Cria um `HashMap` a partir de um objeto simples.
     * As chaves do objeto serão convertidas para o tipo `K` usando coerção de tipo.
     *
     * @param obj - Objeto cujas chaves e valores serão usados para criar o `HashMap`
     * @returns Novo `HashMap` contendo as entradas do objeto
     */
    public static fromObject<K, V>(obj: { [key: string]: V }): HashMap<K, V> {
        const hashMap = new HashMap<K, V>();
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                hashMap.set(key as unknown as K, obj[key]);
            }
        }
        return hashMap;
    }

    /**
     * Cria um `HashMap` a partir de uma lista de pares `[key, value]`.
     *
     * @param list - Array de pares onde o primeiro elemento é a chave e o segundo é o valor
     * @returns Novo `HashMap` contendo as entradas da lista
     */
    public static fromMap<K, V>(map: Map<K, V>): HashMap<K, V> {
        const hashMap = new HashMap<K, V>();
        for (const [key, value] of map.entries()) {
            hashMap.set(key, value);
        }
        return hashMap;
    }

    /**
     * Cria um `HashMap` a partir de uma lista de pares `[key, value]`.
     *
     * @param list - Array de pares onde o primeiro elemento é a chave e o segundo é o valor
     * @returns Novo `HashMap` contendo as entradas da lista
     */
    public static fromList<K, V>(list: [K, V][]): HashMap<K, V> {
        const hashMap = new HashMap<K, V>();
        for (const [key, value] of list) {
            hashMap.set(key, value);
        }
        return hashMap;
    }

    /**
     * Cria um `HashMap` a partir de um iterável de pares `[key, value]`.
     *
     * @param entries - Iterável de pares onde o primeiro elemento é a chave e o segundo é o valor
     * @returns Novo `HashMap` contendo as entradas do iterável
     */
    public static fromEntries<K, V>(entries: Iterable<[K, V]>): HashMap<K, V> {
        const hashMap = new HashMap<K, V>();
        for (const [key, value] of entries) {
            hashMap.set(key, value);
        }
        return hashMap;
    }

    /**
     * Cria um novo `HashMap` vazio.
     *
     * @returns Novo `HashMap` vazio
     */
    public static new<K, V>(): HashMap<K, V> {
        return new HashMap<K, V>();
    }

    [Symbol.toPrimitive](hint: string) {
        return this.hmap;
    }

    /**
     * Retorna um novo `HashMap` contendo apenas as entradas que satisfazem o predicado fornecido.
     *
     * @param predicate - Função que recebe `(value, key, map)` e retorna `true` para manter a entrada ou `false` para descartá-la
     * @returns Novo `HashMap` filtrado
     */
    public filter<U>(predicate: (value: V, key: K, map: Map<K, V>) => boolean): HashMap<K, U> {
        const filteredMap = new HashMap<K, U>();
        for (const [key, value] of this.hmap.entries()) {
            if (predicate(value, key, this.hmap)) {
                //@ts-ignore
                filteredMap.set(key, value);
            }
        }
        return filteredMap;
    }
    
    /**
     * Retorna um novo `HashMap` contendo os resultados da aplicação do `mapper` a cada entrada do mapa.
     *
     * @param mapper - Função que recebe `(value, key, map)` e retorna o novo valor a ser associado à chave
     * @returns Novo `HashMap` mapeado
     */
    public map<U>(mapper: (value: V, key: K, map: Map<K, V>) => U): HashMap<K, U> {
        const mappedMap = new HashMap<K, U>();
        for (const [key, value] of this.hmap.entries()) {
            mappedMap.set(key, mapper(value, key, this.hmap));
        }
        return mappedMap;
    }

    /**
     * Reduz os valores do mapa a um único valor usando a função `reducer`.
     *
     * @param reducer - Função que recebe `(accumulator, value, key, map)` e retorna o novo acumulador
     * @param initialValue - Valor inicial para o acumulador
     * @returns Valor final após a redução
     */
    public reduce<U>(reducer: (accumulator: U, value: V, key: K, map: Map<K, V>) => U, initialValue: U): U {
        let accumulator = initialValue;
        for (const [key, value] of this.hmap.entries()) {
            accumulator = reducer(accumulator, value, key, this.hmap);
        }
        return accumulator;
    }
}