declare class IsoImage {
    /**
     * Path to the image
     */
    src: string;
    /**
     * Name of the object
     */
    name: string;
    /**
     * HTMLImageObject
     */
    image: HTMLImageElement;
    /**
     * A callback when the image loaded
     */
    onLoad: Function;
    /**
     * The width of the image
     */
    width: number;
    /**
     * The height of the image
     */
    height: number;
    constructor(name?: string, src?: string);
    /**
     * Creates a new image.
     * @param src Source to the imagefile.
     * @return Instance of IsoImage
     */
    create(name: string, src: string): IsoImage;
    /**
     * Loads the image for further work.
     * @return Instance of IsoImage
     */
    load(): void;
    /**
     * Called when the image file was loaded.
     * @param event The triggerd event
     */
    _onLoad(event: Event): void;
    /**
     * Returns the image.
     * @return The image.
     */
    get(): HTMLImageElement;
    /**
     * Deletes the image.
     */
    free(): void;
}
declare class IsoCollection {
    collection: Array<any>;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric);
    get(): Array<any>;
    getByName(name: string): any;
}
declare class IsoBaseTileImage extends IsoImage {
    /**
     * Width of the image
     */
    tileWidth: number;
    /**
     * Height of the image
     */
    tileHeight: number;
    /**
     * ToDo:
     * maybe deprecated
     */
    prefix: string;
    /**
     * The the direction. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.Left
     * - IsoMetric.RIGHT
     */
    direction: number;
    /**
     * An object of IsoMetric
     */
    Engine: IsoMetric;
    /**
     * Creates a new instance of IsoBaseTileImage
     * @param Engine A object of IsoMetric
     * @param name Name of the new tileset
     * @param src Path to the image file
     */
    constructor(Engine: IsoMetric, name?: string, src?: string);
    /**
     * Creates a new Tileset.
     * @override IsoImage.create
     * @param Engine A object of IsoMetric
     * @param name Name of the new tileset
     * @param src Path to the image file
     * @return Instance of IsoBaseTileImage
     */
    create(name: string, src: string): IsoBaseTileImage;
    /**
     * Loads the image for further work.
     * @override IsoImage.load
     * @return Instance of IsoBaseTileImage
     */
    load(): IsoBaseTileImage;
    /**
     * Called when the image file was loaded.
     * @override IsoImage._onLoad
     * @param event The triggerd event
     */
    _onLoad(event: Event): void;
    /**
     * Return the offset in pixel of a given tile inside the tileset
     * @param tileNumber The number of the tile
     * @return An object including the offset
     * @example
     * TILESET
     * 60px width
     * |0|1|2|
     * |3|4|5| 60 px height
     * |6|7|8|
     *
     * This method returns for tile 7:
     * {
     *    offsetX: 20
     *    offsetY: 40
     * }
     */
    getTileOffset(tileNumber: number): {
        offsetX: number;
        offsetY: number;
    };
    /**
     * Sets the size of a tile
     * @param width The width in px
     * @param height The height in px
     */
    setTileSize(width: number, height: number): IsoBaseTileImage;
    /**
     * Sets the direction of the tileset.
     * @param direction The direction of the tileset. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.RIGHT
     * - IsoMetric.LEFT
     * @return The tileset.
     */
    setDirection(direction: number): IsoBaseTileImage;
}
declare class IsoBaseTileImages extends IsoCollection {
    collection: Array<IsoBaseTileImage>;
    private loaded;
    private onLoaded;
    private onEvery;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric);
    add(name: string, src: string): IsoTileSets;
    load(): IsoTileSets;
    loadCounter(event: Event, tileSet: IsoTileSet): void;
    every(callback: Function): IsoBaseTileImages;
    then(callback: Function): IsoBaseTileImages;
    callThen(): void;
}
declare class IsoBillboard extends IsoImage {
    x: number;
    y: number;
    scrollX: number;
    scrollY: number;
    offsetX: number;
    offsetY: number;
    speed: number;
    Engine: IsoMetric;
    layer: IsoLayer;
    constructor(Engine: IsoMetric, name?: string, src?: string);
    create(name: string, src: string): IsoBillboard;
    load(): IsoBillboard;
    _onLoad(event: Event): void;
    setPosition(x: number, y: number): IsoBillboard;
    setSpeed(speed: number): IsoBillboard;
    move(deltaX: number, deltaY: number): IsoBillboard;
    setDeltaScroll(deltaX: number, deltaY: number): void;
    setScroll(x: number, y: number): void;
}
declare class IsoBillboards extends IsoCollection {
    collection: Array<IsoBillboard>;
    private loaded;
    private onLoaded;
    private onEvery;
    Layer: IsoLayer;
    constructor(Engine: IsoMetric, Layer: IsoLayer);
    add(name: string, src: string): IsoBillboards;
    load(): IsoBillboards;
    loadCounter(event: Event, tileSet: IsoBillboard): void;
    every(callback: Function): IsoBillboards;
    then(callback: Function): IsoBillboards;
    callThen(): void;
}
declare class IsoCanvas {
    private canvasElement;
    context: any;
    private defaultOptions;
    options: IIsoConfigWindowOptions;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric);
    create(id?: string): IsoCanvas;
    updateScreen(): IsoCanvas;
    clearScreen(): IsoCanvas;
    get(): HTMLCanvasElement;
}
interface ICollisionBody {
    relativX: number;
    relativY: number;
    width: number;
    height: number;
}
/**
 * Includes all animation parameters of a sprite.
 */
