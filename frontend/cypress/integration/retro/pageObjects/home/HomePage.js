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

  isValid() {
    this.newBoardDialog.hasButton();
    this.loadBoardDialog.hasButton();
  }
}

export default HomePage;
