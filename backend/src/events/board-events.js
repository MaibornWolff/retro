const fs = require("fs");

const { getPath, getBoard, stringify, logError } = require("../utils");
const {
  CREATE_BOARD,
  UPDATE_BOARD,
  JOIN_BOARD,
  UNBLUR_CARDS,
  JOIN_ERROR,
  SET_MAX_VOTES,
  RESET_VOTES
} = require("./event-names");

const UTF8 = "utf8";

const createBoard = (io, client, roomId) => {
  client.on(CREATE_BOARD, async (board, boardId) => {
    await fs.writeFile(getPath(boardId), stringify(board), UTF8, error => {
      if (error) logError(CREATE_BOARD, error);
      io.to(roomId).emit(CREATE_BOARD, board);
    });
  });
};

const updateBoard = (io, client, roomId) => {
  client.on(UPDATE_BOARD, async (board, boardId) => {
    await fs.writeFile(getPath(boardId), stringify(board), UTF8, error => {
      if (error) logError(UPDATE_BOARD, error);
      io.to(roomId).emit(UPDATE_BOARD, board);
    });
  });
};

const joinBoard = (io, client) => {
  client.on(JOIN_BOARD, async boardId => {
    await fs.readFile(getPath(boardId), UTF8, (error, file) => {
      if (error) {
        client.emit(JOIN_ERROR);
      } else {
        client.emit(JOIN_BOARD, getBoard(file));
      }
    });
  });
};

const unblurCards = (io, client, roomId) => {
  client.on(UNBLUR_CARDS, async boardId => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(UNBLUR_CARDS, error);

      const board = getBoard(file);
      board.isBlurred = !board.isBlurred;

      for (let cardId in board.items) {
        board.items[cardId].isBlurred = board.isBlurred;
      }

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(UNBLUR_CARDS, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const setMaxVotes = (io, client, roomId) => {
  client.on(SET_MAX_VOTES, async (voteCount, boardId) => {
    const path = getPath(boardId);

    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(SET_MAX_VOTES, error);

      const board = getBoard(file);

      board.maxVoteCount = voteCount;
      for (let cardId in board.items) {
        board.items[cardId].points = 0;
      }

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(SET_MAX_VOTES, error);
        io.to(roomId).emit(SET_MAX_VOTES, board);
      });
    });
  });
};

const resetVotes = (io, client, roomId) => {
  client.on(RESET_VOTES, async boardId => {
    const path = getPath(boardId);

    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(RESET_VOTES, error);

      const board = getBoard(file);

      for (let cardId in board.items) {
        board.items[cardId].points = 0;
      }

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(RESET_VOTES, error);
        io.to(roomId).emit(RESET_VOTES, board);
      });
    });
  });
};

module.exports = {
  createBoard,
  updateBoard,
  joinBoard,
  unblurCards,
  setMaxVotes,
  resetVotes
};
