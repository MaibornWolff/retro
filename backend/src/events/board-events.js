const fs = require("fs");

const { getPath, getBoard, stringify, logError } = require("../utils/utils");
const { CREATE_BOARD, UPDATE_BOARD, JOIN_BOARD } = require("./event-names");

const createBoard = (io, client) => {
  client.on(CREATE_BOARD, async (board, boardId) => {
    await fs.writeFile(getPath(boardId), stringify(board), "utf8", error => {
      if (error) logError(error);
      
      io.sockets.emit(CREATE_BOARD, newBoard);
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

module.exports = {
  createBoard,
  updateBoard,
  joinBoard
};
