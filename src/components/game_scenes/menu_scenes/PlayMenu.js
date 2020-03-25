import Phaser from "phaser";

export default class PlayMenu extends Phaser.Scene {
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
    this.key = data.key
  }

  preload() {
    this.load.html("multiplayerForm", "/assets/html/multiplayerForm.html");
  }

  create() {
    console.log('key:',this.key)
    console.log(this.bombs);
    console.log("score:", this.score);
    const bombs = this.bombs;
    const score = this.score;
    const fishNum = this.fishNum;
    const stepX = this.stepX;
    const key = this.key;
    
    this.add.existing(this.menuBg);
    const singlePlayer = this.add.image(
      this.game.renderer.width / 1.96,
      this.game.renderer.height * 0.185,
      "singlePlayer"
    );
    singlePlayer.scale = 0.3;
    const multiplayer = this.add.image(
      this.game.renderer.width / 1.96,
      this.game.renderer.height * 0.3,
      "multiplayer"
    );
    multiplayer.scale = 0.3;

    const backButtonRope = this.add.image(
      this.game.renderer.width / 2.68,
      this.game.renderer.height * 0.48,
      "backButtonRope"
    );
    backButtonRope.scale = 0.45;
    const smallPlayButton = this.add.image(
      this.game.renderer.width / 2.75,
      this.game.renderer.height * 0.63,
      "smallPlayButton"
    );
    smallPlayButton.scale = 0.35;

    singlePlayer.setInteractive();
    multiplayer.setInteractive();
    smallPlayButton.setInteractive();

    singlePlayer.on("pointerdown", () => {
      console.log("Single Player");
      
      this.scene.stop("playMenu");
      const titleScene = this.scene.get("titleScene");
      titleScene.scene.transition({
        target: "singlePlayer",
        duration: 1000,
        data: { bombs, score, fishNum, stepX, key, menuBg: this.menuBg }
      });
    });

    multiplayer.on("pointerdown", () => {
      console.log("Multiplayer");
      this.scene.start("multiplayerMenu", {
        menuBg: this.menuBg,
        smPlBtn: smallPlayButton
      });
    });

    smallPlayButton.on("pointerdown", () => {
      this.scene.start("mainMenu");
    });

    const htmlForm = this.add.dom(300, 100).createFromCache("multiplayerForm");

    htmlForm.addListener("click");
    // Have it setup so a random word gets set as server name
    htmlForm.on("click", event => {
      if (event.target.name === "submitBtn") {
        const userInput = htmlForm.getChildByName("serverName");
        const roomId = userInput.value;
        console.log(roomId)
      }
    });
  }
}
