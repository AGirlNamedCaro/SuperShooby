import Phaser from "phaser";
const axios = require('axios');

export default class Customize extends Phaser.Scene {
    constructor() {
        super("joinRoomMenu");
    }

    init(data) {
        
        // this.menuBg = data.menuBg;
        // this.menuBg.scene = this;
        // this.menuBg.active = false;
        // this.menuBg.visible = false;
        this.key = data.key
    }

    create() {
        // this.add.existing(this.menuBg);
        // this.menuBg.scaleY = 0.3;
        const backButtonRope = this.add.image(this.game.renderer.width / 2.80, this.game.renderer.height * 0.47, "backButtonRope");
        backButtonRope.scale = 0.45
        const backButtonRope1 = this.add.image(this.game.renderer.width / 1.5, this.game.renderer.height * 0.47, "backButtonRope");
        backButtonRope1.scale = 0.45
        const joinRoomMenu = this.add.image(this.game.renderer.width / 1.80, this.game.renderer.height * 0.34, "joinRoomMenu");
        joinRoomMenu.scale = .50;
        const join_createButton = this.add.image(this.game.renderer.width / 1.60, this.game.renderer.height * 0.60, "join_createButton");
        join_createButton.scale = 0.15
       
        
        
        
        const smallPlayButton = this.add.image(this.game.renderer.width / 2.88, this.game.renderer.height * 0.62, "smallPlayButton");
        smallPlayButton.scale = 0.35
        ;

        smallPlayButton.setInteractive();
       
      



        smallPlayButton.on("pointerdown", () => {
            this.scene.start("mainMenu")
          });
          
       
    }

}