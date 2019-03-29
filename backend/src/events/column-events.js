const fs = require("fs");
const unset = require("lodash/unset");
const pull = require("lodash/pull");
const orderBy = require("lodash/orderBy");
const { getPath, getBoard, stringify, logError } = require("../utils");
const {
  CREATE_COLUMN,
  DELETE_COLUMN,
  SORT_COLUMN,
  UPDATE_BOARD,
  EDIT_COLUMN
} = require("./event-names");

const UTF8 = "utf8";

const createColumn = (io, client) => {
  client.on(CREATE_COLUMN, async (column, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(CREATE_COLUMN, error);

      const board = getBoard(file);
      board.columns[column.id] = column;
      board.columnOrder.push(column.id);

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(CREATE_COLUMN, error);
        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const deleteColumn = (io, client) => {
  client.on(DELETE_COLUMN, async (columnId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(DELETE_COLUMN, error);

      const board = getBoard(file);
      const itemsToRemove = board.columns[columnId].itemIds;
      itemsToRemove.forEach(itemId => unset(board.items, itemId));
      pull(board.columnOrder, columnId);
      unset(board.columns, columnId);

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(DELETE_COLUMN, error);
        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const sortColumn = (io, client) => {
  client.on(SORT_COLUMN, async (columnId, columnItems, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(SORT_COLUMN, error);

      const board = getBoard(file);
      const sortedItemIds = [];
      const sortedItems = orderBy(columnItems, "points", "desc");
      sortedItems.forEach(item => sortedItemIds.push(item.id));
      board.columns[columnId].itemIds = sortedItemIds;

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(SORT_COLUMN, error);
        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const editColumn = (io, client) => {
  client.on(EDIT_COLUMN, async (columnId, boardId, newTitle) => {
    const path = getPath(boardId);
    await fs.readFile(path, UTF8, async (error, file) => {
      if (error) logError(EDIT_COLUMN, error);

      const board = getBoard(file);
      const column = board.columns[columnId];
      column.columnTitle = newTitle;

      await fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(EDIT_COLUMN, error);
        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

module.exports = {
  createColumn,
  deleteColumn,
  sortColumn,
  editColumn
};
