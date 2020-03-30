import Phaser from "phaser"

export default class MainMenu extends Phaser.Scene{
  constructor() {
    super("mainMenu");
  }

  init(data) {
    
  }
  
  create() {
    this.game.setGameInfo("controls");
    console.log('mainMenu',this.game.character)
    const menuBg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.30, "menuBg");
    menuBg.scale = 0.3;
    const playButton = this.add.image(this.game.renderer.width / 1.96, this.game.renderer.height * 0.19, "playButton");
    playButton.scale = 0.3;
    const customizeButton = this.add.image(this.game.renderer.width / 1.95, this.game.renderer.height * 0.29, "customizeButton");
    customizeButton.scale = 0.27;
    const settingsButton = this.add.image(this.game.renderer.width / 1.90, this.game.renderer.height * 0.42, "settingsButton");
    settingsButton.scale = 0.35;

    playButton.setInteractive();
    customizeButton.setInteractive();
    settingsButton.setInteractive();


    playButton.on("pointerdown", () => {
      this.scene.start("playMenu", { menuBg: menuBg})
    })

    customizeButton.on("pointerdown", () => {
      this.scene.start("customizeMenu", { menuBg: menuBg })
    })

    settingsButton.on("pointerdown", () => {
      this.scene.start("settingsMenu", { menuBg: menuBg})
    })

   
  }

  update() {
    
  }
}