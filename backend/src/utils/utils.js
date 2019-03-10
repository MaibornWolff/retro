const getPath = id => `${__dirname}/../../storage/${id}.json`;

const getImg = id => `${__dirname}/../../storage/${id}.png`;

const getBoard = file => JSON.parse(file);

const stringify = data => JSON.stringify(data);

const logError = (eventName, error) =>
  console.log(`[ERROR] socket event: ${eventName}\n error message: ${error}`);

module.exports = { getPath, getBoard, getImg, stringify, logError };
