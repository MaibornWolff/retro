require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {
  CONNECTION,
  DISCONNECT,
  CREATE_CARD,
  CREATE_COLUMN
} = require("./utils/events");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

io.on(CONNECTION, client => {
  console.log("Client connected");

  client.on(CREATE_CARD, (card, columnId) => {
    io.sockets.emit(CREATE_CARD, card, columnId);
  });

  client.on(CREATE_COLUMN, column => {
    console.log(column);
  });

  client.on(DISCONNECT, () => console.log("Client disconnected"));
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`>>> [INFO] Listening on ${port}`);
});
