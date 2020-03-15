import Phaser from "phaser";


export default class settingsMenu extends Phaser.Scene {
    constructor() {
        super("settingsMenu");
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

        const easy = this.add.image(this.game.renderer.width / 2.2, this.game.renderer.height * 0.28, "cancelButton");
        easy.scale = 0.08;
        const easyBombs = 1;
        const mediumBombs = 2;
        const hardBombs = 3;
        const medium = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.28, "smallPlayButton");
        medium.scale = 0.08;
        const hard = this.add.image(this.game.renderer.width -720 /2, this.game.renderer.height * 0.28, "headButton");
        hard.scale = 0.08;

        
        easy.setInteractive();
        medium.setInteractive();
        hard.setInteractive();

    easy.on("pointerdown", () => {
      console.log("Easy");
      this.scene.stop("settingsMenu");
      const titleScene = this.scene.get("titleScene");
      titleScene.scene.transition({
        target: "settingsExample",
        duration: 1000,
        data: {easyBombs}
      })
        });
        
      }
     
}
  

    