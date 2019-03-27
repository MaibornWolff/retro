require("./config");

const fs = require("fs");
const path = require("path");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const puppeteer = require("puppeteer");

const { boardEvents, columnEvents, cardEvents } = require("./events");
const { CONNECTION } = require("./events/event-names");
const { getImg, getPath } = require("./utils");

const publicFolderPath = path.resolve(__dirname, "../public");
const port = process.env.PORT;
const width = 1920;
const height = 1080;

app.use(cors());
app.use(json());
app.use(express.static(publicFolderPath));

app.get("/api/boards/export/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  await fs.readFile(getPath(boardId), "utf-8", async error => {
    if (error) {
      res.status(400).send({
        msg: "Board-ID does not exist!",
        error
      });
    }

    const exportHost = process.env.EXPORT_URL_HOST;
    const exportPort = process.env.EXPORT_URL_PORT;
    const boardUrl = `http://${exportHost}:${exportPort}/boards/${boardId}`;
    const browser = await puppeteer.launch({
      defaultViewport: { width, height }
    });
    const page = await browser.newPage();

    await page.goto(boardUrl);
    await page.screenshot({
      path: `./storage/${boardId}.png`,
      fullPage: true
    });

    const imgPath = path.resolve(getImg(boardId));
    res.download(imgPath);
  });
});

// https://facebook.github.io/create-react-app/docs/deployment#serving-apps-with-client-side-routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(publicFolderPath, "index.html"));
});

io.on(CONNECTION, client => {
  boardEvents(io, client);
  columnEvents(io, client);
  cardEvents(io, client);
});

server.listen(port, () => {
  console.log(`[INFO] Listening on ${port}`);
});

module.exports = { server };
