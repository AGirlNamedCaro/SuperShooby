import Phaser from "phaser";
const axios = require("axios");

export default class Customize extends Phaser.Scene {
  constructor() {
    super("createRoomMenu");
  }

  init(data) {
    this.key = data.key;
    this.roomId = data.roomId;
  }

  create() {
    const backButtonRope = this.add.image(
      this.game.renderer.width / 2.68,
      this.game.renderer.height * 0.48,
      "backButtonRope"
    );
    backButtonRope.scale = 0.45;
    const multiplayer_menu = this.add.image(
      this.game.renderer.width / 1.8,
      this.game.renderer.height * 0.34,
      "createRoomMenu"
    );
    multiplayer_menu.scale = 0.3;
    const joinCreateButton = this.add.image(
      this.game.renderer.width / 1.5,
      this.game.renderer.height * 0.65,
      "joinCreateButton"
    );
    joinCreateButton.scale = 0.15;

    const smallPlayButton = this.add.image(
      this.game.renderer.width / 2.75,
      this.game.renderer.height * 0.63,
      "smallPlayButton"
    );
    smallPlayButton.scale = 0.35;

    const textStyle = {
      // Many different keys to alter the text
      // fontFamily:
      fontSize: "20px"
      // color:
    };

    this.add.text(
      this.game.renderer.width / 2,
      this.game.renderer.height * 0.21,
      this.roomId,
      textStyle
    );

    smallPlayButton.setInteractive();
    joinCreateButton.setInteractive();

    joinCreateButton.on("pointerdown", () => {
      this.game.socket.emit("createRoom", this.roomId);
      this.game.socket.on("createdRoom", roomId => {
        this.game.socket.emit("joinRoom", this.roomId);
        this.scene.stop("createRoomMenu");
        const titleScene = this.scene.get("titleScene");
        titleScene.scene.transition({
          target: "authScene",
          duration: 1000,
          data: { roomId: this.roomId }
        });
      });
    });

    smallPlayButton.on("pointerdown", () => {
      this.scene.start("roomSelectMenu");
    });
  }
}
