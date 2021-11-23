import fs from "fs";
import { forIn, pull, unset } from "lodash";
import { Server, Socket } from "socket.io";
import { RetroComment } from "src/models/RetroComment";
import { getPath, getRetroBoard, logError, stringify } from "../utils";
import {
  BOARD_ERROR,
  COMMENT_CARD,
  DELETE_COMMENT,
  EDIT_COMMENT,
  UPDATE_BOARD,
} from "./event-names";

const UTF8 = "utf8";

export function commentCard(io: Server, client: Socket, roomId: string): void {
  client.on(
    COMMENT_CARD,
    (boardId: string, cardId: string, comment: RetroComment) => {
      const path = getPath(boardId);
      fs.readFile(path, UTF8, (error, file: string) => {
        if (error) logError(COMMENT_CARD, error);
        const board = getRetroBoard(file);

        if (board === null) {
          client.emit(BOARD_ERROR);
        } else {
          const { id, author, content } = comment;

          comment.author = author.trim();
          comment.content = content.trim();
          console.log(board.items[cardId]);
          board.items[cardId].commentIds.push(id);
          board.comments[id] = comment;

          fs.writeFile(path, stringify(board), UTF8, error => {
            if (error) logError(COMMENT_CARD, error);
            io.to(roomId).emit(UPDATE_BOARD, board);
          });
        }
      });
    }
  );
}

export function deleteComment(io: Server, client: Socket, roomId: string): void {
  client.on(DELETE_COMMENT, (boardId: string, commentId: string) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(DELETE_COMMENT, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        unset(board.comments, commentId);
        forIn(board.items, item => pull(item.commentIds, commentId));

        fs.writeFile(path, stringify(board), UTF8, error => {
          if (error) logError(DELETE_COMMENT, error);
          io.to(roomId).emit(UPDATE_BOARD, board);
        });
      }
    });
  });
}

export function editComment(io: Server, client: Socket, roomId: string): void {
  client.on(EDIT_COMMENT, (boardId: string, comment: RetroComment) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(EDIT_COMMENT, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        const { id, author, content } = comment;

        comment.author = author.trim();
        comment.content = content.trim();
        board.comments[id] = comment;

        fs.writeFile(path, stringify(board), UTF8, error => {
          if (error) logError(EDIT_COMMENT, error);
          io.to(roomId).emit(UPDATE_BOARD, board);
        });
      }
    });
  });
}
