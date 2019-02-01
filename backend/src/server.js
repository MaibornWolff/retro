require("./config/config");

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
const { getPdf } = require("./utils/utils");

const port = process.env.PORT;

app.use(cors());
app.use(json());
app.use(express.static(__dirname + "/public"));

app.get("/api/boards/export/:boardId", async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const boardUrl = `http://localhost:3000/boards/${boardId}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(boardUrl);
    await page.pdf({
      path: `./storage/${boardId}.pdf`,
      format: "A4",
      landscape: true
    });

    const pdfPath = path.resolve(getPdf(boardId));
    res.download(pdfPath);
  } catch (error) {
    res.status(400).send(error);
  }
});

io.on(CONNECTION, client => {
  boardEvents(io, client);
  columnEvents(io, client);
  cardEvents(io, client);
});

exports.server = server.listen(port, () => {
  console.log(`[INFO] Listening on port: ${port}`);
});
