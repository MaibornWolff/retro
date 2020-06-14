const fs = require("fs");
const path = require("path");
const express = require("express");
const puppeteer = require("puppeteer");
const chalk = require("chalk");

const router = express.Router();
const {
  getBoard,
  getPath,
  getImg,
  stringify,
  processBoard,
  respondWithInvalidBoardId,
} = require("../utils");

const width = 1920;
const height = 1080;

function removeAllItemRefs(board) {
  board.items = {};
  for (let columnId in board.columns) {
    board.columns[columnId].itemIds = [];
  }
}

function getBoardWithExportType(boardData, exportType) {
  const board = getBoard(boardData);

  board.boardId = "";
  if (exportType === "default") {
    removeAllItemRefs(board);
  }

  return stringify(board);
}

router.post("/", async (req, res) => {
  const board = req.body;
  const processedBoard = processBoard(board);
  try {
    fs.writeFile(
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

router.post("/template-import", async (req, res) => {
  const board = req.body;
  const boardId = board.boardId;
  try {
    fs.writeFile(getPath(boardId), stringify(board), "utf8", (error) => {
      if (error)
        res.status(400).send({ errorMsg: "Board creation went wrong." });
      res.status(200).send({ boardId: boardId });
    });
  } catch (error) {
    res.status(400).send({ errorMsg: "Board creation went wrong." });
  }
});

router.get("/template-export/:boardId/:exportType", async (req, res) => {
  const boardId = req.params.boardId;
  const exportType = req.params.exportType;
  fs.readFile(getPath(boardId), "utf-8", async (error, boardData) => {
    if (error) {
      respondWithInvalidBoardId(res, error);
    }
    const board = getBoardWithExportType(boardData, exportType);

    res.setHeader("Content-disposition", "attachment; filename=template.json");
    res.setHeader("Content-type", "application/json");
    res.write(board, () => {
      res.end();
    });
  });
});

router.get("/validate/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  fs.readFile(getPath(boardId), "utf-8", (error) => {
    if (error) {
      respondWithInvalidBoardId(res, error);
    }
    res.status(200).send();
  });
});

router.get("/board-export/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  fs.readFile(getPath(boardId), "utf-8", async (error) => {
    if (error) {
      respondWithInvalidBoardId(res, error);
    }

    // TODO: add exportHost for public
    const exportPort = process.env.EXPORT_URL_PORT;
    const browser = await puppeteer.launch({
      defaultViewport: { width, height },
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(`http://localhost:${exportPort}/boards/${boardId}`, {
      waitUntil: "networkidle0",
    });

    await page.screenshot({
      path: `./storage/${boardId}.png`,
      fullPage: true,
    });

    const imgPath = path.resolve(getImg(boardId));
    res.download(imgPath, (error) => {
      if (error) {
        res.status(400).send(error);
        console.log(
          chalk`{red.bold [ERROR:EXPORT_BOARD] ${JSON.stringify(error)}}`
        );
      }
    });
  });
});

router.delete("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  fs.unlink(getPath(boardId), (error) => {
    if (error) throw error;
    res.status(200).send();
  });
});

module.exports = router;
