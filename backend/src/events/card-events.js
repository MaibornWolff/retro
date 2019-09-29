const fs = require("fs");
const unset = require("lodash/unset");
const forIn = require("lodash/forIn");
const pull = require("lodash/pull");
const { getPath, getBoard, stringify, logError } = require("../utils");
const {
  CREATE_CARD,
  EDIT_CARD,
  DELETE_CARD,
  VOTE_CARD,
  FOCUS_CARD,
  REMOVE_FOCUS_CARD,
  UPDATE_BOARD
} = require("./event-names");

const UTF8 = "utf8";

// TODO: client.broadcast.to(roomId).emit(UPDATE_BOARD, board) to deal with blurry
const createCard = (io, client, roomId) => {
  client.on(CREATE_CARD, (card, columnId, boardId) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(CREATE_CARD, error);
      const board = getBoard(file);
      const { author, content } = card;

      card.isBlurred = board.isBlurred;
      card.author = author.trim();
      card.content = content.trim();

      board.items[card.id] = card;
      board.columns[columnId].itemIds.push(card.id);

      fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(CREATE_CARD, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const deleteCard = (io, client, roomId) => {
  client.on(DELETE_CARD, (cardId, boardId) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(DELETE_CARD, error);
      const board = getBoard(file);

      unset(board.items, cardId);
      forIn(board.columns, col => pull(col.itemIds, cardId));

      fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(DELETE_CARD, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const editCard = (io, client, roomId) => {
  client.on(EDIT_CARD, (author, content, cardId, boardId) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(EDIT_CARD, error);
      const board = getBoard(file);

      const card = board.items[cardId];
      card.author = author.trim();
      card.content = content.trim();

      fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(EDIT_CARD, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const voteCard = (io, client, roomId) => {
  client.on(VOTE_CARD, (cardId, boardId, isUpvote) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(VOTE_CARD, error);
      const board = getBoard(file);

      if (isUpvote) board.items[cardId].points += 1;
      else board.items[cardId].points -= 1;

      fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(VOTE_CARD, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const focusCard = (io, client, roomId) => {
  client.on(FOCUS_CARD, cardId => {
    io.to(roomId).emit(FOCUS_CARD, cardId);
  });
};

const removeFocusCard = (io, client, roomId) => {
  client.on(REMOVE_FOCUS_CARD, () => {
    io.to(roomId).emit(REMOVE_FOCUS_CARD);
  });
};

module.exports = {
  createCard,
  editCard,
  deleteCard,
  voteCard,
  focusCard,
  removeFocusCard
};
