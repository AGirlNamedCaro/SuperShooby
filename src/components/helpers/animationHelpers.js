import Phaser from "phaser";

export function createAnimationStand(key, object) {
  this.anims.create({
    key: key + 1,
    frames: [{ key: key, frame: 4 }],
    frameRate: 20
  });
  
  object.anims.play(key + 1, true);
  object.setBounce(0.2);
  object.setCollideWorldBounds(true);
  object.setScale(3);
}