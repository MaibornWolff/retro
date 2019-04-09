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
 * @param {string} error - the error message
 */
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
