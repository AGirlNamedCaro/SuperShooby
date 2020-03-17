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

        let bombs;
        const easy = this.add.image(this.game.renderer.width / 1.96, this.game.renderer.height * 0.30, "difficulty_bar_hard");
        easy.scale = 0.35;
        // const medium = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.28, "smallPlayButton");
        // medium.scale = 0.08;
        // const hard = this.add.image(this.game.renderer.width -720 /2, this.game.renderer.height * 0.28, "headButton");
        // hard.scale = 0.08;

        const back = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
        back.scale = 0.35;
        
        

        
        easy.setInteractive();
        // medium.setInteractive();
        // hard.setInteractive();
        back.setInteractive();

    easy.on("pointerdown", () => {
      console.log("Easy");
      bombs = 1;
      
        });

        // medium.on("pointerdown", () => {
        //   console.log("Medium");
        //   bombs = 2;
        //     });

        // hard.on("pointerdown", () => {
        //   console.log("Hard");
        //   bombs = 3;
        //     });

        back.on("pointerdown", () => {
          console.log(bombs);
          this.scene.start("mainMenu", {bombs:bombs})
        });

        const backButtonRope = this.add.image(this.game.renderer.width / 2.68, this.game.renderer.height * 0.48, "backButtonRope");
    backButtonRope.scale = 0.45
        
      }
     
}
  

    