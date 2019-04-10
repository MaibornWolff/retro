const path = require("path");

/**
 * helper function to return the path of the board file
 * @param {string} id - the board ID
 */
const getPath = id => path.resolve(__dirname, `../../storage/${id}.json`);

/**
 * helper function to return the path of the exported board file
 * @param {string} id - the board ID
 */
const getImg = id => path.resolve(__dirname, `../../storage/${id}.png`);

/**
 * helper function to parse the board data
 * @param {string} file - the board data
 */
const getBoard = file => JSON.parse(file);

/**
 * helper function to stringify the board file
 * @param {Object} data - the board
 */
const stringify = data => JSON.stringify(data);

/**
 * helper function to respond with 400 for bad request
 * @param {Object} res - the Express Response object
 * @param {Object} error - the Express Error object
 */
const respondWithInvalidBoardId = (res, error) =>
  res.status(400).send({
    msg: "Board-ID does not exist!",
    error
  });

/**
 * helper function to console.log failed events
 * @param {string} eventName - the name of the failed event
 * @param {Object} error - the error object
 */
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
