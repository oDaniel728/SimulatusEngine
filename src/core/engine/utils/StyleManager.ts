import { StandardLonghandPropertiesHyphen } from "csstype";
import StyleClass from "./StyleClass";
import BoardElement from "../BoardElement";

export type CSSLikeProperties = StandardLonghandPropertiesHyphen;
export type HasSomeHTMLElement = { getElement() : HTMLElement }

/**
 * StyleManager - Gerenciador de Estilos
 *
 * @export
 * @class StyleManager
 */
export class StyleManager {

    private static get styleClassInstances() {
        return StyleClass.getInstances();
    }

    /**
     * Obtém todas as instâncias de StyleClass criadas, retornando um conjunto contendo todas as classes de estilo que foram definidas. Este método é usado internamente para gerenciar e acessar as instâncias de StyleClass, permitindo que o StyleManager atualize as regras CSS para todas as classes de estilo quando necessário.
     *
     * @public
     * @static
     * @returns {Set<StyleClass>} 
     */
    public static getInstances(): Set<StyleClass> {
        return this.styleClassInstances;
    }

    /**
     * Atualiza todas as instâncias de StyleClass, chamando o método update() para cada instância de classe de estilo registrada. Este método é usado internamente para garantir que todas as regras CSS associadas às classes de estilo sejam mantidas atualizadas e aplicadas corretamente aos elementos do tabuleiro aos quais as classes foram aplicadas.
     *
     * @public
     * @static
     * @example
     * StyleManager.updateAll(); // Isso atualizará todas as instâncias de StyleClass, garantindo que as regras CSS sejam mantidas atualizadas e aplicadas corretamente aos elementos do tabuleiro.
     */
    public static updateAll(): void {
        this.styleClassInstances.forEach(instance => instance.update());
    }

    /**
     * Cria uma nova classe de estilo com o nome e propriedades especificados, instanciando uma nova StyleClass com os parâmetros fornecidos e retornando a instância criada. Este método é usado para facilitar a criação de classes de estilo personalizadas, permitindo que os desenvolvedores definam regras CSS específicas para serem aplicadas aos elementos do tabuleiro.
     *
     * @public
     * @static
     * @param {string} className - O nome da classe de estilo a ser criada, que deve ser uma string representando o nome da classe CSS a ser definida.
     * @param {CSSLikeProperties} properties - As propriedades CSS a serem associadas à classe de estilo, que devem ser um objeto onde as chaves são os nomes das propriedades CSS e os valores são os valores correspondentes para essas propriedades.
     * @returns {StyleClass}
     * 
     * @example 
     * const styleClass = StyleManager.createClass("my-style", { backgroundColor: "blue", color: "white" }); // Isso criará uma nova classe de estilo chamada "my-style" com as propriedades de fundo azul e cor branca.
     * StyleManager.applyClass(someElement, styleClass); // Isso aplicará a classe de estilo "my-style" ao elemento especificado, adicionando as regras CSS definidas para essa classe ao elemento.
     */
    public static createClass(className: string, properties: CSSLikeProperties): StyleClass {
        const cls = new StyleClass(className, properties);
        return cls;
    }

    /**
     * Aplica a classe de estilo ao elemento especificado, adicionando a classe CSS ao elemento e garantindo que as regras definidas para essa classe sejam aplicadas corretamente. Este método é usado para facilitar a aplicação de classes de estilo personalizadas aos elementos do tabuleiro, permitindo que os desenvolvedores apliquem regras CSS específicas a elementos individuais ou a grupos de elementos usando as classes de estilo definidas.
     *
     * @public
     * @static
     * @param {(HTMLElement | HasSomeHTMLElement)} element - O elemento HTML ou objeto que possui um método getElement() para obter o elemento HTML ao qual a classe de estilo deve ser aplicada. Este parâmetro pode ser uma instância de HTMLElement ou qualquer objeto que implemente a interface HasSomeHTMLElement, permitindo flexibilidade na forma como os elementos são referenciados.
     * @param {StyleClass} styleClass - A classe de estilo a ser aplicada ao elemento, que deve ser uma instância de StyleClass contendo as regras CSS a serem aplicadas.
     * 
     * @example
     * const styleClass = StyleManager.createClass("my-style", { backgroundColor: "blue", color: "white" });
     * StyleManager.applyClass(someElement, styleClass); // Isso aplicará a classe de estilo "my-style" ao elemento especificado, adicionando as regras CSS definidas para essa classe ao elemento.
     */
    public static applyClass(element: HTMLElement | HasSomeHTMLElement, styleClass: StyleClass): void {
        const el = element instanceof HTMLElement ? element : element.getElement();
        el.classList.add(styleClass.className);
    }
}
export default StyleManager;