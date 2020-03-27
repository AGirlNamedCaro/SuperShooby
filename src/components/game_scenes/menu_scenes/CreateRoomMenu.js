import Phaser from "phaser";
const axios = require('axios');

export default class Customize extends Phaser.Scene {
    constructor() {
        super("createRoomMenu");
    }

    init(data) {
        
        this.menuBg = data.menuBg;
        this.menuBg.scene = this;
        this.menuBg.active = false;
        this.menuBg.visible = false;
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
        const lowJump = this.add.image(this.game.renderer.width / 1.92, this.game.renderer.height * 0.448, "lowJump");
        lowJump.setScale(0.12)
        lowJump.alpha = 0.05;
        const medJump = this.add.image(this.game.renderer.width / 1.65, this.game.renderer.height * 0.423, "medJump");
        medJump.setScale(0.12)
        medJump.alpha = 1;
        const highJump = this.add.image(this.game.renderer.width / 1.455, this.game.renderer.height * 0.40, "highJump");
        highJump.setScale(0.12)
        highJump.alpha = 0.05
        const smallPlayButton = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
        smallPlayButton.scale = 0.35
        ;

        smallPlayButton.setInteractive();
        join_createButton.setInteractive();
        lowJump.setInteractive();
        medJump.setInteractive();
        highJump.setInteractive();


        lowJump.on("pointerdown", () => {
            lowJump.alpha = 1;
            medJump.alpha = 0.05;
            highJump.alpha = 0.05
        })

        medJump.on("pointerdown", () => {
            lowJump.alpha = 0.05;
            medJump.alpha = 1;
            highJump.alpha = 0.05;
        })

        highJump.on("pointerdown", () => {
            lowJump.alpha = 0.05;
            medJump.alpha = 0.05;
            highJump.alpha = 1;
        })
      



        smallPlayButton.on("pointerdown", () => {
            this.scene.start("mainMenu")
          });
          
       
    }

}