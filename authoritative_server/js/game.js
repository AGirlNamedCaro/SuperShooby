const { preload, create, update } = require("./scenes/ServerScene");
const { config } = require("./config");

const gameConfig = config(preload, create, update, { y: 300 });

const game = new Phaser.Game(gameConfig);

window.gameLoaded();
