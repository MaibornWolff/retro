/// <reference types="Cypress" />

class BoardPage {
  visit(boardId) {
    cy.visit(`/boards/${boardId}`);
  }
}

export default BoardPage;
