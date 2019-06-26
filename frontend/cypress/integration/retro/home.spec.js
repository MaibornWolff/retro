/// <reference types="Cypress" />

import HomePage from "./pageObjects/home/HomePage";

context("Homepage Tests", () => {
  let homepage;

  beforeEach(() => {
    homepage = new HomePage();
    homepage.visit();
  });

  it("should visit homepage", () => {
    homepage.isValid();
  });

  it("should display 'New Board' dialog", () => {
    homepage.newBoardDialog.open();
    homepage.newBoardDialog.hasValidDefaultState();
    homepage.newBoardDialog.close();
  });

  it("should be able to create board on valid input", () => {
    homepage.newBoardDialog.open();
    homepage.newBoardDialog.hasValidDefaultState();
    homepage.newBoardDialog.typeBoardName();
    homepage.newBoardDialog.canCreateBoard();
    homepage.newBoardDialog.close();
  });

  it("should display 'Load Board' dialog", () => {
    homepage.loadBoardDialog.open();
    homepage.loadBoardDialog.shouldBeOpen();
    homepage.loadBoardDialog.hasValidDefaultState();
    homepage.loadBoardDialog.close();
  });

  it("should display error on invalid board ID", () => {
    homepage.loadBoardDialog.open();
    homepage.loadBoardDialog.shouldBeOpen();
    homepage.loadBoardDialog.hasValidDefaultState();
    homepage.loadBoardDialog.typeInvalidId();
    homepage.loadBoardDialog.inputShouldBeInvalid();
    homepage.loadBoardDialog.loadButtonShouldBeDisabled();
    homepage.loadBoardDialog.close();
  });

  it("should not display error on valid board ID", () => {
    homepage.loadBoardDialog.open();
    homepage.loadBoardDialog.shouldBeOpen();
    homepage.loadBoardDialog.hasValidDefaultState();
    homepage.loadBoardDialog.typeValidId();
    homepage.loadBoardDialog.inputShouldBeValid();
    homepage.loadBoardDialog.loadButtonShouldBeEnabled();
    homepage.loadBoardDialog.close();
  });
});
