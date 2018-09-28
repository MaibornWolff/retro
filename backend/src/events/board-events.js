const fs = require("fs");

const { getPath } = require("../utils/utils");
const { CREATE_BOARD, UPDATE_BOARD, JOIN_BOARD } = require("./event-names");

const createBoard = (io, client) => {
  client.on(CREATE_BOARD, async (newBoard, boardId) => {
    const json = JSON.stringify(newBoard);
    await fs.writeFile(getPath(boardId), json, "utf8", error => {
      if (error) throw error;
    });

    io.sockets.emit(CREATE_BOARD, newBoard);
  });
};

const updateBoard = (io, client) => {
  client.on(UPDATE_BOARD, updatedBoard => {
    io.sockets.emit(UPDATE_BOARD, updatedBoard);
  });
};

const joinBoard = (io, client) => {
  client.on(JOIN_BOARD, async boardId => {
    await fs.readFile(getPath(boardId), "utf8", (error, file) => {
      if (error) throw error;
      const board = JSON.parse(file);
      client.emit(JOIN_BOARD, board);
    });
  });
};

module.exports = {
  createBoard,
  updateBoard,
  joinBoard
};
