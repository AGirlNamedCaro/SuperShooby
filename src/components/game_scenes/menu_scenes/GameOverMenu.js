import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    init(data) {
      
    }
    preload() {
      this.load.image("gameOverSplash", "/assets/images/backgrounds/gameOverSplash.png");
      this.load.image("retryButton", "/assets/images/buttons/retryButton.png")
      this.load.image('exitButton', '/assets/images/buttons/exitButton.png'); 
      
    }
    
    create() {
      
      
      
    let highScore = this.add.text(this.game.config.width / 4.8, this.game.config.height / 1.10, `High Score:${this.game.hiScore}` ,{ fontSize: '32px', fill: '#fff' });
    let score = this.add.text(this.game.config.width / 1.6, this.game.config.height / 1.1, `Score:${this.game.gameScore} ` ,{ fontSize: '32px', fill: '#fff' });
    let gameOverSplash = this.add.image(390,175,'gameOverSplash')
    gameOverSplash.setScale(.25)
    let retryButton = this.add.image(350,400,'retryButton')
    retryButton.setScale(.2)
    let exitButton = this.add.image(475,500,'exitButton')
    exitButton.setScale(.2)

    retryButton.setInteractive()
    exitButton.setInteractive()

    retryButton.on("pointerdown", () => {
        this.game.setGameScore(0)
       this.game.setGameOver(false);
       
        this.scene.start("singlePlayer")
        
      })

    exitButton.on("pointerdown", () => {
        this.game.setGameScore(0)
        this.game.setGameOver(false);
        this.scene.start("titleScene")
        this.scene.start("mainMenu");
      })

      }

}