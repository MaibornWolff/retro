/// <reference types="Cypress" />

import HomePage from "./pageObjects/home/HomePage";
import BoardPage from "./pageObjects/board/BoardPage";

import { DIALOG_ACTIONS } from "./utils/params";

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

    bp.shouldHaveColumnTitleWith("Mad");
  });

  // TODO: https://github.com/cypress-io/cypress/issues/1212#issuecomment-360395261
  it("should create card", () => {
    bp.getCreateCardButton()
      .click()
      .get("#author-name")
      .type("Scrum Master")
      .get("#content-name")
      .type("I am really mad!")
      .get(DIALOG_ACTIONS)
      .contains("Create")
      .click();

    bp.shouldHaveBlurryCards();

    // cy.pause();
  });

  it("should unblur card", () => {
    bp.getUnblurCardsButton().click();
    bp.shouldHaveUnblurryCards();
  });
});
