const fs = require("fs");
const expect = require("chai").expect;
const io = require("socket.io-client");

const port = process.env.port;
const server = require("../server");
const { testBoard, getPath, getBoardURL } = require("./utils");
const ioOptions = {
  transports: ["websocket"],
  forceNew: true,
  reconnection: false
};
const { CREATE_COLUMN, UPDATE_BOARD } = require("../events/event-names");

let sender;
let receiver;

describe("Column Events", () => {
  beforeEach(done => {
    sender = io(`http://localhost:${port}`, ioOptions);
    receiver = io(`http://localhost:${port}`, ioOptions);
    done();
  });

  afterEach(done => {
    sender.disconnect();
    receiver.disconnect();
    done();
  });

  it("should create column", done => {
    const boardId = testBoard.boardId;
    const id = "column-1234";
    const newColumn = {
      id,
      columnTitle: "Column 1",
      itemIds: []
    };

    sender.emit(CREATE_COLUMN, newColumn, boardId);
    receiver.on(UPDATE_BOARD, board => {
      expect(board.columns[id]).to.deep.equal(newColumn);
      done();
    });
  });

  /*
  // delete test JSON and PDF file
  after(async () => {
    await fs.unlink(getPath(testBoard.boardId) + ".json", error => {
      if (error) throw error;
    });

    await fs.unlink(getPath(testBoard.boardId) + ".pdf", error => {
      if (error) throw error;
    });
  });
  */
});
