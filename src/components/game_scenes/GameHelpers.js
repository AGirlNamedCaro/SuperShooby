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
    key: "left",
    frames: self.anims.generateFrameNumbers(character, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  self.anims.create({
    key: "turn",
    frames: [{ key: character, frame: 4 }],
    frameRate: 20
  });

  self.anims.create({
    key: "right",
    frames: self.anims.generateFrameNumbers(character, { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
}

export function createFish(self, fishKey, numFish, collider) {
  self.fish = self.physics.add.group({
    key: fishKey,
    repeat: numFish,
    setXY: { x: 12, y: 0, stepX: self.stepX }
  });

  self.fish.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    child.anims.play("flop", true);
  });

  self.physics.add.collider(self.fish, collider);
}

export function collectFish(player, fish) {
  fish.disableBody(true, true);
  this.score += this.scoreNum;
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

  for (let i = 0; i < this.bombsNum; i++) {
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
  player.anims.play("turn");
  this.gameOver = true;
}
