import * as fs from "fs";
import { RetroBoard } from "../models/RetroBoard";
import { getPath, getRetroBoard, stringify } from "../utils";
import { BOARD_ERROR } from "../events/event-names";

const UTF8 = "utf8";

export function getBoard(boardId: string): Promise<RetroBoard> {
  return new Promise<RetroBoard>((resolve, reject) => {
    const boardPath = getPath(boardId);
    fs.readFile(boardPath, UTF8, (error, file: string) => {
      if (error) {
        reject(
          new Error(`Failed to get board: ${boardId}, reason: ${error.message}`)
        );
      }
      const board = getRetroBoard(file);
      if (board === null) {
        reject(new Error(BOARD_ERROR));
      } else {
        resolve(board);
      }
    });
  });
}

export function saveBoard(board: RetroBoard): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const boardPath = getPath(board.boardId);
    fs.writeFile(boardPath, stringify(board), UTF8, error => {
      if (error) {
        reject(
          new Error(
            `Failed to save board: ${board.boardId}, reason: ${error.message}`
          )
        );
      } else {
        resolve();
      }
    });
  });
}
