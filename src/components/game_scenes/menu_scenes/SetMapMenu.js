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
  }

  create() {
    this.add.existing(this.menuBg);
    this.add.existing(this.setMapButton);
    this.add.existing(this.backButton);
    this.add.existing(this.backButtonRope);

    this.backButton.setInteractive();
    this.setMapButton.setInteractive();
    this.setMapButton.on("pointerdown", () => {
      console.log("clicked")
      const htmlForm = this.add
        .dom(300, 180)
        .createFromCache("multiplayerForm");

      htmlForm.addListener("click");

      htmlForm.on("click", event => {
        if (event.target.name === "submitBtn") {
          const userInput = htmlForm.getChildByName("serverName");
          const levelId = userInput.value;
          console.log(levelId)
          this.socket.emit("getLevel", levelId);
        }
      });

      this.socket.on("returnedMap" , mapData => {
        this.game.setLevel(mapData[0])
      });
    });

    this.backButton.on("pointerdown", () => {
      this.scene.start("customizeMenu")
    })
    
  }
}
