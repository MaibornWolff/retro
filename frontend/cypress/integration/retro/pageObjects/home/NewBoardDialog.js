/// <reference types="Cypress" />

import {
  BE_TRUE,
  BE_FALSE,
  HAVE_ATTR_DISABLED,
  NOT_HAVE_ATTR_DISABLED,
  ATTR_ARIA_INVALID,
  DIALOG_ACTIONS,
  BUTTON_ELEM,
  INPUT_ELEM,
  CANCEL_BUTTON
} from "../../utils/params";

// relevant names
const NEW_BOARD = "New Board";
const SUBMIT_BUTTON = "Create";
const DIALOG_TITLE = "Create New Board";

class NewBoardDialog {
  getButton() {
    return cy.get(BUTTON_ELEM).contains(NEW_BOARD);
  }

  getCancelButton() {
    return cy.get(DIALOG_ACTIONS).contains(CANCEL_BUTTON);
  }

  getSubmitButton() {
    return cy.get(DIALOG_ACTIONS).contains(SUBMIT_BUTTON);
  }

  getInput() {
    return cy.get(INPUT_ELEM);
  }

  openDialog() {
    this.getButton().click();
  }

  closeDialog() {
    this.getCancelButton().click();
  }

  openEmptyDialog() {
    this.openDialog();
    this.hasValidDefaultState();
  }

  inputShouldBeInvalid() {
    this.getInput()
      .invoke(...ATTR_ARIA_INVALID)
      .should(...BE_TRUE);
  }

  inputShouldBeValid() {
    this.getInput()
      .invoke(...ATTR_ARIA_INVALID)
      .should(...BE_FALSE);
  }

  hasValidDialogTitle() {
    cy.contains(DIALOG_TITLE);
  }

  hasValidDefaultState() {
    this.hasValidDialogTitle();
    this.submitShouldBeDisabled();
  }

  type(value) {
    this.getInput().type(value);
  }

  submitShouldBeEnabled() {
    this.inputShouldBeValid();
    this.getSubmitButton().should(...NOT_HAVE_ATTR_DISABLED);
  }

  submitShouldBeDisabled() {
    this.inputShouldBeInvalid();
    this.getSubmitButton().should(...HAVE_ATTR_DISABLED);
  }
}

export default NewBoardDialog;
