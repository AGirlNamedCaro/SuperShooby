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

    this.socket = this.game.socket;
  }

  preload() {
    this.load.html("multiplayerForm", "/assets/html/multiplayerForm.html");
  }

  create() {
    this.add.existing(this.menuBg);
    this.add.existing(this.setMapButton);

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
          const roomId = userInput.value;
          console.log(roomId)
        }
      });
    });
  }
}
