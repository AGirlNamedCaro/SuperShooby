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
        this.menuBg.scaleY = 0.3;
        const setMapButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.18, "setMapButton");
        setMapButton.scale = 0.27;
        const createMapButton = this.add.image(this.game.renderer.width / 1.97, this.game.renderer.height * 0.299, "createMapButton");
        createMapButton.scale = 0.25;
        const createCharButton = this.add.image(this.game.renderer.width / 1.95, this.game.renderer.height * 0.43, "createCharButton");
        createCharButton.scale = 0.28;
        const backButtonRope = this.add.image(this.game.renderer.width / 2.68, this.game.renderer.height * 0.48, "backButtonRope");
        backButtonRope.scale = 0.45
        const smallPlayButton = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
        smallPlayButton.scale = 0.35
        ;

        smallPlayButton.setInteractive();
        createMapButton.setInteractive();
        createCharButton.setInteractive();

        smallPlayButton.on("pointerdown", () => {
            this.scene.start("mainMenu")
          });

          createMapButton.on("pointerdown", () => {
              this.scene.start("createMap")
          })
          
        createCharButton.on("pointerdown", () => {
            
            this.scene.start("createCharacter", { menuBg: this.menuBg})
        })
    }

}