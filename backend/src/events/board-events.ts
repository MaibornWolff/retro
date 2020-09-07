import fs from "fs";
import { Server, Socket } from "socket.io";

import { getPath, getRetroBoard, stringify, logError } from "../utils";
import {
  UPDATE_BOARD,
  JOIN_BOARD,
  UNBLUR_CARDS,
  JOIN_ERROR,
  SET_MAX_VOTES,
  RESET_VOTES,
  SHOW_CONTINUE_DISCUSSION,
  CONTINUE_DISCUSSION_YES,
  CONTINUE_DISCUSSION_NO,
  CONTINUE_DISCUSSION_ABSTAIN,
  BOARD_ERROR,
} from "./event-names";
import { RetroBoard } from "../models/RetroBoard";
import { RetroColumn } from "../models/RetroColumn";

const UTF8 = "utf8";

export function joinBoard(io: Server, client: Socket): void {
  client.on(JOIN_BOARD, (boardId: string) => {
    fs.readFile(getPath(boardId), UTF8, (error, file) => {
      if (error) client.emit(JOIN_ERROR);
      const board = getRetroBoard(file);

      if (board === null) client.emit(BOARD_ERROR);
      client.emit(JOIN_BOARD, board);
    });
  });
}

export function updateBoard(io: Server, client: Socket, roomId: string): void {
  client.on(UPDATE_BOARD, (board: RetroBoard, boardId: string) => {
    fs.writeFile(getPath(boardId), stringify(board), UTF8, (error) => {
      if (error) logError(UPDATE_BOARD, error);
      io.to(roomId).emit(UPDATE_BOARD, board);
    });
  });
}

export function unblurCards(io: Server, client: Socket, roomId: string): void {
  client.on(UNBLUR_CARDS, (boardId: string) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(UNBLUR_CARDS, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        overwriteIsBlurred(board);

        board.isBlurred = !board.isBlurred;
        for (const cardId in board.items) {
          board.items[cardId].isBlurred = board.isBlurred;
        }
        for (const columnId in board.columns) {
          board.columns[columnId].isBlurred = board.isBlurred;
        }

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(UNBLUR_CARDS, error);
          io.to(roomId).emit(UPDATE_BOARD, board);
        });
      }
    });
  });
}

export function setMaxVotes(io: Server, client: Socket, roomId: string): void {
  client.on(SET_MAX_VOTES, (voteCount: number, boardId: string) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(SET_MAX_VOTES, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.maxVoteCount = voteCount;
        for (const cardId in board.items) {
          board.items[cardId].points = 0;
        }

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(SET_MAX_VOTES, error);
          io.to(roomId).emit(SET_MAX_VOTES, board);
        });
      }
    });
  });
}

export function resetVotes(io: Server, client: Socket, roomId: string): void {
  client.on(RESET_VOTES, (boardId: string) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(RESET_VOTES, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        for (const cardId in board.items) {
          board.items[cardId].points = 0;
        }

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(RESET_VOTES, error);
          io.to(roomId).emit(RESET_VOTES, board);
        });
      }
    });
  });
}

export function toggleContinueDiscussion(
  io: Server,
  client: Socket,
  roomId: string
): void {
  client.on(SHOW_CONTINUE_DISCUSSION, (boardId: string) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(SHOW_CONTINUE_DISCUSSION, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.showContinueDiscussion = !board.showContinueDiscussion;
        board.continueDiscussionVotes.yes = 0;
        board.continueDiscussionVotes.no = 0;
        board.continueDiscussionVotes.abstain = 0;

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(SHOW_CONTINUE_DISCUSSION, error);
          io.to(roomId).emit(
            SHOW_CONTINUE_DISCUSSION,
            board.showContinueDiscussion
          );
        });
      }
    });
  });
}

export function voteYes(io: Server, client: Socket, roomId: string): void {
  client.on(CONTINUE_DISCUSSION_YES, (boardId: string) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(CONTINUE_DISCUSSION_YES, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.continueDiscussionVotes.yes += 1;

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(CONTINUE_DISCUSSION_YES, error);
          io.to(roomId).emit(CONTINUE_DISCUSSION_YES);
        });
      }
    });
  });
}

export function voteNo(io: Server, client: Socket, roomId: string): void {
  client.on(CONTINUE_DISCUSSION_NO, (boardId: string) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(CONTINUE_DISCUSSION_NO, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.continueDiscussionVotes.no += 1;

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(CONTINUE_DISCUSSION_NO, error);
          io.to(roomId).emit(CONTINUE_DISCUSSION_NO);
        });
      }
    });
  });
}

export function voteAbstain(io: Server, client: Socket, roomId: string): void {
  client.on(CONTINUE_DISCUSSION_ABSTAIN, (boardId: string) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(CONTINUE_DISCUSSION_ABSTAIN, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.continueDiscussionVotes.abstain += 1;

        fs.writeFile(path, stringify(board), UTF8, (error) => {
          if (error) logError(CONTINUE_DISCUSSION_ABSTAIN, error);
          io.to(roomId).emit(CONTINUE_DISCUSSION_ABSTAIN);
        });
      }
    });
  });
}

function areEquallyBlurred(columns: RetroColumn[]): boolean {
  return new Set(columns.map((c) => c.isBlurred)).size === 1;
}

function getNonEmpty(columns: RetroColumn[]): RetroColumn[] {
  return columns.filter((c) => c.itemIds.length > 0);
}

function overwriteIsBlurred(board: RetroBoard): void {
  const columns = Object.values(board.columns);
  const nonEmptyColumns = getNonEmpty(columns);
  if (areEquallyBlurred(nonEmptyColumns)) {
    board.isBlurred = nonEmptyColumns[0].isBlurred;
  }
}
