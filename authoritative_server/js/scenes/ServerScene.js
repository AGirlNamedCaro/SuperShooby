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

function createUpdate(rooms, roomId, playerSpeed, playerJump) {
  return function() {
    if (rooms[roomId]) {
      const playerGroup = rooms[roomId].game.scene.keys.default.players;
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
    }
  };
}

function initPlayer(roomId, playerId, startLoc) {
  return (player = {
    playerId: playerId,
    roomId: roomId,
    // have this be map set
    x: startLoc.x,
    y: startLoc.y,
    playerState: {
      left: false,
      right: false,
      up: false,
      down: false
    }
  });
}

function addPlayer(self, playerInfo, collisions) {
  const player = self.physics.add.sprite(100, 450, "dude");
  player.body.setGravityY(300);

  player.setBounce(0.2);
  // This isnt working, probably because the game screens are different sizes right now.
  player.setCollideWorldBounds(true);
  player.playerId = playerInfo.playerId;
  self.players.add(player);
}

function removePlayer(self, playerId, currentPlayers) {
  self.players.getChildren().forEach(player => {
    if (playerId === player.playerId) {
      player.destroy();
    }
  });
  delete currentPlayers[playerId];
}

function handlePlayerInput(self, players, playerId, playerState) {
  self.players.getChildren().forEach(player => {
    if (playerId === player.playerId) {
      players[player.playerId].playerState = playerState;
    }
  });
}

module.exports = {
  createPreload,
  createUpdate,
  initPlayer,
  addPlayer,
  removePlayer,
  handlePlayerInput
};
