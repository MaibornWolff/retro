/// <reference types="Cypress" />

import HomePage from "./pageObjects/home/HomePage";
import BoardPage from "./pageObjects/board/BoardPage";

context("Board Tests", () => {
  /**
   * @type {HomePage}
   */
  let hp;

  /**
   * @type {BoardPage}
   */
  let bp;

  let boardId;

  before(() => {
    hp = new HomePage();
    hp.visit();
    hp.shouldVisitBoardOnValidInput();

    cy.location().then(loc => {
      boardId = loc.pathname.split("/").pop();
    });
  });

  beforeEach(() => {
    bp = new BoardPage();
  });

  after(() => {
    cy.deleteBoard(boardId);
    hp.visit();
  });

  // ------------------------ TESTS ------------------------ //
  it("should create column", () => {
    bp.createColumn("Mad");
    bp.createColumn("Sad");
    bp.createColumn("Glad");
    bp.shouldHaveColumnsLength(3);
  });

  it("should create card", () => {
    bp.createCard("Mad", "Scrum Master", "I am really mad!");
    bp.createCard("Mad", "Batman", "I am Batman");
    bp.createCard("Mad", "Superman", "I am Superman");
    bp.shouldHaveBlurryCards();
    bp.shouldHaveCardsCount(3);
  });

  it("should unblur card", () => {
    bp.getUnblurCardsButton().click();
    bp.shouldHaveUnblurryCards();
  });

  it("should edit card", () => {
    bp.editFirstCard();
    bp.shouldHaveEditedAuthor();
    bp.shouldHaveEditedContent();
  });

  it("should delete card", () => {
    bp.deleteFirstCard();
    bp.shouldHaveCardsCount(2);
  });

  it("should edit column name", () => {
    bp.editColumnName("Mad", "-edited");
    bp.shouldHaveColumnTitleWith("Mad-edited");
  });

  it("should delete column", () => {
    bp.deleteColumn("Glad");
    bp.shouldHaveColumnsLength(2);
  });
});
