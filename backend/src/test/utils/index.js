const testBoard = {
  boardId: "V1StGXR8_Z5jdHi6B-myT",
  title: "Test Board",
  items: {},
  columns: {},
  columnOrder: [],
  isBlurred: true,
  error: false,
  maxVoteCount: 3
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
