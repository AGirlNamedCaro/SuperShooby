import Phaser from "phaser";
import socketIo from "socket.io-client";

export default class MultiplayerMenu extends Phaser.Scene {
  constructor() {
    super("multiplayerMenu");
  }

  init(data) {
    this.menuBg = data.menuBg;
    this.smallPlayButton = data.smPlBtn;
    this.socket = socketIo(
      process.env.REACT_APP_HOST + ":" + process.env.REACT_APP_PORT
    );
  }

  makeActVis(gameObject, scene) {
    gameObject.scene = scene;
    gameObject.active = true;
    gameObject.visible = true;
  }

  preload() {
    this.load.html("multiplayerForm", "/assets/html/multiplayerForm.html");
  }

  create() {
    this.makeActVis(this.menuBg, this);
    this.makeActVis(this.smallPlayButton, this);

    this.add.existing(this.menuBg);
    this.add.existing(this.smallPlayButton);

    this.add.text(
      this.game.renderer.width / 2.65,
      this.game.renderer.height * 0.32,
      "Waiting for another player"
    ).scale = 0.8;

    const cancelButton = this.add.image(
      this.game.renderer.width / 1.9,
      this.game.renderer.height * 0.37,
      "cancelButton"
    );
    cancelButton.scale = 0.09;

    const playButton = this.add.image(
      this.game.renderer.width / 2.1,
      this.game.renderer.height * 0.37,
      "smallPlayButton"
    );
    playButton.scale = 0.09;

    cancelButton.setInteractive();
    playButton.setInteractive();
    this.smallPlayButton.setInteractive();

    // TODO create an overarching button to setup multiplayer, that will create the socket connection -- VERY IMPORTANT


    // console.log(cancelButton, "cancel");
    cancelButton.on("pointerdown", () => {
      console.log("Show Code");

      this.socket.emit("createRoom");
      this.socket.on("createdRoom", roomId => {
        console.log("created", roomId);

        const divCode = `
        <div id="showCode" style="background-color: blue">
          Your code is: ${roomId}
          <button id="joinRoom" name="joinRoom">Join</button>
        </div>`;

        const htmlCode = this.add.dom(300, 180).createFromHTML(divCode);
        htmlCode.addListener("click");
        htmlCode.on("click", event => {
          if (event.target.name === "joinRoom") {
            this.socket.emit("joinRoom", roomId);
            this.scene.stop("multiplayerMenu");
            const titleScene = this.scene.get("titleScene");
            titleScene.scene.transition({
              target: "authScene",
              duration: 1000,
              data: { socket: this.socket, roomId: roomId }
            })
          }
        });
      });
    });

    playButton.on("pointerdown", () => {
      let roomId = "";
      const htmlForm = this.add
        .dom(300, 180)
        .createFromCache("multiplayerForm");

      htmlForm.addListener("click");
      // Have it setup so a random word gets set as server name
      htmlForm.on("click", event => {
        if (event.target.name === "submitBtn") {
          const userInput = htmlForm.getChildByName("serverName");
          roomId = userInput.value;
          // TODO dry this up
          this.socket.emit("joinRoom", roomId);
          this.scene.stop("multiplayerMenu");
          const titleScene = this.scene.get("titleScene");
          titleScene.scene.transition({
            target: "authScene",
            duration: 1000,
            data: { socket: this.socket, roomId: roomId }
          })
        }
      });
      // this.scene.stop("multiplayerMenu");
      // const titleScene = this.scene.get("titleScene");
      // titleScene.scene.transition({
      //   target: "authScene",
      //   duration: 1000,
      //   data: { socket: this.socket }
      // })
      console.log("Enter Code");
    });

    this.smallPlayButton.on("pointerdown", () => {
      this.scene.start("playMenu", {
        menuBg: this.menuBg,
        smPlBtn: this.smallPlayButton
      });
    });
  }
}
