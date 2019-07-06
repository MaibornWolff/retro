/// <reference types="Cypress" />

import {
  CREATE_COLUMN_BUTTON,
  UNBLUR_CARDS_BUTTON,
  EXPORT_BOARD_BUTTON,
  VOTE_COUNT_BUTTON,
  QR_CODE_BUTTON,
  COLUMN_NAME,
  CREATE_CARD_BUTTON,
  CARD_CONTAINER,
  COLUMN_MENU_BUTTON,
  EDIT_COLUMN_NAME_BUTTON
} from "../../../../../src/constants/testIds";

class BoardPage {
  getCreateColumnButton() {
    return cy.getTestElement(CREATE_COLUMN_BUTTON);
  }

  getUnblurCardsButton() {
    return cy.getTestElement(UNBLUR_CARDS_BUTTON);
  }

  getExportBoardButton() {
    return cy.getTestElement(EXPORT_BOARD_BUTTON);
  }

  getVoteCountButton() {
    return cy.getTestElement(VOTE_COUNT_BUTTON);
  }

  getQrCodeButton() {
    return cy.getTestElement(QR_CODE_BUTTON);
  }

  getColumnName() {
    return cy.getTestElement(COLUMN_NAME);
  }

  getCreateCardButton() {
    return cy.getTestElement(CREATE_CARD_BUTTON);
  }

  getCardContainer() {
    return cy.getTestElement(CARD_CONTAINER);
  }

  getColumnMenuButton() {
    return cy.getTestElement(COLUMN_MENU_BUTTON);
  }

  getEditColumnNameButton() {
    return cy.getTestElement(EDIT_COLUMN_NAME_BUTTON);
  }

  openNewColumnDialog() {
    return this.getCreateColumnButton().click();
  }

  shouldHaveColumnTitleWith(name) {
    return this.getColumnName().contains(name);
  }

  shouldHaveBlurryCards() {
    return this.getCardContainer().should("have.css", "filter", "blur(5px)");
  }

  shouldHaveUnblurryCards() {
    return this.getCardContainer().should("have.css", "filter", "blur(0px)");
  }
}

export default BoardPage;
