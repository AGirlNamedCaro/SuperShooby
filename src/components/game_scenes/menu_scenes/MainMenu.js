import Phaser from "phaser"

export default class MainMenu extends Phaser.Scene{
  constructor() {
    super("mainMenu");
  }

  init(data) {
    this.bombs = data.bombs;
    this.score = data.score;
    this.fishNum = data.fishNum;
    this.stepX = data.stepX;
    this.character = data.character
    
  }
  
  create() {
    const menuBg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.30, "menuBg");
    menuBg.scale = 0.3;
    const playButton = this.add.image(this.game.renderer.width / 1.96, this.game.renderer.height * 0.19, "playButton");
    playButton.scale = 0.3;
    const customizeButton = this.add.image(this.game.renderer.width / 1.95, this.game.renderer.height * 0.29, "customizeButton");
    customizeButton.scale = 0.27;
    const settingsButton = this.add.image(this.game.renderer.width / 1.90, this.game.renderer.height * 0.42, "settingsButton");
    settingsButton.scale = 0.35;

    let bombs = this.bombs;
    let score = this.score;
    let fishNum = this.fishNum;
    let stepX = this.stepX;
    let key = this.character
    
  //Creating default settings
  
    if(!bombs) {
      bombs = 2;
      score = 10;
      fishNum = 7;
      stepX = 100;

    }
    else {
      bombs = this.bombs;
      score = this.score;
      fishNum = this.fishNum;
      stepX = this.stepX;
    }
    
    
    
    if(!key) {
      key = 'dude'
      
    }
    else {
      
      key = this.character
      localStorage.setItem('characterKey', key);
      console.log("key: ", key)
      console.log( "localStorage: ", localStorage.getItem('characterKey'))
      
    }


    let key2 = localStorage.getItem('characterKey')
    console.log("key2: ",key2);

   
    playButton.setInteractive();
    customizeButton.setInteractive();
    settingsButton.setInteractive();


    playButton.on("pointerdown", () => {
      this.scene.start("playMenu", { menuBg: menuBg,bombs:bombs, score:score, fishNum: fishNum, stepX:stepX, key: key2})
    })

    customizeButton.on("pointerdown", () => {
      this.scene.start("customizeMenu", { menuBg: menuBg, key: key})
    })

    settingsButton.on("pointerdown", () => {
      this.scene.start("settingsMenu", { menuBg: menuBg})
    })

   
  }

  update() {
    
  }
}