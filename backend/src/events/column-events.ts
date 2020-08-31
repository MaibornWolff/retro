import fs from "fs";
import { Server, Socket } from "socket.io";
import unset from "lodash/unset";
import pull from "lodash/pull";
import orderBy from "lodash/orderBy";

import { RetroColumn } from "../models/RetroColumn";
import { RetroItem } from "../models/RetroItem";
import { getPath, getRetroBoard, stringify, logError } from "../utils";
import {
  CREATE_COLUMN,
  DELETE_COLUMN,
  SORT_COLUMN,
  UPDATE_BOARD,
  EDIT_COLUMN,
  BOARD_ERROR,
} from "./event-names";

const UTF8 = "utf8";

export function createColumn(io: Server, client: Socket, roomId: string): void {
  client.on(CREATE_COLUMN, (column: RetroColumn, boardId: string) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(CREATE_COLUMN, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        const { columnTitle } = column;

        column.columnTitle = columnTitle.trim();
        board.columns[column.id] = column;
        board.columnOrder.push(column.id);

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(CREATE_COLUMN, error);
          io.to(roomId).emit(UPDATE_BOARD, board);
        });
      }
    });
  });
}

export function deleteColumn(io: Server, client: Socket, roomId: string): void {
  client.on(DELETE_COLUMN, (columnId: string, boardId: string) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(DELETE_COLUMN, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        const itemsToRemove = board.columns[columnId].itemIds;

        itemsToRemove.forEach((itemId) => unset(board.items, itemId));
        pull(board.columnOrder, columnId);
        unset(board.columns, columnId);

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(DELETE_COLUMN, error);
          io.to(roomId).emit(UPDATE_BOARD, board);
        });
      }
    });
  });
}

export function sortColumn(io: Server, client: Socket, roomId: string): void {
  client.on(
    SORT_COLUMN,
    (columnId: string, columnItems: RetroItem[], boardId: string) => {
      const path = getPath(boardId);
      fs.readFile(path, UTF8, (error, file: string) => {
        if (error) logError(SORT_COLUMN, error);
        const board = getRetroBoard(file);

        if (board === null) {
          client.emit(BOARD_ERROR);
        } else {
          const sortedItemIds: string[] = [];

          const sortedItems = orderBy(columnItems, "points", "desc");
          sortedItems.forEach((item) => sortedItemIds.push(item.id));
          board.columns[columnId].itemIds = sortedItemIds;

          fs.writeFile(path, stringify(board), UTF8, (error) => {
            if (error) logError(SORT_COLUMN, error);
            io.to(roomId).emit(UPDATE_BOARD, board);
          });
        }
      });
    }
  );
}

export function editColumn(io: Server, client: Socket, roomId: string): void {
  client.on(
    EDIT_COLUMN,
    (columnId: string, boardId: string, newTitle: string) => {
      const path = getPath(boardId);
      fs.readFile(path, UTF8, (error, file: string) => {
        if (error) logError(EDIT_COLUMN, error);
        const board = getRetroBoard(file);

        if (board === null) {
          client.emit(BOARD_ERROR);
        } else {
          const column = board.columns[columnId];
          column.columnTitle = newTitle.trim();

          fs.writeFile(path, stringify(board), UTF8, (error) => {
            if (error) logError(EDIT_COLUMN, error);
            io.to(roomId).emit(UPDATE_BOARD, board);
          });
        }
      });
    }
  );
}
