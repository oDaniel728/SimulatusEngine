import Identifier from "core/structure/Identifier";
import SessionManager from "./SessionManager";

/**
 * Session
 *
 * Uma representação de uma seção local.
 * 
 * @example
 * 
 * const defaultSessionData = { score: 0, level: 1 };
 * type sessionDataType = typeof defaultSessionData;
 * 
 * const session = new Session<sessionDataType>(Identifier.of("tmp", "session1"), defaultSessionData);
 * console.log(session.getData()); // Output: { score: 0, level: 1 }
 * 
 * session.set("score", 10);
 * console.log(session.get("score")); // Output: 10
 * 
 * session.reset("score");
 * console.log(session.get("score")); // Output: 0
 * 
 * session.save(); // Salva a sessão usando o SessionManager
 * session.load(); // Carrega a sessão usando o SessionManager
 * console.log(session.getData()); // Output: { score: 0, level: 1 } (ou os dados salvos anteriormente)
 */
export class Session<T extends Record<string, any>> {
    private data: T;
    private readonly initialData: T;
    public readonly id: Identifier;


    /**
     * Construtor da classe Session, que recebe um identificador e os dados iniciais da sessão. O identificador é usado para diferenciar esta sessão de outras, enquanto os dados iniciais são clonados e armazenados para permitir a restauração do estado original da sessão quando necessário. A classe também fornece métodos para acessar, modificar, resetar, salvar e carregar os dados da sessão usando o SessionManager.
     *
     * @constructor
     * @param {Identifier} id - O identificador único para esta sessão, usado para diferenciar esta sessão de outras.
     * @param {T} data - Os dados iniciais da sessão, que são clonados e armazenados para permitir a restauração do estado original da sessão quando necessário.
     * 
     * @example
     * const defaultSessionData = { score: 0, level: 1 };
     * type sessionDataType = typeof defaultSessionData;
     * 
     * const session = new Session<sessionDataType>(Identifier.of("tmp", "session1"), defaultSessionData);
     * console.log(session.getData()); // Output: { score: 0, level: 1 }
     */
    constructor(id: Identifier, data: T) {
        this.data = data;
        this.initialData = Session.cloneData(data);
        this.id = id;
    }
    
    /**
     * Clona os dados da sessão usando `structuredClone` se disponível, ou uma abordagem de fallback usando `JSON.parse(JSON.stringify())` para garantir que os dados sejam copiados de forma profunda. Este método é usado para criar cópias dos dados da sessão, permitindo que o estado original seja restaurado quando necessário, sem afetar a referência original dos dados.
     *
     * @private
     * @static
     * @template T 
     * @param {T} data - Os dados a serem clonados, que podem ser de qualquer tipo que seja serializável ou suportado pelo `structuredClone`.
     * @returns {T} 
     * 
     * @example
     * const originalData = { score: 0, level: 1 };
     * const clonedData = Session.cloneData(originalData);
     * console.log(clonedData); // Output: { score: 0, level: 1 }
     * console.log(clonedData === originalData); // Output: false (são objetos diferentes)
     */
    private static cloneData<T>(data: T): T {
        if (typeof structuredClone === "function") {
            return structuredClone(data);
        }
        return JSON.parse(JSON.stringify(data));
    }

    /**
     * Retorna os dados atuais da sessão. Este método permite acessar o estado atual dos dados da sessão, que pode ser modificado usando os métodos de definição ou reset. Os dados retornados são do tipo genérico `T`, que é definido no momento da criação da instância da sessão, permitindo flexibilidade na estrutura dos dados armazenados na sessão.
     *
     * @public
     * @returns {T} - Os dados atuais da sessão, do tipo genérico `T`, que é definido no momento da criação da instância da sessão.
     */
    public getData(): T {
        return this.data;
    }

