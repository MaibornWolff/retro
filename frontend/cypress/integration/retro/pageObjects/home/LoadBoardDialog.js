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

const SUBMIT_BUTTON = "Load";
const DIALOG_TITLE = "Load Board";

class LoadBoardDialog {
  getButton() {
    return cy.get(BUTTON_ELEM).contains(DIALOG_TITLE);
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

  hasValidDefaultState() {
    this.hasValidDialogTitle();
    this.submitShouldBeDisabled();
  }

  hasValidDialogTitle() {
    cy.contains(DIALOG_TITLE);
  }

  type(value) {
    this.getInput().type(value);
  }

  clearInput() {
    this.getInput().clear();
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

  submitShouldBeEnabled() {
    this.inputShouldBeValid();
    this.getSubmitButton().should(...NOT_HAVE_ATTR_DISABLED);
  }

  submitShouldBeDisabled() {
    this.inputShouldBeInvalid();
    this.getSubmitButton().should(...HAVE_ATTR_DISABLED);
  }
}

export default LoadBoardDialog;
