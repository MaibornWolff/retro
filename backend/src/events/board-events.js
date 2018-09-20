const { Board } = require("../models/board");
const { CREATE_BOARD, UPDATE_BOARD } = require("../utils/event-names");

const createBoard = (io, client) => {
  client.on(CREATE_BOARD, async (boardObj) => {
    try {
      const board = new Board(boardObj);
      await board.save();
      io.sockets.emit(CREATE_BOARD, boardObj);
    } catch (error) {
      console.log(`[ERROR]: Event: ${CREATE_BOARD}\nMessage: ${error}`);
    }
  });
};

const updateBoard = (io, client) => {
  client.on(UPDATE_BOARD, board => {
    io.sockets.emit(UPDATE_BOARD, board);
  });
};

module.exports = {
  createBoard,
  updateBoard
};
