// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { BOARD_ID, BOARD_NAME } from "../integration/retro/utils/params";

Cypress.Commands.add("createBoard", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/",
    body: {
      boardId: BOARD_ID,
      title: BOARD_NAME,
      items: {},
      columns: {},
      columnOrder: [],
      error: false,
      isBlurred: true,
      maxVoteCount: 3
    }
  }).then(res => {
    if (!res.isOkStatusCode) {
      throw new Error("Creating board data failed!");
    }

    window.localStorage.setItem(
      BOARD_ID,
      JSON.stringify({
        role: "moderator",
        name: "",
        maxVoteCount: 3,
        votesLeft: 3,
        votedItems: []
      })
    );
  });
});

Cypress.Commands.add("deleteBoard", () => {
  cy.request({
    method: "DELETE",
    url: `http://localhost:3000/api/boards/${BOARD_ID}`
  }).then(res => {
    if (!res.isOkStatusCode) {
      throw new Error("Deleting board data failed!");
    }
  });
});
