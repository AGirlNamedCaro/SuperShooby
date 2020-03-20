import Phaser from "phaser";
import socketIo from "socket.io-client";

export default class AuthoritativeScene extends Phaser.Scene {
  constructor() {
    super("authScene");
    this.playerState = this.calcPlayerState();
    this.oldPlayerState = this.playerState;
  }

  preload() {
    this.load.image("tiles", "/assets/images/prefabs/marioTileset.png");
    this.load.tilemapTiledJSON("world", "/assets/mapData/marioTileset16.json");
  }

  create() {
    const self = this;
    this.socket = socketIo(
      process.env.REACT_APP_HOST + ":" + process.env.REACT_APP_PORT
    );
    const worldMap = this.add.tilemap("world");
    const tileset = worldMap.addTilesetImage("tiles");
    const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
    const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
    const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
    // ground.setCollisionByProperty({ collides: true }, true)
    // ground.setCollision([1, 265, 266, 299, 298])
    ground.setCollisionByExclusion(-1, true);

    this.players = this.add.group();

    this.socket.on("currentPlayers", players => {
      Object.keys(players).forEach(id => {
        if (players[id].playerId === self.socket.id) {
          this.player = this.displayPlayers(self, players[id], "dude");
        } else {
          this.displayPlayers(self, players[id], "dude");
        }
      });
    });

    this.socket.on("newPlayer", playerInfo => {
      this.displayPlayers(self, playerInfo, "dude");
    });

    this.socket.on("disconnect", playerId => {
      self.players.getChildren().forEach(player => {
        if (playerId === player.playerId) {
          player.destroy();
        }
      });
    });

    this.socket.on("playerUpdates", players => {
      Object.keys(players).forEach(id => {
        self.players.getChildren().forEach(player => {
          if (id === player.playerId) {
            if (player.x > players[id].x) {
              player.anims.play("left", true);
            } else if (player.x < players[id].x) {
              player.anims.play("right", true);
            } else {
              player.anims.play("turn");
            }
            player.setPosition(players[id].x, players[id].y);
          }
        });
      });
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update() {
    if (this.player) {
      if (this.cursors.left.isDown) {
        this.playerState.left = true;
      } else if (this.cursors.right.isDown) {
        this.playerState.right = true;
      } else {
        this.playerState.left = false;
        this.playerState.right = false;
      }

      if (this.cursors.up.isDown) {
        this.playerState.up = true;
      } else {
        this.playerState.up = false;
      }

      if (
        this.playerState.left !== this.oldPlayerState.left ||
        this.playerState.right !== this.oldPlayerState.right ||
        this.playerState.up !== this.oldPlayerState.up
      ) {

        this.socket.emit("playerInput", this.playerState);
      }
      this.oldPlayerState = { ...this.playerState };
    }
  }

  displayPlayers(self, playerInfo, sprite) {
    const player = self.add.sprite(playerInfo.x, playerInfo.y, sprite);
    player.playerId = playerInfo.playerId;
    self.players.add(player);
    return player;
  }

  calcPlayerState(player, playerState, isState, state) {
    let resultsObj = {};
    if (!playerState) {
      resultsObj = {
        up: false,
        left: false,
        down: false,
        right: false,
        x: 100,
        y: 450
      };
      return resultsObj;
    }

    resultsObj = playerState;

    if (isState) {
      resultsObj[state] = true;
    } else {
      resultsObj[state] = false;
    }
    resultsObj.x = player.x;
    resultsObj.y = player.y;
    return resultsObj;
  }
}
