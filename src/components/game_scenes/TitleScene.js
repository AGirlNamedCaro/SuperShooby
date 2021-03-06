import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
  constructor() {
    super("titleScene");
  }

  init(data) {
    //   this.character = data.character
    this.container = data.container;
  }

  create() {
    this.scene.launch("mainMenu");
    this.bg = this.add.tileSprite(400, 300, 800, 600, "sky");
    this.fore = this.add.tileSprite(400, 300, 800, 600, "foreground");
    this.bg.scale = 1;
    this.ground = this.add.tileSprite(0, 0, "ground");

    let platforms = this.physics.add.staticGroup();
    platforms
      .create(400, 610, "ground")
      .setScale(2)
      .refreshBody();

    this.player = this.physics.add.sprite(450, 450, this.game.character);

    this.fish = this.physics.add.sprite(450, 0, "fish");
    // player.body.velocity.set(100);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platforms);

    this.anims.create({
      key: "flop",
      frames: this.anims.generateFrameNumbers("fish", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.fish.anims.play("flop", true);

    this.physics.add.collider(this.fish, platforms);
    this.physics.add.overlap(
      this.player,
      this.fish,
      this.collectFish,
      null,
      true
    );

    this.fish = this.physics.add.group({
      key: "fish",
      repeat: 3,
      setXY: { x: 450, y: 0, stepX: 70 }
    });

    this.fish.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.anims.play("flop", true);
    });

    this.physics.add.collider(this.fish, platforms);

    this.createAnimation(this.game.character);

    this.physics.add.overlap(
      this.player,
      this.fish,
      this.collectFish,
      null,
      true
    );


    // TODO rewrite this
    setTimeout(() => {
      this.player.setVelocityY(-230);
      this.player.setVelocityX(20);
    }, 2000);
  }

  createAnimation(key) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers(key, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.player.anims.play(key, true);
  }

  update() {
    this.bg.tilePositionX += 2;
    this.fore.tilePositionX += 4;
  }
  collectFish(player, fish) {
    fish.disableBody(true, true);
  }
}

export default TitleScene;
