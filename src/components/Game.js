import React from "react";
import Phaser from "phaser";
import Preload from "./game_scenes/Preload";
import Main from "./game_scenes/Main";

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: [Preload, Main]
};

const game = new Phaser.Game(config);

function preload ()
{


}

function create ()
{
  this.add.image(400, 300, 'sky');

  const particles = this.add.particles('red');

  const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
  });

  const logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}


export default function Game() {

  return (
    <div id="game-container"></div>
  );
}
