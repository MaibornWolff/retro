const {
  CREATE_CARD,
  EDIT_CARD,
  DELETE_CARD,
  UPVOTE_CARD
} = require("./event-names");

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
  editCard,
  deleteCard,
  upvoteCard
};
