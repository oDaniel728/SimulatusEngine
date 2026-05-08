import Identifier from "core/structure/Identifier";
import Session from "./Session";

/**
 * SessionManager
 *
 * Classe responsável por gerenciar a persistência e recuperação de sessões usando o localStorage do navegador. O SessionManager fornece métodos para salvar, carregar e deletar sessões, bem como para obter valores específicos de uma sessão usando um caminho de chave. Ele é projetado para trabalhar com a classe Session, permitindo que os dados da sessão sejam armazenados e recuperados de forma persistente entre as sessões do navegador.
 */
export default class SessionManager {
    
    /**
     * Salva os dados da sessão usando o localStorage do navegador. Este método é responsável por serializar os dados da sessão em formato JSON e armazená-los no localStorage usando uma chave única baseada no identificador da sessão. Ele também inclui tratamento de erros para garantir que quaisquer problemas durante o processo de salvamento sejam registrados no console.
     *
     * @public
     * @static
     * @template {Record<string, any>} T - O tipo genérico que representa a estrutura dos dados da sessão, que deve ser um objeto com chaves de string e valores de qualquer tipo.
     * @param {Session<T>} session - A instância da sessão cujos dados devem ser salvos, que deve ser do tipo `Session<T>`, onde `T` é o tipo genérico definido para os dados da sessão.
     * 
     * @example
     * const session = new Session(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * SessionManager.saveSession(session); // Isso salvará os dados da sessão no localStorage do navegador.
     */
    public static saveSession<T extends Record<string, any>>(session: Session<T>): void {
        try {
            const serialized = JSON.stringify(session.getData());
            localStorage.setItem(`simulatus_session_${session.id}`, serialized);
        } catch (error) {
            console.error("Error saving session:", error);
        }
    }

    /**
     * Carrega os dados da sessão usando o localStorage do navegador. Este método é responsável por recuperar os dados da sessão do localStorage usando a chave única baseada no identificador da sessão, desserializar os dados de formato JSON e retornar uma nova instância da classe Session com os dados carregados. Ele também inclui tratamento de erros para garantir que quaisquer problemas durante o processo de carregamento sejam registrados no console, e retorna null se a sessão não puder ser carregada.
     *
     * @public
     * @static
     * @template {Record<string, any>} T - O tipo genérico que representa a estrutura dos dados da sessão, que deve ser um objeto com chaves de string e valores de qualquer tipo.
     * @param {Identifier} id - O identificador único da sessão a ser carregada, que deve ser do tipo `Identifier`, representando o namespace e nome da sessão a ser recuperada.
     * @param {T} defaultData - Os dados padrão a serem usados para a sessão caso a sessão não possa ser carregada, que deve ser do mesmo tipo genérico `T` definido para os dados da sessão.
     * @returns {(Session<T> | null)} - Uma nova instância da classe Session com os dados carregados, ou null se a sessão não puder ser carregada.
     * 
     * @example
     * const session = SessionManager.loadSession(Identifier.of("tmp", "session1"), { score: 0, level: 1 });
     * if (session) {
     *     console.log(session.getData()); // Output: { score: 0, level: 1 } (ou os dados salvos anteriormente)
     * } else {
     *     console.log("Session could not be loaded.");
     * }
     */
    public static loadSession<T extends Record<string, any>>(id: Identifier, defaultData: T): Session<T> | null {
        try {
            const serialized = localStorage.getItem(`simulatus_session_${id}`);
            if (!serialized) {
                return null;
            }
            const data = JSON.parse(serialized) as T;
            return new Session(id, data);
        } catch (error) {
            console.error("Error loading session:", error);
            return null;
        }
    }

    /**
     * Deleta uma sessão do localStorage do navegador usando o identificador da sessão. Este método é responsável por remover os dados da sessão do localStorage usando a chave única baseada no identificador da sessão. Ele também inclui tratamento de erros para garantir que quaisquer problemas durante o processo de deleção sejam registrados no console.
     *
     * @public
     * @static
     * @param {Identifier} id - O identificador único da sessão a ser deletada, que deve ser do tipo `Identifier`, representando o namespace e nome da sessão a ser removida do localStorage.
     * 
     * @example
     * SessionManager.deleteSession(Identifier.of("tmp", "session1")); // Isso deletará a sessão com o identificador "tmp:session1" do localStorage do navegador.
     */
    public static deleteSession(id: Identifier): void {
        try {
            localStorage.removeItem(`simulatus_session_${id}`);
        } catch (error) {
            console.error("Error deleting session:", error);
        }
    }

    /**
     * Obtém um valor específico de uma sessão usando um caminho de chave. Este método é responsável por recuperar os dados da sessão do localStorage usando a chave única baseada no identificador da sessão, desserializar os dados de formato JSON e navegar pela estrutura dos dados usando o caminho de chave fornecido para retornar o valor correspondente. O caminho de chave deve ser uma string no formato "chave1.chave2.chave3", onde cada parte representa uma chave aninhada nos dados da sessão. Ele também inclui tratamento de erros para garantir que quaisquer problemas durante o processo de obtenção do valor sejam registrados no console, e retorna null se o valor não puder ser obtido.
     *
     * @public
     * @static
     * @template {any} T - O tipo genérico que representa o tipo do valor a ser obtido da sessão, que pode ser de qualquer tipo.
     * @param {Identifier} id - O identificador único da sessão da qual o valor deve ser obtido, que deve ser do tipo `Identifier`, representando o namespace e nome da sessão a ser acessada.
     * @param {string} path - O caminho de chave para o valor a ser obtido, que deve ser uma string no formato "chave1.chave2.chave3", onde cada parte representa uma chave aninhada nos dados da sessão.
     * @returns {(T | null)} 
     * 
     * @example
     * const score = SessionManager.getValue<number>(Identifier.of("tmp", "session1"), "score");
     * if (score !== null) {
     *     console.log(score); // Output: 0 (ou o valor salvo anteriormente para "score")
     * } else {
     *     console.log("Value could not be obtained.");
     * }
     */
    public static getValue<T extends any>(id: Identifier, path: string): T | null {
        // path : "path.to.key"
        try {
            const serialized = localStorage.getItem(`simulatus_session_${id}`);
            if (!serialized) {
                return null;
            }
            const data = JSON.parse(serialized);
            const keys = path.split(".");
            let current: any = data;
            for (const key of keys) {
                if (current[key] === undefined) {
                    return null;
                }
                current = current[key];
            }
            return current as T;
        } catch (error) {
            console.error("Error getting session value:", error);
            return null;
        }
    }
}