import Phaser from "phaser";
import socketIo from "socket.io-client";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("gameScene");
    const player = this.player;
    let cursors = this.cursors;
  }

  preload() {
    this.load.image("tiles", "/assets/images/prefabs/marioTileset.png");
    this.load.tilemapTiledJSON("world", "/assets/mapData/marioTileset16.json");
    this.load.spritesheet("dude", "/assets/images/sprites/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    this.socket = socketIo(
      process.env.REACT_APP_HOST + ":" + process.env.REACT_APP_PORT
    );
    const worldMap = this.add.tilemap("world");
    const tileset = worldMap.addTilesetImage("tiles");
    const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
    const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
    const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
    // ground.setCollisionByProperty({ collides: true }, true)
    // ground.setCollision([1, 265, 266, 299, 298])
    ground.setCollisionByExclusion(-1, true);

    const self = this;
    this.socket.on("currentPlayers", players => {
      Object.keys(players).forEach(id => {
        if (players[id].playerId === self.socket.id) {
          this.addPlayer(self, ground);
        }
      });
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.player) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);

        this.player.anims.play("left", true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);

        this.player.anims.play("right", true);
      } else {
        this.player.setVelocityX(0);

        this.player.anims.play("turn");
      }

      if (this.cursors.up.isDown && this.player.body.blocked.down) {
        console.log("jump");
        this.player.setVelocityY(-630);
      }
    }
  }

  addPlayer(self, collisions) {
    self.player = self.physics.add.sprite(100, 450, "dude");
    self.player.body.setGravityY(300);
    self.physics.add.collider(self.player, collisions);
    self.player.setBounce(0.2);
    self.player.setCollideWorldBounds(true);
  }
}
