import React from "react";
import Phaser from "phaser";
import TitleScene from './TitleScene'

export const config = {
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
  scene: [TitleScene]
      
  
};
const game = new Phaser.Game(config);











export default function Game() {

  return (
    <div id="game-container"></div>
  );
}
