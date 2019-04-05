const path = require("path");

const getPath = id => path.resolve(__dirname, `../../storage/${id}.json`);

const getImg = id => path.resolve(__dirname, `../../storage/${id}.png`);

const getBoard = file => JSON.parse(file);

const stringify = data => JSON.stringify(data);

const respondWithInvalidBoardId = (res, error) =>
  res.status(400).send({
    msg: "Board-ID does not exist!",
    error
  });

const logError = (eventName, error) =>
  console.log(`[ERROR] socket event: ${eventName}\nerror message: ${error}`);

module.exports = {
  getPath,
  getBoard,
  getImg,
  stringify,
  logError,
  respondWithInvalidBoardId
};
