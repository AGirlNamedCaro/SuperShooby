import Phaser from "phaser";

export default class SinglePlayerScene extends Phaser.Scene {
  constructor() {
    super("singlePlayer");
  }

  preload() {
    this.load.image("tiles", "/assets/images/prefabs/marioTileset.png");
    this.load.tilemapTiledJSON("world", "/assets/mapData/marioTileset16.json");
  }

  init(data) {
    this.key = data.key
    this.bombs = data.bombs;
    this.scoreNum = data.score;
    this.fishNum = data.fishNum;
    this.stepX = data.stepX;
  }

  create() {
    this.charKey = localStorage.getItem('characterKey')
    console.log('in SinglePlayer', this.charKey)
    const worldMap = this.add.tilemap("world");
    const tileset = worldMap.addTilesetImage("tiles");
    const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
    const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
    const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);

    ground.setCollisionByExclusion(-1, true);

    this.bombsNum = this.bombs;
    // ground.setCollisionByProperty({ collides: true }, true)
    // ground.setCollision([1, 265, 266, 299, 298])
    this.score = 0;
    this.highScore = localStorage.getItem('highScore')

    this.player = this.physics.add.sprite(100, 450, this.charKey);
    this.player.body.setGravityY(300);
    this.physics.add.collider(this.player, ground);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: this.charKey + "left",
      frames: this.anims.generateFrameNumbers(this.charKey, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: this.charKey +"turn",
      frames: [{ key: this.charKey, frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: this.charKey + "right",
      frames: this.anims.generateFrameNumbers(this.charKey, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      pause: Phaser.Input.Keyboard.KeyCodes.ESC
    });

    //FISH & BOMBS creation
    this.fish = this.physics.add.group({
      key: 'fish',
      repeat: this.fishNum,
      setXY: {x: 12, y: 0, stepX: this.stepX }
    })

    this.fish.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8))
      child.anims.play('flop', true);
    })

    this.physics.add.collider(this.fish,ground);
            
    this.physics.add.overlap(this.player,this.fish,this.collectFish,null,this);
            
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs,ground);
    this.physics.add.collider(this.player,this.bombs,this.hitBomb,null,this)

    this.scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill: '#fff'} );
  }

  collectFish(player, fish) {
    fish.disableBody(true,true);
    this.score += this.scoreNum;
    this.scoreText.setText("score: " + this.score);

    if(this.score > this.highScore) {
        this.scoreText.setText("NEW score: " + this.score);
    }
    
    if(this.fish.countActive(true) === 0) {
      this.fish.children.iterate(function(child) {
          child.enableBody(true,child.x,0,true,true)
      });
      
      let x = (player.x < 400) ?
      Phaser.Math.Between(400,800) : Phaser.Math.Between(0,400);
      
      for(let i = 0; i < this.bombsNum; i++) {
          
          let bomb = this.bombs.create(x,16,'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200,200), 20)
          
        }
        
    }
}

hitBomb(player,bomb) {
  this.physics.pause();
  this.player.setTint(0xff0000);
  this.player.anims.play(this.charKey +'turn')
  this.gameOver = true;
}


  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play(this.charKey +"left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play(this.charKey +"right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play(this.charKey +"turn");
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-550);
    }
    if(this.cursors.pause.isDown) {
      this.scene.pause()
    }


        //Setting highscore
        if(this.highScore === null) {
          localStorage.setItem('highScore', 0);
          this.highScore = 0;
      }
      else if (this.score > this.highScore) {
          localStorage.setItem('highScore', this.score);
          this.highScore = this.score;
      }


      if(this.gameOver === true) {

          let gameOverText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'GAME OVER', { fontSize: '32px', fill: '#fff' });
          let highScore = this.add.text(this.game.config.width / 4, this.game.config.height / 1.8, `High Score: ${this.highScore}` ,{ fontSize: '32px', fill: '#fff' });
          let score = this.add.text(this.game.config.width / 1.6, this.game.config.height / 1.8, `Score: ${this.score} ` ,{ fontSize: '32px', fill: '#fff' });

          const back_to_main = this.add.image(this.game.renderer.width/ 1.75 , this.game.renderer.height * 0.65, "back_to_main");
          back_to_main.scale = 0.35;
          const restart = this.add.image(this.game.renderer.width / 1.55, this.game.renderer.height * 0.65, "restart");
          restart.scale = 0.35;
         
          back_to_main.setInteractive();
          restart.setInteractive();

              
          restart.on("pointerdown", () => {
              console.log("restart");
              this.gameOver = false;
              this.scene.restart();
             
              });

          back_to_main.on("pointerdown", () => {
              console.log("back to main");
              this.gameOver = false;
              this.scene.start("titleScene");
          })

          

      }
  }
}
