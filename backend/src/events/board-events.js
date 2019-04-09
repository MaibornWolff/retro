const fs = require("fs");

const { getPath, getBoard, stringify, logError } = require("../utils");
const {
  CREATE_BOARD,
  UPDATE_BOARD,
  JOIN_BOARD,
  UNBLUR_CARDS
} = require("./event-names");

const UTF8 = "utf8";

/**
 * This event is responsible for creating a new board.
 * @param {Object} io - the socket.io global
 * @param {Object} client - the socket
 * @param {string} roomId - the roomId which is the boardId
 */
const createBoard = (io, client, roomId) => {
  client.on(CREATE_BOARD, async (board, boardId) => {
    await fs.writeFile(getPath(boardId), stringify(board), UTF8, error => {
      if (error) logError(CREATE_BOARD, error);
      io.to(roomId).emit(CREATE_BOARD, board);
    });
  });
};

/**
 * This event is responsible for updating the board when manipulations happen.
 * @param {Object} io - the socket.io global
 * @param {Object} client - the socket
 * @param {string} roomId - the roomId which is the boardId
 */
const updateBoard = (io, client, roomId) => {
  client.on(UPDATE_BOARD, async (board, boardId) => {
    await fs.writeFile(getPath(boardId), stringify(board), UTF8, error => {
      if (error) logError(UPDATE_BOARD, error);
      io.to(roomId).emit(UPDATE_BOARD, board);
    });
  });
};

/**
 * This event is responsible for joining to an existing board.
 * @param {Object} io - the socket.io global
 * @param {Object} client - the socket
 */
const joinBoard = (io, client) => {
  client.on(JOIN_BOARD, async boardId => {
    await fs.readFile(getPath(boardId), UTF8, (error, file) => {
      if (error) logError(JOIN_BOARD, error);
      client.emit(JOIN_BOARD, getBoard(file));
    });
  });
};

/**
 * This event is responsible for toggling the blur of cards.
 * @param {Object} io - the socket.io global
 * @param {Object} client - the socket
 * @param {string} roomId - the roomId which is the boardId
 */
const unblurCards = (io, client, roomId) => {
  client.on(UNBLUR_CARDS, async boardId => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(UNBLUR_CARDS, error);

      const board = getBoard(file);
      board.isBlurred = !board.isBlurred;

      for (let cardId in board.items)
        board.items[cardId].isBlurred = board.isBlurred;

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(UNBLUR_CARDS, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

module.exports = {
  createBoard,
  updateBoard,
  joinBoard,
  unblurCards
};
