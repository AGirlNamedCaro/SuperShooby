const randomWord = require("random-words");

// const players = {};

function createPreload(sprite, tileset, tilemap) {
  return function() {
    this.load.spritesheet("dude", sprite, {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.image("tiles", tileset);
    this.load.tilemapTiledJSON("world", tilemap);
  };
}

// function preload() {
//   this.load.spritesheet("dude", "assets/images/sprites/dude.png", {
//     frameWidth: 32,
//     frameHeight: 48
//   });
//   this.load.image("tiles", "assets/images/prefabs/marioTileset.png");
//   this.load.tilemapTiledJSON("world", "assets/mapData/marioTileset16.json");
// }

// function create() {
//   const self = this;
//   const worldMap = this.add.tilemap("world");
//   const tileset = worldMap.addTilesetImage("tiles");
//   const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
//   const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
//   const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
//   // ground.setCollisionByProperty({ collides: true }, true)
//   // ground.setCollision([1, 265, 266, 299, 298])
//   ground.setCollisionByExclusion(-1, true);
//   this.players = this.physics.add.group();
//   // console.log("this", this)

// }

function createUpdate(rooms, roomId, playerSpeed, playerJump) {
  return function() {
    const playerGroup = rooms[roomId].playerGroup;
    const players = rooms[roomId].players;
    if (Object.keys(playerGroup).length > 1) {
      playerGroup.getChildren().forEach(player => {
        const playerState = players[player.playerId].playerState;

        // TODO bug where pressing right while holding down left wont stop character from moving left
        if (playerState.left && !playerState.right) {
          player.setVelocityX(playerSpeed * -1);
        } else if (playerState.right && !playerState.left) {
          player.setVelocityX(playerSpeed);
        } else {
          player.setVelocityX(0);
        }

        if (playerState.up && player.body.blocked.down) {
          player.setVelocityY(playerJump * -1);
        }

        players[player.playerId].x = player.x;
        players[player.playerId].y = player.y;
      });

      // this.physics.world.wrap(this.players, 5);
      io.emit("playerUpdates", players);
    }
  };
}
// function update() {
//   this.players.getChildren().forEach(player => {
//     const playerState = players[player.playerId].playerState;

//     // TODO bug where pressing right while holding down left wont stop character from moving left
//     if (playerState.left && !playerState.right) {
//       player.setVelocityX(-160);
//     } else if (playerState.right && !playerState.left) {
//       player.setVelocityX(160);
//     } else {
//       player.setVelocityX(0);
//     }

//     if (playerState.up && player.body.blocked.down) {
//       player.setVelocityY(-150);
//     }

//     players[player.playerId].x = player.x;
//     players[player.playerId].y = player.y;
//   });

//   // this.physics.world.wrap(this.players, 5);
//   io.emit("playerUpdates", players);
// }

function addPlayer(self, playerInfo, collisions) {
  const player = self.physics.add.sprite(100, 450, "dude");
  player.body.setGravityY(300);
  // self.physics.add.collider(player, collisions);

  player.setBounce(0.2);
  // This isnt working, probably because the game screens are different sizes right now.
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

function handlePlayerInput(self, players, playerId, playerState) {
  self.players.getChildren().forEach(player => {
    console.log("playerx", playerId, player.x)
    console.log("playery", playerId, player.y)
    console.log("playerIds", playerId, player.playerId)
    if (playerId === player.playerId) {
      players[player.playerId].playerState = playerState;
    }
  });
}

module.exports = {
  createPreload,
  createUpdate,
  addPlayer,
  removePlayer,
  handlePlayerInput
};
