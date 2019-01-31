const fs = require("fs");
const puppeteer = require("puppeteer");

const { getPath, getBoard, stringify, logError } = require("../utils/utils");
const {
  CREATE_BOARD,
  UPDATE_BOARD,
  JOIN_BOARD,
  EXPORT_BOARD,
  UNBLUR_CARDS
} = require("./event-names");

const createBoard = (io, client) => {
  client.on(CREATE_BOARD, async (board, boardId) => {
    await fs.writeFile(getPath(boardId), stringify(board), "utf8", error => {
      if (error) logError(error);

      io.sockets.emit(CREATE_BOARD, board);
    });
  });
};

const updateBoard = (io, client) => {
  client.on(UPDATE_BOARD, async (board, boardId) => {
    await fs.writeFile(getPath(boardId), stringify(board), "utf8", error => {
      if (error) logError(UPDATE_BOARD, error);
      io.sockets.emit(UPDATE_BOARD, board);
    });
  });
};

const joinBoard = (_, client) => {
  client.on(JOIN_BOARD, async boardId => {
    await fs.readFile(getPath(boardId), "utf8", (error, file) => {
      if (error) logError(error);
      client.emit(JOIN_BOARD, getBoard(file));
    });
  });
};

const exportBoard = (_, client) => {
  client.on(EXPORT_BOARD, async (url, boardId) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(url);
      const pdf = await page.pdf({
        path: `./storage/${boardId}.pdf`,
        format: "A4",
        landscape: true
      });
      await browser.close();
      await client.emit(EXPORT_BOARD, JSON.stringify(pdf));
    } catch (error) {
      console.log(error);
    }
  });
};

const unblurCards = (io, client) => {
  client.on(UNBLUR_CARDS, async boardId => {
    const path = getPath(boardId);
    await fs.readFile(path, "utf8", async (error, file) => {
      if (error) logError(UNBLUR_CARDS, error);

      const board = getBoard(file);
      board.isBlurred = !board.isBlurred;
      for (let cardId in board.items) {
        board.items[cardId].isBlurred = board.isBlurred;
      }

      await fs.writeFile(path, stringify(board), "utf8", error => {
        if (error) logError(UNBLUR_CARDS, error);
        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

module.exports = {
  createBoard,
  updateBoard,
  joinBoard,
  exportBoard,
  unblurCards
};
