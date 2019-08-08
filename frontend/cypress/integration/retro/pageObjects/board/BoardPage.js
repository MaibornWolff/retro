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
  EDIT_COLUMN_NAME_BUTTON,
  DELETE_CARD_BUTTON,
  EDIT_CARD_BUTTON,
  UPVOTE_CARD_BUTTON,
  COLUMN_CONTAINER,
  ALL_COLUMNS,
  DELETE_COLUMN_BUTTON
} from "../../../../../src/constants/testIds";

import { DIALOG_ACTIONS } from "../../utils/params";

class BoardPage {
  createColumn(columnName) {
    this.openNewColumnDialog()
      .get("#column-name")
      .type(columnName)
      .get("button")
      .contains("Create")
      .click();

    this.shouldHaveColumnTitleWith(columnName);
  }

  editColumnName(columnTitle, edit) {
    this.getColumn(columnTitle)
      .find(`[data-testid="${COLUMN_MENU_BUTTON + "__" + columnTitle}"]`)
      .click()
      .get(`[data-testid="${EDIT_COLUMN_NAME_BUTTON}"]`)
      .click()
      .get("#col-name-input-edit")
      .type(edit)
      .get(DIALOG_ACTIONS)
      .contains("Save")
      .click();
  }

  deleteColumn(columnTitle) {
    this.getColumn(columnTitle)
      .find(`[data-testid="${COLUMN_MENU_BUTTON + "__" + columnTitle}"]`)
      .click()
      .get(`[data-testid="${DELETE_COLUMN_BUTTON}"]`)
      .click()
      .get(DIALOG_ACTIONS)
      .contains("Delete")
      .click();
  }

  createCard(columnTitle, cardAuthor, cardContent) {
    this.getColumn(columnTitle)
      .find(`[data-testid="${CREATE_CARD_BUTTON}"]`)
      .click()
      .get("#author-name")
      .type(cardAuthor)
      .get("#content-name")
      .type(cardContent)
      .get(DIALOG_ACTIONS)
      .contains("Create")
      .click();
  }

  editFirstCard() {
    this.getCardEditButton()
      .first()
      .click()
      .get("#author-name")
      .type("-edited")
      .get("#content-name")
      .type("-edited")
      .get(DIALOG_ACTIONS)
      .contains("Save")
      .click();
  }

  deleteFirstCard() {
    this.getCardDeleteButton()
      .first()
      .click()
      .get(DIALOG_ACTIONS)
      .contains("Delete")
      .click();
  }

  getColumn(columnTitle) {
    return cy.getTestElement(COLUMN_CONTAINER + `__${columnTitle}`);
  }

  shouldHaveEditedAuthor() {
    this.getCardContainer()
      .get("p")
      .contains("Scrum Master-edited");
  }

  shouldHaveEditedContent() {
    this.getCardContainer()
      .get("p")
      .contains("I am really mad!-edited");
  }

  shouldHaveColumnsLength(length) {
    return cy
      .getTestElement(ALL_COLUMNS)
      .children()
      .should("have.length", length);
  }

  shouldHaveCardsCount(length) {
    return this.getCardContainer().should("have.length", length);
  }

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

  getCardDeleteButton() {
    return cy.getTestElement(DELETE_CARD_BUTTON);
  }

  getCardEditButton() {
    return cy.getTestElement(EDIT_CARD_BUTTON);
  }

  getCardVoteButton() {
    return cy.getTestElement(UPVOTE_CARD_BUTTON);
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
