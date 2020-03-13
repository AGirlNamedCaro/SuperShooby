import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloadAssets")
  }

  preload() {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
    this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
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


    this.load.on("progress", () => {
      this.add.text(20, 20, "Loading game...")
    })

    this.load.on("complete", () => {
      this.scene.start("playGame")
    });
  }
}