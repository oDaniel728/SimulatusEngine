import BoardApplier from "../appliers/BoardApplier";
import BoardElement from "../BoardElement";
import { CSSLikeProperties } from "./StyleManager";

/**
 * StyleClass
 * 
 * Classe responsável por criar e gerenciar classes de estilo CSS dinâmicas para elementos do tabuleiro. A StyleClass permite definir propriedades CSS de forma programática e aplicá-las a elementos específicos do tabuleiro, facilitando a personalização visual dos elementos com base em regras definidas em tempo de execução. Ela também gerencia a criação de uma tag <style> no documento para armazenar as regras CSS geradas, garantindo que as classes de estilo sejam aplicadas corretamente aos elementos do tabuleiro.
 *
 * @export
 * @class StyleClass
 * @implements {BoardApplier}
 * 
 * @example
 * const styleClass = new StyleClass("my-style", { backgroundColor: "blue", color: "white" });
 * styleClass.applyToBoardElement(someBoardElement); // Isso aplicará a classe "my-style" ao elemento do tabuleiro, definindo o fundo azul e o texto branco.
 * styleClass.setProperty("backgroundColor", "red"); // Isso atualizará a propriedade de fundo para vermelho, e a classe será atualizada automaticamente para refletir a mudança.
 * styleClass.remove(someBoardElement); // Isso removerá a classe "my-style" do elemento do tabuleiro, revertendo as alterações de estilo aplicadas.
 */
export default class StyleClass implements BoardApplier {

    /**
     * O nome da classe CSS gerada, que é usado para aplicar as regras de estilo aos elementos do tabuleiro. Este nome é único para cada instância da StyleClass e é usado como seletor CSS para definir as regras de estilo associadas a essa classe.
     *
     * @public
     * @readonly
     * @type {string} - O nome da classe CSS gerada, do tipo string, que é definido no momento da criação da instância da StyleClass e não pode ser alterado posteriormente.
     */
    public readonly className: string;

    /**
     * As propriedades CSS associadas à classe de estilo, que são definidas como um objeto onde as chaves são os nomes das propriedades CSS e os valores são os valores correspondentes para essas propriedades. Essas propriedades são usadas para gerar as regras CSS que serão aplicadas aos elementos do tabuleiro quando a classe for aplicada.
     *
     * @protected
     * @type {CSSLikeProperties}
     * 
     * @example
     * const styleClass = new StyleClass("my-style", { backgroundColor: "blue", color: "white" });
     * console.log(styleClass.getProperties()); // Output: { backgroundColor: "blue", color: "white" }
     * styleClass.setProperty("backgroundColor", "red");
     * console.log(styleClass.getProperties()); // Output: { backgroundColor: "red", color: "white" }
     */
    protected properties: CSSLikeProperties;

    public readonly styleEl: HTMLStyleElement;

    
    /**
     * A tag <style> usada para armazenar as regras CSS geradas para as classes de estilo. Esta propriedade é compartilhada entre todas as instâncias da StyleClass, garantindo
     *
     * @public
     * @static
     * @type {HTMLStyleElement}
     * 
     * @example
     * const styleClass1 = new StyleClass("style1", { backgroundColor: "blue" });
     * const styleClass2 = new StyleClass("style2", { color: "red" });
     * console.log(StyleClass.StyleElement === styleClass1.getElement()); // Output: true
     * console.log(StyleClass.StyleElement === styleClass2.getElement()); // Output: true
     */
    public static get StyleElement(): HTMLStyleElement {
        if (!this.lastStyleTag) {
            this.lastStyleTag = document.createElement("style");
            document.head.appendChild(this.lastStyleTag);
        }
        return this.lastStyleTag;
    }
    public static set StyleElement(el: HTMLStyleElement) {
        this.lastStyleTag = el;
    }

    private elementsWithClass: Set<BoardElement> = new Set();

    private static Instances: Set<StyleClass> = new Set();

    protected static lastStyleTag: HTMLStyleElement | null = null;

