require("./config/config");
require("./db/mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");

const { boardEvents, columnEvents, cardEvents } = require("./events");
const { CONNECTION } = require("./events/event-names");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

io.on(CONNECTION, client => {
  boardEvents(io, client);
  columnEvents(io, client);
  cardEvents(io, client);
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`>>> [INFO] Listening on ${port}`);
});
