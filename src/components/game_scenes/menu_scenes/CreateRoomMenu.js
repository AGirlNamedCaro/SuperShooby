import Phaser from "phaser";
const axios = require('axios');

export default class Customize extends Phaser.Scene {
    constructor() {
        super("createRoomMenu");
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
        const backButtonRope = this.add.image(this.game.renderer.width / 2.68, this.game.renderer.height * 0.48, "backButtonRope");
        backButtonRope.scale = 0.45
        const multiplayer_menu = this.add.image(this.game.renderer.width / 1.80, this.game.renderer.height * 0.34, "createRoomMenu");
        multiplayer_menu.scale = .30;
        const join_createButton = this.add.image(this.game.renderer.width / 1.50, this.game.renderer.height * 0.65, "join_createButton");
        join_createButton.scale = 0.15
        
        
        
        const smallPlayButton = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
        smallPlayButton.scale = 0.35
        ;

        smallPlayButton.setInteractive();
        join_createButton.setInteractive();
      



        smallPlayButton.on("pointerdown", () => {
            this.scene.start("mainMenu")
          });
          
       
    }

}