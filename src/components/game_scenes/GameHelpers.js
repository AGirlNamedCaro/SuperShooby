import Phaser from "phaser";

export function createCursors(self) {
  self.cursors = self.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    pause: Phaser.Input.Keyboard.KeyCodes.ESC
  });
}

export function createWorld(self) {
  const worldMap = self.add.tilemap("world");
  const tileset = worldMap.addTilesetImage("tiles");
  const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
  const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
  self.ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
  // ground.setCollisionByProperty({ collides: true }, true)
  // ground.setCollision([1, 265, 266, 299, 298])
  self.ground.setCollisionByExclusion(-1, true);
}

export function playerAnimations(self, character) {
  self.anims.create({
    key: character + "left",
    frames: self.anims.generateFrameNumbers(character, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  self.anims.create({
    key: character + "turn",
    frames: [{ key: character, frame: 4 }],
    frameRate: 20
  });

  self.anims.create({
    key: character + "right",
    frames: self.anims.generateFrameNumbers(character, { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
}

export function createFish(self, fishKey, numFish, collider) {
  self.fish = self.physics.add.group({
    key: fishKey,
    repeat: numFish,
    setXY: { x: 12, y: 0, stepX: self.game.stepX }
  });

  self.fish.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    child.anims.play("flop", true);
  });

  self.physics.add.collider(self.fish, collider);
}

export function collectFish(player, fish) {
  fish.disableBody(true, true);
  this.score += this.game.score;
  this.scoreText.setText("score: " + this.score);

  if (this.score > this.highScore) {
    this.scoreText.setText("NEW score: " + this.score);
  }

  if (this.fish.countActive(true) === 0) {
    this.level++;
    this.fish.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });
    return true;
  }
  return false;
}

export function createBomb(player) {
  this.bombs = this.physics.add.group();
  this.physics.add.collider(this.bombs, this.ground);

  const x =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  for (let i = 0; i < this.game.bomb; i++) {
    const bomb = this.bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  this.physics.add.collider(player, this.bombs, hitBomb, null, this);
}

export function hitBomb(player) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play(this.game.character + "turn");
  this.gameOver = true;
}

//multiplayer functions 

export function  displayPlayers(self, playerInfo, sprite) {
  console.log(playerInfo.x, playerInfo.y);
  const player = self.add.sprite(playerInfo.x, playerInfo.y, sprite);
  player.playerId = playerInfo.playerId;
  self.players.add(player);
  return player;
}

export function displayFish(self, fish, fishId, sprite) {
  const newFish = self.add.sprite(fish.x, fish.y, sprite);
  newFish.fishId = fishId;
  newFish.anims.play("flop", true);
  self.fishes.add(newFish);
  return newFish;
}

export function displayBombs(self, bomb, bombId, sprite) {
  const newBomb = self.add.image(bomb.x, bomb.y, sprite);
  newBomb.bombId = bombId;
  self.bombs.add(newBomb);
  return newBomb;
}

export function calcPlayerState(player, playerState, isState, state) {
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

export function scoreData(self,players) {
  const firstShoob = Object.keys(players)[0];
  self.score = `Shooby 1: ${players[firstShoob].points}`;

  for (let i = 1; i < Object.keys(players).length; i++) {
    self.score = self.score.concat(
      `\nShooby ${i + 1}: ${players[Object.keys(players)[i]].points}`
    );
  }
}