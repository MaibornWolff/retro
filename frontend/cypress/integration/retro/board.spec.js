/// <reference types="Cypress" />

import HomePage from "./pageObjects/home/HomePage";
import BoardPage from "./pageObjects/board/BoardPage";
import { BOARD_ID } from "../retro/utils/params";

context("Board Tests", () => {
  let hp;
  let bp;

  before(() => {
    cy.createBoard();
    hp = new HomePage();
  });

  beforeEach(() => {
    bp = new BoardPage();
    bp.visit(BOARD_ID);
    const userObject = JSON.parse(window.localStorage.getItem(BOARD_ID));
    userObject.role = "moderator";
    window.localStorage.setItem(BOARD_ID, JSON.stringify(userObject));
  });

  after(() => {
    cy.deleteBoard();
    hp.visit();
  });

  it("should visit Board", () => {
    bp.visit(BOARD_ID);
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
