import Phaser from "phaser";
import {
  createCursors,
  createWorld,
  playerAnimations,
  collectFish,
  hitBomb,
  createFish,
  createBomb
} from "./GameHelpers";

export default class SinglePlayerScene extends Phaser.Scene {
  constructor() {
    super("singlePlayer");
  }

  preload() {
    this.load.image("tiles", "/assets/images/prefabs/shoobyTileSet.png");
    this.load.tilemapTiledJSON("world", this.game.level);
  }

  init(data) {
    this.bombs = data.bombs;
    this.scoreNum = data.score;
    this.fishNum = data.fishNum;
    this.stepX = data.stepX;
    this.level = 1;
  }

  create() {
    const self = this;

    createWorld(self);

    this.bombsNum = this.bombs;
    // ground.setCollisionByProperty({ collides: true }, true)
    // ground.setCollision([1, 265, 266, 299, 298])
    this.score = 0;
    this.highScore = localStorage.getItem("highScore");

    this.player = this.physics.add.sprite(100, 450, this.game.character);
    this.player.body.setGravityY(300);
    this.physics.add.collider(this.player, this.ground);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    playerAnimations(self, this.game.character);
    createCursors(self);

    //FISH & BOMBS creation
    createFish(self, "fish", this.fishNum, this.ground);
    console.log("singplayerscene", this.fish);

    this.physics.add.overlap(this.player, this.fish, createBomb, collectFish, this);

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#fff"
    });
  }

  update() {
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
      this.player.setVelocityY(-550);
    }
    if (this.cursors.pause.isDown) {
      this.scene.pause();
    }

    //Setting highscore
    if (this.highScore === null) {
      localStorage.setItem("highScore", 0);
      this.highScore = 0;
    } else if (this.score > this.highScore) {
      localStorage.setItem("highScore", this.score);
      this.highScore = this.score;
    }

    if (this.gameOver === true) {
      let gameOverText = this.add.text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "GAME OVER",
        { fontSize: "32px", fill: "#fff" }
      );
      let highScore = this.add.text(
        this.game.config.width / 4,
        this.game.config.height / 1.8,
        `High Score: ${this.highScore}`,
        { fontSize: "32px", fill: "#fff" }
      );
      let score = this.add.text(
        this.game.config.width / 1.6,
        this.game.config.height / 1.8,
        `Score: ${this.score} `,
        { fontSize: "32px", fill: "#fff" }
      );

      const back_to_main = this.add.image(
        this.game.renderer.width / 1.75,
        this.game.renderer.height * 0.65,
        "back_to_main"
      );
      back_to_main.scale = 0.35;
      const restart = this.add.image(
        this.game.renderer.width / 1.55,
        this.game.renderer.height * 0.65,
        "restart"
      );
      restart.scale = 0.35;

      back_to_main.setInteractive();
      restart.setInteractive();

      restart.on("pointerdown", () => {
        console.log("restart");
        this.gameOver = false;
        this.scene.restart();
      });

      back_to_main.on("pointerdown", () => {
        console.log("back to main");
        this.gameOver = false;
        this.scene.start("titleScene");
      });
    }
  }
}
