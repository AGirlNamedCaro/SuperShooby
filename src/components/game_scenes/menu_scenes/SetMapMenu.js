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
    // TODO should fix keys being captured and not entering into text field
    this.input.keyboard.disableGlobalCapture();
    this.add.existing(this.menuBg);
    this.add.existing(this.setMapButton);
    const ropeLeft = this.add.image(this.game.renderer.width / 2.30, this.game.renderer.height * 0.47, "backButtonRope");
    ropeLeft.scale = .50;
    const ropeRight = this.add.image(this.game.renderer.width / 1.6, this.game.renderer.height * 0.43, "backButtonRope");
    ropeRight.scale = .50;
    const thumbnailBg = this.add.image(this.game.renderer.width / 1.90, this.game.renderer.height * 0.58, "thumbnailBg");
    thumbnailBg.scaleX = 0.42;
    thumbnailBg.scaleY = 0.50;
    
    

    
   
    const htmlForm = this.add.dom(this.game.renderer.width / 1.95, this.game.renderer.height * 0.27).createFromCache("multiplayerForm");
    htmlForm.scaleY = 1.3
    htmlForm.scaleX = 0.9
    
    const thumbnail = new Image(180, 150);
    this.add.dom(this.game.renderer.width / 1.9, this.game.renderer.height * 0.55, thumbnail);
    thumbnail.src = this.cache.text.get('thumbnailB64');;
    this.add.existing(this.backButton);
    this.add.existing(this.backButtonRope);
    this.backButton.setInteractive();
    this.setMapButton.setInteractive();
    console.log("clicked");
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
