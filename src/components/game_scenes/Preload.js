import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloadAssets")
  }

  preload() {
    this.load.image('sky', '/assets/images/backgrounds/fairy-background-craft-pixel.png');
    this.load.image('playButton', "/assets/images/buttons/playButton.png");
    this.load.image('smallPlayButton', "/assets/images/buttons/smallPlayButton.png");
    this.load.image('singlePlayer', "/assets/images/buttons/singlePlayerButton.png");
    this.load.image('multiplayer', "/assets/images/buttons/multiplayerButton.png");
    this.load.image("menuBg", "/assets/images/backgrounds/menu-bg.png");
    this.load.image("cancelButton", "/assets/images/buttons/cancelButton.png");
    this.load.image("headButton", "/assets/images/buttons/headButton.png");
    this.load.image("customizeButton", "/assets/images/buttons/customizeButton.png");
    this.load.image("setMapButton", "/assets/images/buttons/setMapButton.png");
    this.load.image("createMapButton", "/assets/images/buttons/createMapButton.png");
    this.load.image("createCharButton", "/assets/images/buttons/createCharButton.png");
    this.load.image('ground', '/assets/images/prefabs/platform.png');
    this.load.image('star', '/assets/images/prefabs/star.png')
    
    
    this.load.spritesheet('dude',
      '/assets/images/sprites/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );


    this.load.on("progress", () => {
      this.add.text(20, 20, "Loading game...")
    })

    this.load.on("complete", () => {
      this.scene.start("TitleScene")
    });
  }
}