const express = require("express");
const app = express();
const path = require("path");
const jsdom = require("jsdom");
const Datauri = require("datauri");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const datauri = new Datauri();
const { JSDOM } = jsdom;
const server = require("http").Server(app);
const io = require("socket.io").listen(server);

const players = {};

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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
        dom.window.MongoClient = MongoClient;
        dom.window.MONGODB = process.env.MONGODB;
        dom.window.AWSKEY = process.env.AWSKEY;
        dom.window.AWSSECRETKEY = process.env.AWSSECRETKEY;
      };
    })
    .catch(err => console.log(err.message));
}

setupAuthoritativePhaser();
