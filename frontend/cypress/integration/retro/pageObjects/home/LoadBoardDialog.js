/// <reference types="Cypress" />

const TEXT_FIELD = "input";
const CANCEL_BTN = "Cancel";
const LOAD_BTN = "Load";
const DIALOG_TITLE = "Load Board";
const DIALOG_ACTIONS = ".MuiDialogActions-root";

class LoadBoardDialog {
  hasButton() {
    cy.get("button").contains("Load Board");
  }

  open() {
    cy.get("button")
      .contains(DIALOG_TITLE)
      .click();
  }

  shouldBeOpen() {
    cy.contains(DIALOG_TITLE);
  }

  inputShouldBeInvalid() {
    cy.get(TEXT_FIELD)
      .invoke("attr", "aria-invalid")
      .should("be", "true");
  }

  inputShouldBeValid() {
    cy.get(TEXT_FIELD)
      .invoke("attr", "aria-invalid")
      .should("be", "false");
  }

  loadButtonShouldBeDisabled() {
    cy.get(DIALOG_ACTIONS)
      .contains(LOAD_BTN)
      .should("have.attr", "disabled");
  }

  loadButtonShouldBeEnabled() {
    cy.get(DIALOG_ACTIONS)
      .contains(LOAD_BTN)
      .should("not.have.attr", "disabled");
  }

  typeInvalidId() {
    cy.get(TEXT_FIELD).type("asdf");
  }

  typeValidId() {
    cy.get(TEXT_FIELD).type("V1StGXR8_Z5jdHi6B-myT");
  }

  hasValidDefaultState() {
    this.inputShouldBeInvalid();
    this.loadButtonShouldBeDisabled();
  }

  close() {
    cy.get(DIALOG_ACTIONS)
      .contains(CANCEL_BTN)
      .click();
  }
}

export default LoadBoardDialog;
