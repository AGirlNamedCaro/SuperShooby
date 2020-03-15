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
  socket.on("disconnect", function() {
    console.log("Super Shooby has disconnected");
  });
});

// This address should default to your ipv4 address on the host machine
server.listen(8080, "0.0.0.0", () => {
  console.log(`Listening on ${server.address().port}`);
});
