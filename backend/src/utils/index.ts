/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { nanoid } from "nanoid";
import chalk from "chalk";
import path from "path";
import forIn from "lodash/forIn";
import { Response } from "express";

import { retroFormats } from "./retro-format-data";
import { RetroBoard } from "../models/RetroBoard";
import { RetroColumn } from "../models/RetroColumn";
import { PokerState } from "../models/PokerState";

export function getPath(id: string): string {
  if (process.env.NODE_ENV === "PRODUCTION") {
    return path.resolve(__dirname, `../../../storage/${id}.json`);
  } else {
    return path.resolve(__dirname, `../../storage/${id}.json`);
  }
}

export function getImg(id: string): string {
  if (process.env.NODE_ENV === "PRODUCTION") {
    return path.resolve(__dirname, `../../../storage/${id}.png`);
  } else {
    return path.resolve(__dirname, `../../storage/${id}.png`);
  }
}

export function getRetroBoard(jsonContent: string): RetroBoard | null {
  try {
    return JSON.parse(jsonContent);
  } catch (_error) {
    console.log(
      chalk`{red.bold [ERROR] Could not parse JSON file:\n${jsonContent}}`
    );
    return null;
  }
}

export function getPokerState(jsonContent: string): PokerState | null {
  try {
    return JSON.parse(jsonContent);
  } catch (_error) {
    console.log(
      chalk`{red.bold [ERROR] Could not parse JSON file:\n${jsonContent}}`
    );
    return null;
  }
}

export function stringify(data: any): string {
  return JSON.stringify(data);
}

export function respondWithInvalidBoardId(
  res: Response<any>,
  error: any
): void {
  res.status(400).send({ msg: "Board-ID does not exist!", error });
}

export function logError(eventName: string, error: any): void {
  const tag = "[ERROR]";
  const eventLog = `Event: ${eventName}`;
  const errorLog = `Error: ${error.message}`;
  console.log(chalk`{red.bold ${tag} ${eventLog}\n${tag} ${errorLog}}`);
}

export function processBoard(board: RetroBoard): RetroBoard {
  board.title = board.title.trim();
  const format = board.format;
  const columns = createFormat(format, board);

  if (columns.length > 0) {
    columns.forEach((col) => {
      board.columns[col.id] = col;
      board.columnOrder.push(col.id);
    });
  }

  return board;
}

function createColumns(columnTitles: string[], isBlurred: boolean) {
  const result: RetroColumn[] = [];
  columnTitles.forEach((columnTitle) =>
    result.push({
      id: nanoid(),
      columnTitle,
      itemIds: [],
      isBlurred: isBlurred,
    })
  );
  return result;
}

function createFormat(format: string, board: RetroBoard) {
  let result: RetroColumn[] = [];
  forIn(retroFormats, (value, key) => {
    if (format === key)
      result = createColumns(value.columnTitles, board.isBlurred);
  });
  return result;
}
