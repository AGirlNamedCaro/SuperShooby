// Cant figure out how to use classes as exports for Browserify
class ServerScene extends Phaser.Scene {
  constructor() {
    super("serverScene");
    this.playersGroup = {};
  }
  // const players = {};

  preload() {
    this.load.spritesheet("dude", "assets/images/sprites/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.image("tiles", "assets/images/prefabs/marioTileset.png");
    this.load.tilemapTiledJSON("world", "assets/mapData/marioTileset16.json");
  }

  create() {
    const self = this;
    const worldMap = this.add.tilemap("world");
    const tileset = worldMap.addTilesetImage("tiles");
    const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
    const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
    const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
    // ground.setCollisionByProperty({ collides: true }, true)
    // ground.setCollision([1, 265, 266, 299, 298])
    ground.setCollisionByExclusion(-1, true);
    this.playersGroup = this.physics.add.group();

    io.on("connection", socket => {
      console.log("An Authoritative Shooby has Connected");
      // create a new player and add it to our players object
      this.players[socket.id] = {
        playerId: socket.id,
        rotation: 0,
        // TODO Need to change these values to be brought in depending on where the floor is
        x: Math.floor(Math.random() * 100) + 25,
        y: Math.floor(Math.random() * 450),
        playerId: socket.id,
        playerState: {
          left: false,
          right: false,
          up: false,
          down: false
        }
      };

      this.addPlayer(self, this.players[socket.id], ground);

      socket.emit("currentPlayers", this.players);
      socket.broadcast.emit("newPlayer", this.players[socket.id]);

      socket.on("disconnect", () => {
        this.removePlayer(self, socket.id);
        delete this.players[socket.id];
        io.emit("disconnect", socket.id);
        console.log("An Authoritative Shooby has disconnected");
      });

      socket.on("playerInput", playerState => {
        this.handlePlayerInput(self, socket.id, playerState);
      });
    });
  }

  update() {
    this.playersGroup.getChildren().forEach(player => {
      const playerState = this.players[player.playerId].playerState;

      // TODO bug where pressing right while holding down left wont stop character from moving left
      if (playerState.left && !playerState.right) {
        player.setVelocityX(-160);
      } else if (playerState.right && !playerState.left) {
        player.setVelocityX(160);
      } else {
        player.setVelocityX(0);
      }

      if (playerState.up && player.body.blocked.down) {
        player.setVelocityY(-150);
      }

      this.players[player.playerId].x = player.x;
      this.players[player.playerId].y = player.y;
    });

    // this.physics.world.wrap(this.playersGroup, 5);
    io.emit("playerUpdates", this.players);
  }

  addPlayer(self, playerInfo, collisions) {
    const player = self.physics.add.sprite(100, 450, "dude");
    player.body.setGravityY(300);
    self.physics.add.collider(player, collisions);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.playerId = playerInfo.playerId;
    self.players.add(player);
  }

  removePlayer(self, playerId) {
    self.players.getChildren().forEach(player => {
      if (playerId === player.playerId) {
        player.destroy();
      }
    });
  }

  handlePlayerInput(self, playerId, playerState) {
    self.players.getChildren().forEach(player => {
      if (playerId === player.playerId) {
        this.players[player.playerId].playerState = playerState;
      }
    });
  }
}

module.exports = {
  ServerScene
}