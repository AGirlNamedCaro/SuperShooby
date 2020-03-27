import Phaser from "phaser";
import socketIo from "socket.io-client";

// THIS FILE ISNT IN USE ANYMORE
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  preload() {
    this.load.image("tiles", "/assets/images/prefabs/marioTileset.png");
    this.load.tilemapTiledJSON("world", "/assets/mapData/marioTileset16.json");
    this.load.spritesheet("dude", "/assets/images/sprites/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    this.load.spritesheet('fish',
    '/assets/images/sprites/star.png',
    { frameWidth: 32, frameHeight: 32 }
  );

this.load.image('back_to_main', '/assets/images/buttons/difficulty_bar_hard1.png');
this.load.image('restart', '/assets/images/buttons/difficulty_bar_medium1.png');


  }

  init(data) {
    this.bombs = data.bombs;
    this.scoreNum = data.score;
    this.fishNum = data.fishNum;
    this.stepX = data.stepX;
    this.key = data.key
}


  create() {
    this.socket = this.game.socket;
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

       
        
        ground.setCollisionByExclusion(-1, true)
     
        this.player = this.physics.add.sprite(100, 450, this.key);
        
        this.player.body.setGravityY(300);
        this.physics.add.collider(this.player, ground);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(this.key, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: this.key, frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(this.key, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        
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
            
            //ScoreTEXT
            
            this.scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill: '#000'} );


  
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
        this.player.anims.play('turn')
        this.gameOver = true;
    }
    
    
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

    const self = this;
    this.otherPlayers = this.physics.add.group();
    this.socket.on("currentPlayers", players => {
      console.log("up Players", players);
      for (let id in players) {
        console.log("player id", id);
        console.log(Object.keys(players));
        if (players[id].playerId === self.socket.id) {
          console.log("adding self player");
          this.addPlayer(self, this.ground);
        } else {
          console.log("adding other player");
          this.addOtherPlayers(self, players[id], this.ground);
        }
      }
    });
    this.socket.on("newPlayer", playerInfo => {
      console.log("adding new player");
      this.addOtherPlayers(self, playerInfo, this.ground);
    });
    this.socket.on("disconnect", playerId => {
      self.otherPlayers.getChildren().forEach(otherPlayer => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    this.socket.on("playerMoved", playerInfo => {
      self.otherPlayers.getChildren().forEach(otherPlayer => {
        otherPlayer.body.setGravityY(300);

        if (playerInfo.playerId === otherPlayer.Id) {
          // TODO this can break later if we have more than 2 players
          const otherPlayerState = playerInfo;
          // console.log("otherPlayerState", playerInfo)
          // console.log("otherplayerId", otherPlayer.Id);
          // console.log("otherPlayerInfo", playerInfo[otherPlayer.Id]);
          if (otherPlayerState.playerState.left) {
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            otherPlayer.setVelocityX(-160);
            otherPlayer.anims.play("left", true);
          } else if (otherPlayerState.playerState.right) {
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            otherPlayer.setVelocityX(160);
            otherPlayer.anims.play("right", true);
          } else {
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            otherPlayer.setVelocityX(0);
            otherPlayer.anims.play("turn");
          }

          if (
            otherPlayerState.playerState.up &&
            otherPlayer.body.blocked.down
          ) {
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            otherPlayer.setVelocityY(-150);
            console.log(otherPlayer);
            // this.player.setVelocityY(-630);
          }

          //   otherPlayer.setRotation(playerInfo.rotation);
            // otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(this.key, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: this.key, frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(this.key, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.playerState = this.calcPlayerState();

    console.log(this.cursors);
    this.input.keyboard.on("keyup-W", event => {
      this.playerState = this.calcPlayerState(
        this.player,
        this.playerState,
        false,
        "up"
      );
      this.emitSocket(this.socket, "playerMovement", this.playerState);
    });

    this.input.keyboard.on("keyup-A", event => {
      this.playerState = this.calcPlayerState(
        this.player,
        this.playerState,
        false,
        "left"
      );
      this.emitSocket(this.socket, "playerMovement", this.playerState);
    });

    this.input.keyboard.on("keyup-S", event => {
      this.playerState = this.calcPlayerState(
        this.player,
        this.playerState,
        false,
        "down"
      );
      this.emitSocket(this.socket, "playerMovement", this.playerState);
    });

    this.input.keyboard.on("keyup-D", event => {
      this.playerState = this.calcPlayerState(
        this.player,
        this.playerState,
        false,
        "right"
      );
      this.emitSocket(this.socket, "playerMovement", this.playerState);
    });

    this.input.keyboard.on("keydown-W", event => {
      this.playerState = this.calcPlayerState(
        this.player,
        this.playerState,
        true,
        "up"
      );
      this.emitSocket(this.socket, "playerMovement", this.playerState);
    });

    this.input.keyboard.on("keydown-A", event => {
      this.playerState = this.calcPlayerState(
        this.player,
        this.playerState,
        true,
        "left"
      );
      this.emitSocket(this.socket, "playerMovement", this.playerState);
    });

    this.input.keyboard.on("keydown-S", event => {
      this.playerState = this.calcPlayerState(
        this.player,
        this.playerState,
        true,
        "down"
      );
      this.emitSocket(this.socket, "playerMovement", this.playerState);
    });

    this.input.keyboard.on("keydown-D", event => {
      this.playerState = this.calcPlayerState(
        this.player,
        this.playerState,
        true,
        "right"
      );
      this.emitSocket(this.socket, "playerMovement", this.playerState);
    });
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

      //   TODO Dry these functions up
  addPlayer(self, collisions) {
    self.player = self.physics.add.sprite(100, 450, this.key);
    self.player.body.setGravityY(300);
    self.physics.add.collider(self.player, collisions);
    self.player.setBounce(0.2);
    self.player.setCollideWorldBounds(true);
  }

  addOtherPlayers(self, playerInfo, collisions) {
    const otherPlayer = self.physics.add.sprite(100, 450, this.key);
    otherPlayer.Id = playerInfo.playerId;
    otherPlayer.body.setGravityY(300);
    self.physics.add.collider(otherPlayer, collisions);
    otherPlayer.setBounce(0.2);
    otherPlayer.setCollideWorldBounds(true);
    this.otherPlayers.add(otherPlayer);
  }

  calcPlayerState(player, playerState, isState, state) {
    let resultsObj = {};
    if (!playerState) {
      resultsObj = {
        up: false,
        left: false,
        down: false,
        right: false,
        x: 100,
        y: 450
      };
      return resultsObj;
    }

    resultsObj = playerState;

    if (isState) {
      resultsObj[state] = true;
    } else {
      resultsObj[state] = false;
    }
    resultsObj.x = player.x;
    resultsObj.y = player.y;
    return resultsObj;
  }

  emitSocket(socket, event, emitObj) {
    socket.emit(event, emitObj);
  }
    }

        

    

