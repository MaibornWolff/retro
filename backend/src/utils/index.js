const { nanoid } = require("nanoid");
const chalk = require("chalk");
const path = require("path");
const forIn = require("lodash/forIn");

const retroFormats = require("./retro-format-data");

const getPath = (id) => path.resolve(__dirname, `../../storage/${id}.json`);

const getImg = (id) => path.resolve(__dirname, `../../storage/${id}.png`);

const getBoard = (file) => JSON.parse(file);

const stringify = (data) => JSON.stringify(data);

const respondWithInvalidBoardId = (res, error) =>
  res.status(400).send({
    msg: "Board-ID does not exist!",
    error,
  });

const logError = (eventName, error) => {
  const tag = "[ERROR]";
  const eventLog = `Event: ${eventName}`;
  const errorLog = `Error: ${error.message}`;
  console.log(chalk`{red.bold ${tag} ${eventLog}\n${tag} ${errorLog}}`);
};

const processBoard = (board) => {
  board.title = board.title.trim();

  const format = board.format;
  const columns = createFormat(format);

  if (columns.length > 0) {
    columns.forEach((col) => {
      board.columns[col.id] = col;
      board.columnOrder.push(col.id);
    });
  }

  return board;
};

function createFormat(format) {
  let result = [];

  forIn(retroFormats, (value, key) => {
    if (format === key) {
      result = createColumns(value.columnTitles);
    }
  });

  return result;
}

const createColumns = (columnTitles) => {
  const result = [];
  columnTitles.forEach((columnTitle) => {
    result.push({ id: nanoid(), columnTitle, itemIds: [] });
  });

  return result;
};

module.exports = {
  getPath,
  getBoard,
  getImg,
  stringify,
  logError,
  respondWithInvalidBoardId,
  processBoard,
};
