/**
 * EventList.ts
 *
 * Auto-generated documentation comment for core/engine/utils/EventList.ts.
 */

type EventListenerProps = {
    once?: boolean;
}

/**
 * EventList
 *
 * Class for the engine.
 */
export default class EventList<F extends (...args: any[]) => void> {
    private events: F[];

    /**
     * Cria uma instância de EventList, uma lista de funções com um ativador.
     *
     * @example
     * const eventList = new EventList<(message: string) => void>();
     * 
     * // Adiciona um ouvinte de evento que será chamado apenas uma vez
     * eventList.addEventListener((message) => {
     *      console.log("Evento recebido:", message);
     * })
     * 
     * // Ativa o evento, chamando todos os ouvintes registrados
     * eventList.trigger("Olá, mundo!");
     * 
     * @constructor
     */
    constructor() {
        this.events = [];
    }

    /**
     * Adiciona um ouvinte de evento à lista.
     * 
     * @example
     * const eventList = new EventList<(message: string) => void>();
     * 
     * // Adiciona um ouvinte de evento que será chamado apenas uma vez
     * eventList.addEventListener((message) => {
     *     console.log("Primeiro evento recebido:", message);
     * }, { once: true });
     * 
     * // Adiciona um ouvinte de evento que será chamado todas as vezes que o evento for ativado
     * eventList.addEventListener((message) => {
     *    console.log("Segundo evento recebido:", message);
     * });
     *
     * @public
     * @param {F} event - A função do evento a ser adicionada.
     * @param {EventListenerProps} [props] - As propriedades do ouvinte de evento.
     */
    public addEventListener(event: F, props?: EventListenerProps): void {
        if (props?.once) {
            const wrapper: F = ((...args: Parameters<F>) => {
                event(...args);
                this.remove(wrapper);
            }) as F;
            this.events.push(wrapper);
        } else {
            this.events.push(event);
        }
    }

    /**
     * Retorna uma promessa que é resolvida quando o próximo evento é acionado, passando os argumentos do evento para a resolução da promessa.
     *
     * @example
     * const eventList = new EventList<(message: string) => void>();
     * eventList.wait().then((args) => {
     *     console.log("Evento recebido:", args[0]);
     * });
     * eventList.trigger("Olá, mundo!"); // Isso acionará a promessa e imprimirá "Evento recebido: Olá, mundo!"
     * 
     * @public
     * @async
     * @returns {Promise<Parameters<F>>} - Uma promessa que é resolvida com os argumentos do próximo evento acionado.
     */
    public async wait(): Promise<Parameters<F>> {
        return new Promise<Parameters<F>>((resolve) => {
            const wrapper: F = ((...args: Parameters<F>) => {
                resolve(args);
                this.remove(wrapper);
            }) as F;
            this.addEventListener(wrapper);
        });
    }

    /**
     * Remove um ouvinte de evento da lista.
     *
     * @example
     * const eventList = new EventList<(message: string) => void>();
     * const listener = (message: string) => {
     *    console.log("Evento recebido:", message);
     * };
     * eventList.addEventListener(listener);
     * eventList.trigger("Olá, mundo!"); // Isso acionará o ouvinte e imprimirá "Evento recebido: Olá, mundo!"
     * eventList.remove(listener);    
     * 
     * @public
     * @param {F} event - A função do evento a ser removida da lista.
     */
    public remove(event: F): void {
        this.events = this.events.filter(e => e !== event);
    }

    /**
     * Aciona o evento, chamando todas as funções de ouvinte registradas na lista com os argumentos fornecidos.
     * 
     * @example
     * const eventList = new EventList<(message: string) => void>();
     * eventList.addEventListener((message) => {
     *     console.log("Evento recebido:", message);
     * });
     * 
     * eventList.trigger("Olá, mundo!"); // Isso acionará o ouvinte e imprimirá "Evento recebido: Olá, mundo!"
     *
     * @public
     * @param {...Parameters<F>} args 
     */
    public trigger(...args: Parameters<F>): void {
        for (const event of this.events) {
            event(...args);
        }
    }

    /**
     * Aciona o evento de forma assíncrona, chamando todas as funções de ouvinte registradas na lista com os argumentos fornecidos e aguardando a conclusão de cada função antes de passar para a próxima.
     * 
     * @example
     * const eventList = new EventList<(...args: any[]) => Promise<void>>();
     * eventList.addEventListener(async (message) => {
     *     await new Promise(resolve => setTimeout(resolve, 1000)); // Simula uma operação assíncrona
     *     console.log("Evento recebido:", message);
     * });
     * eventList.triggerAsync("Olá, mundo!"); // Isso acionará o ouvinte e imprimirá "Evento recebido: Olá, mundo!" após 1 segundo
     *
     * @public
     * @async
     * @param {...Parameters<F>} args 
     * @returns {Promise<void>} - Uma promessa que é resolvida quando todas as funções de ouvinte tiverem sido chamadas e concluídas.
     */
    public async triggerAsync(...args: Parameters<F>): Promise<void> {
        for (const event of this.events) {
            await event(...args);
        }
    }
}