const {
  createPreload,
  createUpdate,
  initPlayer,
  addPlayer,
  removePlayer,
  handlePlayerInput,
  createFish,
  collectFish,
  createBomb
} = require("./scenes/ServerScene");
const { config } = require("./config");
const chance = require("chance").Chance();
const S3 = require("aws-sdk/clients/s3");

// Next time trying to import a class try roomManager = roomManager.RoomManager();
class RoomManager {
  constructor() {
    this.rooms = {};
  }

  createRoom(roomMap, roomId, player, maxUsers, room) {
    const preload = createPreload(
      "assets/images/sprites/dude.png",
      "assets/images/sprites/fish.png",
      "assets/images/prefabs/bomb.png",
      "assets/images/prefabs/shoobyTileset.png",
      // Optimized so that when its on the default map, it will load it from the server
      roomMap === "/assets/mapData/shoobyTileset16.json"
        ? roomMap.substr(1)
        : roomMap
    );

    function create() {
      const worldMap = this.add.tilemap("world");
      const tileset = worldMap.addTilesetImage("tiles");
      worldMap.createStaticLayer("sky", [tileset], 0, 0);
      worldMap.createStaticLayer("clouds", [tileset], 0, 0);
      this.ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
      // ground.setCollisionByProperty({ collides: true }, true)
      // ground.setCollision([1, 265, 266, 299, 298])
      this.ground.setCollisionByExclusion(-1, true);
      this.players = this.physics.add.group();
      this.physics.add.collider(this.players, this.ground);
      
      createFish(this, "fish", 11, 70, this.ground);
      this.bombs = this.physics.add.group();
      this.physics.add.collider(this.bombs, this.ground);
      
      this.physics.add.overlap(this.players, this.fish, createBomb, collectFish, { this: this, roomId: roomId, room: room, fishes: this.fish, collider: this.ground });
      this.gameOver = false;
    }

    const update = createUpdate(this.rooms, roomId, 160, 550);
    const game = new Phaser.Game(config(preload, create, update, { y: 300 }));

    this.rooms[roomId] = {
      roomId: roomId,
      roomMap: roomMap,
      game: game,
      players: {
        [player.playerId]: player
      },
      gameObjects: {
        fish: {},
        bombs: {},
        gameOver: false,
      },
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

  getFish(roomId) {
    this.rooms[roomId].game.scene.keys.default.fish.getChildren().forEach((fish, index) => {
      this.rooms[roomId].gameObjects.fish[`fish${index}`] = {
        x: fish.x,
        y: fish.y,
        active: fish.active
      };
    });
    
    console.log("pls", roomId)
    console.log("otherpls", this.rooms[roomId].gameObjects)
    return this.rooms[roomId].gameObjects
  }

  deleteRoom(roomId) {
    this.rooms[roomId].game.destroy(true);
    delete this.rooms[roomId];
  }
}

window.onload = () => {
  const roomManager = new RoomManager();
  const currentPlayers = {};
  const s3 = new S3({
    accessKeyId: AWSKEY,
    secretAccessKey: AWSSECRETKEY
  });

  io.on("connection", socket => {
    console.log("A menu shooby has connected");

    socket.on("setupRoomId", () => {
      const roomId = chance.word({ syllables: 3 });
      io.to(socket.id).emit("roomId", roomId);
    });

    socket.on("createRoom", roomData => {
      // TODO change this logic, became outdated after setupRoomId was implemented
      // Isn't a big deal after switched to the chance library
      // while (roomManager.rooms[roomData.roomId]) {
      //   console.log("test");
      //   roomData.roomId = chance.word({ syllables: 3 });
      // }

      const player = initPlayer(roomData.roomId, socket.id, { x: 200, y: 450 });
      roomManager.createRoom(roomData.roomMap, roomData.roomId, player, 2, roomManager.rooms);
      io.to(socket.id).emit("createdRoom", roomData.roomId);
      currentPlayers[socket.id] = roomData.roomId;
    });

    socket.on("joinRoom", roomId => {
      socket.join(roomId);
      console.log("An Authoritative Shooby has connected");

      // if (roomManager[roomId]) {
      const player = initPlayer(roomId, socket.id, { x: 200, y: 450 });
      roomManager.joinRoom(roomId, player);
      io.to(socket.id).emit("roomMap", roomManager.rooms[roomId].roomMap);
      // TODO fix broken error handling
      // } else {
      //   io.to(socket.id).emit("errJoinRoom", "Room does not exist");
      // }
    });

    socket.on("ready", roomId => {
      const players = roomManager.getPlayers(roomId);
      // TODO rename getFish function since its also dealing with bombs
      const gameObjects = roomManager.getFish(roomId);
      io.to(socket.id).emit("currentPlayers", {players, gameObjects});

      io.to(roomId).emit("newPlayer", players[socket.id]);
      currentPlayers[socket.id] = roomId;
    });

    socket.on("disconnect", () => {
      if (currentPlayers[socket.id]) {
        const roomId = currentPlayers[socket.id];
        if (roomManager.rooms[roomId].scene) {
          removePlayer(
            roomManager.rooms[roomId].scene,
            socket.id,
            currentPlayers,
            roomManager.rooms[roomId].players
          );
          io.emit("disconnect", socket.id);
          console.log("An Authoritative Shooby has disconnected");
        }

        const roomKeys = Object.keys(roomManager.rooms[roomId].players);
        console.log("socket", socket.id);
        if (roomKeys.length === 0) {
          roomManager.deleteRoom(roomId);
        }
      }
      delete currentPlayers[socket.id];
    });

    socket.on("playerInput", playerState => {
      handlePlayerInput(
        roomManager.rooms[playerState.roomId].scene,
        roomManager.getPlayers(playerState.roomId),
        socket.id,
        playerState
      );
    });

    // This has to do with the customize creating map function
    socket.on("createMap", mapData => {
      mapData.levelData["mapId"] = chance.word({ syllables: 3 });
      console.log("Id", mapData.levelData.mapId);

      const params = {
        Bucket: "super-shooby-assets/thumbnails",
        Key: mapData.levelData.mapId,
        Body: mapData.thumbnail
      };

      s3.upload(params, (err, data) => {
        if (err) throw err;
        console.log(`File uploaded sucess, ${data.Location}`);
        mapData.levelData["thumbnail"] = data.Location;

        const client = new MongoClient(MONGODB, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        client.connect(err => {
          // Can only use this client connection once after closed, Pulling new MongoClient line from server.js into here should change that
          // const client = new MongoClient(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
          // TODO need to send user confirmation with the map id name
          const collection = client.db("game_db").collection("maps");
          collection
            .insertOne(mapData.levelData)
            .then(res => client.close())
            .catch(err => console.log("err", err));
        });
      });
    });

    socket.on("getLevel", levelId => {
      const mapData = {};
      const client = new MongoClient(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      client.connect(err => {
        const collection = client.db("game_db").collection("maps");
        collection.find({ mapId: levelId }).toArray((err, map) => {
          if (err) throw err;
          mapData["levelData"] = map;

          const params = {
            Bucket: "super-shooby-assets/thumbnails",
            Key: levelId
          };

          s3.getObject(params, (err, data) => {
            if (err) throw err;
            // console.log(data.Body.toString())
            mapData["thumbnail"] = data.Body.toString();
            io.to(socket.id).emit("returnedMap", mapData);
          });
          client.close();
        });
      });
    });
  });
};

window.gameLoaded();
