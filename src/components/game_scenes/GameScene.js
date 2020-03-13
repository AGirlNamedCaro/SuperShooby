import Phaser from "phaser";

export default class GameScene extends Phaser.Scene{
    constructor() {
        super("gameScene");
    }

    preload() {
        this.load.image("tiles", "/assets/images/prefabs/marioTileset.png");
        this.load.tilemapTiledJSON("world", "/assets/mapData/marioTileset16.json")
    }

    create() {
        const worldMap = this.add.tilemap("world")
        const tileset = worldMap.addTilesetImage("tiles",);
        const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
        const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
    }
}