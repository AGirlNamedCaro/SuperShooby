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

//Accessories buttons
    const backButtonRope1 = this.add.image(this.game.renderer.width / 2.67, this.game.renderer.height * 0.15, "backButtonRope");
    backButtonRope1.scale = 0.45
    let glasses = this.add.image(300,180, 'glasses')
    glasses.setScale(0.6);
    const backButtonRope2 = this.add.image(this.game.renderer.width / 3.8, this.game.renderer.height * 0.30, "backButtonRope");
    backButtonRope2.scale = 0.45
    const backButtonRope3 = this.add.image(this.game.renderer.width / 3.78, this.game.renderer.height * 0.10, "backButtonRope");
    backButtonRope3.scale = 0.45
    let coat = this.add.image(215,250, 'coat')
    coat.setScale(0.8);
    const backButtonRope4 = this.add.image(this.game.renderer.width / 5.9, this.game.renderer.height * 0.10, "backButtonRope");
    backButtonRope4.scale = 0.45
    let headGear = this.add.image(130,160, 'headgear')
    headGear.setScale(0.6);

    
    const backButtonRope = this.add.image(this.game.renderer.width / 1.18, this.game.renderer.height * 0.57, "backButtonRope");
    backButtonRope.scale = 0.45
    
    
    
    

    const smallPlayButton = this.add.image(this.game.renderer.width / 1.19, this.game.renderer.height * 0.70, "smallPlayButton");
    smallPlayButton.scale = 0.35


    bashyImage.setInteractive();
    booshyImage.setInteractive();
    shabbyImage.setInteractive();
    shoobyImage.setInteractive();
    
    glasses.setInteractive();
    coat.setInteractive();
    headGear.setInteractive();

    smallPlayButton.setInteractive();

    //Creating Sprites
    let bashy = this.physics.add.sprite(500, 450, 'bashy')
    bashy.visible = false;
    
    let booshy = this.physics.add.sprite(500, 450, 'booshy')
    booshy.visible = false;

    let shabby = this.physics.add.sprite(500, 450, 'shabby')
    shabby.visible = false;
    

    smallPlayButton.setInteractive();
   
    
    //Initial animation
   
    this.createAnimationStand(this.prevKey, shooby)
    this.physics.add.collider(shooby, box);
    shooby.setCollideWorldBounds(true);
    shooby.setScale(3);
    shooby.setBounce(0.2);
    
    let character = 'dude';
    let previous = ''
    let finalSelection = ''
    

    //Character Accessories
    let characterHat = this.physics.add.sprite(500, 450, character +'Hat')
    characterHat.visible = false;
    let characterCoat = this.physics.add.sprite(500, 450, character +'Coat')
    characterCoat.visible = false;
    let characterGlasses = this.physics.add.sprite(500, 450, character +'Glasses')
    characterGlasses.visible = false;
    
    
    bashyImage.on("pointerdown", () => {
      previous = character
      character = 'bashy'
      console.log(character)

      bashy = this.physics.add.sprite(500, 350, 'bashy')
      
      
      shooby.destroy();
      booshy.destroy();
      shabby.destroy();
      characterHat.destroy();
      characterCoat.destroy();
      characterGlasses.destroy();

    
     

      this.createAnimationStand(character,bashy)

      
      this.physics.add.collider(bashy, box);
      finalSelection = character;
      
    })

    booshyImage.on("pointerdown", () => {
      previous = character
      character = 'booshy'

      booshy = this.physics.add.sprite(500, 350, 'booshy')
      
      shooby.destroy();
      bashy.destroy();
      shabby.destroy();
      characterHat.destroy();
      characterCoat.destroy();
      characterGlasses.destroy();

     
      
      this.createAnimationStand(character,booshy)
      

      this.physics.add.collider(booshy, box);
      finalSelection = character;
    })

    shabbyImage.on("pointerdown", () => {
      previous = character
      character = 'shabby'

      shabby = this.physics.add.sprite(500, 350, 'shabby')

      shooby.destroy();
      bashy.destroy();
      booshy.destroy();
      characterHat.destroy();
      characterCoat.destroy();
      characterGlasses.destroy();

  

      
      this.createAnimationStand(character,shabby)

     
      this.physics.add.collider(shabby, box);
      finalSelection = character;
    })

    shoobyImage.on("pointerdown", () => {
      previous = character
      character = 'dude'
      shooby = this.physics.add.sprite(497, 350, 'dude')

      bashy.destroy();
      booshy.destroy();
      shabby.destroy();
      characterHat.destroy();
      characterCoat.destroy();
      characterGlasses.destroy();

      
      
      
      this.createAnimationStand(character,shooby)
    
      this.physics.add.collider(shooby, box);
      finalSelection = character;
    })
    headGear.on('pointerdown', () => {
      previous = character
    
     
      character = character+'Hat'

      characterHat.destroy();

      
      characterHat = this.physics.add.sprite(497, 350, character)

      shooby.destroy();
      bashy.destroy();
      booshy.destroy();
      shabby.destroy();
      characterCoat.destroy();
      characterGlasses.destroy();

      this.createAnimationStand(character,characterHat);
      this.physics.add.collider(characterHat, box);
      finalSelection = character;
      character = previous
    })

    coat.on('pointerdown', () => {
      previous = character
     
      character = character+'Coat'

      characterCoat.destroy();

      
      characterCoat = this.physics.add.sprite(497, 350, character)

      shooby.destroy();
      bashy.destroy();
      booshy.destroy();
      shabby.destroy();
      characterHat.destroy();
      characterGlasses.destroy();

      this.createAnimationStand(character,characterCoat);
      this.physics.add.collider(characterCoat, box);
      finalSelection = character;
      character = previous
    })

    glasses.on('pointerdown', () => {
      previous = character
      
      character = character+'Glasses'

      characterGlasses.destroy();

      
      characterGlasses = this.physics.add.sprite(497, 350, character)

      shooby.destroy();
      bashy.destroy();
      booshy.destroy();
      shabby.destroy();
      characterHat.destroy();
      characterCoat.destroy();


      this.createAnimationStand(character,characterGlasses);
      this.physics.add.collider(characterGlasses, box);
      finalSelection = character;
      character = previous
    })

    smallPlayButton.on("pointerdown", () => {
      
      this.scene.start("titleScene",  {character: finalSelection})
      this.scene.start("mainMenu",  {character: finalSelection})

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
    


  

    
