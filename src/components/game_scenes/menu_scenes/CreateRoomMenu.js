import Phaser from "phaser";
const axios = require("axios");

export default class Customize extends Phaser.Scene {
  constructor() {
    super("createRoomMenu");
  }

  init(data) {
    this.menuBg = data.menuBg;
    this.menuBg.scene = this;
    this.menuBg.active = false;
    this.menuBg.visible = false;
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
    const lowJump = this.add.image(
      this.game.renderer.width / 1.92,
      this.game.renderer.height * 0.448,
      "lowJump"
    );
    lowJump.setScale(0.12);
    lowJump.alpha = 0.05;
    const medJump = this.add.image(
      this.game.renderer.width / 1.65,
      this.game.renderer.height * 0.423,
      "medJump"
    );
    medJump.setScale(0.12);
    medJump.alpha = 1;
    const highJump = this.add.image(
      this.game.renderer.width / 1.455,
      this.game.renderer.height * 0.4,
      "highJump"
    );
    highJump.setScale(0.12);
    highJump.alpha = 0.05;
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
    lowJump.setInteractive();
    medJump.setInteractive();
    highJump.setInteractive();

    lowJump.on("pointerdown", () => {
      lowJump.alpha = 1;
      medJump.alpha = 0.05;
      highJump.alpha = 0.05;
    });

    medJump.on("pointerdown", () => {
      lowJump.alpha = 0.05;
      medJump.alpha = 1;
      highJump.alpha = 0.05;
    });

    highJump.on("pointerdown", () => {
      lowJump.alpha = 0.05;
      medJump.alpha = 0.05;
      highJump.alpha = 1;
    });

    joinCreateButton.on("pointerdown", () => {
      // Is Optimized for when the default map is still a url, maybe expand on this
      this.game.socket.emit("createRoom", {
        roomId: this.roomId,
        roomMap: this.game.level
      });
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
