function createPreload(sprite, collectables, bombs, tileset, tilemap) {
  return function() {
    this.load.spritesheet("dude", sprite, {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("fish", collectables, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image("bomb", bombs);
    this.load.image("tiles", tileset);
    this.load.tilemapTiledJSON("world", tilemap);
  };
}

function createUpdate(rooms, roomId, playerSpeed, playerJump) {
  return function() {
    if (rooms[roomId]) {
      const level = rooms[roomId].game.scene.keys.default;
      const playerGroup = level.players;
      const players = rooms[roomId].players;
      const gameObjects = rooms[roomId].gameObjects;

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

        level.fish.getChildren().forEach((fish, index) => {
          gameObjects[`fish${index}`] = {
            x: fish.x,
            y: fish.y,
            active: fish.active
          };
        });
        io.to(roomId).emit("gameUpdates", { players, gameObjects });
      }
    }
  };
}

function initPlayer(roomId, playerId, startLoc) {
  return (player = {
    playerId: playerId,
    roomId: roomId,
    points: 0,
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
  // TODO This isnt working, probably because the game screens are different sizes right now.
  player.setCollideWorldBounds(true);
  player.playerId = playerInfo.playerId;
  self.players.add(player);
}

function removePlayer(self, playerId, currentPlayers, roomPlayers) {
  self.players.getChildren().forEach(player => {
    if (playerId === player.playerId) {
      player.destroy();
    }
  });
  delete roomPlayers[playerId];
  delete currentPlayers[playerId];
}

function handlePlayerInput(self, players, playerId, playerState) {
  self.players.getChildren().forEach(player => {
    if (playerId === player.playerId) {
      players[player.playerId].playerState = playerState;
    }
  });
}

function createFish(self, fishKey, numFish, stepX, collider) {
  self.fish = self.physics.add.group({
    // TODO add these in from the client
    key: fishKey,
    repeat: numFish,
    setXY: { x: 12, y: 0, stepX: stepX }
  });

  self.fish.children.iterate(child => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  self.physics.add.collider(self.fish, collider);
}

// TODO need to re-write function
function collectFish(player, fish) {
  // console.log("hit fish", fish);

  // console.log(this.room[this.roomId].players)
  if (this.room.hasOwnProperty(this.roomId)) {
    if (this.room[this.roomId].players[player.playerId]) {
      // TODO need to have score per fish brought in from client
      this.room[this.roomId].players[player.playerId].points += 10;
      fish.disableBody(true, true);
    }
  }

  if (this.fishes.countActive(true) === 0) {
    // this.level++;
    this.fishes.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });
    return true;
  }
  return false;
}

function createBomb(player) {
  // this.bombs = this.physics.add.group();
  // this.physics.add.collider(this.bombs, this.ground);
  // const x =
  //   player.x < 400
  //     ? Phaser.Math.Between(400, 800)
  //     : Phaser.Math.Between(0, 400);
  // for (let i = 0; i < this.bombsNum; i++) {
  //   const bomb = this.bombs.create(x, 16, "bomb");
  //   bomb.setBounce(1);
  //   bomb.setCollideWorldBounds(true);
  //   bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  // }
  // this.physics.add.collider(player, this.bombs, hitBomb, null, this);
}

function hitBomb(player) {
  this.physics.pause();
  this.gameOver = true;
}

module.exports = {
  createPreload,
  createUpdate,
  initPlayer,
  addPlayer,
  removePlayer,
  handlePlayerInput,
  createFish,
  collectFish,
  createBomb
};
