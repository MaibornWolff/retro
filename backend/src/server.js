require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {
  CONNECTION_EVENT,
  DISCONNECT_EVENT,
  CREATE_CARD_EVENT
} = require("./utils/events");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

io.on(CONNECTION_EVENT, client => {
  console.log("Client connected");

  client.on(CREATE_CARD_EVENT, (card, columnId) => {
    io.sockets.emit(CREATE_CARD_EVENT, card, columnId);
  });

  client.on(DISCONNECT_EVENT, () => console.log("Client disconnected"));
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`>>> [INFO] Listening on ${port}`);
});
