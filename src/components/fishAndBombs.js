import Phaser from 'phaser'

export const createFish = (fish) => {

    fish = this.physics.add.group({
    key: 'fish',
    repeat: this.fishNum,
    setXY: {x: 12, y: 0, stepX: this.stepX }
  })


  this.fish.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8))
      child.anims.play('flop', true);
    })

   
   this.physics.add.collider(this.fish,ground);
   
   this.physics.add.overlap(this.player,this.fish,this.collectFish,null,this);

}