const express = require("express");
const app = express();
const path = require("path");
const jsdom = require("jsdom");
const Datauri = require("datauri");

const datauri = new Datauri();
const { JSDOM } = jsdom;
const server = require("http").Server(app);
const io = require("socket.io").listen(server);

const players = {};

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// io.on("connection", socket => {
//   console.log("Super Shooby has connected");
//   players[socket.id] = {
//     playerId: socket.id,
//     rotation: 0,
//     x: Math.floor(Math.random() * 100) + 25,
//     y: Math.floor(Math.random() * 450),
//     playerId: socket.id
//   };
//   socket.emit("currentPlayers", players);
//   socket.broadcast.emit("newPlayer", players[socket.id]);
//   console.log(players);

//   socket.on("playerMovement", playerData => {
//     players[socket.id].x = playerData.x;
//     players[socket.id].y = playerData.y;
//     players[socket.id].playerState = playerData;

//     console.log(players[socket.id].playerState);
//     socket.broadcast.emit("playerMoved", players[socket.id]);
//   });

//   socket.on("disconnect", () => {
//     console.log("Super Shooby has disconnected");
//     delete players[socket.id];
//     io.emit("disconnect", socket.id);
//   });
// });

// This address should default to your ipv4 address on the host machine or 0.0.0.0 to get default address
// server.listen(8080, "0.0.0.0", () => {
//   console.log(`Listening on ${server.address().port}`);
// });

function setupAuthoritativePhaser() {
  JSDOM.fromFile(path.join(__dirname, "authoritative_server/index.html"), {
    // To run the scripts in the html file
    runScripts: "dangerously",
    // Also load supported external resources
    resources: "usable",
    // So requestAnimatinFrame events fire
    pretendToBeVisual: true
  })
    .then(dom => {
      dom.window.URL.createObjectURL = blob => {
        if (blob) {
          return datauri.format(
            blob.type,
            blob[Object.getOwnPropertySymbols(blob)[0]]._buffer
          ).content;
        }
      };
      dom.window.URL.revokeObjectURL = objectURL => {};
      dom.window.gameLoaded = () => {
        server.listen(8080, "0.0.0.0", () => {
          console.log(`Listening on ${server.address().port}`);
        });
        dom.window.io = io;
      };
    })
    .catch(err => console.log(err.message));
}

setupAuthoritativePhaser();
