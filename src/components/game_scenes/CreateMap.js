import Phaser from "phaser";

export default class CreateMap extends Phaser.Scene {
  constructor() {
    super("createMap");
    this.selectedIndex = 1;
  }

  init() {
    this.socket = this.game.socket;
  }

  preload() {
    this.load.image("tiles", "/assets/images/prefabs/shoobyTileSet.png");
    this.load.tilemapTiledJSON("createWorld", this.game.level);
    this.load.image("exportMenu", "/assets/images/backgrounds/exportmenu.png");
  }

  create() {
    this.game.setGameInfo("createMapControls");
    // TODO need to figure out why this scene isnt loading up the set scene
    const map = this.make.tilemap({ key: "createWorld" });
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

    this.text = this.add.text(
      10,
      10,
      this.setText(
        [this.skyLayer, this.cloudsLayer, this.groundLayer],
        this.selectedLayer.layer.name
      )
    );

    this.marker = this.add.graphics();
    this.marker.lineStyle(5, 0xffffff, 1);
    this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
    this.marker.lineStyle(3, 0x0c6fd8, 1);
    this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

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
      this.selectedLayer.setActive(!this.selectedLayer.active);
      this.selectedLayer.setVisible(!this.selectedLayer.visible);
      this.text.text = this.setText(
        [this.skyLayer, this.cloudsLayer, this.groundLayer],
        this.selectedLayer.layer.name
      );
    });

    this.input.keyboard.on("keyup-" + "E", event => {
      // TODO this is where the exporting happens, should make a menu that pops up when this is pressed or something

      console.log("exporting");
      this.exportingText = this.add.text(
        this.game.renderer.width / 3.2,
        this.game.renderer.height * 0.4,
        "Exporting... Please Wait"
      );

      const saveThumbnail = new Promise((res, rej) => {
        this.text.setVisible(false);
        this.marker.setVisible(false);
        this.game.renderer.snapshot(image => {
          this.marker.setVisible(true);
          this.text.setVisible(true);
          if (image) {
            this.exportMenu = this.add.image(
              this.game.renderer.width / 3.2,
              this.game.renderer.height * 0.4,
              "exportMenu"
            );
            this.exportMenu.scale = 0.35;
            this.exit = this.add.image(
              this.game.renderer.width / 1.5,
              this.game.renderer.height * 0.62,
              "exit"
            );
            this.exit.scale = 0.2;
            this.exit.setVisible(false);
            this.exportMenu.setVisible(false);
            res(image);
          } else {
            rej(Error("couldnt save image"));
          }
        });
      });

      saveThumbnail.then(image => {
        const exportObj = this.exportJSON(map, tiles, [
          this.skyLayer,
          this.cloudsLayer,
          this.groundLayer
        ]);

        const mapData = {
          thumbnail: image.src,
          levelData: exportObj
        };

        this.game.setLevel(exportObj);
        this.socket.emit("createMap", mapData);
        this.socket.on("returnedMapId", mapId => {
          this.exportingText.setVisible(false);
          this.exit.setVisible(true);
          this.exportMenu.setVisible(true);
          this.exit.setInteractive();

          const textStyle = {
            // Many different keys to alter the text
            // fontFamily:
            fontSize: "50px",
            color: "#000000"
          };

          this.add.text(
            this.game.renderer.width / 3.7,
            this.game.renderer.height * 0.43,
            mapId,
            textStyle
          ).scale = 0.7;
        });
        this.exit.on("pointerdown", () => {
          this.scene.start("titleScene");
          this.scene.start("mainMenu");
          this.scene.stop("createMap");
        });
      });
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
      this.text.text = this.setText(
        [this.skyLayer, this.cloudsLayer, this.groundLayer],
        this.selectedLayer.layer.name
      );
    }

    if (this.cursors.two.isDown) {
      this.selectedLayer = this.cloudsLayer;
      this.text.text = this.setText(
        [this.skyLayer, this.cloudsLayer, this.groundLayer],
        this.selectedLayer.layer.name
      );
    }

    if (this.cursors.three.isDown) {
      this.selectedLayer = this.groundLayer;
      this.text.text = this.setText(
        [this.skyLayer, this.cloudsLayer, this.groundLayer],
        this.selectedLayer.layer.name
      );
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
    const skyLayerActive = layers[0].active;
    const cloudLayerActive = layers[1].active;
    const groundLayerActive = layers[2].active;

    return (
      `Selected Layer: ${layerName}` +
      `\nSkyLayer: ${skyLayerActive ? "Not Hidden" : "Hidden"}` +
      `\nCloudLayer: ${cloudLayerActive ? "Not Hidden" : "Hidden"}` +
      `\nGroundLayer: ${groundLayerActive ? "Not Hidden" : "Hidden"}`
    );
  }

  exportJSON(map, tileSet, tileLayers) {
    const jsonObj = {
      compressionlevel: -1,
      height: map.height,
      infinite: false,
      layers: [],
      nextlayerid: map.layers.length,
      nextobjectid: 1,
      orientation: map.orientation,
      renderorder: map.renderOrder,
      // tiledversion: "1.3.3",
      tileheight: map.tileHeight,
      tilesets: [
        {
          columns: tileSet.columns,
          firstgid: tileSet.firstgid,
          // not sure how to set this up
          image: "../../Pictures/shoobyTileSet.png",
          imageheight: tileSet.image.source[0].height,
          imagewidth: tileSet.image.source[0].width,
          margin: tileSet.tileMargin,
          name: tileSet.name,
          spacing: tileSet.tileSpacing,
          tilecount: tileSet.total,
          tileheight: tileSet.tileHeight,
          tilewidth: tileSet.tileWidth
        }
      ],
      tilewidth: map.tileWidth,
      type: "map",
      version: map.version,
      width: map.width
    };

    tileLayers.forEach(layer => {
      let dataObj = {
        data: [],
        height: layer.layer.height,
        id: layer.layerIndex + 1,
        name: layer.layer.name,
        // Might be wrong
        opacity: layer.layer.alpha,
        type: "tilelayer",
        visible: true,
        width: layer.layer.width,
        x: layer.layer.x,
        y: layer.layer.y
      };
      layer.forEachTile(tile => {
        if (tile.index === -1) {
          dataObj.data.push(0);
        } else {
          dataObj.data.push(tile.index);
        }
      });
      jsonObj.layers.push(dataObj);
    });
    return jsonObj;
  }
}
