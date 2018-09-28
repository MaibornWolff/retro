const fs = require("fs");
const unset = require("lodash/unset");
const forIn = require("lodash/forIn");
const pull = require("lodash/pull");
const { getPath, getBoard, stringify, logError } = require("../utils/utils");
const {
  CREATE_CARD,
  EDIT_CARD,
  DELETE_CARD,
  UPVOTE_CARD,
  UPDATE_BOARD
} = require("./event-names");

const createCard = (io, client) => {
  client.on(CREATE_CARD, async (card, columnId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, "utf8", async (error, file) => {
      if (error) logError(CREATE_CARD, error);

      const board = getBoard(file);
      board.items[card.id] = card;
      board.columns[columnId].itemIds.push(card.id);

      await fs.writeFile(path, stringify(board), "utf8", error => {
        if (error) logError(CREATE_CARD, error);

        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const deleteCard = (io, client) => {
  client.on(DELETE_CARD, async (cardId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, "utf8", async (error, file) => {
      if (error) logError(DELETE_CARD, error);

      const board = getBoard(file);
      unset(board.items, cardId);
      forIn(board.columns, col => pull(col.itemIds, cardId));

      await fs.writeFile(path, stringify(board), "utf8", error => {
        if (error) logError(DELETE_CARD, error);

        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const editCard = (io, client) => {
  client.on(EDIT_CARD, async (author, content, cardId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, "utf8", async (error, file) => {
      if (error) logError(EDIT_CARD, error);

      const board = getBoard(file);
      const card = board.items[cardId];
      card.author = author;
      card.content = content;

      await fs.writeFile(path, stringify(board), "utf8", error => {
        if (error) logError(EDIT_CARD, error);

        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const upvoteCard = (io, client) => {
  client.on(UPVOTE_CARD, async (cardId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, "utf8", async (error, file) => {
      if (error) logError(UPVOTE_CARD, error);

      const board = getBoard(file);
      board.items[cardId].points += 1;

      await fs.writeFile(path, stringify(board), "utf8", error => {
        if (error) logError(UPVOTE_CARD, error);

        io.sockets.emit(UPDATE_BOARD, board);
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
