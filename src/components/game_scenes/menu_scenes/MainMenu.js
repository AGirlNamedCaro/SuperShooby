import Phaser from "phaser"

export default class MainMenu extends Phaser.Scene{
  constructor() {
    super("mainMenu");
  }
  
  create() {
    const menuBg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.30, "menuBg");
    menuBg.scale = 0.4;
    const playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.32, "playButton");
    playButton.scale = 0.15;
    const customizeButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "customizeButton");
    customizeButton.scale = 0.15;

    const settingsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.48, "settingsButton");
    settingsButton.scale = 0.15;

    
    playButton.setInteractive();
    customizeButton.setInteractive();
    settingsButton.setInteractive();

    playButton.on("pointerdown", () => {
      this.scene.start("playMenu", { menuBg: menuBg})
    })

    customizeButton.on("pointerdown", () => {
      this.scene.start("customizeMenu", { menuBg: menuBg})
    })

    settingsButton.on("pointerdown", () => {
      this.scene.start("settingsMenu", { menuBg: menuBg})
    })

  }

  update() {
    
  }
}