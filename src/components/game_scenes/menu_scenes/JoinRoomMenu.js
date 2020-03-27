import Phaser from "phaser";

export default class Customize extends Phaser.Scene {
  constructor() {
    super("joinRoomMenu");
  }

  init(data) {
    this.key = data.key;
    this.roomId = "";
  }

  preload() {
    this.load.html("multiplayerForm", "/assets/html/multiplayerForm.html");
  }

  create() {
    const backButtonRope = this.add.image(
      this.game.renderer.width / 2.8,
      this.game.renderer.height * 0.47,
      "backButtonRope"
    );
    backButtonRope.scale = 0.45;
    const backButtonRope1 = this.add.image(
      this.game.renderer.width / 1.5,
      this.game.renderer.height * 0.47,
      "backButtonRope"
    );
    backButtonRope1.scale = 0.45;
    const joinRoomMenu = this.add.image(
      this.game.renderer.width / 1.8,
      this.game.renderer.height * 0.34,
      "joinRoomMenu"
    );
    joinRoomMenu.scale = 0.5;
    const joinCreateButton = this.add.image(
      this.game.renderer.width / 1.6,
      this.game.renderer.height * 0.6,
      "joinCreateButton"
    );
    joinCreateButton.scale = 0.15;

    const smallPlayButton = this.add.image(
      this.game.renderer.width / 2.88,
      this.game.renderer.height * 0.62,
      "smallPlayButton"
    );
    smallPlayButton.scale = 0.35;

    smallPlayButton.setInteractive();
    joinCreateButton.setInteractive();

    const htmlForm = this.add
      .dom(this.game.renderer.width / 2.1, this.game.renderer.height * 0.3)
      .createFromCache("multiplayerForm");

    htmlForm.addListener("click");
    // Have it setup so a random word gets set as server name
    htmlForm.on("click", event => {
      if (event.target.name === "submitBtn") {
        const userInput = htmlForm.getChildByName("serverName");
        this.roomId = userInput.value;
        console.log(this.roomId);
        // TODO dry this up
        this.game.socket.emit("joinRoom", this.roomId);
        this.game.socket.on("roomMap", roomMap => {
          // if (roomMap === "assets/mapData/shoobyTileset16.json")
          this.game.setLevel(
            roomMap === "assets/mapData/shoobyTileset16.json"
              ? "/assets/mapData/shoobyTileset16.json"
              : roomMap
          );
        });
        // console.log("err", this.errMsg);
        // if (!this.errMsg) {
        //   this.scene.stop("multiplayerMenu");
        //   const titleScene = this.scene.get("titleScene");
        //   titleScene.scene.transition({
        //     target: "authScene",
        //     duration: 1000,
        //     data: { socket: this.socket, roomId: roomId }
        //   });
        // }
      }
    });

    joinCreateButton.on("pointerdown", () => {
        this.scene.stop("multiplayerMenu");
          const titleScene = this.scene.get("titleScene");
          titleScene.scene.transition({
            target: "authScene",
            duration: 1000,
            data: { roomId: this.roomId }
          });
    })

    smallPlayButton.on("pointerdown", () => {
      this.scene.start("roomSelectMenu");
    });
  }
}
