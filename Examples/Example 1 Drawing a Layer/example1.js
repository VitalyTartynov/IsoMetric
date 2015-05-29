///<reference path="../isometric.d.ts" />
var App, firstLayer;
window.onload = function () {
    App = new IsoMetric({
        fullscreen: true
    });
    App.layers.add("firstLayer");
    App.layers.getByName("firstLayer").tileMap.create(1920, 1920, 64, 64);
    App.tileSets.add("firstTileSet", "../images/ground.png");
    firstLayer = App.layers.getByName("firstLayer");
    App.tileSets.load().then(function () {
        firstLayer.tileMap.setTileSet(App.tileSets.getByName("firstTileSet"));
        firstLayer.tileMap.setScrollSpeed(8);
        gameExample1();
    });
};
function gameExample1() {
    if (App.input.keyEventType === IsoInput.EVENT_KEYDOWN) {
        switch (App.input.keyCode) {
            case IsoInput.KEYUP:
                firstLayer.tileMap.setDeltaScroll(0, 1);
                break;
            case IsoInput.KEYDOWN:
                firstLayer.tileMap.setDeltaScroll(0, -1);
                break;
            case IsoInput.KEYLEFT:
                firstLayer.tileMap.setDeltaScroll(-1, 0);
                break;
            case IsoInput.KEYRIGHT:
                firstLayer.tileMap.setDeltaScroll(1, 0);
        }
    }
    // Draw all the layers and sprites
    App.update();
    //After drawing the maps and sprites:
    App.canvas.context.fillStyle = "#fff";
    App.canvas.context.font = "20px Arial";
    //Draw ing the FPS to the screen
    App.canvas.context.fillText("FPS: " + App.FPS, 10, 30);
    // Restart the game loop
    requestAnimationFrame(function () { return gameExample1(); });
}
;
//# sourceMappingURL=example1.js.map