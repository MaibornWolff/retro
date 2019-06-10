require("./config");

const util = require("util");
const path = require("path");
const fs = require("fs");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const apiRouter = require("./routes/apiRouter");
const { CONNECT, DISCONNECT } = require("./events/event-names");
const { boardEvents, columnEvents, cardEvents } = require("./events");
const { getPath, stringify } = require("./utils");

const publicFolderPath = path.resolve(__dirname, "../public");
const port = process.env.PORT;

app.use(cors());
app.use(json());
app.use(express.static(publicFolderPath));

app.use("/api/boards", apiRouter);

app.post("/", async (req, res) => {
  const board = req.body;
  try {
    await fs.writeFile(
      getPath(board.boardId),
      stringify(board),
      "utf8",
      error => {
        if (error)
          res.status(400).send({ errorMsg: "Board creation went wrong." });
        res.status(200).send();
      }
    );
  } catch (error) {
    res.status(400).send({ errorMsg: "Board creation went wrong." });
  }
});

// https://bit.ly/2wMAs0i
app.get("/*", (req, res) => {
  res.sendFile(path.join(publicFolderPath, "index.html"));
});

io.on(CONNECT, client => {
  console.log("-------------------------");
  console.log(">> Connected: ", client.id);

  const roomId = client.handshake.query.boardId;
  client.join(roomId);
  client.on(DISCONNECT, () => {
    console.log(">> Disconnected: ", client.id);
    client.leave(roomId);
  });

  console.log(">> Users: ", Object.keys(io.sockets.sockets));
  console.log(">> Rooms: ", Object.keys(io.sockets.adapter.rooms));

  boardEvents(io, client, roomId);
  columnEvents(io, client, roomId);
  cardEvents(io, client, roomId);
});

server.listen(port, () => {
  console.log(`[INFO] Listening on ${port}`);
});

module.exports = { server };
