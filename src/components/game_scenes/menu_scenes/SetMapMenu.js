import Phaser from "phaser";

export default class SetMapMenu extends Phaser.Scene {
  constructor() {
    super("setMapMenu");
  }

  init(data) {
    this.menuBg = data.menuBg;
    this.menuBg.scene = this;
    this.menuBg.active = true;
    this.menuBg.visible = true;

    this.setMapButton = data.setMapButton;
    this.setMapButton.scene = this;
    this.setMapButton.active = true;
    this.setMapButton.visible = true;

    this.backButtonRope = data.backButtonRope;
    this.backButtonRope.scene = this;
    this.backButtonRope.active = true;
    this.backButtonRope.visible = true;

    this.backButton = data.backButton;
    this.backButton.scene = this;
    this.backButton.active = true;
    this.backButton.visible = true;

    this.socket = this.game.socket;
  }

  preload() {
    this.load.html("multiplayerForm", "/assets/html/multiplayerForm.html");
    this.load.text("thumbnailB64", "/assets/thumbnails/superShoobyDefault.txt");
  }

  create() {
    this.add.existing(this.menuBg);
    this.add.existing(this.setMapButton);
    this.add.existing(this.backButton);
    this.add.existing(this.backButtonRope);

    this.backButton.setInteractive();
    this.setMapButton.setInteractive();
    console.log("clicked");
    const htmlForm = this.add.dom(this.game.renderer.width / 2.5, this.game.renderer.height * 0.18).createFromCache("multiplayerForm");
    const thumbnail = new Image(160, 120);
    this.add.dom(300, 180, thumbnail);
    thumbnail.src = this.cache.text.get('thumbnailB64');;
    htmlForm.addListener("click");

    htmlForm.on("click", event => {
      if (event.target.name === "submitBtn") {
        const userInput = htmlForm.getChildByName("serverName");
        const levelId = userInput.value;
        console.log(levelId);
        this.socket.emit("getLevel", levelId);
      }
    });

    this.socket.on("returnedMap", mapData => {
      // console.log("map", mapData)
      this.game.setLevel(mapData.levelData[0]);
      
      thumbnail.src = mapData.thumbnail;
    });

    this.backButton.on("pointerdown", () => {
      this.scene.start("customizeMenu");
    });
  }
}
