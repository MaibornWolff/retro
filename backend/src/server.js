require("./config");

const chalk = require("chalk");
const path = require("path");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const apiRouter = require("./routes/apiRouter");
const { CONNECT, DISCONNECT } = require("./events/event-names");
const { boardEvents, columnEvents, cardEvents } = require("./events");

const publicFolderPath = path.resolve(__dirname, "../public");
const port = process.env.PORT;

app.use(cors());
app.use(json());
app.use(express.static(publicFolderPath));

app.use("/api/boards", apiRouter);

// https://bit.ly/2wMAs0i
if (process.env.NODE_ENV === "PRODUCTION") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(publicFolderPath, "index.html"));
  });
}

io.on(CONNECT, client => {
  const roomId = client.handshake.query.boardId;

  client.join(roomId);

  client.on(DISCONNECT, () => {
    client.leave(roomId);
  });

  boardEvents(io, client, roomId);
  columnEvents(io, client, roomId);
  cardEvents(io, client, roomId);
});

server.listen(port, () => {
  console.log(chalk`{blue.bold [INFO] Listening on ${port}}`);
});

module.exports = { server };