declare class IsoSpriteAnimation {
    static LOOP: number;
    static PINGPONG: number;
    static LINEAR: number;
    /**
     * Name of the animation
     */
    name: string;
    /**
     * The first tile in the tileset where the animation starts.
     */
    startFrame: number;
    /**
     * The last tile in the tileset where animation ends.
     */
    endFrame: number;
    /**
     * Framecount of the animation.
     */
    frameCount: number;
    /**
     * The speed of the animation in frames per second.
     */
    framesPerSecond: number;
    /**
     * The playing type. Possible values are:
     * - IsoSpriteAnimation.LOOP
     * - IsoSpriteAnimation.PINGPONG.
     */
    type: number;
    /**
     * The easing of the animation. It influences the playing speed of the animation.
     */
    easing: number;
    /**
     * The interval object returned by window.setInterval
     */
    private interval;
    /**
     * The actual frame of the animation.
     */
    frame: number;
    /**
     * A flag for playing a ping-pong-animation.
     */
    private pingpongDirection;
    /**
     * The IsoMetric object
     */
    Engine: IsoMetric;
    /**
     * True if the animation is playing else false.
     */
    isPlaying: boolean;
    /**
     * The parent sprite object.
     */
    sprite: IsoSprite;
    /**
     * Initializes an creates a new animation.
     * @param Engine The IsoMetric object.
     * @param name (optional) The name of the new animation.
     * @param startFrame (optional) The number of the tile in the tileset where animation starts.
     * @param endFrame (optional) The number of the tile in the tileset where animation ends.
     * @param sprite (optional) The parent sprite object.
     */
    constructor(Engine: IsoMetric, name?: string, startFrame?: number, endFrame?: number, sprite?: IsoSprite);
    /**
     * Creates a new animation.
     * @param name The name of the new animation.
     * @param startFrame The number of the tile in the tileset where animation starts.
     * @param endFrame The number of the tile in the tileset where animation ends.
     * @param sprite The parent sprite object.
     * @return The animation.
     */
    create(name: string, startFrame: number, endFrame: number, sprite: IsoSprite): IsoSpriteAnimation;
    /**
     * Sets the playing speed of the animation in frames per second.
     * @param framesPerSecond The number of frames that will be played in a second.
     * @return The animation.
     */
    setFramesPerSecond(framesPerSecond: number): IsoSpriteAnimation;
    /**
     * Sets the animation type.
     * @param type The type of animation. Posiible values are:
     * - IsoSpriteAnimation.LOOP
     * - IsoSpriteAnimation.PINGPONG
     * @return The animation.
     */
    setAnimationType(type: number): IsoSpriteAnimation;
    /**
     * Starts the playingloop.
     * @return The animation.
     */
    play(): IsoSpriteAnimation;
    /**
     * Calculates the the time between two frames depending on the easing.
     */
    private recalculateFrameTime();
    /**
     * Calculates the actual frame and return it. It depends on the animation type.
     * @return The actual frame number.
     */
    calculateFrame(): number;
    /**
     * Returns the actual frame.
     * @return The actual frame.
     */
    get(): number;
    /**
     * Returns the tile number in the tileset.
     * @return The tile number.
     */
    getTileNumber(): number;
    /**
     * Stops the animation loop.
     * @return The animation.
     */
    stop(): IsoSpriteAnimation;
}
/**
 * Collection of all animation.
 */
