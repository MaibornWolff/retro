const fs = require("fs");
const unset = require("lodash/unset");
const pull = require("lodash/pull");
const { getPath, getBoard, stringify, logError } = require("../utils/utils");
const {
  CREATE_COLUMN,
  DELETE_COLUMN,
  SORT_COLUMN,
  UPDATE_BOARD
} = require("./event-names");

const createColumn = (io, client) => {
  client.on(CREATE_COLUMN, async (column, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, "utf8", async (error, file) => {
      if (error) logError(CREATE_COLUMN, error);

      const board = getBoard(file);
      board.columns[column.id] = column;
      board.columnOrder.push(column.id);

      await fs.writeFile(path, stringify(board), "utf8", error => {
        if (error) logError(CREATE_COLUMN, error);

        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const deleteColumn = (io, client) => {
  client.on(DELETE_COLUMN, async (columnId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, "utf8", async (error, file) => {
      if (error) logError(DELETE_COLUMN, error);

      const board = getBoard(file);
      const itemsToRemove = board.columns[columnId].itemIds;
      itemsToRemove.forEach(itemId => unset(board.items, itemId));
      pull(board.columnOrder, columnId);
      unset(board.columns, columnId);

      await fs.writeFile(path, stringify(board), "utf8", error => {
        if (error) logError(DELETE_COLUMN, error);

        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const sortColumn = (io, client) => {
  client.on(SORT_COLUMN, (id, items) => {
    io.sockets.emit(SORT_COLUMN, id, items);
  });
};

module.exports = {
  createColumn,
  deleteColumn,
  sortColumn
};
