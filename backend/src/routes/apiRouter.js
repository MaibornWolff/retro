const fs = require("fs");
const path = require("path");
const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();
const {
  getPath,
  getImg,
  stringify,
  processBoard,
  respondWithInvalidBoardId,
} = require("../utils");

const width = 1920;
const height = 1080;

router.post("/", async (req, res) => {
  const board = req.body;
  const processedBoard = processBoard(board);
  try {
    await fs.writeFile(
      getPath(processedBoard.boardId),
      stringify(processedBoard),
      "utf8",
      (error) => {
        if (error)
          res.status(400).send({ errorMsg: "Board creation went wrong." });
        res.status(200).send();
      }
    );
  } catch (error) {
    res.status(400).send({ errorMsg: "Board creation went wrong." });
  }
});

router.get("/validate/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  await fs.readFile(getPath(boardId), "utf-8", (error) => {
    if (error) {
      respondWithInvalidBoardId(res, error);
    }
    res.status(200).send();
  });
});

router.get("/export/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  await fs.readFile(getPath(boardId), "utf-8", async (error) => {
    if (error) {
      respondWithInvalidBoardId(res, error);
    }

    const exportHost = process.env.EXPORT_URL_HOST;
    const exportPort = process.env.EXPORT_URL_PORT;
    const boardUrl = `http://${exportHost}:${exportPort}/boards/${boardId}`;
    const browser = await puppeteer.launch({
      defaultViewport: { width, height },
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(boardUrl);
    await page.screenshot({
      path: `./storage/${boardId}.png`,
      fullPage: true,
    });

    const imgPath = path.resolve(getImg(boardId));
    res.download(imgPath);
  });
});

router.delete("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  await fs.unlink(getPath(boardId), (error) => {
    if (error) throw error;
    res.status(200).send();
  });
});

module.exports = router;
