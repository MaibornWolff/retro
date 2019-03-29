const fs = require("fs");
const unset = require("lodash/unset");
const forIn = require("lodash/forIn");
const pull = require("lodash/pull");
const { getPath, getBoard, stringify, logError } = require("../utils");
const {
  CREATE_CARD,
  EDIT_CARD,
  DELETE_CARD,
  UPVOTE_CARD,
  UPDATE_BOARD
} = require("./event-names");

const UTF8 = "utf8";

const createCard = (io, client, roomId) => {
  client.on(CREATE_CARD, async (card, columnId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(CREATE_CARD, error);

      const board = getBoard(file);
      card.isBlurred = board.isBlurred;
      board.items[card.id] = card;
      board.columns[columnId].itemIds.push(card.id);

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(CREATE_CARD, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const deleteCard = (io, client, roomId) => {
  client.on(DELETE_CARD, async (cardId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(DELETE_CARD, error);

      const board = getBoard(file);
      unset(board.items, cardId);
      forIn(board.columns, col => pull(col.itemIds, cardId));

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(DELETE_CARD, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const editCard = (io, client, roomId) => {
  client.on(EDIT_CARD, async (author, content, cardId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(EDIT_CARD, error);

      const board = getBoard(file);
      const card = board.items[cardId];
      card.author = author;
      card.content = content;

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(EDIT_CARD, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const upvoteCard = (io, client, roomId) => {
  client.on(UPVOTE_CARD, async (cardId, boardId, value) => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(UPVOTE_CARD, error);

      const board = getBoard(file);
      board.items[cardId].points += value;

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(UPVOTE_CARD, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

module.exports = {
  createCard,
  editCard,
  deleteCard,
  upvoteCard
};
