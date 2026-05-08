import PreLoader from "core/structure/PreLoader.js";
import EventList from "./EventList.js";
import GameInjectionManifestStructure from "./GameInjectionManifestStructure.js";
import Loader from "core/structure/Loader.js";
import DOMLoader from "core/structure/DOMLoader.js";
import Unloader from "core/structure/Unloader.js";
import LanguageProvider from "core/structure/providers/LanguageProvider.js";


/**
 * GameInjector
 * 
 * Classe responsável por gerenciar o processo de injeção dos componentes essenciais do jogo, incluindo o PreLoader, Loader, DOMLoader e Unloader. O GameInjector mantém um registro dos manifestos de injeção do jogo e é responsável por carregar os namespaces correspondentes durante a inicialização do jogo. Ele também possui um evento antes do carregamento, permitindo que outras partes do código se inscrevam para executar ações antes do início do processo de injeção.
 *
 * @export
 */
export class GameInjector {

    /**
     * Mapa que armazena os manifestos de injeção do jogo, associando cada manifesto a um namespace específico. Este mapa é usado para gerenciar e acessar os manifestos durante o processo de injeção, permitindo que o GameInjector carregue os componentes corretos para cada namespace quando necessário.
     *
     * @public
     * @static
     * @type {Map<string, GameInjectionManifestStructure>}
     */
    public static manifests: Map<string, GameInjectionManifestStructure> = new Map();

    /**
     * Carrega um namespace específico, buscando o manifesto de injeção correspondente e executando o processo de injeção dos componentes listados no manifesto. Este método é responsável por garantir que os componentes sejam carregados e configurados corretamente para o ciclo de vida do jogo, e é chamado durante a inicialização do jogo para cada namespace registrado no mapa de manifestos.
     *
     * @public
     * @static
     * @async
     * @param {string} name - O nome do namespace a ser carregado.
     * @returns {Promise<void>} - Uma promessa que é resolvida quando o processo de carregamento do namespace é concluído.
     */
    public static async loadNamespace(name: string): Promise<void> {
        const manifest = GameInjector.manifests.get(name);
        if (!manifest) throw new Error(`Namespace ${name} not found`);
        await GameInjector.inject(
            manifest.preLoader,
            manifest.loader,
            manifest.domLoader,
            manifest.unloader
        );
    }

    /**
     * Inicializa o GameInjector, configurando o evento antes do carregamento para carregar os namespaces registrados no mapa de manifestos. Este método é chamado durante a inicialização do jogo para garantir que os componentes essenciais sejam carregados e configurados corretamente antes do início do ciclo de vida do jogo. Ele também aciona o evento antes do carregamento, permitindo que outras partes do código se inscrevam para executar ações antes do início do processo de injeção.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<void>} - Uma promessa que é resolvida quando o processo de inicialização do GameInjector é concluído.
     */
    public static async init(): Promise<void> {
        GameInjector.beforeLoad.addEventListener(async () => {
            GameInjector.manifests.forEach(async (v, k) => {
                await GameInjector.loadNamespace(k);
            })
        });
        await GameInjector.beforeLoad.triggerAsync();
    }

    /**
     * Evento antes do carregamento, que é acionado antes do início do processo de injeção dos componentes do jogo. Este evento permite que outras partes do código se inscrevam para executar ações antes do início do processo de injeção, como configurar variáveis, carregar recursos adicionais ou realizar outras tarefas preparatórias necessárias para o ciclo de vida do jogo.
     *
     * @public
     * @static
     * @type {EventList<() => Promise<void>>} - Uma lista de eventos que aceita funções assíncronas sem parâmetros, que serão chamadas quando o evento for acionado.
     */
    public static beforeLoad = new EventList<() => Promise<void>>();

    /**
     * Realiza o processo de injeção dos componentes essenciais do jogo, incluindo o PreLoader, Loader, DOMLoader e Unloader. Este método é responsável por chamar os métodos principais de cada componente na ordem correta, garantindo que eles sejam configurados corretamente para o ciclo de vida do jogo. Ele também adiciona um ouvinte para o evento "beforeunload" do navegador, garantindo que o Unloader seja chamado para realizar a limpeza e descarregamento dos recursos quando o usuário sair da página ou fechar o navegador.
     *
     * @public
     * @static
     * @async
     * @param {typeof PreLoader} preLoader - Referência ao PreLoader, responsável por carregar recursos antes do início do jogo.
     * @param {typeof Loader} loader - Referência ao Loader, que gerencia o carregamento dos recursos principais do jogo.
     * @param {typeof DOMLoader} domLoader - Referência ao DOMLoader, encarregado de manipular elementos do DOM relacionados ao jogo.
     * @param {typeof Unloader} unloader - Referência ao Unloader, que lida com a limpeza e descarregamento dos recursos quando necessário.
     * @returns {*} 
     */
    public static async inject(
        preLoader: typeof PreLoader,
        loader: typeof Loader,
        domLoader: typeof DOMLoader,
        unloader: typeof Unloader
    ) {
        await preLoader.main();
        await loader.main();
        await domLoader.main();
        window.addEventListener("beforeunload", async () => {
            await unloader.main();
        });
    }
}
export default GameInjector;