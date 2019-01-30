const testBoard = {
  boardId: "board-test1234",
  title: "Test Board",
  items: {},
  columns: {},
  columnOrder: [],
  isBlurred: true
};

const getPath = id => `${__dirname}/../../../storage/${id}`;

module.exports = {
  testBoard,
  getPath
};
