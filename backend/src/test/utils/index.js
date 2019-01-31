const testBoard = {
  boardId: "board-test1234",
  title: "Test Board",
  items: {},
  columns: {},
  columnOrder: [],
  isBlurred: true
};

const getPath = id => `${__dirname}/../../../storage/${id}`;

const getBoardURL = (boardId, port) =>
  `http://localhost:${port}/boards/${boardId}`;

module.exports = {
  testBoard,
  getPath,
  getBoardURL
};
