const {
  createBoard,
  updateBoard,
  joinBoard,
  unblurCards
} = require("./board-events");
const {
  createColumn,
  deleteColumn,
  sortColumn,
  editColumn
} = require("./column-events");
const {
  createCard,
  editCard,
  deleteCard,
  upvoteCard
} = require("./card-events");

/**
 * This function holds all events regarding the board.
 * @param {Object} io - the socket.io global
 * @param {Object} client - the socket
 * @param {string} roomId - the roomId which is the boardId
 */
const boardEvents = (io, client, roomId) => {
  createBoard(io, client, roomId);
  updateBoard(io, client, roomId);
  joinBoard(io, client);
  unblurCards(io, client, roomId);
};

/**
 * This function holds all events regarding columns.
 * @param {Object} io - the socket.io global
 * @param {Object} client - the socket
 * @param {string} roomId - the roomId which is the boardId
 */
const columnEvents = (io, client, roomId) => {
  createColumn(io, client, roomId);
  deleteColumn(io, client, roomId);
  sortColumn(io, client, roomId);
  editColumn(io, client, roomId);
};

/**
 * This function holds all events regarding cards.
 * @param {Object} io - the socket.io global
 * @param {Object} client - the socket
 * @param {string} roomId - the roomId which is the boardId
 */
const cardEvents = (io, client, roomId) => {
  createCard(io, client, roomId);
  editCard(io, client, roomId);
  deleteCard(io, client, roomId);
  upvoteCard(io, client, roomId);
};

module.exports = {
  boardEvents,
  columnEvents,
  cardEvents
};