    /**
     * Retorna os dados iniciais da sessão. Este método permite acessar o estado original dos dados da sessão, que pode ser restaurado usando o método `reset`. Os dados retornados são do tipo genérico `T`, que é definido no momento da criação da instância da sessão, permitindo flexibilidade na estrutura dos dados armazenados na sessão.
     *
     * @public
     * @returns {T} - Os dados iniciais da sessão, do tipo genérico `T`, que é definido no momento da criação da instância da sessão.
     * 
     * @example
     * const defaultSessionData = { score: 0, level: 1 };
     * type sessionDataType = typeof defaultSessionData;
     * 
     * const session = new Session<sessionDataType>(Identifier.of("tmp", "session1"), defaultSessionData);
     * console.log(session.getDefault()); // Output: { score: 0, level: 1 }
     */
    public getDefault(): T;

    /**
     * Retorna o valor de uma chave específica dos dados iniciais da sessão. Este método permite acessar um valor específico do estado original dos dados da sessão, que pode ser restaurado usando o método `reset` com a chave correspondente. O valor retornado é do tipo `T[K]`, onde `K` é a chave fornecida, permitindo flexibilidade na estrutura dos dados armazenados na sessão.
     *
     * @public
     * @template {keyof T} K
     * @param {K} key - A chave específica dos dados iniciais da sessão cujo valor deve ser retornado. Deve ser uma chave válida do tipo genérico `T`.
     * @returns {T[K]} - O valor correspondente à chave fornecida dos dados iniciais da sessão, do tipo `T[K]`, onde `K` é a chave fornecida.
     * 
     * @example
     * const defaultSessionData = { score: 0, level: 1 };
     * type sessionDataType = typeof defaultSessionData;
     * 
     * const session = new Session<sessionDataType>(Identifier.of("tmp", "session1"), defaultSessionData);
     * console.log(session.getDefault("score")); // Output: 0
     * console.log(session.getDefault("level")); // Output: 1
     */
    public getDefault<K extends keyof T>(key: K): T[K];
    public getDefault<K extends keyof T>(key?: K): T | T[K] {
        if (key === undefined) {
            return Session.cloneData(this.initialData);
        }
        return this.initialData[key];
    }

    /**
     * Define os dados da sessão com um novo objeto do tipo genérico `T`. Este método permite substituir completamente os dados atuais da sessão por um novo conjunto de dados, que deve ser do mesmo tipo genérico `T` definido no momento da criação da instância da sessão. A substituição dos dados é feita usando uma cópia profunda para garantir que a referência original dos dados seja mantida, permitindo que o estado original seja restaurado quando necessário.
     *
     * @public
     * @param {T} data - O novo conjunto de dados a ser definido para a sessão, que deve ser do mesmo tipo genérico `T` definido no momento da criação da instância da sessão.
     * @example
     * const session = new Session(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * console.log(session.getData()); // Output: { score: 0, level: 1 }
     * session.setData({ score: 10, level: 2 });
     * console.log(session.getData()); // Output: { score: 10, level: 2 }
     */
    public setData(data: T): void {
        this.data = data;
    }

    /**
     * Define o valor de uma chave específica dos dados da sessão. Este método permite modificar um valor específico dos dados atuais da sessão, usando uma chave válida do tipo genérico `T`. A modificação é feita diretamente na referência dos dados, permitindo que o estado original seja restaurado quando necessário usando o método `reset` com a chave correspondente.
     *
     * @public
     * @param {keyof T} key - A chave específica dos dados da sessão cujo valor deve ser definido. Deve ser uma chave válida do tipo genérico `T`.
     * @param {T[keyof T]} value - O novo valor a ser atribuído à chave específica dos dados da sessão, que deve ser do tipo correspondente à chave fornecida no tipo genérico `T`.
     * 
     * @example
     * const session = new Session(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * session.set("score", 10);
     * console.log(session.get("score")); // Output: 10
     */
    public set(key: keyof T, value: T[keyof T]): void {
        this.data[key] = value;
    }

