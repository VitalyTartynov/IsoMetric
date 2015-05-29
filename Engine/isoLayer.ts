﻿"use strict";
class IsoLayer {
    index: number;
    name: string;
    hidden: boolean = false;
    Engine: IsoMetric;
    sprites: IsoSprites;
    billboards: IsoBillboards;
    tileMap: IsoTileMap;

    constructor(Engine: IsoMetric, name: string, index: number) {
        this.Engine = Engine;
        this.name = name;
        this.sprites = new IsoSprites(this.Engine, this);
        this.billboards = new IsoBillboards(this.Engine, this);
        this.tileMap = new IsoTileMap(this.Engine);
    }

    hide() : IsoLayer {
        this.hidden = true;
        return this;
    }

    show() : IsoLayer {
        this.hidden = false;
        return this;
    }
}

class IsoLayers {
    layers: Array<IsoLayer> = new Array();
    private lastIndex: number = 0;
    tileset: string;
    Engine: IsoMetric;

    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }

    add(name: string) : IsoLayer {
        this.layers.push(new IsoLayer(this.Engine, name, this.lastIndex));
        this.lastIndex++;
        return this.getByName(name);
    }

    getByName(name: string) : IsoLayer {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].name === name) {
                return this.layers[i];
            }
        }
        return undefined;
    }

    getByIndex(index: number): IsoLayer {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].index === index) {
                return this.layers[i];
            }
        }
        return undefined;
    }

    layerUp(name: string) : IsoLayers {
        var oldIndex = this.getByName(name).index;
        this.getByIndex(oldIndex + 1).index = oldIndex;
        this.getByName(name).index = oldIndex + 1;
        return this;
    }

    layerDown(name: string) : IsoLayers {
        var oldIndex = this.getByName(name).index;
        this.getByIndex(oldIndex - 1).index = oldIndex;
        this.getByName(name).index = oldIndex - 1;
        return this;
    }

    swapLayers(nameLayer1: string, nameLayer2: string): IsoLayers {
        var oldIndex = this.getByName(nameLayer2).index;
        this.getByName(nameLayer2).index = this.getByName(nameLayer1).index;
        this.getByName(nameLayer1).index = oldIndex;
        return this;
    }

    sortLayers() : IsoLayers {
        this.layers.sort(this.sortLayerByIndex);
        return this;
    }

    sortLayerByIndex(a: IsoLayer, b: IsoLayer) : number {
        return a.index - b.index;
    }

    setTileset(name : string): IsoLayers {
        this.tileset = name;
        return this;
    }

    mouseOver(name: string) {
        return this.getByName(name).tileMap.mouseOver();
    }
} 