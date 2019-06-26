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
