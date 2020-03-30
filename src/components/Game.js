import React from "react";
import Phaser from "phaser";
import socketIo from "socket.io-client"
import Preload from "./game_scenes/Preload";
import TitleScene from "./game_scenes/TitleScene";
import MainMenu from "./game_scenes/menu_scenes/MainMenu";
import PlayMenu from "./game_scenes/menu_scenes/PlayMenu";
import MultiplayerMenu from "./game_scenes/menu_scenes/MultiplayerMenu";
import CustomizeMenu from "./game_scenes/menu_scenes/CustomizeMenu";
import SettingsMenu from "./game_scenes/menu_scenes/settingsMenu";
import CreateCharacterMenu from "./game_scenes/menu_scenes/createCharacter";
import RoomSelectMenu from "./game_scenes/menu_scenes/RoomSelectMenu";
import CreateRoomMenu from "./game_scenes/menu_scenes/CreateRoomMenu"
import JoinRoomMenu from "./game_scenes/menu_scenes/JoinRoomMenu"


import SinglePlayer from "./game_scenes/SinglePlayerScene";
import MultiplayerScene from "./game_scenes/MultiplayerScene";
import CreateMap from "./game_scenes/CreateMap";
import SetMapMenu from "./game_scenes/menu_scenes/SetMapMenu";

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
    createContainer: true
  },
  scene: [
    Preload,
    TitleScene,
    MainMenu,
    PlayMenu,
    MultiplayerMenu,
    CustomizeMenu,
    CreateCharacterMenu,
    MultiplayerScene,
    SettingsMenu,
    CreateMap,
    SinglePlayer,
    SetMapMenu,
    RoomSelectMenu, 
    CreateRoomMenu,
    JoinRoomMenu
  ]
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
game.socket = socketIo(
  window.origin + ":" + process.env.PORT
);

window.onload = function() {
  resize();
  window.addEventListener("resize", resize, false);
};

export default function Game({ level, setLevel, character, setCharacter, bomb, setBomb, fishNum, setFishNum, stepX, setStepX, score, setScore }) {
  // pass the setLevel method down to the game
  game.level = level;
  game.setLevel = setLevel;
  game.character = character;
  game.setCharacter = setCharacter;
  game.bomb = bomb;
  game.setBomb = setBomb;
  game.fishNum = fishNum;
  game.setFishNum = setFishNum;
  game.stepX = stepX;
  game.setStepX = setStepX;
  game.score = score;
  game.setScore = setScore;

  return (
    <div id="game-container">
      <div id="game-parent"></div>
    </div>
  );
}