declare class IsoSpriteAnimations {
    /**
     * An array with all animations for a sprite
     */
    animations: Array<IsoSpriteAnimation>;
    /**
     * The egnine object
     */
    Engine: IsoMetric;
    /**
     * Initialize the collection of animations
     * @param Engine The engine object
     */
    constructor(Engine: IsoMetric);
    /**
     * Adds a new animation to the collection.
     * @param name Name of the new animation.
     * @param startFrame The number of the tile in the tileset where the animation starts.
     * @param endFrame The number of the tile in the tileset where the animation ends.
     * @param sprite The parent sprite object.
     * @return The animation collection
     */
    add(name: string, startFrame: number, endFrame: number, sprite: IsoSprite): IsoSpriteAnimations;
    /**
     * Returns an animation by its name.
     * @param name The name of the animation
     * @return IsoSpriteAnimation or undefined
     */
    getByName(name: string): IsoSpriteAnimation;
}
/**
 * Generates sprites, that can free positioned on the screen. Every sprite is referenced to a layer.
 * @extends IsoBaseTileImage
 */
declare class IsoSprite extends IsoBaseTileImage {
    /**
     * Includes all animations of the sprite.
     * @see IsoSpriteAnimations
     */
    animations: IsoSpriteAnimations;
    /**
     * Position on the X-axis.
     */
    x: number;
    /**
     * Position on the Y-axis.
     */
    y: number;
    speed: number;
    /**
     * The actual tile.
     */
    tile: number;
    /**
     * The layer where the sprite will be placed on.
     */
    layer: IsoLayer;
    /**
     * Source image of the mask
     */
    maskSrc: string;
    /**
     * The default frame
     */
    defaultFrame: number;
    /**
     * The default animation if no animation is played.
     */
    defaultAnimation: string;
    collisionBody: ICollisionBody;
    /**
     * Creates a new sprite.
     * @param Engine {IsoMetric}
     * @param name Name of the sprite
     * @param src Path to the image
     * @param tileWidth Width in pixel of every tile
     * @param tileHeight Height in pixel of every tile
     * @param layer Name of the layer the sprite will be placed on
     */
    constructor(Engine: IsoMetric, name: string, src: string, tileWidth: number, tileHeight: number, layer: IsoLayer);
    /**
     * Adds a new animation to the sprite object
     * @param name Name of the animation
     * @param startFrame First from of the animation in the tileset
     * @param endFrame Last frame of the animation in the tileset
     * @return The sprite object
     */
    addAnimation(name: string, startFrame: number, endFrame: number): IsoSprite;
    /**
     * Sets the layer where the sprite will be placed on
     * @param name The name of the layer.
     * @return The sprite.
     */
    setLayer(layer: IsoLayer): IsoSprite;
    /**
     * Sets the default animation if no animation is played
     * @param name Name of the animation
     * @return The sprite
     */
    setDefaultAnimation(name: string): IsoSprite;
    /**
     * Sets the position on the X-axis.
     * @param x Position on the X-axis.
     * @return The sprite.
     */
    setX(x: number): IsoSprite;
    /**
     * Sets the position on Y-axis
     * @param y Position on the Y-axis
     * @return The sprite.
     */
    setY(y: number): IsoSprite;
    /**
     * @Todo: integrate masks
     */
    /**
     * Sets the direction of the sprite.
     * @param direction The direction of the sprite. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.RIGHT
     * - IsoMetric.LEFT
     * @return The sprite.
     */
    setDirection(direction: number): IsoSprite;
    /**
     * Gets the actual used tile of the sprite
     * @return number
     */
    getTile(): number;
    /**
     * Sets the actual tile
     * @param tileNumber The number of the tile
     * @return The sprite
     */
    setTile(tileNumber: number): IsoSprite;
    /**
     * Sets the default frame for the case no animation is played.
     * @param frame The frame number
     */
    setDefaultFrame(frame: number): IsoSprite;
    /**
     * Move the sprite on the X- and Y-axis.
     * @param x The move the position on the X-axis.
     * @param y The move the position on the Y-axis.
     * @return The sprite.
     */
    move(deltaX: number, deltaY: number): IsoSprite;
    /**
     * Sets the moving speed of the sprite.
     * @param speed The speed which the sprite will moving over the screen in pixel.
     * @return The sprite.
     */
    setSpeed(speed: number): IsoSprite;
    setCollisionBody(collisionBody: ICollisionBody): IsoSprite;
    getCollidingTiles(): Array<Array<ITile>>;
}
/**
 * Collection of all sprites.
 */
