const { Board } = require("./models/board");
const {
  CREATE_CARD,
  CREATE_COLUMN,
  DELETE_COLUMN,
  BOARD_UPDATE,
  UPVOTE_CARD,
  EDIT_CARD,
  SORT_COLUMN,
  DELETE_CARD,
  CREATE_BOARD
} = require("./utils/socketEvents");

// ---------- BOARD EVENTS ---------- //
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
  client.on(BOARD_UPDATE, board => {
    io.sockets.emit(BOARD_UPDATE, board);
  });
};

// ---------- COLUMN EVENTS ---------- //
const createColumn = (io, client) => {
  client.on(CREATE_COLUMN, column => {
    io.sockets.emit(CREATE_COLUMN, column);
  });
};

const deleteColumn = (io, client) => {
  client.on(DELETE_COLUMN, columnId => {
    io.sockets.emit(DELETE_COLUMN, columnId);
  });
};

const sortColumn = (io, client) => {
  client.on(SORT_COLUMN, (id, items) => {
    io.sockets.emit(SORT_COLUMN, id, items);
  });
};

// ---------- CARD EVENTS ---------- //
const createCard = (io, client) => {
  client.on(CREATE_CARD, (card, columnId) => {
    io.sockets.emit(CREATE_CARD, card, columnId);
  });
};

const deleteCard = (io, client) => {
  client.on(DELETE_CARD, cardId => {
    io.sockets.emit(DELETE_CARD, cardId);
  });
};

const editCard = (io, client) => {
  client.on(EDIT_CARD, (author, content, id) => {
    io.sockets.emit(EDIT_CARD, author, content, id);
  });
};

const upvoteCard = (io, client) => {
  client.on(UPVOTE_CARD, cardId => {
    io.sockets.emit(UPVOTE_CARD, cardId);
  });
};

module.exports = {
  createCard,
  deleteCard,
  editCard,
  upvoteCard,
  createColumn,
  deleteColumn,
  sortColumn,
  createBoard,
  updateBoard
}
