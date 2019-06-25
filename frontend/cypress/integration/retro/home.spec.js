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
});
