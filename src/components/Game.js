import React from "react";
import Phaser from "phaser";
import Preload from "./game_scenes/Preload";
import TitleScene from "./game_scenes/TitleScene";
import MainMenu from "./game_scenes/menu_scenes/MainMenu";
import PlayMenu from "./game_scenes/menu_scenes/PlayMenu";
import MultiplayerMenu from "./game_scenes/menu_scenes/MultiplayerMenu";
import CustomizeMenu from "./game_scenes/menu_scenes/CustomizeMenu";
import SettingsMenu from "./game_scenes/menu_scenes/settingsMenu";
import CreateCharacterMenu from "./game_scenes/menu_scenes/createCharacter";
import RoomSelectMenu from "./game_scenes/menu_scenes/RoomSelectMenu";


import SinglePlayer from "./game_scenes/SinglePlayerScene";
import AuthoritativeScene from "./game_scenes/AuthoritativeScene";
import CreateMap from "./game_scenes/CreateMap";

export const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 640,
  parent: "game-parent",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT
  },
  dom: {
    createContainer: true,
  },
  scene: [Preload, TitleScene, MainMenu, PlayMenu, MultiplayerMenu, CustomizeMenu, CreateCharacterMenu, AuthoritativeScene, SettingsMenu, CreateMap, SinglePlayer, RoomSelectMenu]
  
};

function resize() {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}

const game = new Phaser.Game(config);

window.onload = function() {
  resize();
  window.addEventListener("resize", resize, false);
};

export default function Game({ setGameMode }) {
  // pass the statechange method down to the game
  game.setState = setGameMode;

  return (
    <div id="game-container">
      <div id="game-parent"></div>
    </div>
  );
}
