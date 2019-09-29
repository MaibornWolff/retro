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

const createColumn = (io, client, roomId) => {
  client.on(CREATE_COLUMN, (column, boardId) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(CREATE_COLUMN, error);
      const board = getBoard(file);
      const { columnTitle } = column;

      column.columnTitle = columnTitle.trim();
      board.columns[column.id] = column;
      board.columnOrder.push(column.id);

      fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(CREATE_COLUMN, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const deleteColumn = (io, client, roomId) => {
  client.on(DELETE_COLUMN, (columnId, boardId) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(DELETE_COLUMN, error);
      const board = getBoard(file);

      const itemsToRemove = board.columns[columnId].itemIds;
      itemsToRemove.forEach(itemId => unset(board.items, itemId));

      pull(board.columnOrder, columnId);
      unset(board.columns, columnId);

      fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(DELETE_COLUMN, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const sortColumn = (io, client, roomId) => {
  client.on(SORT_COLUMN, (columnId, columnItems, boardId) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(SORT_COLUMN, error);
      const board = getBoard(file);

      const sortedItemIds = [];
      const sortedItems = orderBy(columnItems, "points", "desc");

      sortedItems.forEach(item => sortedItemIds.push(item.id));
      board.columns[columnId].itemIds = sortedItemIds;

      fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(SORT_COLUMN, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const editColumn = (io, client, roomId) => {
  client.on(EDIT_COLUMN, (columnId, boardId, newTitle) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(EDIT_COLUMN, error);
      const board = getBoard(file);

      const column = board.columns[columnId];
      column.columnTitle = newTitle.trim();

      fs.writeFile(path, stringify(board), UTF8, error => {
        if (error) logError(EDIT_COLUMN, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
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
