import Phaser from "phaser";

export default class Customize extends Phaser.Scene {
    constructor() {
        super("customizeMenu");
    }

    init(data) {
        this.menuBg = data.menuBg;
        this.menuBg.scene = this;
        this.menuBg.active = true;
        this.menuBg.visible = true;
    }

    create() {
        this.add.existing(this.menuBg);

    }

}