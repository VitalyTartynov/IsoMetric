﻿///<reference path="IsoMap" />
///<reference path="IsoTile" />
"use strict";
/**
 * @interface IsoTilesInView
 */
interface IsoTilesInView {
    rowStart: number;
    rowEnd: number;
    columnStart: number;
    columnEnd: number;
    tiles: Array<Array<IsoTile>>;
}
/**
 * IsoTileMap draws a tile-based map on the screen. 
 */
class IsoTileMap {
    map: IsoMap;
    tiles: Array<Array<IsoTile>> = new Array();
    tilesInView: IsoTilesInView;
    tileSize: IsoTileSize;
    image: IsoRessource;
    offset: IsoOffset;
    scrollPosition: IsoScroll;
    speed: number = 1;
    zoomLevel: number = 1;
    zoomStrength: number = 1 / 1000;
    minZoomLevel: number;
    maxZoomLevel: number;
    zoomPoint: IsoPoint = { x: 0, y: 0 };
    name: string;
    Engine: IsoMetric;
    /**
     * @param {IsoMetric} Engine
     * @param {string} [name]
     * @param {number} [tileWidth]
     * @param {number} [tileHeight]
     * @param {IsoRessource} [image]
     * @param {Array<Array<Array<number>>>} [map]
     * @chainable
     */
    constructor(
        Engine: IsoMetric,
        name?: string,
        tileWidth?: number,
        tileHeight?: number,
        image?: IsoRessource,
        map?: Array<Array<Array<number>>>
        ) {
        this.Engine = Engine;
        if (name !== undefined) {
            this.setName(name);
        }
        if (tileWidth !== undefined && tileHeight !== undefined) {
            this.setTileSize({ width: tileWidth, height: tileHeight });
        }
        if (image !== undefined) {
            this.setImage(image);
        }
        if (map !== undefined) {
            this.setMap(map);
        }
        this.setOffset({ x: 0, y: 0 });
        this.setScroll(0, 0);
        return this;
    }
    /**
     * Sets the map of the tilemap
     * @param {Array<Array<Array<number>>>} map The new map
     * @chainable
     */
    setMap(map: Array<Array<Array<number>>>): IsoTileMap {
        this.map = new IsoMap(map);
        return this;
    }
    /**
     * Create a new empty map
     * @param {number} numTilesX The number of tiles on the X-axis
     * @param {number} numTilesY The number of tiles on the Y-axis
     * @param {Array<number>} [defaultValue] The default value of each new tile.
     * @chainable
     */
    createMap(numTilesX: number, numTilesY: number, defaultValue?: Array<number>): IsoTileMap {
        if (defaultValue === undefined) {
            defaultValue = new Array(0);
        }
        var map = new Array();
        for (var y = 0; y < numTilesY; y++) {
            for (var x = 0; x < numTilesX; x++) {
                if (map[y] === undefined) {
                    map[y] = new Array();
                }
                map[y][x] = defaultValue;
            }
        }

        return this.setMap(map);
    }
    /**
     * Creates all tile for the tilemap based on the map.
     * @chainable
     */
    createTiles(): IsoTileMap {
        try {
            this.tiles = new Array();
            if (this.verify()) {
                var map = this.map.get(),
                    rows = map.length,
                    columns = map[0].length;
                for (var y = 0; y < rows; y++) {
                     for (var x = 0; x < columns; x++) {
                        if (this.tiles[y] === undefined) {
                            this.tiles[y] = new Array();
                        }
                        var tile = map[y][x][0],
                            height = 0;
                        if (map[y][x][1] !== undefined) {
                            height = map[y][x][1];
                        }
                        this.tiles[y][x] = new IsoTile(this.Engine, this.image, {
                            tile: tile,
                            height: height,
                            size: this.tileSize,
                            mapPosition: {
                                column: x,
                                row: y
                            }
                        });
                    }
                }
            } else {
                throw ("The tilemap '" + this.name + "' is not valid. Please check the properties image, map and tileSize.");
            }
            return this;
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * Get a tile given by its name.
     * @param {string} name Name of the tile.
     * @return {IsoTIle} The tile.
     */
    getTile(name: string) {
        for (var i = 0; i < this.tiles.length; i++) {
            for (var p = 0; p < this.tiles[0].length; p++) {
                if (this.tiles[i][p].name === name) {
                    return this.tiles[i][p];
                }
            }
        }
    }
    /**
     * Returns all tiles which are visible on the screen
     * @return {IsoTilesInView} All tiles wich are visible on the screen.
     */
    getTilesInView(): IsoTilesInView {
        if (this.verify()) {
            var canvasWidth = this.Engine.canvas.canvasElement.width,
                canvasHeight = this.Engine.canvas.canvasElement.height,
                map = this.map.get(),
                mapLengthY = map.length,
                mapLengthX = map[0].length,
                startPointX = (((this.offset.x - this.scrollPosition.x) * this.zoomLevel)
                    + ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x)),
                startPointY = (((this.offset.y - this.scrollPosition.y) * this.zoomLevel)
                    + ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y)),
                columnStart =
                    Math.floor(startPointX / (this.tileSize.width * this.zoomLevel)),
                columnEnd =
                    Math.floor((canvasWidth + startPointX) / (this.tileSize.width * this.zoomLevel)) + 1,
                rowStart =
                    Math.floor(startPointY / (this.tileSize.height * this.zoomLevel)),
                rowEnd =
                    Math.floor((canvasHeight + startPointY) / (this.tileSize.height * this.zoomLevel)) + 1

            if (columnStart < 0) {
                columnStart = 0;
            }
            if (rowStart < 0) {
                rowStart = 0;
            }
            if (columnEnd >= mapLengthX) {
                columnEnd = mapLengthX;
            }
            if (rowEnd >= mapLengthY) {
                rowEnd = mapLengthY;
            }

            var tiles = new Array();
            for (var y = 0; y < rowEnd - rowStart; y++) {
                for (var x = 0; x < columnEnd - columnStart; x++) {
                    if (tiles[y] === undefined) {
                        tiles[y] = new Array();
                    }
                    tiles[y][x] = this.tiles[y + rowStart][x + columnStart];
                }
            }
            return {
                rowStart: rowStart,
                rowEnd: rowEnd,
                columnEnd: columnEnd,
                columnStart: columnStart,
                tiles: tiles
            };
        } else {
            throw ("The tilemap '" + this.name + "' is not valid. Please check the properties image, map and tileSize.");
        }
    }