    /**
     * Obtém todas as instâncias de StyleClass criadas, retornando um conjunto contendo todas as instâncias ativas. Este método é útil para gerenciar e atualizar as regras CSS associadas a todas as classes de estilo criadas, permitindo que o sistema mantenha um controle centralizado sobre as classes de estilo e suas propriedades.
     *
     * @public
     * @static
     * @returns {Set<StyleClass>} 
     * @example
     * const styleClass1 = new StyleClass("style1", { backgroundColor: "blue" });
     * const styleClass2 = new StyleClass("style2", { color: "red" });
     * const instances = StyleClass.getInstances();
     * console.log(instances.has(styleClass1)); // Output: true
     * console.log(instances.has(styleClass2)); // Output: true
     */
    public static getInstances(): Set<StyleClass> {
        return this.Instances;
    }

    /**
     * Atualiza as regras CSS para todas as instâncias de StyleClass criadas, gerando o conteúdo CSS com base nas propriedades definidas para cada classe de estilo e atualizando a tag <style> compartilhada para refletir as mudanças. Este método é chamado sempre que uma propriedade de estilo é alterada em qualquer instância de StyleClass, garantindo que as regras CSS sejam mantidas atualizadas e aplicadas corretamente aos elementos do tabuleiro.
     *
     * @public
     * @static
     * @example
     * const styleClass1 = new StyleClass("style1", { backgroundColor: "blue" });
     * const styleClass2 = new StyleClass("style2", { color: "red" });
     * styleClass1.setProperty("backgroundColor", "green"); // Isso atualizará a propriedade de fundo para verde e chamará StyleClass.updateAll() para refletir a mudança em todas as instâncias.
     * styleClass2.setProperty("color", "blue"); // Isso atualizará a propriedade de cor para azul e chamará StyleClass.updateAll() para refletir a mudança em todas as instâncias.
     * 
     * StyleClass.updateAll(); // Isso forçará a atualização de todas as regras CSS para as instâncias de StyleClass, garantindo que as mudanças sejam aplicadas corretamente aos elementos do tabuleiro.
     */
    public static updateAll(): void {
        const content = new Set<String>();
        this.Instances.forEach(instance => {
            content.add(instance.toString());
        });
        if (this.lastStyleTag) {
            this.lastStyleTag.innerHTML = Array.from(content).join("\n");
        }
    }

    /**
     * Obtém a tag <style> associada à classe de estilo, que é usada para armazenar as regras CSS geradas para essa classe. Este método retorna a tag <style> compartilhada entre todas as instâncias de StyleClass, garantindo
     *
     * @public
     * @returns {HTMLStyleElement} 
     * @example
     * const styleClass = new StyleClass("my-style", { backgroundColor: "blue" });
     * const styleElement = styleClass.getElement();
     * console.log(styleElement.tagName); // Output: "STYLE"
     */
    public getElement(): HTMLStyleElement {
        return this.styleEl;
    }

    /**
     * Cria uma instância de StyleClass.
     *
     * @constructor
     * @example
     * const styleClass1 = new StyleClass(); // Isso criará uma classe de estilo com um nome gerado aleatoriamente e sem propriedades definidas.
     */
    constructor();

    /**
     * Cria uma instância de StyleClass com um nome de classe específico e um conjunto de propriedades CSS. Este construtor permite definir o nome da classe CSS e as propriedades associadas a essa classe no momento da criação da instância, facilitando a personalização visual dos elementos do tabuleiro desde o início.
     *
     * @constructor
     * @param {CSSLikeProperties} properties - As propriedades CSS associadas à classe de estilo, definidas como um objeto onde as chaves são os nomes das propriedades CSS e os valores são os valores correspondentes para essas propriedades. Essas propriedades são usadas para gerar as regras CSS que serão aplicadas aos elementos do tabuleiro quando a classe for aplicada.
     * @example
     * const styleClass = new StyleClass({ backgroundColor: "blue", color: "white" }); // Isso criará uma classe de estilo com um nome gerado aleatoriamente e as propriedades de fundo azul e texto branco.
     */
    constructor(properties: CSSLikeProperties);

