const {
  createPreload,
  createUpdate,
  addPlayer,
  removePlayer,
  handlePlayerInput
} = require("./scenes/ServerScene");
const { config } = require("./config");

// Next time trying to import a class try roomManager = roomManager.RoomManager();
class RoomManager {
  constructor() {
    this.rooms = {};
  }

  createRoom(roomId, user, maxUsers) {
    const preload = createPreload(
      "assets/images/sprites/dude.png",
      "assets/images/prefabs/marioTileset.png",
      "assets/mapData/marioTileset16.json"
    );

    function create() {
      // console.log("this", this)
      const self = this;
      const worldMap = this.add.tilemap("world");
      const tileset = worldMap.addTilesetImage("tiles");
      const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
      const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
      const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
      // ground.setCollisionByProperty({ collides: true }, true)
      // ground.setCollision([1, 265, 266, 299, 298])
      ground.setCollisionByExclusion(-1, true);
      this.players = this.physics.add.group();
      // this.physics.collideTiles(this.players, ground);
      this.physics.add.collider(this.players, ground);
    }

    const update = createUpdate(this.rooms, roomId, 160, 150);
    // const config = ;

    this.rooms[roomId] = {
      roomId: roomId,
      game: new Phaser.Game(config(preload, create, update, { y: 300 })),
      players: {
        [user.playerId]: user
      },
      playerGroup: {}
    };

    console.log("PlayerGroup", this.rooms[roomId].playerGroup)
    // const game = new Phaser.Game(gameConfig);
  }
}

const roomManager = new RoomManager();
const players = {};

window.onload = () => {
  io.on("connection", socket => {
    console.log("A user has connected");

    socket.on("createRoom", () => {
      const roomId = "test";
      players[socket.id] = {
        playerId: socket.id,
        roomId: roomId,
        // have this be map set
        x: 200,
        y: 450,
        playerState: {
          left: false,
          right: false,
          up: false,
          down: false
        }
      };
      roomManager.createRoom(roomId, players[socket.id], 2);
      // console.log(roomManager.rooms[players[socket.id].roomId].self)
      io.to(socket.id).emit("createdRoom", roomId);
    });

    // Need to write eveything below this
    socket.on("joinRoom", () => {
      const game = roomManager.rooms[players[socket.id].roomId].game;
      roomManager.rooms[players[socket.id].roomId].self =
        game.scene.keys.default;

      addPlayer(
        roomManager.rooms[players[socket.id].roomId].self,
        players[socket.id]
      );

      roomManager.rooms[
        players[socket.id].roomId
      ].playerGroup = game.scene.keys.default.players;
      
      // Not sure If I need this anymore
      // socket.broadcast.emit("newPlayer", players[socket.id]);
    });

    socket.on("ready", () => {
      console.log("players - emit", players)      
      io.to(socket.id).emit("currentPlayers", players);
      socket.broadcast.emit("newPlayer", players[socket.id])
    })
    // // create a new player and add it to our players object
    // players[socket.id] = {
    //   playerId: socket.id,
    //   rotation: 0,
    //   // TODO Need to change these values to be brought in depending on where the floor is
    //   x: Math.floor(Math.random() * 100) + 25,
    //   y: Math.floor(Math.random() * 450),
    //   playerState: {
    //     left: false,
    //     right: false,
    //     up: false,
    //     down: false
    //   }
    // };



    socket.on("disconnect", () => {
      removePlayer(roomManager.rooms[players[socket.id].roomId].self, socket.id);
      delete players[socket.id];
      io.emit("disconnect", socket.id);
      console.log("An Authoritative Shooby has disconnected");
    });

    socket.on("playerInput", playerState => {
      console.log("players", players)
      // console.log("playerInput", playerState)
      handlePlayerInput(roomManager.rooms[players[socket.id].roomId].self, players, socket.id, playerState);
    });
  });
};

window.gameLoaded();
