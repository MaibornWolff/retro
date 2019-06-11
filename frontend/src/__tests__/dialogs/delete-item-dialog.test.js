import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import DeleteItemDialog from "../../components/dialogs/DeleteItemDialog";
import { moderatorRole } from "../../utils/testUtils";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";

const boardContextValue = {
  boardId: "some-board-id"
};

const userContextValue = {
  userState: moderatorRole
};

it("should display icon", () => {
  const componentTree = (
    <BoardContext.Provider value={boardContextValue}>
      <UserContext.Provider value={userContextValue}>
        <DeleteItemDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId } = render(componentTree);
  const deleteItemBtn = getByTestId("delete-item-btn");
  const deleteIcon = getByTestId("delete-item-btn-icon");

  expect(deleteItemBtn).toContainElement(deleteIcon);
});

it("should display dialog on click", async () => {
  const componentTree = (
    <BoardContext.Provider value={boardContextValue}>
      <UserContext.Provider value={userContextValue}>
        <DeleteItemDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId, getByText } = render(componentTree);
  const deleteItemBtn = getByTestId("delete-item-btn");

  fireEvent.click(deleteItemBtn);

  await waitForElement(() => getByText(/delete this card\?/i));
});
