import Phaser from "phaser";


class TitleScene extends  Phaser.Scene{
  
  constructor() {
    super('titleScene')
  }
  
  create() {
    this.scene.launch("mainMenu");
    this.bg = this.add.tileSprite(400,300,800,600,'sky')
    this.ground = this.add.tileSprite(0,0,'ground')


    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

this.player =  this.physics.add.sprite(450, 450, 'dude')
// player.body.velocity.set(100);

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

let star = this.physics.add.group({
  key: 'star',
  repeat: 2,
  setXY: { x: 450, y: 0, stepX: 70 }
});

star.children.iterate(function (child) {
  child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
});

this.physics.add.collider(star, platforms);

this.physics.add.overlap(this.player,star, this.collectStars, null, true)

setTimeout(() => {
  this.player.setVelocityY(-230);
  this.player.setVelocityX(20);
}, 2000)


}


collectStars(player,star) {
  star.disableBody(true, true);
  return true
}




update() {
this.bg.tilePositionX += 5;

  

}

  
    
}


export default TitleScene;






 