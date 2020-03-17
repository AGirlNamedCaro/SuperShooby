(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  config: (preload, create, update, gravity) => {
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
          // gravity might break should be gravity: { y: 300 }
          gravity,
        }
      },
      scene: {
        preload,
        create,
        update
      }
    };
    return config;
  }
};

},{}],2:[function(require,module,exports){
const { preload, create, update } = require("./scenes/ServerScene");
const { config } = require("./config");

const gameConfig = config(preload, create, update, { y: 300 });

const game = new Phaser.Game(gameConfig);

window.gameLoaded();

},{"./config":1,"./scenes/ServerScene":3}],3:[function(require,module,exports){
const players = {};

function preload() {
  this.load.spritesheet("dude", "assets/images/sprites/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
  this.load.image("tiles", "assets/images/prefabs/marioTileset.png");
  this.load.tilemapTiledJSON("world", "assets/mapData/marioTileset16.json");
}

function create() {
  const self = this;
  const worldMap = this.add.tilemap("world");
  const tileset = worldMap.addTilesetImage("tiles");
  const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
  const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
  const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
  // ground.setCollisionByProperty({ collides: true }, true)
  // ground.setCollision([1, 265, 266, 299, 298])
  ground.setCollisionByExclusion(-1, true);
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

    addPlayer(self, players[socket.id], ground);

    socket.emit("currentPlayers", players);
    socket.broadcast.emit("newPlayer", players[socket.id]);

    socket.on("disconnect", () => {
      removePlayer(self, socket.id);
      delete players[socket.id];
      io.emit("disconnect", socket.id);
      console.log("An Authoritative Shooby has disconnected");
    });

    socket.on("playerInput", playerState => {
      handlePlayerInput(self, socket.id, playerState);
    });
  });
}

function update() {
  this.players.getChildren().forEach(player => {
    const playerState = players[player.playerId].playerState;

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

    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
  });

  // this.physics.world.wrap(this.players, 5);
  io.emit("playerUpdates", players);
}

function addPlayer(self, playerInfo, collisions) {
  const player = self.physics.add.sprite(100, 450, "dude");
  player.body.setGravityY(300);
  self.physics.add.collider(player, collisions);
  
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.playerId = playerInfo.playerId;
  self.players.add(player);
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

module.exports = {
  preload,
  create,
  update
}
},{}]},{},[2]);
