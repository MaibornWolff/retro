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

// ---------- BOARD EVENTS ---------- //
const createBoard = (io, client) => {
  client.on(CREATE_BOARD, newBoard => {
    io.sockets.emit(CREATE_BOARD, newBoard);
  });
};

const updateBoard = (io, client) => {
  client.on(BOARD_UPDATE, board => {
    io.sockets.emit(BOARD_UPDATE, board);
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
