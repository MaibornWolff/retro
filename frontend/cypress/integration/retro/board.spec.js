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

  it("should create column", () => {
    bp.openNewColumnDialog()
      .get("#column-name")
      .type("Mad")
      .get("button")
      .contains("Create")
      .click();

    // test 2
    bp.shouldHaveColumnTitleWith("Mad");
  });
});
