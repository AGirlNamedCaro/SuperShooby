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
  
    
    let shooby = this.physics.add.sprite(497, 350, 'dude')
    shooby.visible = true;
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


    bashyImage.setInteractive();
    booshyImage.setInteractive();
    shabbyImage.setInteractive();
    shoobyImage.setInteractive();
    
    shoobyHatImage.setInteractive();
    shoobyGlassesImage.setInteractive();
    smallPlayButton.setInteractive();

    //Creating Sprites
    let bashy = this.physics.add.sprite(500, 450, 'bashy')
    bashy.visible = false;
    
    let booshy = this.physics.add.sprite(500, 450, 'booshy')
    booshy.visible = false;

    let shabby = this.physics.add.sprite(500, 450, 'shabby')
    shabby.visible = false;
    

    smallPlayButton.setInteractive();
    let shoobyHat = this.physics.add.sprite(500, 450, 'shoobyHat')
    shoobyHat.visible = false;
    let shoobyGlasses = this.physics.add.sprite(500, 450, 'shoobyGlasses')
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
      console.log(character)

      bashy = this.physics.add.sprite(500, 350, 'bashy')
      
      
      shooby.destroy();
      booshy.destroy();
      shabby.destroy();
      shoobyHat.destroy();
      shoobyGlasses.destroy();
     

      this.createAnimationStand(character,bashy)

      
      this.physics.add.collider(bashy, box);
      
    })

    booshyImage.on("pointerdown", () => {
      
      character = 'booshy'

      booshy = this.physics.add.sprite(500, 350, 'booshy')
      
      shooby.destroy();
      bashy.destroy();
      shabby.destroy();
      shoobyHat.destroy();
      shoobyGlasses.destroy();
      


      this.createAnimationStand(character,booshy)
      

      this.physics.add.collider(booshy, box);
      
    })

    shabbyImage.on("pointerdown", () => {
      
      character = 'shabby'

      shabby = this.physics.add.sprite(500, 350, 'shabby')

      shooby.destroy();
      bashy.destroy();
      booshy.destroy();
      shoobyHat.destroy();
      shoobyGlasses.destroy();

      
      this.createAnimationStand(character,shabby)

     
      this.physics.add.collider(shabby, box);
      
    })

    shoobyImage.on("pointerdown", () => {
      character = 'dude'
      shooby = this.physics.add.sprite(497, 350, 'dude')

      bashy.destroy();
      booshy.destroy();
      shabby.destroy();
      shoobyHat.destroy();
      shoobyGlasses.destroy();
      
      
      this.createAnimationStand(character,shooby)
    
      this.physics.add.collider(shooby, box);
      
    })

    shoobyHatImage.on("pointerdown", () => {
      character = 'shoobyHat'

      shoobyHat = this.physics.add.sprite(497, 350, 'shoobyHat')


      bashy.destroy();
      booshy.destroy();
      shabby.destroy();
      shooby.destroy();
      shoobyGlasses.destroy();
    

      
      this.createAnimationStand(character,shoobyHat)

    
      this.physics.add.collider(shoobyHat, box);
      
    })

    shoobyGlassesImage.on("pointerdown", () => {
      character = 'shoobyGlasses'

      shoobyGlasses = this.physics.add.sprite(497, 350, 'shoobyGlasses')

      bashy.destroy();
      booshy.destroy();
      shabby.destroy();
      shooby.destroy();
      shoobyHat.destroy();
    
    

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
    


  

    
