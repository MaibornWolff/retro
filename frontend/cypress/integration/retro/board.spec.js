/// <reference types="Cypress" />

import HomePage from "./pageObjects/home/HomePage";
import BoardPage from "./pageObjects/board/BoardPage";

context("Board Tests", () => {
  let hp;
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
    cy.get("button")
      .contains("New Column")
      .click();

    cy.get("#column-name").type("Mad");

    cy.get("button")
      .contains("Create")
      .click();

    cy.get("h6").contains("Mad");
  });
});
