import Phaser from "phaser";

export default class CreateMap extends Phaser.Scene {
  constructor() {
    super("createMap");
    this.selectedIndex = 1;
  }

  preload() {
    this.load.image("tiles", "/assets/images/prefabs/marioTileset.png");
    this.load.tilemapTiledJSON("world", "/assets/mapData/marioTileset16.json");
  }

  create() {
    const map = this.make.tilemap({ key: "world" });
    const tiles = map.addTilesetImage("tiles");

    this.skyLayer = map.createDynamicLayer("sky", [tiles], 0, 0);
    this.cloudsLayer = map.createDynamicLayer("clouds", [tiles], 0, 0);
    this.groundLayer = map.createDynamicLayer("ground", [tiles], 0, 0);
    this.tileSelector = map.createBlankDynamicLayer(
      "tileSelector",
      [tiles],
      0,
      0
    );

    this.selectedLayer = this.groundLayer;

    this.text = this.add.text(10, 10, this.setText([this.skyLayer, this.cloudsLayer, this.groundLayer], this.selectedLayer.layer.name));

    this.marker = this.add.graphics();
    this.marker.lineStyle(5, 0xffffff, 1);
    this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
    this.marker.lineStyle(3, 0x0c6fd8, 1);
    this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

    // console.log("test", Phaser.Tilemaps.Parsers.Tiled.BuildTilesetIndex(map));
    // console.log("tiles", this.groundLayer.findByIndex(1))
    console.log("Tileset", tiles.getTileTextureCoordinates(2));
    console.log("tileimage", tiles);

    this.cursors = this.input.keyboard.addKeys({
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      q: Phaser.Input.Keyboard.KeyCodes.Q,
      h: Phaser.Input.Keyboard.KeyCodes.H,
      one: Phaser.Input.Keyboard.KeyCodes.ONE,
      two: Phaser.Input.Keyboard.KeyCodes.TWO,
      three: Phaser.Input.Keyboard.KeyCodes.THREE
    });

    this.input.keyboard.on("keydown-" + "SHIFT", event => {
      this.marker.lineStyle(5, 0xffffff, 1);
      this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
      this.marker.lineStyle(3, 0xff4f78, 1);
      this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
    });

    this.input.keyboard.on("keyup-" + "SHIFT", event => {
      this.marker.lineStyle(5, 0xffffff, 1);
      this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
      this.marker.lineStyle(3, 0x0c6fd8, 1);
      this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
    });

    this.input.keyboard.on("keydown-" + "H", event => {
      this.selectedLayer.setActive(!this.selectedLayer.active)
      this.selectedLayer.setVisible(!this.selectedLayer.visible)
      this.text.text = this.setText([this.skyLayer, this.cloudsLayer, this.groundLayer], this.selectedLayer.layer.name);
    });

    this.mapTilesToLayer(
      this.create2DArray(tiles.columns, tiles.rows),
      this.tileSelector
    );
  }

  update() {
    const worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main
    );

    const pointerTileXY = this.groundLayer.worldToTileXY(
      worldPoint.x,
      worldPoint.y
    );
    const snappedWorldPoint = this.groundLayer.tileToWorldXY(
      pointerTileXY.x,
      pointerTileXY.y
    );
    this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);

    if (this.input.manager.activePointer.isDown) {
      if (this.cursors.shift.isDown) {
        this.selectedLayer.removeTileAtWorldXY(worldPoint.x, worldPoint.y);
      } else if (this.cursors.q.isUp) {
        this.selectedLayer.putTileAtWorldXY(
          this.selectedIndex,
          worldPoint.x,
          worldPoint.y
        );
      }
    }

    if (this.cursors.q.isDown) {
      this.tileSelector.setVisible(true);
      if (this.input.manager.activePointer.isDown) {
        this.selectedIndex = this.tileSelector.getTileAtWorldXY(
          worldPoint.x,
          worldPoint.y
        ).index;
      }
    } else {
      this.tileSelector.setVisible(false);
    }

    if (this.cursors.one.isDown) {
      this.selectedLayer = this.skyLayer;
      this.text.text = this.setText([this.skyLayer, this.cloudsLayer, this.groundLayer], this.selectedLayer.layer.name);
    }

    if (this.cursors.two.isDown) {
      this.selectedLayer = this.cloudsLayer;
      this.text.text = this.setText([this.skyLayer, this.cloudsLayer, this.groundLayer], this.selectedLayer.layer.name);
    }

    if (this.cursors.three.isDown) {
      this.selectedLayer = this.groundLayer;
      this.text.text = this.setText([this.skyLayer, this.cloudsLayer, this.groundLayer], this.selectedLayer.layer.name);
    }
  }

  create2DArray(columns, rows) {
    let tilesArray = [];

    let index = 0;
    for (let x = 0; x < rows; x++) {
      let columnArray = [];
      for (let y = 0; y < columns; y++) {
        index++;
        columnArray = [...columnArray, index];
      }
      tilesArray = [...tilesArray, columnArray];
    }
    return tilesArray;
  }

  mapTilesToLayer(dimensionalArray, tileLayer) {
    dimensionalArray.forEach((array, index) => {
      tileLayer.putTilesAt(array, 0, index);
    });
  }

  setText(layers, layerName) {
    const text = "";
    const skyLayerActive = layers[0].active;
    const cloudLayerActive = layers[1].active;
    const groundLayerActive = layers[2].active;

    return `Selected Layer: ${layerName}` +
           `\nSkyLayer: ${skyLayerActive ? "Not Hidden" : "Hidden"}` +
           `\nCloudLayer: ${cloudLayerActive ? "Not Hidden" : "Hidden"}` +
           `\nGroundLayer: ${groundLayerActive ? "Not Hidden" : "Hidden"}`
  }
}
