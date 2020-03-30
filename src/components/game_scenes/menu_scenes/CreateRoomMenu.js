import Phaser from "phaser";

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

    const gravityOne = this.add.image(
      this.game.renderer.width / 1.72,
      this.game.renderer.height * 0.29,
      "gravityOne"
    );
    gravityOne.setScale(0.12);
    gravityOne.alpha = 0.05;

    const gravityTwo = this.add.image(
      this.game.renderer.width / 1.60,
      this.game.renderer.height * 0.29,
      "gravityTwo"
    );
    gravityTwo.setScale(0.12);
    gravityTwo.alpha = 1;

    const gravityThree = this.add.image(
      this.game.renderer.width / 1.45,
      this.game.renderer.height * 0.28,
      "gravityThree"
    );
    gravityThree.setScale(0.12);
    gravityThree.alpha = 0.05;

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
    gravityOne.setInteractive();
    gravityTwo.setInteractive();
    gravityThree.setInteractive();



    lowJump.on("pointerdown", () => {
      lowJump.alpha = 1;
      medJump.alpha = 0.05;
      highJump.alpha = 0.05;
      this.game.setJump(-435);
    });

    medJump.on("pointerdown", () => {
      lowJump.alpha = 0.05;
      medJump.alpha = 1;
      highJump.alpha = 0.05;
      this.game.setJump(-470);

    });

    highJump.on("pointerdown", () => {
      lowJump.alpha = 0.05;
      medJump.alpha = 0.05;
      highJump.alpha = 1;
      this.game.setJump(-550);
      
    });

    gravityOne.on("pointerdown", () => {
      gravityOne.alpha = 1;
      gravityTwo.alpha = 0.05;
      gravityThree.alpha = 0.05;
      this.game.setGravity(100);
    });

    gravityTwo.on("pointerdown", () => {
      gravityOne.alpha = 0.05;
      gravityTwo.alpha = 1;
      gravityThree.alpha = 0.05;
      this.game.setGravity(300);
    });

    gravityThree.on("pointerdown", () => {
      gravityOne.alpha = 0.05;
      gravityTwo.alpha = 0.05;
      gravityThree.alpha = 1;
      this.game.setGravity(500);
    });

    joinCreateButton.on("pointerdown", () => {
      // Is Optimized for when the default map is still a url, maybe expand on this
      this.game.socket.emit("createRoom", {
        roomId: this.roomId,
        roomMap: this.game.level,
        difficulty: {
          bombNum: this.game.bomb,
          fishNum: this.game.fishNum,
          score: this.game.score,
          stepX: this.game.stepX,
          jump: this.game.jump,
          gravity: this.game.gravity
        }
      });
      this.game.socket.on("createdRoom", roomId => {
        this.game.socket.emit("joinRoom", {
          roomId: this.roomId,
          character: this.game.character
        });
        this.scene.stop("createRoomMenu");
        const titleScene = this.scene.get("titleScene");
        titleScene.scene.transition({
          target: "multiplayerScene",
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
