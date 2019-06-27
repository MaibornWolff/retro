/// <reference types="Cypress" />

class BoardPage {
  newColumnButton() {
    return cy.get("button").contains("New Column");
  }

  openNewColumnDialog() {
    return this.newColumnButton().click();
  }

  shouldHaveColumnTitleWith(name) {
    cy.get("h6").contains(name);
  }
}

export default BoardPage;
