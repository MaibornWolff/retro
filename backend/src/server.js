require("./config/config");

const fs = require("fs");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const puppeteer = require("puppeteer");
const path = require("path");

const { boardEvents, columnEvents, cardEvents } = require("./events");
const { CONNECTION } = require("./events/event-names");
const { getImg, getPath } = require("./utils/utils");

const port = process.env.PORT;

app.use(cors());
app.use(json());
app.use(express.static(__dirname + "/public"));

// FIXME: failed to launch chrome: apparently libs missing libX11-xcb.so.1
// FIXME: unhandledRejection
app.get("/api/boards/export/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  await fs.readFile(getPath(boardId), "utf-8", async error => {
    if (error) {
      res.status(400).send({
        msg: "Board-ID does not exist!",
        error
      });
    }

    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    });
    const page = await browser.newPage();
    const boardUrl = `http://localhost:3000/boards/${boardId}`;

    await page.goto(boardUrl);
    await page.screenshot({
      path: `./storage/${boardId}.png`,
      fullPage: true
    });

    const imgPath = path.resolve(getImg(boardId));
    res.download(imgPath);
  });
});

io.on(CONNECTION, client => {
  boardEvents(io, client);
  columnEvents(io, client);
  cardEvents(io, client);
});

server.listen(port, () => {
  console.log(`[INFO] Listening on port: ${port}`);
});

module.exports = { server };
