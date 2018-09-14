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
  BOARD_UPDATE,
  UPVOTE_CARD,
  EDIT_CARD,
  SORT_COLUMN,
  DELETE_CARD,
  CREATE_BOARD
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

  client.on(UPVOTE_CARD, (cardId) => {
    io.sockets.emit(UPVOTE_CARD, cardId);
  });

  client.on(EDIT_CARD, (author, content, id) => {
    io.sockets.emit(EDIT_CARD, author, content, id);
  });

  client.on(SORT_COLUMN, (id, items) => {
    io.sockets.emit(SORT_COLUMN, id, items);
  });

  client.on(DELETE_CARD, cardId => {
    io.sockets.emit(DELETE_CARD, cardId);
  });

  client.on(CREATE_BOARD, newBoard => {
    io.sockets.emit(CREATE_BOARD, newBoard);
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`>>> [INFO] Listening on ${port}`);
});
