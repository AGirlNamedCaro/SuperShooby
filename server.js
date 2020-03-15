const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);

const players = {};

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("Super Shooby has connected");
  players[socket.id] = {
    playerId: socket.id,
    rotation: 0,
    x: Math.floor(Math.random() * 100) + 25,
    y: Math.floor(Math.random() * 450),
    playerId: socket.id
  };
  socket.emit("currentPlayers", players);
  socket.broadcast.emit("newPlayer", players[socket.id]);
  console.log(players);

  socket.on("playerMovement", movementData => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;

    socket.broadcast.emit("playerMoved", players[socket.id]);
  });

  socket.on("disconnect", () => {
    console.log("Super Shooby has disconnected");
    delete players[socket.id];
    io.emit("disconnect", socket.id);
  });
});

// This address should default to your ipv4 address on the host machine or 0.0.0.0 to get default address
server.listen(8080, "0.0.0.0", () => {
  console.log(`Listening on ${server.address().port}`);
});
