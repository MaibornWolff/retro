import fs from "fs";
import path from "path";
import express from "express";
import puppeteer from "puppeteer";
import chalk from "chalk";

import {
  getRetroBoard,
  getPath,
  getImg,
  stringify,
  processBoard,
  respondWithInvalidBoardId,
} from "../utils";
import { RetroBoard } from "src/models/RetroBoard";

const width = 1920;
const height = 1080;
const UTF8 = "utf8";

const router = express.Router();

router.post("/", (req, res) => {
  const board = req.body;
  const processedBoard = processBoard(board);
  try {
    fs.writeFile(
      getPath(processedBoard.boardId),
      stringify(processedBoard),
      UTF8,
      (error) => {
        if (error)
          res.status(400).send({ errorMsg: "Board creation went wrong" });
        res.status(200).send();
      }
    );
  } catch (error) {
    res.status(400).send({ errorMsg: "Board creation went wrong" });
  }
});

router.post("/template-import", (req, res) => {
  const board = req.body;
  const boardId = board.boardId;
  try {
    fs.writeFile(getPath(boardId), stringify(board), UTF8, (error) => {
      if (error)
        res.status(400).send({ errorMsg: "Board creation went wrong" });
      res.status(200).send({ boardId: boardId });
    });
  } catch (error) {
    res.status(400).send({ errorMsg: "Board creation went wrong" });
  }
});

router.get("/template-export/:boardId/:exportType", (req, res) => {
  const boardId = req.params.boardId;
  const exportType = req.params.exportType;
  fs.readFile(getPath(boardId), UTF8, (error, boardData) => {
    if (error) respondWithInvalidBoardId(res, error);

    const board = getBoardWithExportType(boardData, exportType);
    res.setHeader("Content-disposition", "attachment; filename=template.json");
    res.setHeader("Content-type", "application/json");
    res.write(board, () => res.end());
  });
});

router.get("/validate/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  fs.readFile(getPath(boardId), UTF8, (error) => {
    if (error) respondWithInvalidBoardId(res, error);
    res.status(200).send();
  });
});

router.get("/board-export/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  fs.readFile(getPath(boardId), UTF8, async (error) => {
    if (error) respondWithInvalidBoardId(res, error);

    const exportHost: string = process.env.EXPORT_URL_HOST || "localhost";
    const exportPort: number = +(process.env.EXPORT_URL_PORT || 3000);
    const browser = await puppeteer.launch({
      defaultViewport: { width, height },
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(`http://${exportHost}:${exportPort}/boards/${boardId}`, {
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

function removeAllItemRefs(board: RetroBoard): void {
  board.items = {};
  for (const columnId in board.columns) {
    board.columns[columnId].itemIds = [];
  }
}

function getBoardWithExportType(
  boardData: string,
  exportType: string
): string | undefined {
  const board = getRetroBoard(boardData);
  if (board !== null) {
    board.boardId = "";
    if (exportType === "default") {
      removeAllItemRefs(board);
    }
    return stringify(board);
  }
  return undefined;
}

export default router;
