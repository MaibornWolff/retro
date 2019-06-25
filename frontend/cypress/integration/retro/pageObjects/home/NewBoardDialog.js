/// <reference types="Cypress" />

class NewBoardDialog {
  hasButton() {
    cy.get("button").contains("New Board");
  }

  open() {
    cy.get("button")
      .contains("New Board")
      .click();
  }

  hasValidDefaultState() {
    cy.contains("Create New Board");

    cy.get("input")
      .invoke("attr", "aria-invalid")
      .should("be", "true");

    cy.get("button")
      .contains("Create")
      .parent()
      .should("have.attr", "disabled");
  }

  typeBoardName() {
    cy.get("input").type("some board name");
  }

  canCreateBoard() {
    cy.get("button")
      .contains("Create")
      .parent()
      .should("not.have.attr", "disabled");
  }

  close() {
    cy.get("button")
      .contains("Cancel")
      .click();
  }
}

export default NewBoardDialog;
