import Phaser from "phaser";
const axios = require("axios");

export default class Customize extends Phaser.Scene {
  constructor() {
    super("roomSelectMenu");
  }

  init(data) {
    this.key = data.key;
    this.menuBg = data.menuBg;
  }

  create() {
    const backButtonRope = this.add.image(
      this.game.renderer.width / 2.68,
      this.game.renderer.height * 0.48,
      "backButtonRope"
    );
    backButtonRope.scale = 0.45;
    const multiplayer_menu = this.add.image(
      this.game.renderer.width / 1.7,
      this.game.renderer.height * 0.3,
      "multiplayer_menu"
    );
    multiplayer_menu.scale = 0.4;
    const createRoomButton = this.add.image(
      this.game.renderer.width / 1.94,
      this.game.renderer.height * 0.18,
      "createRoomButton"
    );
    createRoomButton.scale = 0.4;
    const joinRoomButton = this.add.image(
      this.game.renderer.width / 1.94,
      this.game.renderer.height * 0.36,
      "joinRoomButton"
    );
    joinRoomButton.scale = 0.4;

    const smallPlayButton = this.add.image(
      this.game.renderer.width / 2.75,
      this.game.renderer.height * 0.63,
      "smallPlayButton"
    );
    smallPlayButton.scale = 0.35;

    smallPlayButton.setInteractive();
    createRoomButton.setInteractive();
    joinRoomButton.setInteractive();

    smallPlayButton.on("pointerdown", () => {
      this.scene.start("playMenu", { menuBg: this.menuBg });
    });

    joinRoomButton.on("pointerdown", () => {
      this.scene.start("joinRoomMenu", { menuBg: this.menuBg, key: this.key });
    });

    createRoomButton.on("pointerdown", () => {
      
      this.game.socket.emit("setupRoomId");
      this.game.socket.on("roomId", roomId => {
        console.log("created", roomId);

        // TODO Should probably have a way to remove thei room if the back button is clicked
        this.scene.start("createRoomMenu", {
          key: this.key,
          roomId: roomId
        });
      });
    });
  }
}
