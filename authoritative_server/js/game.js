const {
  createPreload,
  createUpdate,
  initPlayer,
  addPlayer,
  removePlayer,
  handlePlayerInput
} = require("./scenes/ServerScene");
const { config } = require("./config");
const chance = require("chance").Chance();

// Next time trying to import a class try roomManager = roomManager.RoomManager();
class RoomManager {
  constructor() {
    this.rooms = {};
  }

  createRoom(roomId, player, maxUsers) {
    const preload = createPreload(
      "assets/images/sprites/dude.png",
      "assets/images/prefabs/marioTileset.png",
      "assets/mapData/marioTileset16.json"
    );

    function create() {
      const worldMap = this.add.tilemap("world");
      const tileset = worldMap.addTilesetImage("tiles");
      const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
      const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
      const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
      // ground.setCollisionByProperty({ collides: true }, true)
      // ground.setCollision([1, 265, 266, 299, 298])
      ground.setCollisionByExclusion(-1, true);
      this.players = this.physics.add.group();
      this.physics.add.collider(this.players, ground);
    }

    const update = createUpdate(this.rooms, roomId, 160, 150);
    const game = new Phaser.Game(config(preload, create, update, { y: 300 }));

    this.rooms[roomId] = {
      roomId: roomId,
      game: game,
      players: {
        [player.playerId]: player
      }
    };

    console.log("players", this.rooms[roomId].players);
  }

  joinRoom(roomId, player) {
    const room = this.rooms[roomId];
    room.scene = room.game.scene.keys.default;

    addPlayer(room.scene, player);

    room.players[player.playerId] = player;
  }

  getPlayers(roomId) {
    return this.rooms[roomId].players;
  }

  deleteRoom(roomId) {
    this.rooms[roomId].game.destroy(true);
    delete this.rooms[roomId];
  }
}

window.onload = () => {
  const roomManager = new RoomManager();
  const currentPlayers = {};

  io.on("connection", socket => {
    console.log("A menu shooby has connected");

    socket.on("createRoom", () => {
      let roomId = chance.word({ syllables: 3 });

      while (roomManager.rooms[roomId]) {
        console.log("test");
        roomId = chance.word({ syllables: 3 });
      }

      const player = initPlayer(roomId, socket.id, { x: 200, y: 450 });
      roomManager.createRoom(roomId, player, 2);
      io.to(socket.id).emit("createdRoom", roomId);
      currentPlayers[socket.id] = roomId;
    });

    socket.on("joinRoom", roomId => {
      console.log("An Authoritative Shooby has connected");

      // if (roomManager[roomId]) {
        const player = initPlayer(roomId, socket.id, { x: 200, y: 450 });
        roomManager.joinRoom(roomId, player);
        // TODO fix broken error handling
      // } else {
      //   io.to(socket.id).emit("errJoinRoom", "Room does not exist");
      // }
    });

    socket.on("ready", roomId => {
      const players = roomManager.getPlayers(roomId);
      io.to(socket.id).emit("currentPlayers", players);

      // TODO change this to socket groups
      for (socketId of Object.keys(players)) {
        io.to(socketId).emit("newPlayer", players[socket.id]);
      }
      currentPlayers[socket.id] = roomId;
    });

    socket.on("disconnect", () => {
      if (currentPlayers[socket.id]) {
        const roomId = currentPlayers[socket.id];
        if (roomManager.rooms[roomId].scene) {
          removePlayer(
            roomManager.rooms[roomId].scene,
            socket.id,
            currentPlayers
          );
          io.emit("disconnect", socket.id);
          console.log("An Authoritative Shooby has disconnected");
        }
        delete currentPlayers[socket.id];
        roomManager.deleteRoom(roomId);
      }
    });

    socket.on("playerInput", playerState => {
      handlePlayerInput(
        roomManager.rooms[playerState.roomId].scene,
        roomManager.getPlayers(playerState.roomId),
        socket.id,
        playerState
      );
    });

    socket.on("createMap", mapData => {
      mapData["mapId"] = chance.word({ syllables: 3 });

      client.connect(err => {
        // Can only use this client connection once after closed, Pulling new MongoClient line from server.js into here should change that
        // const client = new MongoClient(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        // TODO need to send user confirmation with the map id name
        const collection = client.db("game_db").collection("maps");
        collection
          .insertOne(mapData)
          .then(res => client.close())
          .catch(err => console.log("err", err));
      });
    });
  });
};

window.gameLoaded();
