require("./config/config");

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT;

const { boardEvents, columnEvents, cardEvents } = require("./events");
const { CONNECTION } = require("./events/event-names");

app.use(express.static(__dirname + "/public"));

io.on(CONNECTION, client => {
  boardEvents(io, client);
  columnEvents(io, client);
  cardEvents(io, client);
});

server.listen(port, () => {
  console.log(`[INFO] Listening on port: ${port}`);
});

module.exports = { server };
