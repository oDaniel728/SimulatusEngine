import DOMLoader from "core/structure/DOMLoader.js";
import Loader from "core/structure/Loader.js";
import PreLoader from "core/structure/PreLoader.js";
import Unloader from "core/structure/Unloader.js";
import GameInjector from "./GameInjector.js";

/**
 * GameInjectionManifestStructure
 * 
 * Estrutura de dados para o manifesto de injeção do jogo, contendo referências aos componentes essenciais para o processo de injeção. Esta estrutura inclui o PreLoader, responsável por carregar recursos antes do início do jogo; o Loader, que gerencia o carregamento dos recursos principais; o DOMLoader, encarregado de manipular elementos do DOM relacionados ao jogo; e o Unloader, que lida com a limpeza e descarregamento dos recursos quando necessário. A classe também possui um método para registrar esses componentes no processo de injeção do jogo, garantindo que eles sejam integrados corretamente ao ciclo de vida do jogo.
 * 
 * @public
 * @class
 * 
 * @example
 * const manifest = new GameInjectionManifestStructure(PreLoader, Loader, DOMLoader, Unloader);
 * manifest.register();
*/
export class GameInjectionManifestStructure {
    
    /**
     * Referência ao PreLoader, responsável por carregar recursos antes do início do jogo.
     */
    public preLoader: typeof PreLoader;
    
    /**
     * Referência ao Loader, que gerencia o carregamento dos recursos principais do jogo.
     */
    public loader: typeof Loader;
    
    /**
     * Referência ao DOMLoader, encarregado de manipular elementos do DOM relacionados ao jogo.
     */
    public domLoader: typeof DOMLoader;
    
    /**
     * Referência ao Unloader, que lida com a limpeza e descarregamento dos recursos quando necessário.
     */
    public unloader: typeof Unloader;

    /**
     * Tenta registrar o manifesto de injeção do jogo, integrando os componentes ao processo de injeção. Este método é responsável por chamar o GameInjector para realizar a injeção dos componentes fornecidos, garantindo que eles sejam configurados corretamente para o ciclo de vida do jogo. Durante o processo, mensagens de log são geradas para acompanhar o progresso da injeção.
     *
     * @public
     * @param {string} message - A mensagem a ser registrada no log.
     */
    public tryLog(message: string) {
        this.loader.LOGGER.info(message);
    }

    /**
     * Construtor da classe GameInjectionManifestStructure, que recebe as referências aos componentes essenciais para o processo de injeção do jogo. Os parâmetros incluem o PreLoader, Loader, DOMLoader e Unloader, que são armazenados como propriedades da instância para serem usados posteriormente no processo de registro e injeção.
     *
     * @constructor
     * @param {typeof PreLoader} preLoader - Referência ao PreLoader, responsável por carregar recursos antes do início do jogo.
     * @param {typeof Loader} loader - Referência ao Loader, que gerencia o carregamento dos recursos principais do jogo.
     * @param {typeof DOMLoader} domLoader - Referência ao DOMLoader, encarregado de manipular elementos do DOM relacionados ao jogo.
     * @param {typeof Unloader} unloader - Referência ao Unloader, que lida com a limpeza e descarregamento dos recursos quando necessário.
     */
    constructor(
        preLoader: typeof PreLoader,
        loader: typeof Loader,
        domLoader: typeof DOMLoader,
        unloader: typeof Unloader
    ) {
        this.preLoader = preLoader;
        this.loader = loader;
        this.domLoader = domLoader;
        this.unloader = unloader;
    }

    /**
     * Registra o manifesto de injeção do jogo, integrando os componentes ao processo de injeção. Este método é responsável por chamar o GameInjector para realizar a injeção dos componentes fornecidos, garantindo que eles sejam configurados corretamente para o ciclo de vida do jogo. Durante o processo, mensagens de log são geradas para acompanhar o progresso da injeção.
     *
     * @public
     * @async
     * @returns {Promise<void>} - Uma promessa que é resolvida quando o processo de registro e injeção é concluído.
     */
    public async register(): Promise<void> {
        this.tryLog("Registering pack of data of name: " + this.loader.ID);
        await GameInjector.inject(this.preLoader, this.loader, this.domLoader, this.unloader);
    }
}

export default GameInjectionManifestStructure;