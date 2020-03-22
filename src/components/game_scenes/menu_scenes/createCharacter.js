import Phaser from "phaser";
import TitleScene from "../TitleScene";

export default class CreateCharacter extends Phaser.Scene {
    constructor() {
        super("createCharacter");
    }

    init(data) {
      this.menuBg = data.menuBg;
      this.menuBg.scene = this;
      this.menuBg.active = true;
      this.menuBg.visible = true;
  }

  preload() {
    this.load.image("box", "/assets/images/prefabs/block.png");
    this.load.image("bashyImage", "/assets/images/sprites/bashyImage.png");

  }

  create() {

    this.add.existing(this.menuBg);
    this.menuBg.scaleY = 0.6;
    


    this.cameras.main.fadeIn(2000);
    this.cameras.main.setBackgroundColor(0,0,0,0.5);
    
    let player = this.physics.add.sprite(640, 150, 'dude')
    let box = this.physics.add.staticGroup();
    box.create(640, 310, 'box').setScale(0.7).refreshBody();

    let bashyImage = this.add.image(310,150,'bashyImage')
    bashyImage.setScale(3)
  

    
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, box);
    player.setScale(3);

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });
    
    player.anims.play('turn', true);
    player.setBounce(0.2);


    bashyImage.setInteractive();

    bashyImage.on("pointerdown", () => {
      let bashy = this.physics.add.sprite(640, 150, 'bashy')
      player.visible = false;


      this.anims.create({
        key: "front",
        frames: [{ key: "bashy", frame: 4 }],
        frameRate: 20
      });

      bashy.anims.play('front', true);
      bashy.setBounce(0.2);

      bashy.setCollideWorldBounds(true);
      bashy.setScale(3);
      this.physics.add.collider(bashy, box);
      
      
    })


}

    
    


  }

    
