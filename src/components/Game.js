import React from "react";
import Phaser from "phaser";
import TitleScene from './game_scenes/TitleScene'
import Preload from "./game_scenes/Preload";
// import Main from "./game_scenes/Main";
import MainMenu from "./game_scenes/MainMenu";
import PlayMenu from "./game_scenes/PlayMenu";
import MultiplayerMenu from "./game_scenes/MultiplayerMenu";

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
 
  scene: [Preload,TitleScene, MainMenu, PlayMenu, MultiplayerMenu]
};
const game = new Phaser.Game(config);

export default function Game() {

  return (
    <div id="game-container"></div>
  );
}
