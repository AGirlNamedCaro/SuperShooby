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
    this.bombs = data.bombs;
    this.score = data.score;
    this.fishNum = data.fishNum;
    this.stepX = data.stepX;
  }

  create() {
    console.log(this.bombs);
    console.log("score:" ,this.score)
    const bombs = this.bombs;
    const score = this.score;
    const fishNum = this.fishNum;
    const stepX = this.stepX;
    this.add.existing(this.menuBg);
    const singlePlayer = this.add.image(this.game.renderer.width / 1.96, this.game.renderer.height * 0.185, "singlePlayer");
    singlePlayer.scale = 0.30;
    const multiplayer = this.add.image(this.game.renderer.width / 1.96, this.game.renderer.height * 0.30, "multiplayer");
    multiplayer.scale = 0.30;

    const backButtonRope = this.add.image(this.game.renderer.width / 2.68, this.game.renderer.height * 0.48, "backButtonRope");
    backButtonRope.scale = 0.45
    const smallPlayButton = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
    smallPlayButton.scale = 0.35
    ;

    singlePlayer.setInteractive();
    multiplayer.setInteractive();
    smallPlayButton.setInteractive();

    singlePlayer.on("pointerdown", () => {
      console.log("Single Player");
      this.scene.stop("playMenu");
      const titleScene = this.scene.get("titleScene");
      titleScene.scene.transition({
        target: "authScene",
        duration: 1000,
        data: {bombs, score, fishNum, stepX}
      })
    });

    multiplayer.on("pointerdown", () => {
      console.log("Multiplayer");
      this.scene.start("multiplayerMenu", { menuBg: this.menuBg, smPlBtn: smallPlayButton})
    });

    smallPlayButton.on("pointerdown", () => {
      this.scene.start("mainMenu")
    });
  }
}