    /**
     * Gets all tiles in specified area.
     * @param x The position on the X-axis of the area
     * @param y The position on the Y-axis of the area
     * @param width The width of the area
     * @param height The height of the area
     * @return An object with information of all tiles
     */
    getTilesInRadius(x: number, y: number, width: number, height: number): Array<IsoTile> {
        x = x - (((this.offset.x + this.scrollPosition.x) * this.zoomLevel)
            - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x));
        y = y - (((this.offset.y + this.scrollPosition.y) * this.zoomLevel)
            - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y));

        var map = this.map.get(),
            mapLengthY = map.length,
            mapLengthX = map[0].length,
            rowStart = rowStart = Math.floor(y / (this.tileSize.height * this.zoomLevel)),
            columnStart = Math.floor(x / (this.tileSize.width * this.zoomLevel)),
            columnEnd = Math.floor((x + width) / (this.tileSize.width * this.zoomLevel)),
            rowEnd = Math.floor((y + height) / (this.tileSize.height * this.zoomLevel));

        if (columnStart < 0) {
            columnStart = 0;
        }
        if (rowStart < 0) {
            rowStart = 0;
        }
        if (columnEnd >= mapLengthX) {
            columnEnd = mapLengthX;
        }
        if (rowEnd >= mapLengthY) {
            rowEnd = mapLengthY;
        }

        var tiles = new Array();
        for (var row = rowStart; row < rowEnd; row++) {
            for (var column = columnStart; column < columnEnd; column++) {
                tiles[row][column] = this.tiles[row][column];
            }
        }
        return tiles;
    }

    /**
     * Return the tile placed on the given position.
     * @param {IsoPoint} position The position to check.
     * @return {IsoTile} The tile on the given position.   
     */
    getTileOnPosition(position: IsoPoint): IsoTile {
        if (this.map.get() !== undefined) {
            var mapLengthY = this.map.map.length,
                mapLengthX = this.map.map[0].length;

            if (
                position.x > (mapLengthX * (this.tileSize.width * this.zoomLevel)) ||
                position.y > (mapLengthY * (this.tileSize.height * this.zoomLevel)) ||
                typeof position.x === "NaN" ||
                typeof position.y === "NaN" ||
                position.x === undefined ||
                position.y === undefined
                ) {
                return null;
            } else {
                position.x = position.x - (((this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                    - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x));
                position.y = position.y - (((this.offset.y + this.scrollPosition.y) * this.zoomLevel)
                    - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y));
                if (position.y > 0 && position.x > 0) {
                    var row = Math.floor(position.y / (this.tileSize.height * this.zoomLevel)),
                        column = Math.floor(position.x / (this.tileSize.width * this.zoomLevel));
                    return this.tiles[row][column];
                } else {
                    return null;
                }
            }
        } else {
            return undefined;
        }
    }
    /**
     * Sets the image ressource for the tilemap.
     * @param {IsoRessource} image
     * @chainable
     */
    setImage(image: IsoRessource): IsoTileMap {
        this.image = image;
        return this;
    }
    /**
     * Sets the maximum value for zooming.
     * @param {number} zoomLevel
     * @chainable
     */
    setMaxZoomLevel(zoomLevel: number): IsoTileMap {
        this.maxZoomLevel = zoomLevel;
        return this;
    }
    /**
     * Sets the minimum value for zooming.
     * @param {number} zoomLevel
     * @chainable
     */
    setMinZoomLevel(zoomLevel: number): IsoTileMap {
        this.minZoomLevel = zoomLevel;
        return this;
    }
    /**
     * Sets the name of the tilemap
     * @param {string} name
     * @chainable
     */
    setName(name: string): IsoTileMap {
        this.name = name;
        return this;
    }
    /**
     * Sets the offset of the tilemap
     * @param {IsoOffset} offset
     * @chainable
     */
    setOffset(o: IsoOffset): IsoTileMap {
        this.offset = o;
        return this;
    }
    /**
     * Sets the scroll-position of the tilemap.
     * @param {number} x The x-position.
     * @param {number} y The y-position.
     * @chainable
     */
    setScroll(x: number, y: number): IsoTileMap {
        this.scrollPosition = { x: x, y: y };
        return this;
    }
    /**
     * Sets the speed  for scrolling and moving for the tilemap.
     * @param {number} speed
     * @chainable
     */
    setSpeed(speed: number): IsoTileMap {
        this.speed = speed;
        return this;
    }
    /**
     * Scrolls the tilemap relative to the actual position.
     * @param {number} x The relative position on the x-axis.
     * @param {number} y The relative position on the y-axis.
     * @chainable
     */
    scroll(x: number, y: number): IsoTileMap {
        x = x + this.scrollPosition.x;
        y = y + this.scrollPosition.y;
        this.scrollPosition = {
            x: x,
            y: y
        };
        return this;
    }
    /**
     * Sets the tilesize of the tilemap.
     * @param {IsoTileSize} size The new size.
     * @chainable
     */
    setTileSize(size: IsoTileSize): IsoTileMap {
        this.tileSize = size;
        return this;
    }
    /**
     * Sets the zoomLevel of the tilemap.
     * @param {number} zoomLevel 
     * @chainable
     */
    setZoomLevel(zoomLevel: number): IsoTileMap {
        this.zoomLevel = zoomLevel;
        return this;
    }
    /**
     * Sets the zooming point of the tilemap.
     * @param {IsoPoint} point
     * @chainable
     */
    setZoomPoint(point: IsoPoint): IsoTileMap {
        this.zoomPoint = point;
        return this;
    }
    /**
     * Sets the strength of zooming.
     * @param {number} zoomStrength
     * @chainable
     */
    setZoomStrength(zoomStrength: number): IsoTileMap {
        this.zoomStrength = zoomStrength / 1000;
        return this;
    }
    /**
     * Update the tilemap and with this all the tiles of the tilemap.
     */
    update() {
        if (this.tiles === undefined || this.tiles.length === 0) {
            this.createTiles();
        }

        for (var y = 0; y < this.tiles.length; y++) {
            for (var x = 0; x < this.tiles[0].length; x++) {
                this.updateTile(this.tiles[y][x]);
            }
        }
    }
    /**
     * Update all tiles of the tilemap.
     */
    updateTile(tile: IsoTile) {
        if (tile !== undefined) {
            if (tile.updateType === IsoTile.AUTOMATIC) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
                tile.setZoomLevel(this.zoomLevel);
                tile.setZoomPoint(this.zoomPoint);
            } else if (tile.updateType === IsoTile.POSITION) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
            } else if (tile.updateType === IsoTile.ZOOM) {
                tile.setZoomLevel(this.zoomLevel);
                tile.setZoomPoint(this.zoomPoint);
            }
            if (tile.tileHeight === undefined || typeof tile.tileHeight === "NaN") {
                tile.tileHeight = 0;
            }
        }
    }
    /**
     * Verify the tilemap.
     * @private
     */
    private verify() {
        if (this.image === undefined || this.image.image.isLoaded === false) {
            return false;
        }

        if (this.tileSize === undefined) {
            return false;
        }

        if (this.map === undefined && this.map.get() === undefined && this.map.get()[0] === undefined) {
            return false;
        }
        return true;
    }
    /**
     * Set te zoom of the tilemap relative to the current zoom.
     * @param {number} zoom
     * @chainable
     */
    zoom(zoom: number): IsoTileMap {
        var zoomLevel = this.zoomLevel + (this.zoomStrength * zoom);
        if (this.maxZoomLevel !== undefined && this.minZoomLevel !== undefined) {
            if (zoomLevel >= this.minZoomLevel && zoomLevel <= this.maxZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        } else if (this.maxZoomLevel !== undefined) {
            if (zoomLevel <= this.maxZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        } else if (this.minZoomLevel !== undefined) {
            if (zoomLevel >= this.minZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        } else {
            this.setZoomLevel(zoomLevel);
        }
        return this;
    }
} 