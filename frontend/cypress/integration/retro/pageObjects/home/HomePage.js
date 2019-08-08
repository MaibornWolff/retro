/// <reference types="Cypress" />

import NewBoardDialog from "./NewBoardDialog";
import LoadBoardDialog from "./LoadBoardDialog";

class HomePage {
  constructor() {
    this.newBoardDialog = new NewBoardDialog();
    this.loadBoardDialog = new LoadBoardDialog();
  }

  visit() {
    cy.visit("/");
  }

  shouldVisitBoardOnValidInput() {
    this.newBoardDialog.submitWithValidInput();
    cy.url().should("include", "/boards/");
  }

  isValid() {
    this.newBoardDialog.getButton();
    this.loadBoardDialog.getButton();
  }
}

export default HomePage;
