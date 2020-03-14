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
      this.menuBg.scaleY = 0.50;

      const sliderDiff = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, "slider");
      sliderDiff.scale = 0.15;

      const sliderButtonDiff = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, "smallPlayButton");
      sliderButtonDiff.scale = 0.15;

      const sliderSpeed = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.35, "slider");
      sliderSpeed.scale = 0.15;

      const sliderButtonSpeed = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.35, "smallPlayButton");
      sliderButtonSpeed.scale = 0.15;

      sliderButtonDiff.setInteractive();
      sliderButtonSpeed.setInteractive();


      this.input.setDraggable(sliderButtonDiff);
      this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      })


      this.input.setDraggable(sliderButtonSpeed);
      this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      })

     

    
  }
}
  

    