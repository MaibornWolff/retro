const nanoid = require("nanoid");
const chalk = require("chalk");
const path = require("path");
const assignIn = require("lodash/assignIn");
const {
  RETRO_FORMAT_1,
  RETRO_FORMAT_2,
  RETRO_FORMAT_3,
  RETRO_FORMAT_4,
  RETRO_FORMAT_5,
  RETRO_FORMAT_6,
  RETRO_FORMAT_7,
  RETRO_FORMAT_8
} = require("./retro-formats");

const getPath = id => path.resolve(__dirname, `../../storage/${id}.json`);

const getImg = id => path.resolve(__dirname, `../../storage/${id}.png`);

const getBoard = file => JSON.parse(file);

const stringify = data => JSON.stringify(data);

const respondWithInvalidBoardId = (res, error) =>
  res.status(400).send({
    msg: "Board-ID does not exist!",
    error
  });

const logError = (eventName, error) => {
  const tag = "[ERROR]";
  const eventLog = `Event: ${eventName}`;
  const errorLog = `Error: ${error.message}`;
  console.log(chalk`{red.bold ${tag} ${eventLog}\n${tag} ${errorLog}}`);
};

const processBoard = board => {
  // TODO: trim title and create format, if specified
  board.title = board.title.trim();

  const format = board.format;
  const columns = createFormat(format);

  if (columns.length > 0) {
    columns.forEach(col => {
      board.columns[col.id] = col;
      board.columnOrder.push(col.id);
    });
  }

  return board;
};

const createFormat = format => {
  if (format === RETRO_FORMAT_1) {
    const columnTitles = ["Went Well", "To Improve", "Action Items"];
    return createColumns(columnTitles);
  } else if (format === RETRO_FORMAT_2) {
    return [];
  } else {
    return [];
  }
};

const createColumns = columnTitles => {
  const result = [];

  columnTitles.forEach(columnTitle => {
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
  processBoard
};
