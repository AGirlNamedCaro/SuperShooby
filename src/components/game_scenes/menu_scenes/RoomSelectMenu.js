import Phaser from "phaser";
const axios = require('axios');

export default class Customize extends Phaser.Scene {
    constructor() {
        super("roomSelectMenu");
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
        const multiplayer_menu = this.add.image(this.game.renderer.width / 1.7, this.game.renderer.height * 0.30, "multiplayer_menu");
        multiplayer_menu.scale = .4;
        const createRoomButton = this.add.image(this.game.renderer.width / 1.94, this.game.renderer.height * 0.18, "createRoomButton");
        createRoomButton.scale = 0.40;
        const joinRoomButton = this.add.image(this.game.renderer.width / 1.94, this.game.renderer.height * 0.36, "joinRoomButton");
        joinRoomButton.scale = 0.40;
        
        
        const smallPlayButton = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
        smallPlayButton.scale = 0.35
        ;

        smallPlayButton.setInteractive();
        createRoomButton.setInteractive();
        joinRoomButton.setInteractive();
        
        
        
        
        smallPlayButton.on("pointerdown", () => {
            this.scene.start("mainMenu")
          });
          
        joinRoomButton.on("pointerdown", () => {
            
           // this.scene.start("createCharacter", { menuBg: this.menuBg, key: this.key})
        })
        createRoomButton.on("pointerdown", () => {
             console.log("hi")
             this.scene.start("createRoomMenu", { menuBg: this.menuBg, key: this.key})
         })
    }

}