import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import EditItemDialog from "../../components/dialogs/EditItemDialog";
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
        <EditItemDialog author="Some Guy" content="Some Content" />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId } = render(componentTree);
  const editItemBtn = getByTestId("edit-item-btn");
  const editIcon = getByTestId("edit-item-btn-icon");

  expect(editItemBtn).toContainElement(editIcon);
});

it("should display dialog on click", async () => {
  const componentTree = (
    <BoardContext.Provider value={boardContextValue}>
      <UserContext.Provider value={userContextValue}>
        <EditItemDialog author="Some Guy" content="Some Content" />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId, getByText } = render(componentTree);
  const editItemBtn = getByTestId("edit-item-btn");

  fireEvent.click(editItemBtn);

  await waitForElement(() => getByText(/edit card/i));
});
