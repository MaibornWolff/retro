const { CREATE_BOARD, UPDATE_BOARD } = require("./event-names");

const createBoard = (io, client) => {
  client.on(CREATE_BOARD, newBoard => {
    io.sockets.emit(CREATE_BOARD, newBoard);
  });
};

const updateBoard = (io, client) => {
  client.on(UPDATE_BOARD, updatedBoard => {
    io.sockets.emit(UPDATE_BOARD, updatedBoard);
  });
};

module.exports = {
  createBoard,
  updateBoard
};
