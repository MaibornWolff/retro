const fs = require("fs");
const expect = require("chai").expect;
const io = require("socket.io-client");

const server = require("../server");
const { testBoard, getPath, getBoardURL } = require("./utils");
const port = process.env.PORT;
const ioOptions = {
  transports: ["websocket"],
  forceNew: true,
  reconnection: false
};
const {
  CREATE_BOARD,
  UPDATE_BOARD,
  JOIN_BOARD,
  EXPORT_BOARD,
  UNBLUR_CARDS
} = require("../events/event-names");

let sender;
let receiver;

describe("Board Events", () => {
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

  it("should create board", done => {
    sender.emit(CREATE_BOARD, testBoard, testBoard.boardId);
    receiver.on(CREATE_BOARD, board => {
      expect(board).to.deep.equal(testBoard);
      done();
    });
  });

  it("should update board", done => {
    sender.emit(UPDATE_BOARD, testBoard, testBoard.boardId);
    receiver.on(UPDATE_BOARD, board => {
      expect(board).to.deep.equal(testBoard);
      done();
    });
  });

  it("should join board", done => {
    // here, we only emit back to the sender and not to all sockets
    sender.emit(JOIN_BOARD, testBoard.boardId);
    sender.on(JOIN_BOARD, boardJSON => {
      expect(boardJSON).to.deep.equal(testBoard);
      done();
    });
  });

  it("should export board", done => {
    const boardId = testBoard.boardId;
    sender.emit(EXPORT_BOARD, getBoardURL(boardId, port), boardId);
    sender.on(EXPORT_BOARD, bufferString => {
      const bufferObject = JSON.parse(bufferString);
      expect(bufferObject.type).to.equal("Buffer");
      expect(bufferObject.data).to.not.be.empty;
      done();
    });
  });

  it("should unblur cards", done => {
    sender.emit(UNBLUR_CARDS, testBoard.boardId);
    receiver.on(UPDATE_BOARD, board => {
      expect(board.isBlurred).to.be.false;
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
