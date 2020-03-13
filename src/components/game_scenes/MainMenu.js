import Phaser from "phaser"

export default class MainMenu extends Phaser.Scene{
  constructor() {
    super("mainMenu");
  }
  
  create() {
    const menuBg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.30, "menuBg");
    menuBg.scale = 0.3;
    const playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.32, "playButton");
    playButton.scale = 0.15;

    playButton.setInteractive();

    playButton.on("pointerdown", () => {
      console.log(menuBg, "old")
      this.scene.start("playMenu", { menuBg: menuBg})
    })
  }

  update() {
    
  }
}