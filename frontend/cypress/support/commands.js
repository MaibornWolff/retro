Cypress.Commands.add("deleteBoard", boardId => {
  cy.request({
    method: "DELETE",
    url: `http://localhost:3000/api/boards/${boardId}`
  }).then(res => {
    if (!res.isOkStatusCode) {
      throw new Error("Deleting board data failed!");
    }
  });
});
