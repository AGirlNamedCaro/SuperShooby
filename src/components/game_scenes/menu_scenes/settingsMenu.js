import Phaser from "phaser";


export default class settingsMenu extends Phaser.Scene {
    constructor() {
        super("settingsMenu");
    }

    init(data) {

        this.menuBg = data.menuBg;
        this.menuBg.scene = this;
        this.menuBg.active = true;
        this.menuBg.visible = true;
        
    }

    create() {
      this.add.existing(this.menuBg);
      this.menuBg.scaleY = 0.3;

       
        
      
        const difficulty_bar = this.add.image(this.game.renderer.width / 1.96, this.game.renderer.height * 0.30, "difficulty_bar");
        difficulty_bar.scale = 0.35;
        const easy = this.add.image(this.game.renderer.width/ 2.3 , this.game.renderer.height * 0.32, "difficulty_bar_easy");
        easy.scale = 0.35;
        easy.alpha = 0.05;
        const medium = this.add.image(this.game.renderer.width / 1.93, this.game.renderer.height * 0.30, "difficulty_bar_medium");
        medium.scale = 0.35;
        medium.alpha = 1;
        const hard = this.add.image(this.game.renderer.width -650/ 2, this.game.renderer.height * 0.29, "difficulty_bar_hard");
        hard.scale = 0.35;
        hard.alpha = 0.05;
        


        const back = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
        back.scale = 0.35;
        
        

        
        easy.setInteractive();
        medium.setInteractive();
        hard.setInteractive();
        back.setInteractive();
        

     
        
        
      easy.on("pointerdown", () => {
      console.log("Easy");
      easy.alpha = 1;
      medium.alpha = 0.05
      hard.alpha = 0.05
      this.game.setBomb(2);
      this.game.setScore(5);
      this.game.setFishNum(11);
      this.game.setStepX(70);
        });

        medium.on("pointerdown", () => {
          console.log("Medium");
          medium.alpha = 1;
          easy.alpha = 0.05;
          hard.alpha = 0.05;
          this.game.setBomb(3);
          this.game.setScore(10);
          this.game.setFishNum(7);
          this.game.setStepX(100);
            });

        hard.on("pointerdown", () => {
          console.log("Hard");
          hard.alpha = 1;
          easy.alpha = 0.05;
          medium.alpha = 0.05;
          this.game.setBomb(4);
          this.game.setScore(15);
          this.game.setFishNum(4);
          this.game.setStepX(190);
            });

        back.on("pointerdown", () => {
          
          this.scene.start("mainMenu")
        });

        const backButtonRope = this.add.image(this.game.renderer.width / 2.68, this.game.renderer.height * 0.48, "backButtonRope");
    backButtonRope.scale = 0.45
        
      }
     
}
  

    