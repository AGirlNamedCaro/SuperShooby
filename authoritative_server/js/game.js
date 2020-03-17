const config = {
  type: Phaser.HEADLESS,
  parent: "phaser-example",
  width: 800,
  height: 600,
  autoFocus: false,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const players = {};

function preload() {
  this.load.spritesheet("dude", "assets/images/sprites/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create() {
  const self = this;
  this.players = this.physics.add.group();

  io.on("connection", socket => {
    console.log("An Authoritative Shooby has Connected");
    // create a new player and add it to our players object
    players[socket.id] = {
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

    addPlayer(self, players[socket.id]);

    socket.emit("currentPlayers", players);
    socket.broadcast.emit("newPlayer", players[socket.id]);

    socket.on("disconnect", () => {
      removePlayer(self, socket.id);
      delete players[socket.id];
      io.emit("disconnect", socket.id);
      console.log("An Authoritative Shooby has disconnected");
    });

    socket.on("playerInput", playerState => {
      console.log(playerState);
      handlePlayerInput(self, socket.id, playerState);
    });
  });
}

function update() {
  this.players.getChildren().forEach(player => {
    const playerState = players[player.playerId].playerState;
    if (playerState.left) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (playerState.right) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
    }

    if (playerState.up && player.body.blocked.down) {
      player.setVelocityY(-150);
    }

    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
  });

  this.physics.world.wrap(this.players, 5);
  io.emit("playerUpdates", players);
}

function addPlayer(self, collisions) {
  self.player = self.physics.add.sprite(100, 450, "dude");
  self.player.body.setGravityY(300);
  self.physics.add.collider(self.player, collisions);
  self.player.setBounce(0.2);
  self.player.setCollideWorldBounds(true);
}

function removePlayer(self, playerId) {
  self.players.getChildren().forEach(player => {
    if (playerId === player.playerId) {
      player.destroy();
    }
  });
}

function handlePlayerInput(self, playerId, playerState) {
  self.players.getChildren().forEach(player => {
    if (playerId === player.playerId) {
      players[player.playerId].playerState = playerState;
    }
  });
}

const game = new Phaser.Game(config);

window.gameLoaded();