declare class IsoSprites {
    sprites: Array<IsoSprite>;
    Engine: IsoMetric;
    onEvery: Function;
    onLoaded: Function;
    loaded: number;
    layer: IsoLayer;
    /**
     * Initialize the collection.
     * @param Engine
     */
    constructor(Engine: IsoMetric, layer: IsoLayer);
    add(name: string, src: string, tileWidth: number, tileHeight: number): IsoSprites;
    getByName(name: string): IsoSprite;
    get(): Array<IsoSprite>;
    load(): IsoSprites;
    loadCounter(event: Event, sprite: IsoSprite): void;
    every(callback: Function): IsoSprites;
    then(callback: Function): IsoSprites;
    callThen(): void;
}
declare class IsoCharacter extends IsoSprite {
    attributes: Object;
    constructor(Engine: IsoMetric, name: string, src: string, tileWidth: number, tileHeight: number, layer: IsoLayer);
    addAttribute(name: string, value: any): IsoCharacter;
    getAttribute(name: string): any;
}
interface IIsoConfigWindowOptions {
    width: number;
    height: number;
    fullscreen: boolean;
}
declare class IsoConfig {
    c: Object;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric, c?: JSON);
    setConfig(c: JSON): void;
    set(name: string, value: any): void;
    get(name: string): any;
}
declare class IsoDrawer {
    Engine: IsoMetric;
    Layers: IsoLayers;
    Canvas: IsoCanvas;
    TileSets: IsoTileSets;
    onDrawLayer: Function;
    onDrawComplete: Function;
    constructor(Engine: IsoMetric);
    draw(): void;
    drawBillboards(billboards: Array<IsoBillboard>): void;
    drawLayer(layer: IsoLayer): void;
    drawSprites(sprites: Array<IsoSprite>): void;
}
declare class IsoEvent {
    type: string;
    data: any;
    constructor(type: string);
    addData(data: any): IsoEvent;
    trigger(target?: string): void;
}
declare class IsoInput {
    static KEYDOWN: number;
    static KEYUP: number;
    static KEYLEFT: number;
    static KEYRIGHT: number;
    static KEYTAB: number;
    static KEYESCAPE: number;
    static KEYSPACE: number;
    static KEYENTER: number;
    static KEYCTRL: number;
    static KEYSHIFT: number;
    static KEYALT: number;
    static KEYBACKSPACE: number;
    static EVENT_KEYPRESS: string;
    static EVENT_KEYDOWN: string;
    static EVENT_KEYUP: string;
    static EVENT_MOUSEDOWN: string;
    static EVENT_MOUSEUP: string;
    Engine: IsoMetric;
    keyCode: number;
    keyEventType: string;
    isKeyEvent: boolean;
    keyEvent: KeyboardEvent;
    keyChar: string;
    onKeyboard: Function;
    lastMouseCode: number;
    lastMouseEventType: string;
    isMouseEvent: boolean;
    mouseEvent: MouseEvent;
    onMouse: Function;
    mouseX: number;
    mouseY: number;
    lastTouchEventType: string;
    touches: TouchList;
    isTouchEvent: boolean;
    touchEvent: TouchEvent;
    onTouch: Function;
    onInput: Function;
    oldEvent: Event;
    constructor(Engine: IsoMetric);
    addEvents(): void;
    checkKeyboard(event: KeyboardEvent): void;
    checkMouse(event: MouseEvent): void;
    checkTouch(event: TouchEvent): void;
    reset(): void;
    callCallback(event: Event): void;
}
declare class IsoLayer {
    width: number;
    height: number;
    index: number;
    map: IsoMap;
    tileSizeX: number;
    tileSizeY: number;
    tileSet: IsoTileSet;
    shadowTileSet: HTMLImageElement;
    shadowStrength: number;
    name: string;
    hidden: boolean;
    Engine: IsoMetric;
    offsetX: number;
    offsetY: number;
    scrollX: number;
    scrollY: number;
    scrollSpeed: number;
    sprites: IsoSprites;
    billboards: IsoBillboards;
    constructor(Engine: IsoMetric, name: string, width: number, height: number, index: number, tileSizeX: number, tileSizeY: number);
    create(name: string, width: number, height: number, index: number, tileSizeX: number, tileSizeY: number): IsoLayer;
    setTileSet(tileSet: IsoTileSet): IsoLayer;
    getTileSet(): IsoTileSet;
    setShadowTileSet(image: HTMLImageElement): IsoLayer;
    hide(): IsoLayer;
    show(): IsoLayer;
    setDeltaScroll(x: number, y: number): void;
    setScrollSpeed(speed: number): IsoLayer;
    mouseOver(): ITile;
    setOffset(x: number, y: number): IsoLayer;
    getTilesInRadius(x: number, y: number, width: number, height: number): Array<ITile>;
}
declare class IsoLayers {
    layers: Array<IsoLayer>;
    private lastIndex;
    tileset: string;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric);
    add(name: string, width: number, height: number, tileSizeX: number, tileSizeY: number): IsoLayer;
    getByName(name: string): IsoLayer;
    getByIndex(index: number): IsoLayer;
    layerUp(name: string): IsoLayers;
    layerDown(name: string): IsoLayers;
    swapLayers(nameLayer1: string, nameLayer2: string): IsoLayers;
    sortLayers(): IsoLayers;
    sortLayerByIndex(a: IsoLayer, b: IsoLayer): number;
    setTileset(name: string): IsoLayers;
    mouseOver(name: string): ITile;
}
declare class IsoMap {
    map: Array<Array<number>>;
    shadowMap: Array<Array<number>>;
    isSimpleShadowMap: boolean;
    Layer: IsoLayer;
    constructor(Layer: IsoLayer, map?: Array<Array<number>>);
    create(map: Array<Array<number>>): IsoMap;
    createShadowMap(map: Array<Array<number>>): IsoMap;
    createSimpleShadowMap(): void;
    edit(x: number, y: number, value: number): IsoMap;
    editShadowMap(x: number, y: number, value: number): IsoMap;
    set(map: Array<Array<number>>): IsoMap;
    get(): Array<Array<number>>;
}
interface ITile {
    x: number;
    y: number;
    width: number;
    height: number;
    tile: number;
}
declare class IsoTileSet extends IsoBaseTileImage {
    constructor(Engine: IsoMetric, name: string, src: string);
}
declare class IsoTileSets extends IsoBaseTileImages {
    constructor(Engine: IsoMetric);
}
/**
 * The mainclass of IsoMetric and the starting point for the gameloop.
 */
