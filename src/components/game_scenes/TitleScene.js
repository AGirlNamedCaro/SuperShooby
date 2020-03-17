import Phaser from "phaser";


class TitleScene extends Phaser.Scene {

  constructor() {
    super('titleScene')
  }

  create() {
    this.scene.launch("mainMenu");
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'sky')
    this.bg.scaleY = 1.15;
    this.ground = this.add.tileSprite(0, 0, 'ground')

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 610, 'ground').setScale(2).refreshBody();

    this.player = this.physics.add.sprite(450, 450, 'dude')
    // player.body.velocity.set(100);

    this.fish = this.physics.add.sprite(450, 0, 'fish')
    this.anims.create({
      key: 'flop',
      frames: this.anims.generateFrameNumbers('fish', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.fish.anims.play('flop', true);

    this.physics.add.collider(this.fish, platforms);
    this.physics.add.overlap(this.player, this.fish, this.collectStars, null, true)

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.player.anims.play('right', true);
    this.physics.add.collider(this.player, platforms);

    this.fish = this.physics.add.group({
      key: 'fish',
      repeat: 2,
      setXY: { x: 450, y: 0, stepX: 70 }
    });

    this.fish.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(this.fish, platforms);

    this.physics.add.overlap(this.player, this.fish, this.collectFish, null, true)

    setTimeout(() => {
      this.player.setVelocityY(-230);
      this.player.setVelocityX(20);
    }, 2000)


  }


  collectFish(player, fish) {
    fish.disableBody(true, true);
    
  }


  update() {
    this.bg.tilePositionX += 5;

    // if(this.star.countActive(true) === 0) {
    //   this.player.setVelocityX(0);    

    //   }

  }



}


export default TitleScene;






