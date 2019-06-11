const fs = require("fs");
const io = require("socket.io-client");
const request = require("supertest");
const { expect } = require("chai");

const { server } = require("../server");
const { testBoard, getPath, createColumn, createItem } = require("./utils");
const ioOptions = {
  transports: ["websocket"],
  forceNew: true,
  reconnection: false
};
const {
  CREATE_COLUMN,
  UPDATE_BOARD,
  CREATE_CARD,
  JOIN_BOARD,
  DELETE_CARD,
  DELETE_COLUMN,
  VOTE_CARD,
  UNBLUR_CARDS,
  EDIT_CARD
} = require("../events/event-names");

let sender;
let receiver;

const port = process.env.PORT;
const boardId = testBoard.boardId;
const columnId = "column-1234";
const columnTitle = "Column 1";
const cardId = "item-1234";
const cardAuthor = "Someone";
const cardContent = "Something";

describe("Backend Tests", () => {
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

  after(async () => {
    await fs.unlink(getPath(boardId) + ".json", error => {
      if (error) throw error;
    });
  });

  it("should create a board", done => {
    request(server)
      .post("/")
      .send(testBoard)
      .expect(200)
      .end(async error => {
        if (error) return done(error);

        await fs.readFile(getPath(boardId), "utf-8", fsError => {
          if (fsError) return done(error);
          done();
        });
      });
  });

  it("should join a board", done => {
    sender.emit(JOIN_BOARD, boardId);
    sender.on(JOIN_BOARD, board => {
      expect(board).to.deep.equal(testBoard);
      done();
    });
  });

  it("should create a column", done => {
    const newColumn = createColumn(columnId, columnTitle);

    sender.emit(CREATE_COLUMN, newColumn, boardId);
    receiver.on(UPDATE_BOARD, board => {
      expect(board.columns[columnId]).to.deep.equal(newColumn);
      done();
    });
  });

  it("should create an item", done => {
    const newItem = createItem(cardId, cardAuthor, cardContent);

    sender.emit(CREATE_CARD, newItem, columnId, boardId);
    receiver.on(UPDATE_BOARD, board => {
      const itemIds = board.columns[columnId].itemIds;
      expect(itemIds).to.not.be.empty;
      expect(itemIds).to.contain(cardId);
      done();
    });
  });

  it("should unblur all cards", done => {
    sender.emit(UNBLUR_CARDS, boardId);
    receiver.on(UPDATE_BOARD, board => {
      expect(board.isBlurred).to.be.false;
      expect(board.items[cardId].isBlurred).to.be.false;
      done();
    });
  });

  it("should edit a card", done => {
    const newAuthor = "new author";
    const newContent = "new content";

    sender.emit(EDIT_CARD, newAuthor, newContent, cardId, boardId);
    receiver.on(UPDATE_BOARD, board => {
      const editedCard = board.items[cardId];
      expect(editedCard.author).to.not.equal(cardAuthor);
      expect(editedCard.author).to.equal(newAuthor);
      expect(editedCard.content).to.not.equal(cardContent);
      expect(editedCard.content).to.equal(newContent);
      done();
    });
  });

  it("should upvote an item", done => {
    sender.emit(VOTE_CARD, cardId, boardId, true);
    receiver.on(UPDATE_BOARD, board => {
      const cardPoints = board.items[cardId].points;
      expect(cardPoints).to.not.equal(0);
      expect(cardPoints).to.equal(1);
      done();
    });
  });

  it("should delete an item", done => {
    sender.emit(DELETE_CARD, cardId, boardId);
    receiver.on(UPDATE_BOARD, board => {
      const itemIds = board.columns[columnId].itemIds;
      expect(itemIds.length).to.equal(0);
      expect(itemIds).to.not.contain(cardId);
      done();
    });
  });

  it("should delete a column", done => {
    sender.emit(DELETE_COLUMN, columnId, boardId);
    receiver.on(UPDATE_BOARD, board => {
      expect(board.columns).to.be.empty;
      done();
    });
  });
});
