const {
  CREATE_COLUMN,
  DELETE_COLUMN,
  SORT_COLUMN
} = require("./event-names");

const createColumn = (io, client) => {
  client.on(CREATE_COLUMN, column => {
    io.sockets.emit(CREATE_COLUMN, column);
  });
};

const deleteColumn = (io, client) => {
  client.on(DELETE_COLUMN, columnId => {
    io.sockets.emit(DELETE_COLUMN, columnId);
  });
};

const sortColumn = (io, client) => {
  client.on(SORT_COLUMN, (id, items) => {
    io.sockets.emit(SORT_COLUMN, id, items);
  });
};

module.exports = {
  createColumn,
  deleteColumn,
  sortColumn
};
