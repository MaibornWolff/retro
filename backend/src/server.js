require("./config/config");
require("./db/mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");
const {
  createCard,
  deleteCard,
  editCard,
  upvoteCard,
  createColumn,
  deleteColumn,
  sortColumn,
  createBoard,
  updateBoard
} = require("./sockets");
const { CONNECTION } = require("./utils/socketEvents");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

io.on(CONNECTION, client => {
  createCard(io, client);
  deleteCard(io, client);
  editCard(io, client);
  upvoteCard(io, client);
  createColumn(io, client);
  deleteColumn(io, client);
  sortColumn(io, client);
  createBoard(io, client);
  updateBoard(io, client);
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`>>> [INFO] Listening on ${port}`);
});
