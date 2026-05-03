# Simulatus Engine Core Reference

## Table of Contents

- [About](#about)
- [Core Folder Purpose](#core-folder-purpose)
- [Core Architecture](#core-architecture)
  - [Structure](#structure)
  - [Engine](#engine)
  - [Elements](#elements)
  - [Utilities](#utilities)
- [Class Reference](#class-reference)
  - [Structure Classes](#structure-classes)
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
  - [Asset Classes](#asset-classes)
    - [Asset](#asset)
    - [ImageAsset](#imageasset)
    - [VideoAsset](#videoasset)
    - [SoundAsset](#soundasset)
    - [ObjectAsset](#objectasset)
    - [Track](#track)
    - [SoundTrack](#soundtrack)
    - [PlaylistSoundTrack](#playlistsoundtrack)
    - [SoundEffectsSoundTrack](#soundeffectssoundtrack)
  - [Engine Classes](#engine-classes)
    - [BoardElement](#boardelement)
    - [Board](#board)
    - [BoardTextElement](#boardtextelement)
    - [BoardImageElement](#boardimageelement)
    - [BoardMeshElement](#boardmeshelement)
    - [BoardDOMEvents](#boarddomevents)
    - [BoardKeyboardHandler](#boardkeyboardhandler)
    - [Animation](#animation)
    - [AnimationProvider](#animationprovider)
  - [Element Classes](#element-classes)
    - [Text](#text)
    - [GameElement](#gameelement)
  - [Applier Interfaces and Builders](#applier-interfaces-and-builders)
    - [Applier](#applier)
    - [BoardApplier](#boardapplier)
    - [StyleBuilder](#stylebuilder)
    - [BackgroundColorApplier](#backgroundcolorapplier)
    - [TextApplier](#textapplier)
    - [ImageApplier](#imageapplier)
    - [TextureApplier](#textureapplier)
    - [ColorApplier](#colorapplier)
    - [SizeApplier](#sizeapplier)
    - [AnimationApplier](#animationapplier)
  - [Utility Classes](#utility-classes)
    - [Color3](#color3)
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

## About

This document is the full engine reference for the core modules located under `src/core/`.

The `src/script/` folder is treated as a *game/template layer for each user*. The engine core itself is only in `src/core/`.

## Core Folder Purpose

The `src/core/` folder contains the engine implementation:

- `structure/`: loaders, registries, asset providers, and language support.
- `engine/`: DOM-based board system, animation helpers, event wrappers, and UI element classes.
- `elements/`: reusable game element wrappers such as `Text` and `GameElement`.
- `engine/utils/`: low-level helpers used across the engine.

## Core Architecture

### Structure

`src/core/structure/` defines the application lifecycle, registry system, assets, and language loading.

### Engine

`src/core/engine/` defines the board, element wrappers, events, input handling, animations, and CSS appliers.

### Elements

`src/core/elements/` defines objects that are reusable by games, such as translated text values and generic game elements.

### Utilities

`src/core/engine/utils/` contains helper classes for color, vectors, sessions, mouse events, and collections.

## Class Reference

### Structure Classes

#### Loader

`src/core/structure/Loader.ts`

- `public static async main(): Promise<void>`

This is the base loader abstraction used by all lifecycle loaders. It is intentionally empty in the core engine.

#### PreLoader

`src/core/structure/PreLoader.ts`

- Inherits from [Loader](#loader).
- `public static async main(): Promise<void>`

A placeholder class for preloading game resources before the main loader runs.

#### DOMLoader

`src/core/structure/DOMLoader.ts`

- Inherits from [Loader](#loader).
- `public static async main(): Promise<void>`

A placeholder class for DOM-specific loading logic after the main game logic has initialized.

#### Unloader

`src/core/structure/Unloader.ts`

- Inherits from [Loader](#loader).
- `public static async main(): Promise<void>`

A placeholder class for cleanup logic executed on the window `beforeunload` event.

#### Logger

`src/core/structure/Logger.ts`

- `constructor(private _id: string)`
- `public info(...args: any[]): void`
- `public warn(...args: any[]): void`
- `public error(...args: any[]): void`

`Logger` wraps console logging and also appends messages into the page loading overlay under `.loading ul`.

#### Registerable

`src/core/structure/Registerable.ts`

- `public static async register(): Promise<void>`

This abstract class requires subclasses to implement a static `register()` method. It is a core contract for registry-based registration.

#### Identifier

`src/core/structure/Identifier.ts`

- `public namespace: string`
- `public name: string`
- `public toString(): string`
- `public static fromString(str: string): Identifier`
- `public static of(namespace: string, name: string): Identifier`

`Identifier` is the canonical engine identifier used for namespacing assets, translations, and other registry entries.

#### Registry

`src/core/structure/Registry.ts`

- `protected static registries: Map<keyof registryMap, any>`
- `public static get languageRegistry(): Map<Identifier, string>`
- `public static init(): void`
- `public static register<K extends keyof registryMap, V extends registryMap[K]>(registry: K, id: Identifier, value: V): void`
- `public static get<T>(registry: Registries, id?: Identifier): T | Map<Identifier, T>`

`Registry` manages engine global registry collections for languages and assets.

#### Registries

`src/core/structure/Registries.ts`

- `LANGUAGE = "language"`
- `ASSET = "asset"`

A typed enumeration of available registry keys.

#### AssetProvider

`src/core/structure/providers/AssetProvider.ts`

- `private static cache: Map<string, Asset>`
- `private static readonly urlBase: string = "./script/game/"`
- `public static async loadAsset(id: Identifier): Promise<Asset>`
- `public static getAsset<A extends Asset>(id: Identifier): A`
- `public static hasAsset(id: Identifier): boolean`
- `private static createAsset(id: Identifier, url: string): Asset`
- `private static async preloadAsset(asset: Asset): Promise<void>`

`AssetProvider` resolves assets using `Identifier` values, chooses the asset subclass by file extension, and caches the loaded objects.

It uses `./script/game/` as the base URL for runtime assets, so game namespaces and assets are expected under that folder.

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

`LanguageProvider` is responsible for reading JSON translations and exposing localized text values. It uses the engine registry to store loaded language maps and triggers updates when the language changes.

### Asset Classes

#### Asset

`src/core/structure/assets/Asset.ts`

- `public readonly id: Identifier`
- `public readonly url: string`
- `constructor(id: Identifier, url: string)`
- `public abstract getType(): string`

Base abstract asset class for all asset types.

#### ImageAsset

`src/core/structure/assets/ImageAsset.ts`

- `public readonly element: HTMLImageElement`
- `constructor(id: Identifier, url: string)`
- `public async load(): Promise<HTMLImageElement>`
- `public getType(): string`

Loads images using a native `HTMLImageElement`.

#### VideoAsset

`src/core/structure/assets/VideoAsset.ts`

- `public readonly element: HTMLVideoElement`
- `constructor(id: Identifier, url: string)`
- `public async load(): Promise<HTMLVideoElement>`
- `public getType(): string`

Loads video assets and exposes a preloaded video element.

#### SoundAsset

`src/core/structure/assets/SoundAsset.ts`

- `constructor(id: Identifier, url: string)`
- `public createAudio(): HTMLAudioElement`
- `public getType(): string`

Simple sound asset wrapper that creates an `HTMLAudioElement` on demand.

#### ObjectAsset

`src/core/structure/assets/ObjectAsset.ts`

- `public data: unknown | null`
- `constructor(id: Identifier, url: string)`
- `public async load(): Promise<unknown>`
- `public getType(): string`

Loads JSON objects from asset URLs. Used by `LanguageProvider` and other JSON-based data assets.

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

Abstract base for sound track implementations.

#### SoundTrack

`src/core/structure/assets/SoundTrack.ts`

- Inherits from [Track](#track)
- `protected currentAudio: HTMLAudioElement | null`
- `protected currentSound: SoundAsset | null`
- `public async playSound(sound: SoundAsset): Promise<void>`
- `public stopCurrentSound(): void`
- `public restartCurrentSound(): void`
- `public getCurrentSoundTimestamp(): number`
- `protected applyVolume(): void`

A simple one-track sound manager that plays one sound at a time.

#### PlaylistSoundTrack

`src/core/structure/assets/SoundTrack.ts`

- Inherits from [SoundTrack](#soundtrack)
- `private playlist: SoundAsset[]`
- `private currentIndex: number`
- `public addSound(sound: SoundAsset): void`
- `public async playCurrentTrack(): Promise<void>`
- `public async playNext(): Promise<void>`
- `public async playPrevious(): Promise<void>`

A track that keeps a playlist and advances between sounds.

#### SoundEffectsSoundTrack

`src/core/structure/assets/SoundTrack.ts`

- Inherits from [SoundTrack](#soundtrack)
- `private activeSounds: HTMLAudioElement[]`
- `public async playSound(sound: SoundAsset): Promise<void>`
- `public stopCurrentSound(): void`
- `public restartCurrentSound(): void`
- `public getCurrentSoundTimestamp(): number`
- `protected applyVolume(): void`

A sound effects manager that can play multiple overlapping audio effects.

### Engine Classes

#### BoardElement

`src/core/engine/BoardElement.ts`

- Inherits from nothing directly, but forms the base of all board UI elements.
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
- `protected onLoop(): void` (protected lifecycle hook)
- `public initOnLoop(): void`
- `public static initAllLoops(): void`
- `public get zIndex(): number`
- `public set zIndex(value: number)`
- `protected onAddedAsChild(parent: BoardElement<HTMLElement>): void` (protected hook)
- `protected onRemovedAsChild(parent: BoardElement<HTMLElement>): void` (protected hook)
- `protected deconstructor(): void` (protected cleanup hook)
- `public toString(): string`

`BoardElement` is the core DOM wrapper. It manages an HTML element, children, style access, event handling, and an internal loop system.

#### Board

`src/core/engine/Board.ts`

- Inherits from [BoardElement](#boardelement)
- `constructor(board: HTMLDivElement | string)`
- `public override getParent(): BoardElement<HTMLElement> | null`
- `public setDocumentTitle(title: Text): void`
- `public changeResolution(width: number, height: number): void`
- `public applyCSS(code: string): HTMLStyleElement`
- `public removeCSS(style: HTMLStyleElement): void`
- `public applyAnimation(anim: Animation): HTMLStyleElement`
- `public setDocumentFavicon(asset: ImageAsset): void`

`Board` represents the top-level board container and includes page-level utilities such as title, favicon, and dynamic CSS injection.

#### BoardTextElement

`src/core/engine/BoardTextElement.ts`

- Inherits from [BoardElement](#boardelement)
- `private _text: Text`
- `private readonly languageChangeListener: (lang: string) => void`
- `constructor(text: Text = Text.EMPTY)`
- `public get text(): Text`
- `public set text(value: Text)`
- `private refreshText(): void`
- `protected deconstructor(): void`
- `public toString(): string`

A board element that renders a `Text` instance and updates automatically on language change.

#### BoardImageElement

`src/core/engine/BoardImageElement.ts`

- Inherits from [BoardElement](#boardelement)
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

A board element specialized to render image textures as background graphics.

#### BoardMeshElement

`src/core/engine/BoardMeshElement.ts`

- Inherits from [BoardElement](#boardelement)
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

A specialized element for SVG drawing using `rect`, `circle`, and `line` primitives.

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

`BoardDOMEvents` provides a thin wrapper around DOM event listeners for the engine board.

#### BoardKeyboardHandler

`src/core/engine/BoardKeyboardHandler.ts`

- `protected keysPressed: Set<string>`
- `constructor(bel?: BoardElement)`
- `public isPressing(...keys: (string | Key)[]): boolean`
- `protected onKeyDown(event: KeyboardEvent): void`
- `protected onKeyUp(event: KeyboardEvent): void`
- `protected hook(element: HTMLElement | any): void`

A key state helper that tracks currently pressed keys globally.

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

Represents a CSS keyframes definition built programmatically.

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

Manages dynamically created CSS animation declarations and applies them to a board element.

### Element Classes

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

A text wrapper that supports literal strings and translatable identifiers.

#### GameElement

`src/core/elements/GameElement.ts`

- Inherits from [BoardElement](#boardelement)
- `constructor()`

A convenience subclass for game objects that need a board-backed DOM element.

### Applier Interfaces and Builders

#### Applier

`src/core/engine/appliers/Applier.ts`

- `applyToElement(element: StylableHTMLElement): void`

Interface for classes that apply styles to plain style objects.

#### BoardApplier

`src/core/engine/appliers/BoardApplier.ts`

- `applyToBoardElement(element: BoardElement): void`

Interface for classes that apply presentation or content to `BoardElement` instances.

#### StyleBuilder

`src/core/engine/appliers/StyleBuilder.ts`

- `public style: Properties`
- `constructor()`
- `protected apply(css: Properties): this`
- `protected applyBuilder<B extends Builder>(builder: typeof Builder, generator: (instance: B) => void): this`
- `public buildColor(...)` / `buildPosition(...)` / `buildBorder(...)` / `buildTransform(...)` / `buildTransition(...)` / `buildAnimation(...)` / `buildFont(...)` / `buildBackground(...)` / `buildAlignment(...)`
- `public setContent(content: string): this`
- `public applyToElement(element: { style: Properties; }): void`

The `StyleBuilder` provides a fluent interface for building CSS properties. It composes multiple helper builders for colors, borders, transforms, transitions, animation, fonts, backgrounds, and alignment.

#### BackgroundColorApplier

`src/core/engine/appliers/BackgroundColorApplier.ts`

- `private _backgroundColor: Properties["backgroundColor"]`
- `public get backgroundColor(): Properties["backgroundColor"]`
- `public set backgroundColor(value: Properties["backgroundColor"] | Color3)`
- `constructor(backgroundColor: Properties["backgroundColor"] | Color3 = "transparent")`
- `public applyToElement(element: { style: Properties }): void`

Applies a background color to an element.

#### TextApplier

`src/core/engine/appliers/TextApplier.ts`

- `private _text: Text`
- `public get text(): Text`
- `public set text(value: Text | string)`
- `constructor(text: Text | string = Text.EMPTY)`
- `public applyToBoardElement(element: BoardElement): void`

Applies text content to a `BoardElement`.

#### ImageApplier

`src/core/engine/appliers/ImageApplier.ts`

- `private _url: string`
- `public get url(): string`
- `public set url(value: string)`
- `public get imagePath(): string`
- `constructor(url: string)`
- `public applyToBoardElement(element: BoardElement): void`

Applies an image background style to a board element.

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

Applies a loaded image asset as a texture with repeat, size, and position controls.

#### ColorApplier

`src/core/engine/appliers/ColorApplier.ts`

- `private _color: Properties["color"]`
- `public get color(): Properties["color"]`
- `public set color(value: Properties["color"] | Color3)`
- `constructor(color: Properties["color"] | Color3 = "inherit")`
- `public applyToElement(element: { style: Properties }): void`

Applies a text color to an element.

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

Applies element width and height styles.

#### AnimationApplier

`src/core/engine/appliers/AnimationApplier.ts`

- `public name: string`
- `protected animation: Animation`
- `constructor(name: string)`
- `public applyToElement(element: { style: Properties; }): void`

This class is a shell for animation-based element appliers and currently creates an empty animation instance.

### Utility Classes

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

A color utility that supports hex, RGB, RGBA, HSL, and named color inputs.

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

A 2D vector used for position, size, and movement.

#### Area2

`src/core/engine/game/Area2.ts`

- Inherits from [Applier](#applier)
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
- `public intersects(other: Area2): boolean`
- `public getCenter(): Vector2`
- `public toString(): string`
- `public applyToElement(element: StylableHTMLElement): void`
- `public applyCenterToElement(element: StylableHTMLElement): void`

Represents a 2D rectangular region with position, size, and anchor point.

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

A helper for mutable `Vector2` operations that triggers callbacks on updates.

#### Key

`src/core/engine/utils/Key.ts`

- Re-exports `Key` from `ts-key-enum`.

#### Mouse

`src/core/engine/utils/Mouse.ts`

- `public static readonly Util` helper with `isInsideOfBoardElement` and `isInsideOfElement`
- `public static readonly BUTTON` buttons map
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

A global mouse helper with event hooks, position tracking, pointer lock, and hit testing.

#### EventList

`src/core/engine/utils/EventList.ts`

- `private events: F[]`
- `constructor()`
- `public addEventListener(event: F, props?: EventListenerProps): void`
- `public async wait(): Promise<Parameters<F>>`
- `public remove(event: F): void`
- `public trigger(...args: Parameters<F>): void`

A generic event list helper that supports add/remove/trigger and once semantics.

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

A typed session container that can save/load data through `SessionManager`.

#### SessionManager

`src/core/engine/utils/SessionManager.ts`

- `public static saveSession<T extends Record<string, any>>(session: Session<T>): void`
- `public static loadSession<T extends Record<string, any>>(id: Identifier, defaultData: T): Session<T> | null`
- `public static deleteSession(id: Identifier): void`
- `public static getValue<T extends any>(id: Identifier, path: string): T | null`

Simple localStorage-backed session persistence.

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

A `Map`-style helper with convenience conversion methods.

#### elementUtils

`src/core/engine/utils/elementUtils.ts`

- `export function forEachElementWithClass(className: string, callback: ($: HTMLElement) => void): void`
- `export function forEachElementWithQuerySelector(selector: string, callback: ($: HTMLElement) => void): void`
- `export function changeElementCSSVariable(element: HTMLElement = document.documentElement, variableName: string, value: CSSValue): void`
- `export function changeElementCSSProperty<K extends keyof CSS.Properties>(element: HTMLElement, propertyName: K, value: CSS.Properties[K]): void`
- `export function changeDocumentCSSVariable(variableName: string, value: CSSValue): void`

DOM helper utilities for manipulating elements and CSS variables.
