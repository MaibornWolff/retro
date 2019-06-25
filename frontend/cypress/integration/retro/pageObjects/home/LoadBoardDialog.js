/// <reference types="Cypress" />

class LoadBoardDialog {
  hasButton() {
    cy.get("button").contains("Load Board");
  }
}

export default LoadBoardDialog;
