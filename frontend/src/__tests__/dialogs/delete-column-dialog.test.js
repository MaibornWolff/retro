import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import DeleteColumnDialog from "../../components/dialogs/DeleteColumnDialog";
import { BoardContext } from "../../components/context/BoardContext";
import { moderatorRole } from "../../utils/testUtils";
import { UserContext } from "../../components/context/UserContext";

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
        <DeleteColumnDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );

  const { getByTestId } = render(componentTree);
  const deleteColBtn = getByTestId("delete-col-btn");
  const deleteIcon = getByTestId("delete-col-btn-icon");

  expect(deleteColBtn).toContainElement(deleteIcon);
});

it("should display dialog on click", async () => {
  const componentTree = (
    <BoardContext.Provider value={boardContextValue}>
      <UserContext.Provider value={userContextValue}>
        <DeleteColumnDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );

  const { getByTestId, getByText } = render(componentTree);
  const deleteColBtn = getByTestId("delete-col-btn");

  fireEvent.click(deleteColBtn);

  await waitForElement(() => getByText(/delete this column\?/i));
});