    /**
     * Cria uma instância de StyleClass com um nome de classe específico e um conjunto de propriedades CSS. Este construtor permite definir o nome da classe CSS e as propriedades associadas a essa classe no momento da criação da instância, facilitando a personalização visual dos elementos do tabuleiro desde o início.
     *
     * @constructor
     * @param {string} className - O nome da classe CSS a ser gerada, definido como uma string. Este nome é usado como seletor CSS para definir as regras de estilo associadas a essa classe e deve ser único para evitar conflitos com outras classes CSS.
     * @param {CSSLikeProperties} properties - As propriedades CSS associadas à classe de estilo, definidas como um objeto onde as chaves são os nomes das propriedades CSS e os valores são os valores correspondentes para essas propriedades. Essas propriedades são usadas para gerar as regras CSS que serão aplicadas aos elementos do tabuleiro quando a classe for aplicada.
     * @example
     * const styleClass = new StyleClass("my-style", { backgroundColor: "blue", color: "white" }); // Isso criará uma classe de estilo com o nome "my-style" e as propriedades de fundo azul e texto branco.
     */
    constructor(className: string, properties: CSSLikeProperties);

    constructor(className?: string | CSSLikeProperties, properties?: CSSLikeProperties) {
        if (!StyleClass.lastStyleTag) {
            StyleClass.lastStyleTag = document.createElement("style");
            this.styleEl = StyleClass.lastStyleTag;
            document.head.appendChild(StyleClass.lastStyleTag);
        }
        this.className = typeof className === "string" ? className : "";
        this.properties = {};
        if (!className) {
            this.className = `style-class-${Math.random().toString(36).substr(2, 9)}`;
        } else if (typeof className === "object") {
            this.properties = className;
        } else if (properties) {
            this.properties = properties;
        }
        this.styleEl = StyleClass.lastStyleTag!;
        this.update();
        StyleClass.Instances.add(this);
    }

    /**
     * Aplica a classe de estilo a um elemento do tabuleiro específico, adicionando o nome da classe CSS ao elemento e garantindo que as regras de estilo associadas a essa classe sejam aplicadas ao elemento. Este método também mantém um registro dos elementos do tabuleiro aos quais a classe foi aplicada, permitindo que as regras de estilo sejam gerenciadas e atualizadas corretamente quando as propriedades da classe forem alteradas.
     *
     * @param {BoardElement} element 
     * @example
     * const styleClass = new StyleClass("my-style", { backgroundColor: "blue", color: "white" });
     * styleClass.applyToBoardElement(someBoardElement); // Isso aplicará a classe "my-style" ao elemento do tabuleiro, definindo o fundo azul e o texto branco.
     */
    applyToBoardElement(element: BoardElement): void {
        this.elementsWithClass.add(element);
        element.getElement().classList.add(this.className);
    }

    /**
     * Atualiza as regras CSS para a classe de estilo, gerando o conteúdo CSS com base nas propriedades definidas para a classe e atualizando a tag <style> compartilhada para refletir as mudanças. Este método é chamado sempre que uma propriedade de estilo é alterada na instância de StyleClass, garantindo que as regras CSS sejam mantidas atualizadas e aplicadas corretamente aos elementos do tabuleiro aos quais a classe foi aplicada.
     * 
     * @example
     * const styleClass = new StyleClass("my-style", { backgroundColor: "blue", color: "white" });
     * styleClass.setProperty("backgroundColor", "red"); // Isso atualizará a propriedade de fundo para vermelho e chamará StyleClass.update() para refletir a mudança em todas as instâncias.
     */
    public update(): void {
        StyleClass.updateAll();
    }

