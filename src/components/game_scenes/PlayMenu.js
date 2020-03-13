import Phaser from "phaser";

export default class PlayMenu extends Phaser.Scene{
  constructor() {
    super("playMenu");
  }

  init(data) {
    this.menuBg = data.menuBg;
    this.menuBg.scene = this;
    this.menuBg.active = true;
    this.menuBg.visible = true;
  }

  create() {

    this.add.existing(this.menuBg);
    const singlePlayer = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.32, "singlePlayer");
    singlePlayer.scale = 0.15;
    const multiplayer = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "multiplayer");
    multiplayer.scale = 0.15;

    const smallPlayButton = this.add.image(this.game.renderer.width / 2.8, this.game.renderer.height * 0.24, "smallPlayButton");
    smallPlayButton.flipX = true;
    smallPlayButton.scale = 0.09;

    smallPlayButton.setInteractive();

    smallPlayButton.on("pointerdown", () => {
      this.scene.start("mainMenu")
    })
  }
}