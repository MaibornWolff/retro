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

const logError = (eventName, error) => {
  const tag = "[ERROR]";
  const eventLog = `Event: ${eventName}`;
  const errorLog = `Error: ${error.message}`;
  console.log(`${tag} ${eventLog}\n${tag} ${errorLog}`);
};

module.exports = {
  getPath,
  getBoard,
  getImg,
  stringify,
  logError,
  respondWithInvalidBoardId
};
