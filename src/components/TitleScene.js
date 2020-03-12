import Phaser from "phaser";


export default class TitleScene extends  Phaser.Scene{
  
  constructor() {
    super({key: 'TitleScene'})
  }


  preload() {
    this.load.image('sky', 'images/bg/fairy-background-craft-pixel.png');
    this.load.image('ground', 'images/bg/platform.png');
    this.load.spritesheet('dude', 
    'images/dude.png',
    { frameWidth: 32, frameHeight: 48 }
);



  }

  

  create() {
    this.bg = this.add.tileSprite(400,300,800,480,'sky')

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

let player = this.physics.add.sprite(450, 450, 'dude')
// player.body.velocity.set(100);

player.setBounce(0.2);
player.setCollideWorldBounds(true);

this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
  frameRate: 10,
  repeat: -1
});
player.anims.play('right', true);
this.physics.add.collider(player, platforms);







}

update() {
this.bg.tilePositionX += 5;
  

}

  
    
}








 