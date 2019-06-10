const fs = require("fs");
const path = require("path");
const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();
const { getPath, getImg, respondWithInvalidBoardId } = require("../utils");

const width = 1920;
const height = 1080;

router.get("/validate/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  await fs.readFile(getPath(boardId), "utf-8", error => {
    if (error) {
      respondWithInvalidBoardId(res, error);
    }
    res.status(200).send();
  });
});

router.get("/export/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  await fs.readFile(getPath(boardId), "utf-8", async error => {
    if (error) {
      respondWithInvalidBoardId(res, error);
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

module.exports = router;