declare class IsoMetric {
    static FRONT: number;
    static RIGHT: number;
    static BACK: number;
    static LEFT: number;
    /**
     * The configuration.
     * @see IsoConfig
     */
    config: IsoConfig;
    /**
     * The canvas object
     * @see IsoCanvas
     */
    canvas: IsoCanvas;
    /**
     * All layers of the actual game
     * @see IsoLayers
     */
    layers: IsoLayers;
    /**
     * @Todo:
     * Maybe deprecated
     */
    tileSets: IsoTileSets;
    /**
     * The drawing lib.
     * @see IsoDrawer
     */
    drawer: IsoDrawer;
    /**
     * The input library.
     * @see IsoInput
     */
    input: IsoInput;
    /**
     * [deprecated] The global direction of all layers.
     */
    direction: number;
    /**
     * The time one frames needs to draw.
     */
    frameTime: number;
    /**
     * A counter for frames.
     */
    frameCount: number;
    /**
     * An inteval for reseting the FPS
     */
    frameCountInteral: any;
    /**
     * The time in milliseconds at the begin of a loop.
     */
    startLoopTime: Date;
    /**
     * The frames per second
     */
    FPS: number;
    /**
     * The default canvas configuration.
     */
    defaultWindowOptions: IIsoConfigWindowOptions;
    /**
     * An inteval for the drawing and game loop
     */
    interval: Object;
    /**
     *
     */
    animationFrame: Object;
    /**
     * Creates a new instance of IsoMetric
     * @param windowOptions (optional) The canvas configuration.
     */
    constructor(windowOptions?: Object);
    /**
     * Reset and set the FPS
     */
    setFPS(): void;
    /**
     * Starts the game- and drawing-loop.
     */
    startLoop(): void;
    /**
     * The game- and drawing-loop.
     */
    update(): void;
    /**
     * [deprecated] Sets the global direction.
     */
    setDirection(direction: number): void;
}