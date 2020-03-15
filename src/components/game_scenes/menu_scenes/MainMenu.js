import Phaser from "phaser"

export default class MainMenu extends Phaser.Scene{
  constructor() {
    super("mainMenu");
  }

  init(data) {
    this.bombs = data.bombs;
    
  }
  
  create() {
    
    const menuBg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.30, "menuBg");
    menuBg.scale = 0.3;
    const playButton = this.add.image(this.game.renderer.width / 1.96, this.game.renderer.height * 0.19, "playButton");
    playButton.scale = 0.3;
    const customizeButton = this.add.image(this.game.renderer.width / 1.95, this.game.renderer.height * 0.29, "customizeButton");
    customizeButton.scale = 0.27;
    const settingsButton = this.add.image(this.game.renderer.width / 1.96, this.game.renderer.height * 0.44, "settingsButton");
    settingsButton.scale = 0.30;

    let bombs = this.bombs;
    
  
    if(!bombs) {
      bombs = 1;

    }
    else {
      bombs = this.bombs;
    }
    
    
    playButton.setInteractive();
    customizeButton.setInteractive();
    settingsButton.setInteractive();


    playButton.on("pointerdown", () => {
      this.scene.start("playMenu", { menuBg: menuBg,bombs:bombs  })
    })

    customizeButton.on("pointerdown", () => {
      this.scene.start("customizeMenu", { menuBg: menuBg})
    })

    settingsButton.on("pointerdown", () => {
      this.scene.start("settingsMenu", { menuBg: menuBg})
    })

    console.log('bombs: ', bombs);

  }

  update() {
    
  }
}