import Phaser from "phaser";

export default class Customize extends Phaser.Scene {
    constructor() {
        super("customizeMenu");
    }

    init(data) {
        this.menuBg = data.menuBg;
        this.menuBg.scene = this;
        this.menuBg.active = true;
        this.menuBg.visible = true;
    }

    create() {
        this.add.existing(this.menuBg);
        this.menuBg.scaleY = 0.45;
        const setMapButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.32, "setMapButton");
        setMapButton.scale = 0.15;
        const createMapButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "createMapButton");
        createMapButton.scale = 0.15;
        const createCharButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.48, "createCharButton");
        createCharButton.scale = 0.15;

        const smallPlayButton = this.add.image(this.game.renderer.width / 2.8, this.game.renderer.height * 0.23, "smallPlayButton");
        smallPlayButton.flipX = true;
        smallPlayButton.scale = 0.09;

        smallPlayButton.setInteractive();

        smallPlayButton.on("pointerdown", () => {
            this.scene.start("mainMenu")
          });
    }

}