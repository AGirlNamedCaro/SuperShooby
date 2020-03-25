import Phaser from "phaser";

export default class CreateCharacter extends Phaser.Scene {
    constructor() {
        super("createCharacter");
    }

    init(data) {
      this.menuBg = data.menuBg;
      this.menuBg.scene = this;
      this.menuBg.active = true;
      this.menuBg.visible = true;
      this.prevKey = data.key
  }

  preload() {
    this.load.image("box", "/assets/images/prefabs/block.png");
    this.load.image("bashyImage", "/assets/images/sprites/bashyImage.png");
    this.load.image("bashyImage", "/assets/images/sprites/bashyImage.png");
    this.load.image("booshyImage", "/assets/images/sprites/booshyImage.png");
    this.load.image("shabbyImage", "/assets/images/sprites/shabbyImage.png");
    this.load.image("shoobyImage", "/assets/images/sprites/shoobyImage.png");
    // this.load.image('bowler_hat', '/assets/images/prefabs/hat.png');
    this.load.image('createCharBackground', '/assets/images/backgrounds/createCharBackground.png');






    this.load.image("shoobyHatImage", "/assets/images/sprites/shoobyHatImage.png");
    this.load.image("shoobyGlassesImage", "/assets/images/sprites/shoobyGlassesImage.png");
  }

  create() {

   

    this.add.existing(this.menuBg);
    this.menuBg.scale = .5;
    


    this.cameras.main.fadeIn(2000);
    this.cameras.main.setBackgroundColor(0,0,0,0.5);
let createCharBackground = this.add.image(400,320, 'createCharBackground')
createCharBackground.setScale(.5);

    // const bowler_hatImage = this.add.image(310,230,'bowler_hat');
    // bowler_hatImage.setScale(0.08);
    
    let shooby = this.physics.add.sprite(497, 150, 'dude')
    let box = this.physics.add.staticGroup();
    box.create(500, 545, 'box').setScale(0.7).refreshBody();

    let bashyImage = this.add.image(325,377,'bashyImage')
    bashyImage.setScale(2)

    let booshyImage = this.add.image(175,377, 'booshyImage')
    booshyImage.setScale(2);

    let shabbyImage = this.add.image(250,377, 'shabbyImage')
    shabbyImage.setScale(2); 

    let shoobyImage = this.add.image(100,377, 'shoobyImage')
    shoobyImage.setScale(2); 
    let shoobyHatImage = this.add.image(310,250, 'shoobyHatImage')
    shoobyHatImage.setScale(2); 
    let shoobyGlassesImage = this.add.image(370,250, 'shoobyGlassesImage')
    shoobyGlassesImage.setScale(2); 
    const backButtonRope = this.add.image(this.game.renderer.width / 1.18, this.game.renderer.height * 0.57, "backButtonRope");
    backButtonRope.scale = 0.45
    const smallPlayButton = this.add.image(this.game.renderer.width / 1.19, this.game.renderer.height * 0.70, "smallPlayButton");
    smallPlayButton.scale = 0.35
    // const backButtonRope = this.add.image(this.game.renderer.width / 2.68, this.game.renderer.height * 0.55, "backButtonRope");
    // backButtonRope.scale = 0.45
    // const smallPlayButton = this.add.image(this.game.renderer.width / 2.75, this.game.renderer.height * 0.63, "smallPlayButton");
    // smallPlayButton.scale = 0.35

    bashyImage.setInteractive();
    booshyImage.setInteractive();
    shabbyImage.setInteractive();
    shoobyImage.setInteractive();
    // bowler_hatImage.setInteractive();
    
    shoobyHatImage.setInteractive();
    shoobyGlassesImage.setInteractive();
    smallPlayButton.setInteractive();

    //Creating Sprites
    // let shooby = this.physics.add.sprite(640, 150, 'dude')
    let bashy = this.physics.add.sprite(640, 0, 'bashy')
    bashy.visible = false;
    let booshy = this.physics.add.sprite(640, 0, 'booshy')
    booshy.visible = false;
    let shabby = this.physics.add.sprite(640, 0, 'shabby')
    shabby.visible = false;
    // let bowler_hat = this.add.sprite(shooby.x,shooby.y + 30,'bowler_hat');
    // bowler_hat.visible = false;


  

    smallPlayButton.setInteractive();
    let shoobyHat = this.physics.add.sprite(640, 0, 'shoobyHat')
    shoobyHat.visible = false;
    let shoobyGlasses = this.physics.add.sprite(640, 0, 'shoobyGlasses')
    shoobyGlasses.visible = false;
    
    //Initial animation
   
    this.createAnimationStand(this.prevKey, shooby)
    this.physics.add.collider(shooby, box);
    shooby.setCollideWorldBounds(true);
    shooby.setScale(3);
    shooby.setBounce(0.2);
    
    let character = '';

    bashyImage.on("pointerdown", () => {
      character = 'bashy'
      
      shooby.visible = false;
      bashy.visible = true;
      booshy.visible = false;
      shabby.visible = false;
      shoobyHat.visible = false;
      shoobyGlasses.visible = false;

      this.createAnimationStand(character,bashy)

      
      this.physics.add.collider(bashy, box);
      
    })

    booshyImage.on("pointerdown", () => {
      
      character = 'booshy'
      
      shooby.visible = false;
      bashy.visible = false;
      booshy.visible = true;
      shabby.visible = false;
      shoobyHat.visible = false;
      shoobyGlasses.visible = false;


      this.createAnimationStand(character,booshy)
      

      this.physics.add.collider(booshy, box);
      
    })

    shabbyImage.on("pointerdown", () => {
      
      character = 'shabby'
      
      shooby.visible = false;
      bashy.visible = false;
      booshy.visible = false;
      shabby.visible = true;
      shoobyHat.visible = false;
      shoobyGlasses.visible = false;

      
      this.createAnimationStand(character,shabby)

     
      this.physics.add.collider(shabby, box);
      
    })

    shoobyImage.on("pointerdown", () => {
      character = 'dude'
      
      shooby.visible = true;
      bashy.visible = false;
      booshy.visible = false;
      shabby.visible = false;
      shoobyHat.visible = false;
      shoobyGlasses.visible = false;

      
      this.createAnimationStand(character,shooby)

    
      this.physics.add.collider(shooby, box);
      
    })

    shoobyHatImage.on("pointerdown", () => {
      character = 'shoobyHat'
      
      shooby.visible = false;
      bashy.visible = false;
      booshy.visible = false;
      shabby.visible = false;
      shoobyHat.visible = true
      shoobyGlasses.visible = false

      
      this.createAnimationStand(character,shoobyHat)

    
      this.physics.add.collider(shoobyHat, box);
      
    })

    shoobyGlassesImage.on("pointerdown", () => {
      character = 'shoobyGlasses'
      
      shooby.visible = false;
      bashy.visible = false;
      booshy.visible = false;
      shabby.visible = false;
      shoobyHat.visible = false;
      shoobyGlasses.visible = true

      this.createAnimationStand(character,shoobyGlasses)

    
      this.physics.add.collider(shoobyGlasses, box);
      
     })

   
    smallPlayButton.on("pointerdown", () => {
      
      this.scene.start("titleScene",  {character: character})
      this.scene.start("mainMenu",  {character: character})

    });

  }
  
createAnimationStand(key, object) {
  this.anims.create({
    key: key + 1,
    frames: [{ key: key, frame: 4 }],
    frameRate: 20
  });
  
  object.anims.play(key + 1, true);
  object.setBounce(0.2);
  object.setCollideWorldBounds(true);
  object.setScale(3);

  
}

}
    


  

    
