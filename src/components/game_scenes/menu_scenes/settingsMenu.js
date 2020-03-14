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
      this.menuBg.scaleY = 0.45;

      const slider = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.32, "slider");
      slider.scale = 0.15;

      const sliderButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.32, "smallPlayButton");
      sliderButton.scale = 0.15;

      sliderButton.setInteractive();
      this.input.setDraggable(sliderButton);
      this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      })
    
  }
}
  

    