const {
  updateBoard,
  joinBoard,
  unblurCards,
  setMaxVotes,
  resetVotes,
  toggleContinueDiscussion,
  voteYes,
  voteNo,
  voteAbstain
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
  voteCard,
  focusCard,
  removeFocusCard
} = require("./card-events");

const boardEvents = (io, client, roomId) => {
  joinBoard(io, client);
  updateBoard(io, client, roomId);
  unblurCards(io, client, roomId);
  setMaxVotes(io, client, roomId);
  resetVotes(io, client, roomId);
  toggleContinueDiscussion(io, client, roomId);
  voteYes(io, client, roomId);
  voteNo(io, client, roomId);
  voteAbstain(io, client, roomId);
};

const columnEvents = (io, client, roomId) => {
  createColumn(io, client, roomId);
  deleteColumn(io, client, roomId);
  sortColumn(io, client, roomId);
  editColumn(io, client, roomId);
};

const cardEvents = (io, client, roomId) => {
  createCard(io, client, roomId);
  editCard(io, client, roomId);
  deleteCard(io, client, roomId);
  voteCard(io, client, roomId);
  focusCard(io, client, roomId);
  removeFocusCard(io, client, roomId);
};

module.exports = {
  boardEvents,
  columnEvents,
  cardEvents
};