    /**
     * Gera a representação em string da classe de estilo, formatando as propriedades CSS em um formato válido para ser usado como conteúdo de uma tag <style>. Este método é usado internamente para criar as regras CSS que serão aplicadas aos elementos do tabuleiro quando a classe for aplicada, garantindo que as propriedades definidas sejam convertidas corretamente em regras CSS válidas.
     *
     * @public
     * @returns {string} 
     */
    public toString(): string {
        const cssProperties = Object.entries(this.properties)
            .map(([key, value]) => `${key}: ${value};`)
            .join(" ");
        return `.${this.className} { ${cssProperties} }`;
    }

    /**
     * Obtém as propriedades CSS associadas à classe de estilo, retornando um objeto onde as chaves são os nomes das propriedades CSS e os valores são os valores correspondentes para essas propriedades. Este método permite acessar as propriedades definidas para a classe de estilo, facilitando a leitura e manipulação das regras de estilo associadas a essa classe.
     *
     * @public
     * @returns {CSSLikeProperties} 
     */
    public getProperties(): CSSLikeProperties {
        return {...this.properties};
    }
    
    /**
     * Define as propriedades CSS associadas à classe de estilo, atualizando o objeto de propriedades com um novo conjunto de propriedades fornecido como argumento. Este método permite substituir completamente as propriedades definidas para a classe de estilo, facilitando a atualização das regras de estilo associadas a essa classe e garantindo que as mudanças sejam refletidas corretamente nos elementos do tabuleiro aos quais a classe foi aplicada.
     *
     * @public
     * @param {CSSLikeProperties} newProperties 
     */
    public setProperties(newProperties: CSSLikeProperties): void {
        this.properties = newProperties;
        this.update();
    }

    /**
     * Obtém o valor de uma propriedade CSS específica associada à classe de estilo, retornando o valor correspondente para a propriedade solicitada. Este método permite acessar o valor de uma propriedade específica definida para a classe de estilo, facilitando a leitura e manipulação das regras de estilo associadas a essa classe.
     *
     * @public
     * @template {keyof CSSLikeProperties} K 
     * @param {K} propertyName 
     * @returns {CSSLikeProperties[K]} 
     */
    public getProperty<K extends keyof CSSLikeProperties>(propertyName: K): CSSLikeProperties[K] {
        return this.properties[propertyName];
    }

    /**
     * Define o valor de uma propriedade CSS específica associada à classe de estilo, atualizando o valor correspondente para a propriedade fornecida como argumento. Este método permite atualizar o valor de uma propriedade específica definida para a classe de estilo, facilitando a atualização das regras de estilo associadas a essa classe e garantindo que as mudanças sejam refletidas corretamente nos elementos do tabuleiro aos quais a classe foi aplicada.
     *
     * @public
     * @template {keyof CSSLikeProperties} K 
     * @param {K} propertyName 
     * @param {CSSLikeProperties[K]} value 
     */
    public setProperty<K extends keyof CSSLikeProperties>(propertyName: K, value: CSSLikeProperties[K]): void {
        this.properties[propertyName] = value;
        this.update();
    }

    /**
     * Remove a classe de estilo do elemento especificado, removendo a classe do elemento e atualizando a lista de elementos com a classe.
     *
     * @public
     * @param {BoardElement} element 
     */
    public remove(element: BoardElement): void {
        this.elementsWithClass.delete(element);
        element.getElement().classList.remove(this.className);
    }

    /** 
     * Alterna a aplicação da classe de estilo em um elemento do tabuleiro específico, adicionando a classe se ela não estiver presente no elemento ou removendo a classe se ela já estiver presente. Este método facilita a alternância rápida das regras de estilo associadas à classe de estilo em elementos do tabuleiro, permitindo que as mudanças visuais sejam aplicadas ou removidas de forma dinâmica com base na presença da classe no elemento.
     * 
     * @public
     * @param {BoardElement} element
     */
    public toggle(element: BoardElement): void {
        if (this.elementsWithClass.has(element)) {
            this.remove(element);
        } else {
            this.applyToBoardElement(element);
        }
    }
}