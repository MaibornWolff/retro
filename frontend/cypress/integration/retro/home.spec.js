/// <reference types="Cypress" />

import HomePage from "./pageObjects/home/HomePage";

context("Homepage Tests", () => {
  /**
   * @type {HomePage}
   */
  let hp;

  beforeEach(() => {
    hp = new HomePage();
    hp.visit();
  });

  it("should visit Home", () => {
    hp.isValid();
  });

  it("should visit Board", () => {
    hp.shouldVisitBoardOnValidInput();
  });

  context("New Board Dialog", () => {
    it("should display dialog", () => {
      hp.newBoardDialog.openEmptyDialog();
      hp.newBoardDialog.closeDialog();
    });

    it("should enable submit on valid name", () => {
      hp.newBoardDialog.openEmptyDialog();
      hp.newBoardDialog.type("some board name");
      hp.newBoardDialog.submitShouldBeEnabled();
      hp.newBoardDialog.closeDialog();
    });

    it("should disable submit on invalid name", () => {
      hp.newBoardDialog.openEmptyDialog();
      hp.newBoardDialog.type("a".repeat(41));
      hp.newBoardDialog.submitShouldBeDisabled();
      hp.newBoardDialog.closeDialog();
    });
  });

  context("Load Board Dialog", () => {
    it("should display dialog", () => {
      hp.loadBoardDialog.openEmptyDialog();
      hp.loadBoardDialog.closeDialog();
    });

    it("should allow maxLength of 21 characters", () => {
      hp.loadBoardDialog.openEmptyDialog();

      hp.loadBoardDialog.type("asdf");
      hp.loadBoardDialog.submitShouldBeDisabled();

      hp.loadBoardDialog.clearInput();
      hp.loadBoardDialog.type("a".repeat(22));
      hp.loadBoardDialog
        .getInput()
        .invoke("val")
        .should("have.length", "21");

      hp.loadBoardDialog.closeDialog();
    });
  });
});
