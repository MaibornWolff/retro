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

const createColumn = (id, columnTitle) => {
  return { id, columnTitle, itemIds: [] };
};

const createItem = (id, author, content) => {
  return {
    id,
    author,
    content,
    points: 0,
    isBlurred: true
  };
};

module.exports = {
  testBoard,
  getPath,
  getBoardURL,
  createColumn,
  createItem
};
