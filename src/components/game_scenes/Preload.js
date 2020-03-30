import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloadAssets")
  }

  preload() {
    this.load.image('sky', '/assets/images/backgrounds/fairy-background-craft-pixel.png');
    this.load.image('playButton', "/assets/images/buttons/playButton.png");
    this.load.image('backButtonRope', '/assets/images/backgrounds/back-button-rope.png');
    this.load.image('settingsButton', "/assets/images/buttons/settings.png");
    this.load.image('smallPlayButton', "/assets/images/buttons/smallPlayButton.png");
    this.load.image('singlePlayer', "/assets/images/buttons/singlePlayerButton.png");
    this.load.image('multiplayer', "/assets/images/buttons/multiplayerButton.png");
    this.load.image("menuBg", "/assets/images/backgrounds/menu-bg.png");
    this.load.image("multiplayer_menu", "/assets/images/backgrounds/multiplayer_menu.png");
    this.load.image("createRoomButton", "/assets/images/buttons/createRoomButton.png");
    this.load.image("joinRoomButton", "/assets/images/buttons/joinRoomButton.png");
    this.load.image('createRoomMenu', '/assets/images/backgrounds/createRoomMenu.png');
    this.load.image('joinCreateButton', '/assets/images/buttons/join_createButton.png');
    this.load.image('joinRoomMenu', '/assets/images/backgrounds/joinRoomMenu.png');
    this.load.image("cancelButton", "/assets/images/buttons/cancelButton.png");
    this.load.image("headButton", "/assets/images/buttons/headButton.png");
    this.load.image("customizeButton", "/assets/images/buttons/customizeButton.png");
    this.load.image("setMapButton", "/assets/images/buttons/setMapButton.png");
    this.load.image('thumbnailBg', '/assets/images/backgrounds/thumbnailBg.png');
    this.load.image("createMapButton", "/assets/images/buttons/createMapButton.png");
    this.load.image("createCharButton", "/assets/images/buttons/createCharButton.png");
    this.load.image('ground', '/assets/images/prefabs/platform.png');
    this.load.image('difficulty_bar_hard', '/assets/images/buttons/difficulty_bar_hard1.png');
    this.load.image('difficulty_bar_medium', '/assets/images/buttons/difficulty_bar_medium1.png');
    this.load.image('difficulty_bar_easy', '/assets/images/buttons/difficulty_bar_easy1.png');
    this.load.image('difficulty_bar', '/assets/images/buttons/difficulty_bar.png');
    this.load.image('createCharBackground', '/assets/images/backgrounds/createCharBackground.png');
    this.load.image('foreground', '/assets/images/backgrounds/foreground.png');
    this.load.image('coat', '/assets/images/buttons/coat.png');
    this.load.image('glasses', '/assets/images/buttons/glasses.png');
    this.load.image('headgear', '/assets/images/buttons/headgear.png');
    this.load.image('lowJump', '/assets/images/buttons/lowJump.png');
    this.load.image('medJump', '/assets/images/buttons/medJump.png');
    this.load.image('highJump', '/assets/images/buttons/hiJump.png');
    this.load.image('resume', '/assets/images/buttons/resumeButton.png');
    this.load.image('exit', '/assets/images/buttons/exitButton.png');
    this.load.image('gravityOne', '/assets/images/buttons/gravityOne.png');
    this.load.image('gravityTwo', '/assets/images/buttons/gravityTwo.png');
    this.load.image('gravityThree', '/assets/images/buttons/gravityThree.png');







    this.load.image('bomb', '/assets/images/prefabs/bomb.png')
    this.load.image("settingsButton", "/assets/images/buttons/gameSettings.png");
    this.load.image('slider', '/assets/images/buttons/slider.png')
    
    this.load.spritesheet('dude',
      '/assets/images/sprites/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );

    this.load.spritesheet('bashy',
      '/assets/images/sprites/bashy.png',
      { frameWidth: 32, frameHeight: 48 }
    );

    this.load.spritesheet('booshy',
      '/assets/images/sprites/booshy.png',
      { frameWidth: 32, frameHeight: 48 }
    );

    this.load.spritesheet('shabby',
      '/assets/images/sprites/shabby.png',
      { frameWidth: 32, frameHeight: 48 }
    );
      
    //Accessories
      
    //HATS
      
    this.load.spritesheet('dudeHat',
      '/assets/images/sprites/shoobyHat.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('bashyHat',
      '/assets/images/sprites/bashyHat.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('booshyHat',
      '/assets/images/sprites/booshyHat.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('shabbyHat',
      '/assets/images/sprites/shabbyHat.png',
      { frameWidth: 32, frameHeight: 48 }
    );
      
    //Glasses
      
    this.load.spritesheet('dudeGlasses',
      '/assets/images/sprites/shoobyGlasses.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('bashyGlasses',
      '/assets/images/sprites/bashyGlasses.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('booshyGlasses',
      '/assets/images/sprites/booshyGlasses.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.spritesheet('shabbyGlasses',
      '/assets/images/sprites/shabbyGlasses.png',
      { frameWidth: 32, frameHeight: 48 }
    );
      
      
      
    //Coats
    this.load.spritesheet('dudeCoat',
      '/assets/images/sprites/shoobyCoat.png',
      { frameWidth: 32, frameHeight: 48 }
    );
      
    this.load.spritesheet('bashyCoat',
      '/assets/images/sprites/bashyCoat.png',
      { frameWidth: 32, frameHeight: 48 }
    );
      
    this.load.spritesheet('booshyCoat',
      '/assets/images/sprites/booshyCoat.png',
      { frameWidth: 32, frameHeight: 48 }
    );
      
    this.load.spritesheet('shabbyCoat',
      '/assets/images/sprites/shabbyCoat.png',
      { frameWidth: 32, frameHeight: 48 }
    );


    this.load.spritesheet('fish',
      '/assets/images/sprites/star.png',
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.on("progress", () => {
      this.add.text(20, 20, "Loading game...")
    })

    this.load.on("complete", () => {
      this.game.setLevel("/assets/mapData/shoobyTileset16.json")
      this.scene.start("titleScene")
    });
  }
}