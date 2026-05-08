
# Referência do Core do Simulatus Engine

## Sumário

- [Sobre](#sobre)
- [Propósito da Pasta Core](#proposito-da-pasta-core)
- [Arquitetura do Core](#arquitetura-do-core)
  - [Estrutura](#estrutura)
  - [Engine](#engine)
  - [Elementos](#elementos)
  - [Utilitários](#utilitarios)
- [Referência de Classes](#referencia-de-classes)
  - [Classes de Estrutura](#classes-de-estrutura)
    - [Loader](#loader)
    - [PreLoader](#preloader)
    - [DOMLoader](#domloader)
    - [Unloader](#unloader)
    - [Logger](#logger)
    - [Registerable](#registerable)
    - [Identifier](#identifier)
    - [Registry](#registry)
    - [Registries](#registries)
    - [AssetProvider](#assetprovider)
    - [LanguageProvider](#languageprovider)
  - [Classes de Asset](#classes-de-asset)
    - [Asset](#asset)
    - [ImageAsset](#imageasset)
    - [VideoAsset](#videoasset)
    - [SoundAsset](#soundasset)
    - [FontAsset](#fontasset)
    - [ObjectAsset](#objectasset)
    - [Track](#track)
    - [SoundTrack](#soundtrack)
    - [PlaylistSoundTrack](#playlistsoundtrack)
    - [SoundEffectsSoundTrack](#soundeffectssoundtrack)
  - [Classes de Engine](#classes-de-engine)
    - [BoardElement](#boardelement)
    - [Board](#board)
    - [BoardTextElement](#boardtextelement)
    - [BoardImageElement](#boardimageelement)
    - [BoardMeshElement](#boardmeshelement)
    - [BoardDOMEvents](#boarddomevents)
    - [BoardKeyboardHandler](#boardkeyboardhandler)
    - [Animation](#animation)
    - [AnimationProvider](#animationprovider)
  - [Classes de Elemento](#classes-de-elemento)
    - [Text](#text)
    - [GameElement](#gameelement)
  - [Interfaces de Applier e Builders](#interfaces-de-applier-e-builders)
    - [Applier](#applier)
    - [BoardApplier](#boardapplier)
    - [StyleBuilder](#stylebuilder)
    - [BackgroundColorApplier](#backgroundcolorapplier)
    - [TextApplier](#textapplier)
    - [ImageApplier](#imageapplier)
    - [TextureApplier](#textureapplier)
    - [ColorApplier](#colorapplier)
    - [BorderApplier](#borderapplier)
    - [SizeApplier](#sizeapplier)
    - [AnimationApplier](#animationapplier)
  - [Classes de Utilitário](#classes-de-utilitario)
    - [Color3](#color3)
    - [Color3Gradient](#color3gradient)
    - [Vector2](#vector2)
    - [Area2](#area2)
    - [Vector2Controller](#vector2controller)
    - [Key](#key)
    - [Mouse](#mouse)
    - [EventList](#eventlist)
    - [Session](#session)
    - [SessionManager](#sessionmanager)
    - [HashMap](#hashmap)
    - [elementUtils](#elementutils)

## Sobre

Este documento é a referência completa do engine para os módulos do core localizados em `src/core/`.

A pasta `src/script/` é tratada como uma *camada de jogo/modelo para cada usuário*. O núcleo do engine em si está apenas em `src/core/`.

## Propósito da Pasta Core

A pasta `src/core/` contém a implementação do engine:

- `structure/`: loaders, registries, provedores de asset e suporte a idioma.
- `engine/`: sistema de board baseado em DOM, helpers de animação, wrappers de evento e classes de elemento de UI.
- `elements/`: wrappers reutilizáveis de elemento de jogo como `Text` e `GameElement`.
- `engine/utils/`: helpers de baixo nível usados em todo o engine.

## Arquitetura do Core

### Estrutura

`src/core/structure/` define o ciclo de vida da aplicação, o sistema de registries, assets e o carregamento de idiomas.

### Engine

`src/core/engine/` define o board, wrappers de elemento, eventos, tratamento de entrada, animações e appliers de CSS.

### Elementos

`src/core/elements/` define objetos reutilizáveis por jogos, como valores de texto traduzível e elementos genéricos de jogo.

### Utilitários

`src/core/engine/utils/` contém classes helper para cores, vetores, sessões, eventos de mouse e coleções.

## Referência de Classes

### Classes de Estrutura

#### Loader

`src/core/structure/Loader.ts`

- `public static async main(): Promise<void>`

Esta é a abstração base de loader usada por todos os loaders de ciclo de vida. Ela é intencionalmente vazia no core do engine.

#### PreLoader

`src/core/structure/PreLoader.ts`

- Herda de [Loader](#loader).
- `public static async main(): Promise<void>`

Uma classe placeholder para pré-carregamento de recursos do jogo antes do loader principal ser executado.

#### DOMLoader

`src/core/structure/DOMLoader.ts`

- Herda de [Loader](#loader).
- `public static async main(): Promise<void>`

Uma classe placeholder para lógica de carregamento específica de DOM após a inicialização da lógica principal do jogo.

#### Unloader

`src/core/structure/Unloader.ts`

- Herda de [Loader](#loader).
- `public static async main(): Promise<void>`

Uma classe placeholder para lógica de limpeza executada no evento `beforeunload` da janela.

#### Logger

`src/core/structure/Logger.ts`

- `constructor(private _id: string)`
- `public info(...args: any[]): void`
- `public warn(...args: any[]): void`
- `public error(...args: any[]): void`

`Logger` envolve o console e também adiciona mensagens no overlay de carregamento da página sob `.loading ul`.

#### Registerable

`src/core/structure/Registerable.ts`

- `public static async register(): Promise<void>`

Esta classe abstrata exige que subclasses implementem um método estático `register()`. É um contrato central para registro via registries.

#### Identifier

`src/core/structure/Identifier.ts`

- `public namespace: string`
- `public name: string`
- `public toString(): string`
- `public static fromString(str: string): Identifier`
- `public static of(namespace: string, name: string): Identifier`

`Identifier` é o identificador canônico do engine usado para criar namespaces de assets, traduções e outras entradas de registry.

#### Registry

`src/core/structure/Registry.ts`

- `protected static registries: Map<keyof registryMap, any>`
- `public static get languageRegistry(): Map<Identifier, string>`
- `public static init(): void`
- `public static register<K extends keyof registryMap, V extends registryMap[K]>(registry: K, id: Identifier, value: V): void`
- `public static get<T>(registry: Registries, id?: Identifier): T | Map<Identifier, T>`

`Registry` gerencia coleções globais do engine para linguagens e assets.

#### Registries

`src/core/structure/Registries.ts`

- `LANGUAGE = "language"`
- `ASSET = "asset"`

Uma enumeração tipada das chaves de registry disponíveis.

#### AssetProvider

`src/core/structure/providers/AssetProvider.ts`

- `private static cache: Map<string, Asset>`
- `private static readonly urlBase: string = "./script/game/"`
- `public static async loadAsset(id: Identifier): Promise<Asset>`
- `public static getAsset<A extends Asset>(id: Identifier): A`
- `public static hasAsset(id: Identifier): boolean`
- `private static createAsset(id: Identifier, url: string): Asset`
- `private static async preloadAsset(asset: Asset): Promise<void>`

`AssetProvider` resolve assets usando valores `Identifier`, seleciona a subclasse de asset pelo sufixo de arquivo e armazena em cache os objetos carregados.

Ele usa `./script/game/` como URL base para assets em tempo de execução, portanto namespaces de jogo e assets são esperados nessa pasta.

#### LanguageProvider

`src/core/structure/providers/LanguageProvider.ts`

- `public static get languages(): Map<string, Map<Identifier, string>>`
- `public static knownLanguages: Set<string>`
- `public static currentLanguage: string`
- `public static onLanguageChange: EventList<(lang: string) => void>`
- `public static registerLanguage(lang: string): void`
- `public static async loadLanguages(namespace: string): Promise<void>`
- `public static async loadLanguage(lang: string, namespace: string): Promise<void>`
- `public static async useLanguage(lang: string): Promise<void>`
- `public static getCurrentLanguage(): string`
- `public static get(key: Identifier): string`
- `private static buildNamespacedIdentifier(namespace: string, key: string): Identifier | null`
- `private static findIdentifierKey(langMap: Map<Identifier, string>, key: Identifier): Identifier | undefined`

`LanguageProvider` é responsável por ler traduções JSON e expor valores de texto localizados. Ele usa o registry do engine para armazenar mapas de idioma carregados e dispara atualizações quando o idioma muda.

### Classes de Asset

#### Asset

`src/core/structure/assets/Asset.ts`

- `public readonly id: Identifier`
- `public readonly url: string`
- `constructor(id: Identifier, url: string)`
- `public abstract getType(): string`

Classe base abstrata para todos os tipos de asset.

#### ImageAsset

`src/core/structure/assets/ImageAsset.ts`

- `public readonly element: HTMLImageElement`
- `constructor(id: Identifier, url: string)`
- `public async load(): Promise<HTMLImageElement>`
- `public getType(): string`

Carrega imagens usando um `HTMLImageElement` nativo.

#### VideoAsset

`src/core/structure/assets/VideoAsset.ts`

- `public readonly element: HTMLVideoElement`
- `constructor(id: Identifier, url: string)`
- `public async load(): Promise<HTMLVideoElement>`
- `public getType(): string`

Carrega assets de vídeo e expõe um elemento de vídeo pré-carregado.

#### SoundAsset

`src/core/structure/assets/SoundAsset.ts`

- `constructor(id: Identifier, url: string)`
- `public createAudio(): HTMLAudioElement`
- `public getType(): string`

Wrapper simples de asset de som que cria um `HTMLAudioElement` sob demanda.

#### FontAsset

`src/core/structure/assets/FontAsset.ts`

- `public readonly className: string`
- `constructor(id: Identifier, url: string)`
- `public static fontNameFromIdentifier(id: Identifier): string`
- `public getType(): string`

`FontAsset` representa um arquivo de fonte (por exemplo, `.ttf`, `.woff`, `.woff2`). Ele gera um nome de classe CSS a partir do [Identifier](#identifier) para aplicar fontes personalizadas aos elementos. Use `className` para aplicar a fonte via CSS ou injetar regras `@font-face` diretamente.

#### ObjectAsset

`src/core/structure/assets/ObjectAsset.ts`

- `public data: unknown | null`
- `constructor(id: Identifier, url: string)`
- `public async load(): Promise<unknown>`
- `public getType(): string`

Carrega objetos JSON a partir de URLs de asset. Usado por `LanguageProvider` e outros dados baseados em JSON.

#### Track

`src/core/structure/assets/SoundTrack.ts`

- `public volume: number`
- `public muted: boolean`
- `constructor(volume: number = 1)`
- `public mute(): void`
- `public unmute(): void`
- `public setVolume(value: number): void`
- `public abstract restartCurrentSound(): void`
- `public abstract stopCurrentSound(): void`
- `public abstract playSound(sound: SoundAsset): Promise<void>`
- `public abstract getCurrentSoundTimestamp(): number`
- `protected abstract applyVolume(): void`

Base abstrata para implementações de trilha sonora.

#### SoundTrack

`src/core/structure/assets/SoundTrack.ts`

- Herda de [Track](#track)
- `protected currentAudio: HTMLAudioElement | null`
- `protected currentSound: SoundAsset | null`
- `public async playSound(sound: SoundAsset): Promise<void>`
- `public stopCurrentSound(): void`
- `public restartCurrentSound(): void`
- `public getCurrentSoundTimestamp(): number`
- `protected applyVolume(): void`

Um gerenciador simples de trilha única que toca um som de cada vez.

#### PlaylistSoundTrack

`src/core/structure/assets/SoundTrack.ts`

- Herda de [SoundTrack](#soundtrack)
- `private playlist: SoundAsset[]`
- `private currentIndex: number`
- `public addSound(sound: SoundAsset): void`
- `public async playCurrentTrack(): Promise<void>`
- `public async playNext(): Promise<void>`
- `public async playPrevious(): Promise<void>`

Uma trilha que mantém uma playlist e avança entre sons.

#### SoundEffectsSoundTrack

`src/core/structure/assets/SoundTrack.ts`

- Herda de [SoundTrack](#soundtrack)
- `private activeSounds: HTMLAudioElement[]`
- `public async playSound(sound: SoundAsset): Promise<void>`
- `public stopCurrentSound(): void`
- `public restartCurrentSound(): void`
- `public getCurrentSoundTimestamp(): number`
- `protected applyVolume(): void`

Um gerenciador de efeitos sonoros que pode tocar múltiplos efeitos de áudio sobrepostos.

### Classes de Engine

#### BoardElement

`src/core/engine/BoardElement.ts`

- Herda de nada diretamente, mas forma a base de todos os elementos de UI do board.
- `private el: E`
- `public events: BoardDOMEvents`
- `private _anchorPoint: Vector2`
- `public keyboardHandler: BoardKeyboardHandler`
- `public static Instances: Set<BoardElement>`
- `private _opacity: number`
- `public get opacity(): number`
- `public set opacity(value: number)`
- `constructor(board?: E)`
- `public getElement(): E`
- `protected wrap<T extends HTMLElement>(element: T): BoardElement<T>`
- `protected unwrap(element: HTMLElement | BoardElement<HTMLElement>): HTMLElement`
- `public getParent(): BoardElement<HTMLElement> | null`
- `public getAncestors(): Set<BoardElement<HTMLElement>>`
- `public clear(): void`
- `public getElementFromPath(selector: string): BoardElement<HTMLElement> | null`
- `public appendChild(child: HTMLElement | BoardElement<HTMLElement>, id?: string, classes?: string[]): void`
- `public removeChild(child: HTMLElement | BoardElement<HTMLElement>): void`
- `public getChildren(): Set<BoardElement<HTMLElement>>`
- `public hasChild(child: HTMLElement | BoardElement<HTMLElement>): boolean`
- `public forEachChild(callback: (child: BoardElement<HTMLElement>) => void): void`
- `public getChildById(id: string): BoardElement<HTMLElement> | null`
- `public getChildByClass(className: string): Set<BoardElement<HTMLElement>>`
- `public getChildByTag(tagName: string): Set<BoardElement<HTMLElement>>`
- `public getChildFromQuerySelection(selector: string): Set<BoardElement<HTMLElement>>`
- `public getDescendants(): Set<BoardElement<HTMLElement>>`
- `public replaceChild(newChild: HTMLElement | BoardElement<HTMLElement>, oldChild: HTMLElement | BoardElement<HTMLElement>): void`
- `public setStyleProperty<K extends keyof CSS.Properties>(property: K, value: CSS.Properties[K]): void`
- `public setStyleVariable(variable: string, value: string): void`
- `public overrideStyle(style: Partial<CSS.Properties>): void`
- `public getStyleProperty<K extends keyof CSS.Properties>(property: K): CSS.Properties[K]`
- `public getStyleVariable(variable: string): string`
- `public getStyle(): CSS.Properties`
- `public get style(): CSS.Properties`
- `public set style(style: CSS.Properties)`
- `public applyStyles(styles: Partial<CSS.Properties>): void`
- `public removeStyles(): void`
- `public applyClass(...classNames: string[]): void`
- `public removeClass(...classNames: string[]): void`
- `public toggleClass(className: string): void`
- `public get anchorPoint(): Vector2`
- `public set anchorPoint(value: Vector2)`
- `public setAnchorPoint(x: number, y: number): void`
- `protected syncAnchorPoint(): void`
- `public setParent(parent: BoardElement<HTMLElement>): void`
- `public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void`
- `public removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void`
- `protected onLoop(): void` (hook de ciclo de vida protegido)
- `public initOnLoop(): void`
- `public static initAllLoops(): void`
- `public get zIndex(): number`
- `public set zIndex(value: number)`
- `protected onAddedAsChild(parent: BoardElement<HTMLElement>): void` (hook protegido)
- `protected onRemovedAsChild(parent: BoardElement<HTMLElement>): void` (hook protegido)
- `protected deconstructor(): void` (hook de limpeza protegido)
- `public toString(): string`

`BoardElement` é o wrapper central de DOM. Ele gerencia um elemento HTML, filhos, acesso a estilos, manipulação de eventos e um sistema de loop interno.

#### Board

`src/core/engine/Board.ts`

- Herda de [BoardElement](#boardelement)
- `constructor(board: HTMLDivElement | string)`
- `public override getParent(): BoardElement<HTMLElement> | null`
- `public setDocumentTitle(title: Text): void`
- `public changeResolution(width: number, height: number): void`
- `public applyCSS(code: string): HTMLStyleElement`
- `public removeCSS(style: HTMLStyleElement): void`
- `public applyAnimation(anim: Animation): HTMLStyleElement`
- `public setDocumentFavicon(asset: ImageAsset): void`

`Board` representa o container principal do board e inclui utilitários de nível de página como título, favicon e injeção dinâmica de CSS.

#### BoardTextElement

`src/core/engine/BoardTextElement.ts`

- Herda de [BoardElement](#boardelement)
- `private _text: Text`
- `private readonly languageChangeListener: (lang: string) => void`
- `constructor(text: Text = Text.EMPTY)`
- `public get text(): Text`
- `public set text(value: Text)`
- `private refreshText(): void`
- `protected deconstructor(): void`
- `public toString(): string`

Um elemento do board que renderiza uma instância de `Text` e atualiza automaticamente quando o idioma muda.

#### BoardImageElement

`src/core/engine/BoardImageElement.ts`

- Herda de [BoardElement](#boardelement)
- `private _texture: ImageAsset`
- `private _textureOffset: Vector2`
- `private _repeats: Vector2`
- `private _tint: Color3`
- `public get tint(): Color3`
- `public set tint(value: Color3)`
- `public get repeats(): Vector2`
- `public set repeats(value: Vector2)`
- `public get textureOffset(): Vector2`
- `public set textureOffset(value: Vector2)`
- `public get texture(): ImageAsset`
- `public set texture(value: ImageAsset)`
- `private update(): void`
- `constructor(imageAsset: ImageAsset)`

Um elemento do board especializado em renderizar texturas de imagem como gráficos de fundo.

#### BoardMeshElement

`src/core/engine/BoardMeshElement.ts`

- Herda de [BoardElement](#boardelement)
- `public static readonly svgNS: string`
- `public area: Area2`
- `constructor()`
- `private syncAreaWithElement(): void`
- `public rect(pos: Vector2 | Area2, size?: Vector2): this`
- `public circle(pos: Vector2, r: number): this`
- `public line(pos1: Vector2, pos2: Vector2): this`
- `public clear(): void`
- `public fill(color: CSSColor): this`
- `public stroke(color: CSSColor, width: number = 1): this`
- `public export(): SVGSVGElement`

Um elemento especializado para desenho SVG usando as primitivas `rect`, `circle` e `line`.

#### BoardDOMEvents

`src/core/engine/BoardDOMEvents.ts`

- `private board: BoardElement<HTMLElement>`
- `public keysPressed: Set<string>`
- `public listenersOfLoop: Set<() => void>`
- `constructor(board: BoardElement<HTMLElement>)`
- `public onLoad(listener: () => void): void`
- `public offLoad(listener: () => void): void`
- `public onLoop(listener: () => void): void`
- `public offLoop(listener: () => void): void`
- `public onExit(listener: () => void): void`
- `public offExit(listener: () => void): void`
- `public onClick(listener: ...): void`
- `public offClick(listener: ...): void`
- `public onceClick(listener: ...): void`
- `public onClickCapture(listener: ...): void`
- `public onMouseMove(listener: ...): void`
- `public offMouseMove(listener: ...): void`
- `public onceMouseMove(listener: ...): void`
- `public onMouseDown(listener: ...): void`
- `public offMouseDown(listener: ...): void`
- `public onMouseUp(listener: ...): void`
- `public offMouseUp(listener: ...): void`
- `public onKeyDown(listener: ...): void`
- `public offKeyDown(listener: ...): void`
- `public onKeyUp(listener: ...): void`
- `public offKeyUp(listener: ...): void`
- `public onWheel(listener: ...): void`
- `public offWheel(listener: ...): void`
- `public onResize(listener: ...): void`
- `public offResize(listener: ...): void`
- `public onceResize(listener: ...): void`
- `public onAnimationEnd(listener: ...): void`
- `public offAnimationEnd(listener: ...): void`
- `public onTransitionEnd(listener: ...): void`
- `public offTransitionEnd(listener: ...): void`
- `public onInput(listener: ...): void`
- `public offInput(listener: ...): void`
- `public onChange(listener: ...): void`
- `public offChange(listener: ...): void`
- `public onFocus(listener: ...): void`
- `public offFocus(listener: ...): void`
- `public onBlur(listener: ...): void`
- `public offBlur(listener: ...): void`
- `public onContextMenu(listener: ...): void`
- `public offContextMenu(listener: ...): void`
- `public onDrag(listener: ...): void`
- `public offDrag(listener: ...): void`
- `public onDrop(listener: ...): void`
- `public offDrop(listener: ...): void`
- `public onScroll(listener: ...): void`
- `public offScroll(listener: ...): void`
- `public onTouchStart(listener: ...): void`
- `public offTouchStart(listener: ...): void`
- `public onTouchMove(listener: ...): void`
- `public offTouchMove(listener: ...): void`
- `public onTouchEnd(listener: ...): void`
- `public offTouchEnd(listener: ...): void`
- `public onTouchCancel(listener: ...): void`
- `public offTouchCancel(listener: ...): void`
- `public onPointerDown(listener: ...): void`
- `public offPointerDown(listener: ...): void`
- `public onPointerMove(listener: ...): void`
- `public offPointerMove(listener: ...): void`
- `public onPointerUp(listener: ...): void`
- `public offPointerUp(listener: ...): void`
- `public onPointerCancel(listener: ...): void`
- `public offPointerCancel(listener: ...): void`
- `public onPointerOver(listener: ...): void`
- `public offPointerOver(listener: ...): void`
- `public onPointerOut(listener: ...): void`
- `public offPointerOut(listener: ...): void`
- `public onPointerEnter(listener: ...): void`
- `public offPointerEnter(listener: ...): void`
- `public onPointerLeave(listener: ...): void`
- `public offPointerLeave(listener: ...): void`

`BoardDOMEvents` fornece um wrapper leve em torno de listeners de evento DOM para o board do engine.

#### BoardKeyboardHandler

`src/core/engine/BoardKeyboardHandler.ts`

- `protected keysPressed: Set<string>`
- `constructor(bel?: BoardElement)`
- `public isPressing(...keys: (string | Key)[]): boolean`
- `protected onKeyDown(event: KeyboardEvent): void`
- `protected onKeyUp(event: KeyboardEvent): void`
- `protected hook(element: HTMLElement | any): void`

Um helper de estado de teclas que rastreia as teclas atualmente pressionadas globalmente.

#### Animation

`src/core/engine/Animation.ts`

- `public name: string`
- `public steps: Map<string, CSS.Properties>`
- `public duration: number`
- `public timingFunction: string | Easing`
- `public delay: number`
- `public iterationCount: string | number`
- `public direction: AnimationDirection`
- `public fillMode: AnimationFillMode`
- `public playState: AnimationPlayState`
- `constructor(name: string)`
- `public toString(): string`
- `public addTimestamp(timestamp: number, properties: CSS.Properties): this`
- `public export(): string`

Representa uma definição de keyframes CSS construída programaticamente.

#### AnimationProvider

`src/core/engine/AnimationProvider.ts`

- `private activeAnimations: { anim: Animation; uniqueName: string; styleElement: HTMLStyleElement }[]`
- `private element: BoardElement<HTMLElement>`
- `constructor(element: BoardElement<HTMLElement>)`
- `public getElement(): BoardElement<HTMLElement>`
- `private createUniqueAnimationName(anim: Animation): string`
- `private createAnimationStyleElement(anim: Animation, uniqueName: string): HTMLStyleElement`
- `private updateAnimationStyles(): void`
- `public playAnimation(...anims: Animation[]): Promise<void>`

Gerencia declarações de animação CSS criadas dinamicamente e as aplica a um elemento do board.

### Classes de Elemento

#### Text

`src/core/elements/Text.ts`

- `protected static alreadyExists: boolean`
- `protected static Instances: Set<Text>`
- `public static readonly EMPTY: Text`
- `private id: Identifier | null`
- `private _content: string`
- `public get content(): string`
- `public static updateAll(): void`
- `public update(): void`
- `protected constructor(content: string | Identifier)`
- `public static translatable(key: Identifier): Text<TRANSLATABLE>`
- `public static literal(text: string | { toString(): string }): Text<LITERAL>`
- `public toString(): string`
- `public static concat(...texts: Text<TEXT>[]): Text<LITERAL>`

Um wrapper de texto que suporta strings literais e identificadores traduzíveis.

#### GameElement

`src/core/elements/GameElement.ts`

- Herda de [BoardElement](#boardelement)
- `constructor()`

Uma subclasse de conveniência para objetos de jogo que precisam de um elemento DOM vinculado ao board.

### Interfaces de Applier e Builders

#### Applier

`src/core/engine/appliers/Applier.ts`

- `applyToElement(element: StylableHTMLElement): void`

Interface para classes que aplicam estilos a objetos de estilo simples.

#### BoardApplier

`src/core/engine/appliers/BoardApplier.ts`

- `applyToBoardElement(element: BoardElement): void`

Interface para classes que aplicam apresentação ou conteúdo a instâncias de `BoardElement`.

#### StyleBuilder

`src/core/engine/appliers/StyleBuilder.ts`

- `public style: Properties`
- `constructor()`
- `protected apply(css: Properties): this`
- `protected applyBuilder<B extends Builder>(builder: typeof Builder, generator: (instance: B) => void): this`
- `public buildColor(...)` / `buildPosition(...)` / `buildBorder(...)` / `buildTransform(...)` / `buildTransition(...)` / `buildAnimation(...)` / `buildFont(...)` / `buildBackground(...)` / `buildAlignment(...)`
- `public setContent(content: string): this`
- `public applyToElement(element: { style: Properties; }): void`

O `StyleBuilder` fornece uma interface fluente para construir propriedades CSS. Ele compõe múltiplos builders auxiliares para cores, bordas, transformações, transições, animação, fontes, fundos e alinhamento.

#### BackgroundColorApplier

`src/core/engine/appliers/BackgroundColorApplier.ts`

- `private _backgroundColor: Properties["backgroundColor"]`
- `public get backgroundColor(): Properties["backgroundColor"]`
- `public set backgroundColor(value: Properties["backgroundColor"] | Color3)`
- `constructor(backgroundColor: Properties["backgroundColor"] | Color3 = "transparent")`
- `public applyToElement(element: { style: Properties }): void`

Aplica uma cor de fundo a um elemento.

#### TextApplier

`src/core/engine/appliers/TextApplier.ts`

- `private _text: Text`
- `public get text(): Text`
- `public set text(value: Text | string)`
- `constructor(text: Text | string = Text.EMPTY)`
- `public applyToBoardElement(element: BoardElement): void`

Aplica conteúdo de texto a um `BoardElement`.

#### ImageApplier

`src/core/engine/appliers/ImageApplier.ts`

- `private _url: string`
- `public get url(): string`
- `public set url(value: string)`
- `public get imagePath(): string`
- `constructor(url: string)`
- `public applyToBoardElement(element: BoardElement): void`

Aplica um estilo de fundo de imagem a um elemento do board.

#### TextureApplier

`src/core/engine/appliers/TextureApplier.ts`

- `private _texture: ImageAsset`
- `private _repeat: string`
- `private _size: string`
- `private _position: string`
- `public get texture(): ImageAsset`
- `public set texture(value: ImageAsset)`
- `public get repeat(): string`
- `public set repeat(value: string)`
- `public get size(): string`
- `public set size(value: string)`
- `public get position(): string`
- `public set position(value: string)`
- `constructor(texture: ImageAsset)`
- `public applyToBoardElement(element: BoardElement): void`

Aplica um asset de imagem carregado como textura com controles de repetição, tamanho e posição.

#### ColorApplier

`src/core/engine/appliers/ColorApplier.ts`

- `private _color: Properties["color"]`
- `private _gradient: Color3Gradient | null`
- `public get color(): Properties["color"]`
- `public set color(value: Properties["color"] | Color3 | Color3Gradient)`
- `constructor(color: Properties["color"] | Color3 | Color3Gradient = "inherit")`
- `public applyToElement(element: { style: Properties }): void`

Aplica uma cor de texto a um elemento. Se `Color3Gradient` for fornecido, aplica um gradiente de texto usando `background-clip: text`.

#### BorderApplier

`src/core/engine/appliers/BorderApplier.ts`

- `private _style: Properties`
- `public get/set border(): Properties["border"]`
- `public get/set borderWidth(): Properties["borderWidth"]`
- `public get/set borderStyle(): Properties["borderStyle"]`
- `public get/set borderColor(value: Properties["borderColor"] | Color3)`
- `public get/set borderRadius(): Properties["borderRadius"]`
- `public get/set borderTopWidth(): Properties["borderTopWidth"]`
- `public get/set borderRightWidth(): Properties["borderRightWidth"]`
- `public get/set borderBottomWidth(): Properties["borderBottomWidth"]`
- `public get/set borderLeftWidth(): Properties["borderLeftWidth"]`
- `public get/set borderTopStyle(): Properties["borderTopStyle"]`
- `public get/set borderRightStyle(): Properties["borderRightStyle"]`
- `public get/set borderBottomStyle(): Properties["borderBottomStyle"]`
- `public get/set borderLeftStyle(): Properties["borderLeftStyle"]`
- `public get/set borderTopColor(value: Properties["borderTopColor"] | Color3)`
- `public get/set borderRightColor(value: Properties["borderRightColor"] | Color3)`
- `public get/set borderBottomColor(value: Properties["borderBottomColor"] | Color3)`
- `public get/set borderLeftColor(value: Properties["borderLeftColor"] | Color3)`
- `public get/set borderImage(): Properties["borderImage"] | Color3Gradient`
- `public get/set borderImageSource(): Properties["borderImageSource"] | Color3Gradient`
- `public get/set borderImageSlice(): Properties["borderImageSlice"]`
- `public get/set borderImageWidth(): Properties["borderImageWidth"]`
- `public get/set borderImageOutset(): Properties["borderImageOutset"]`
- `public get/set borderImageRepeat(): Properties["borderImageRepeat"]`
- `public applyToElement(element: { style: Properties }): void`

Aplica propriedades de borda CSS a um elemento. Suporta `Color3Gradient` em `borderImage` e `borderImageSource`.

#### SizeApplier

`src/core/engine/appliers/SizeApplier.ts`

- `private _width: Properties["width"]`
- `private _height: Properties["height"]`
- `public get width(): Properties["width"]`
- `public set width(value: Properties["width"])`
- `public get height(): Properties["height"]`
- `public set height(value: Properties["height"])`
- `constructor(width: Properties["width"] = "auto", height: Properties["height"] = "auto")`
- `public applyToElement(element: { style: Properties }): void`

Aplica estilos de largura e altura a um elemento.

#### AnimationApplier

`src/core/engine/appliers/AnimationApplier.ts`

- `public name: string`
- `protected animation: Animation`
- `constructor(name: string)`
- `public applyToElement(element: { style: Properties; }): void`

Esta classe é um shell para appliers de elemento baseados em animação e atualmente cria uma instância de animação vazia.

### Classes de Utilitário

#### Color3

`src/core/engine/utils/Color3.ts`

- `public static readonly TRANSPARENT`, `BLACK`, `WHITE`, `RED`, `GREEN`, `BLUE`
- `public r: number`
- `public g: number`
- `public b: number`
- `public a: number`
- `constructor()` overloads for named colors and numeric color values
- `public toString(): string`
- `public static fromHex(hex: string): Color3`
- `public static fromRGB(r: number, g: number, b: number): Color3`
- `public static fromRGBA(r: number, g: number, b: number, a: number): Color3`
- `public static fromHSL(h: number, s: number, l: number): Color3`
- `public static fromString(colorString: NamedCSSColor | string): Color3`
- `public sum(other: Color3): Color3`
- `public multiply(factor: number): Color3`
- `public applyBrightness(factor: number): Color3`
- `public applyDarkness(factor: number): Color3`
- `public applySaturation(factor: number): Color3`
- `public applyAlpha(factor: number): Color3`
- `public applyContrast(factor: number): Color3`
- `public applyGrayscale(): Color3`
- `public applySepia(): Color3`
- `public applyIntoHTMLElement(element: HTMLElement): void`
- `public applyToElement(element: { style: CSS.Properties }): void`

Um utilitário de cor que suporta entradas em hex, RGB, RGBA, HSL e cores nomeadas.

#### Color3Gradient

`src/core/engine/utils/Color3Gradient.ts`

- `constructor(colors?: Color3[], angle?: number | Direction)`
- `public append(color: Color3): this`
- `public setAngle(angle: number | Direction): this`
- `public toString(): string`
- `public applyBrightness(factor: number): Color3Gradient`
- `public applyDarkness(factor: number): Color3Gradient`
- `public applySaturation(factor: number): Color3Gradient`
- `public applyAlpha(factor: number): Color3Gradient`
- `public applyContrast(factor: number): Color3Gradient`
- `public applyGrayscale(): Color3Gradient`
- `public applySepia(): Color3Gradient`
- `public applyToElement(element: { style: Properties; }): void`

Representa um gradiente linear de `Color3` que pode ser aplicado como background.

#### Vector2

`src/core/engine/game/Vector2.ts`

- `public get x(): number`
- `public set x(value: number)`
- `public get y(): number`
- `public set y(value: number)`
- `constructor(x?: number, y?: number, cb?: () => void)`
- `public add(other: Vector2 | number): Vector2`
- `public subtract(other: Vector2 | number): Vector2`
- `public multiply(other: number | Vector2): Vector2`
- `public divide(other: number | Vector2): Vector2`
- `public magnitude(): number`
- `public normalize(): Vector2`
- `public toString(): string`
- `public clone(): Vector2`

Um vetor 2D usado para posição, tamanho e movimento.

#### Area2

`src/core/engine/game/Area2.ts`

- Herda de [Applier](#applier)
- `public position: Vector2`
- `public size: Vector2`
- `public anchorPoint: Vector2`
- `public _callback: () => void`
- `constructor(position?: Vector2, size?: Vector2, anchorPoint?: Vector2)`
- `public get x(): number`
- `public set x(value: number)`
- `public get y(): number`
- `public set y(value: number)`
- `public get w(): number`
- `public set w(value: number)`
- `public get h(): number`
- `public set h(value: number)`
- `public get left(): number`
- `public get right(): number`
- `public get top(): number`
- `public get bottom(): number`
- `public getRelativePoint(point: Vector2): Vector2`
- `public contains(point: Vector2): boolean`
- `public containsPoint(point: Vector2): boolean`
- `public collidesWith(collision: Area2): boolean`
- `public collidesWith(point: Vector2): boolean`
- `public collidesWith(other: Area2 | Vector2): boolean`
- `public intersects(other: Area2): boolean`
- `public getCenter(): Vector2`
- `public toString(): string`
- `public applyToElement(element: StylableHTMLElement): void`
- `public applyCenterToElement(element: StylableHTMLElement): void`

Representa uma região retangular 2D com posição, tamanho e ponto de ancoragem.

#### Vector2Controller

`src/core/engine/utils/Vector2Controller.ts`

- `private vec: Vector2`
- `public _callback: () => void`
- `constructor(vec: Vector2)`
- `public get x(): number`
- `public set x(value: number)`
- `public get y(): number`
- `public set y(value: number)`
- `public add(other: Vector2 | number): void`
- `public subtract(other: Vector2 | number): void`
- `public multiply(other: Vector2 | number): void`
- `public divide(other: Vector2 | number): void`
- `public up(amount: number): void`
- `public down(amount: number): void`
- `public left(amount: number): void`
- `public right(amount: number): void`

Um helper para operações mutáveis de `Vector2` que dispara callbacks em atualizações.

#### Key

`src/core/engine/utils/Key.ts`

- Reexporta `Key` de `ts-key-enum`.

#### Mouse

`src/core/engine/utils/Mouse.ts`

- `public static readonly Util` helper com `isInsideOfBoardElement` e `isInsideOfElement`
- `public static readonly BUTTON` mapa de botões
- `protected static position: Vector2`
- `public static whenMoved = new EventList<(delta: Vector2) => void>()`
- `public static whenScrolled = new EventList<(delta: Vector2, event: WheelEvent) => void>()`
- `public static button1Pressed: boolean`
- `public static button2Pressed: boolean`
- `public static button3Pressed: boolean`
- `public static whenButtonPressed`, `whenButtonReleased`
- `public static whenButton1Pressed`, `whenButton1Released`
- `public static whenButton2Pressed`, `whenButton2Released`
- `public static whenButton3Pressed`, `whenButton3Released`
- `public static init(): void`
- `public static isLocked(): boolean`
- `public static getMousePosition(relativeTo?: hasElement | HTMLElement): Vector2`
- `public static lock(element: hasElement | HTMLElement): void`
- `public static unlock(): void`
- `public static hideCursor(element: StylableHTMLElement | HTMLElement): void`
- `public static showCursor(element: StylableHTMLElement | HTMLElement): void`
- `public static whenMouseEnters`, `whenMouseLeaves`, `whenMouseMovesInside`, `whenMouseClicksInside`, `whenMouseRightClicksInside`
- `public static clearEventsOfElement(element: hasElement | HTMLElement): void`

Um helper global de mouse com hooks de evento, rastreamento de posição, bloqueio do pointer e detecção de colisão.

#### EventList

`src/core/engine/utils/EventList.ts`

- `private events: F[]`
- `constructor()`
- `public addEventListener(event: F, props?: EventListenerProps): void`
- `public async wait(): Promise<Parameters<F>>`
- `public remove(event: F): void`
- `public trigger(...args: Parameters<F>): void`

Um helper genérico de lista de eventos que suporta adicionar/remover/disparar e semântica de once.

#### Session

`src/core/engine/utils/Session.ts`

- `private data: T`
- `private readonly initialData: T`
- `public readonly id: Identifier`
- `constructor(id: Identifier, data: T)`
- `private static cloneData<T>(data: T): T`
- `public getData(): T`
- `public getDefault(): T`
- `public getDefault<K extends keyof T>(key: K): T[K]`
- `public setData(data: T): void`
- `public set(key: keyof T, value: T[keyof T]): void`
- `public get<K extends keyof T>(key: K): T[K]`
- `public reset(): void`
- `public reset<K extends keyof T>(key: K): void`
- `public save(): void`
- `public load(): void`

Um container tipado de sessão que pode salvar/carregar dados por meio do `SessionManager`.

#### SessionManager

`src/core/engine/utils/SessionManager.ts`

- `public static saveSession<T extends Record<string, any>>(session: Session<T>): void`
- `public static loadSession<T extends Record<string, any>>(id: Identifier, defaultData: T): Session<T> | null`
- `public static deleteSession(id: Identifier): void`
- `public static getValue<T extends any>(id: Identifier, path: string): T | null`

Persistência simples de sessão baseada em localStorage.

#### HashMap

`src/core/engine/utils/HashMap.ts`

- `constructor()`
- `public set(key: K, value: V): void`
- `public get(key: K, defaultValue?: V): V | undefined`
- `public getKeyFromValue(value: V): K | undefined`
- `public has(key: K): boolean`
- `public delete(key: K): boolean`
- `public clear(): void`
- `public size(): number`
- `public keys(): IterableIterator<K>`
- `public values(): IterableIterator<V>`
- `public entries(): IterableIterator<[K, V]>`
- `public forEach(callback: (value: V, key: K, map: Map<K, V>) => void): void`
- `public toString(): string`
- `public toList(): [K, V][]`
- `public toObject(): { [key: string]: V }`
- `public toSeparateLists(): [K[], V[]]`
- `public toMap(): Map<K, V>`
- `public static fromObject<K, V>(obj: { [key: string]: V }): HashMap<K, V>`
- `public static fromMap<K, V>(map: Map<K, V>): HashMap<K, V>`
- `public static fromList<K, V>(list: [K, V][]): HashMap<K, V>`
- `public static fromEntries<K, V>(entries: Iterable<[K, V]>): HashMap<K, V>`
- `public static new<K, V>(): HashMap<K, V>`
- `public filter<U>(predicate: (value: V, key: K, map: Map<K, V>) => boolean): HashMap<K, U>`
- `public map<U>(mapper: (value: V, key: K, map: Map<K, V>) => U): HashMap<K, U>`
- `public reduce<U>(reducer: (accumulator: U, value: V, key: K, map: Map<K, V>) => U, initialValue: U): U`

Um helper no estilo `Map` com métodos de conversão convenientes.

#### elementUtils

`src/core/engine/utils/elementUtils.ts`

- `export function forEachElementWithClass(className: string, callback: ($: HTMLElement) => void): void`
- `export function forEachElementWithQuerySelector(selector: string, callback: ($: HTMLElement) => void): void`
- `export function changeElementCSSVariable(element: HTMLElement = document.documentElement, variableName: string, value: CSSValue): void`
- `export function changeElementCSSProperty<K extends keyof CSS.Properties>(element: HTMLElement, propertyName: K, value: CSS.Properties[K]): void`
- `export function changeDocumentCSSVariable(variableName: string, value: CSSValue): void`

Utilitários DOM para manipular elementos e variáveis CSS.
