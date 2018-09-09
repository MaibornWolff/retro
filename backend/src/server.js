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
  CREATE_CARD,
  CREATE_COLUMN,
  DELETE_COLUMN,
  BOARD_UPDATE
} = require("./utils/socketEvents");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

io.on(CONNECTION, client => {
  client.on(CREATE_CARD, (card, columnId) => {
    io.sockets.emit(CREATE_CARD, card, columnId);
  });

  client.on(CREATE_COLUMN, column => {
    io.sockets.emit(CREATE_COLUMN, column);
  });

  client.on(DELETE_COLUMN, columnId => {
    io.sockets.emit(DELETE_COLUMN, columnId);
  });

  client.on(BOARD_UPDATE, board => {
    io.sockets.emit(BOARD_UPDATE, board);
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`>>> [INFO] Listening on ${port}`);
});
