import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
        const player = this.player;
        let cursors = this.cursors;
    }

    preload() {
        this.load.image("tiles", "/assets/images/prefabs/marioTileset.png");
        this.load.tilemapTiledJSON("world", "/assets/mapData/marioTileset16.json")
        this.load.spritesheet('dude',
            '/assets/images/sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    init(data) {
        this.bombs = data.bombs;
    }

    create() {
        console.log(this.bombs);
         this.bombsNum = this.bombs;
        const worldMap = this.add.tilemap("world")
        const tileset = worldMap.addTilesetImage("tiles");
        const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
        const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
        const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
        // ground.setCollisionByProperty({ collides: true }, true)
        // ground.setCollision([1, 265, 266, 299, 298])
        ground.setCollisionByExclusion(-1, true)
     
        this.player = this.physics.add.sprite(100, 450, 'dude');
        // this.scene.c
        this.player.body.setGravityY(300);
        this.physics.add.collider(this.player, ground);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();


        //STARS & BOMBS creation
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70}
          })
  
          this.stars.children.iterate(function(child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8))
          })
  
          this.physics.add.collider(this.stars,ground);
  
          this.physics.add.overlap(this.player,this.stars,this.collectStar,null,this);
  
          this.bombs = this.physics.add.group();
          this.physics.add.collider(this.bombs,ground);
          this.physics.add.collider(this.player,this.bombs,this.hitBomb,null,this)
  
    }

    collectStar(player, star) {
        star.disableBody(true,true);
  
        if(this.stars.countActive(true) === 0) {
          this.stars.children.iterate(function(child) {
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
        player.setTint(0xff0000);
        player.anims.play('turn')
        this.gameOver = true;
        
      }
  

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            console.log('jump')
            this.player.setVelocityY(-630);
        }
    }
}