    /**
     * Retorna o valor de uma chave específica dos dados da sessão. Este método permite acessar um valor específico dos dados atuais da sessão, usando uma chave válida do tipo genérico `T`. O valor retornado é do tipo `T[K]`, onde `K` é a chave fornecida, permitindo flexibilidade na estrutura dos dados armazenados na sessão.
     *
     * @public
     * @template {keyof T} K - A chave específica dos dados da sessão cujo valor deve ser retornado. Deve ser uma chave válida do tipo genérico `T`.
     * @param {K} key - A chave específica dos dados da sessão cujo valor deve ser retornado. Deve ser uma chave válida do tipo genérico `T`.
     * @returns {T[K]} - O valor correspondente à chave fornecida dos dados atuais da sessão, do tipo `T[K]`, onde `K` é a chave fornecida.
     * 
     * @example
     * const session = new Session(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * console.log(session.get("score")); // Output: 0
     * console.log(session.get("level")); // Output: 1
     */
    public get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    /**
     * Reseta os dados da sessão para o estado original. Este método permite restaurar os dados da sessão para o estado inicial, que é armazenado quando a instância da sessão é criada. A restauração dos dados é feita usando uma cópia profunda para garantir que a referência original dos dados seja mantida.
     *
     * @public
     * @example
     * const session = new Session(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * session.set("score", 10);
     * console.log(session.get("score")); // Output: 10
     * session.reset();
     * console.log(session.get("score")); // Output: 0
     */
    public reset(): void;

    /**
     * Reseta um valor específico dos dados da sessão para o estado original. Este método permite restaurar um valor específico dos dados da sessão para o estado inicial, usando uma chave válida do tipo genérico `T`. A restauração do valor é feita diretamente na referência dos dados, permitindo que o estado original seja mantido.
     *
     * @public
     * @template {keyof T} K - A chave específica dos dados da sessão cujo valor deve ser resetado para o estado original. Deve ser uma chave válida do tipo genérico `T`.
     * @param {K} key - A chave específica dos dados da sessão cujo valor deve ser resetado para o estado original. Deve ser uma chave válida do tipo genérico `T`.
     * @example
     * const session = new Session(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * session.set("score", 10);
     * console.log(session.get("score")); // Output: 10
     * session.reset("score");
     * console.log(session.get("score")); // Output: 0
     */
    public reset<K extends keyof T>(key: K): void;
    public reset<K extends keyof T>(key?: K): void {
        if (key === undefined) {
            this.data = Session.cloneData(this.initialData);
            return;
        }
        this.data[key] = this.initialData[key];
    }

    /**
     * Salva os dados da sessão usando o SessionManager. Este método é responsável por chamar o método `saveSession` do SessionManager, passando a instância atual da sessão como argumento para que os dados possam ser armazenados de forma persistente. O processo de salvamento pode envolver a serialização dos dados e o armazenamento em um local específico, dependendo da implementação do SessionManager.
     *
     * @public
     * @example
     * const session = new Session(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * session.save(); // Salva a sessão usando o SessionManager
     */
    public save(): void {
        SessionManager.saveSession(this);
    }

    /**
     * Carrega os dados da sessão usando o SessionManager. Este método é responsável por chamar o método `loadSession` do SessionManager, passando o identificador da sessão e os dados atuais como argumentos para que os dados possam ser recuperados de forma persistente. Se os dados forem carregados com sucesso, eles são definidos como os dados atuais da sessão, permitindo que o estado da sessão seja restaurado para um estado previamente salvo.
     *
     * @public
     * @example
     * const session = new Session(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * session.load(); // Carrega a sessão usando o SessionManager
     * console.log(session.getData()); // Output: { score: 0, level: 1 } (ou os dados salvos anteriormente)
     */
    public load(): void {
        const loaded = SessionManager.loadSession(this.id, this.getData());
        if (loaded) {
            this.setData(loaded.getData());
        }
    }
}
export default Session;