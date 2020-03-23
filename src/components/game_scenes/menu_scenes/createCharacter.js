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
    this.load.image("bashyImage", "/assets/images/sprites/bashyImage.png");
    this.load.image("booshyImage", "/assets/images/sprites/booshyImage.png");
    this.load.image("shabbyImage", "/assets/images/sprites/shabbyImage.png");
    this.load.image("shoobyImage", "/assets/images/sprites/shoobyImage.png");

    this.load.image('bowler_hat', '/assets/images/prefabs/hat.png');

  }

  create() {

    this.add.existing(this.menuBg);
    this.menuBg.scaleY = 0.6;
    


    this.cameras.main.fadeIn(2000);
    this.cameras.main.setBackgroundColor(0,0,0,0.5);

    const bowler_hatImage = this.add.image(310,230,'bowler_hat');
    bowler_hatImage.setScale(0.08);
    
    let shooby = this.physics.add.sprite(640, 150, 'dude')
    let box = this.physics.add.staticGroup();
    box.create(640, 310, 'box').setScale(0.7).refreshBody();

    let bashyImage = this.add.image(310,150,'bashyImage')
    bashyImage.setScale(2)

    let booshyImage = this.add.image(370,150, 'booshyImage')
    booshyImage.setScale(2);

    let shabbyImage = this.add.image(410,150, 'shabbyImage')
    shabbyImage.setScale(2); 

    let shoobyImage = this.add.image(470,150, 'shoobyImage')
    shoobyImage.setScale(2); 

    
  

    
    shooby.setCollideWorldBounds(true);
    this.physics.add.collider(shooby, box);
    shooby.setScale(3);

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });
    
    shooby.anims.play('turn', true);
    shooby.setBounce(0.2);


    bashyImage.setInteractive();
    booshyImage.setInteractive();
    shabbyImage.setInteractive();
    shoobyImage.setInteractive();
    bowler_hatImage.setInteractive();
    
    let bashy = this.physics.add.sprite(640, 0, 'bashy')
    bashy.visible = false;
    let booshy = this.physics.add.sprite(640, 0, 'booshy')
    booshy.visible = false;
    let shabby = this.physics.add.sprite(640, 0, 'shabby')
    shabby.visible = false;
    let bowler_hat = this.add.sprite(shooby.x,shooby.y + 30,'bowler_hat');
    bowler_hat.visible = false;


    const backButtonRope = this.add.image(this.game.renderer.width / 2.68, this.game.renderer.height * 0.55, "backButtonRope");
    backButtonRope.scale = 0.45
    const smallPlayButton = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
    smallPlayButton.scale = 0.35

    smallPlayButton.setInteractive();
    let character = '';

    let container = this.add.container(300,300)


    
    bashyImage.on("pointerdown", () => {
      
      shooby.visible = false;
      bashy.visible = true;
      booshy.visible = false;
      shabby.visible = false;
      character = 'bashy'
      
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

    booshyImage.on("pointerdown", () => {
      
      
      shooby.visible = false;
      bashy.visible = false;
      booshy.visible = true;
      shabby.visible = false;

      character = 'booshy'
      


      this.anims.create({
        key: "face",
        frames: [{ key: "booshy", frame: 4 }],
        frameRate: 20
      });

      booshy.anims.play('face', true);
      booshy.setBounce(0.2);

      booshy.setCollideWorldBounds(true);
      booshy.setScale(3);
      this.physics.add.collider(booshy, box);
      
    })

    shabbyImage.on("pointerdown", () => {
      
      
      shooby.visible = false;
      bashy.visible = false;
      booshy.visible = false;
      shabby.visible = true;

      character = 'shabby'
      
      this.anims.create({
        key: "nose",
        frames: [{ key: "shabby", frame: 4 }],
        frameRate: 20
      });

      shabby.anims.play('nose', true);
      shabby.setBounce(0.2);

      shabby.setCollideWorldBounds(true);
      shabby.setScale(3);
      this.physics.add.collider(shabby, box);
      
    })

    shoobyImage.on("pointerdown", () => {
      
      shooby.visible = true;
      bashy.visible = false;
      booshy.visible = false;
      shabby.visible = false;

      character = 'dude'
      
      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20
      });

      shooby.anims.play('turn', true);
      shooby.setBounce(0.2);

      shooby.setCollideWorldBounds(true);
      shooby.setScale(3);
      this.physics.add.collider(shooby, box);
      
    })

    bowler_hatImage.on("pointerdown", () => {
      bowler_hat.visible = true;
      bowler_hat.setScale(0.08);
      
    })

    smallPlayButton.on("pointerdown", () => {
      
      this.scene.start("titleScene", {character: character, container: container})
    });

}

    
    


  }

    
