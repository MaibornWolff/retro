import React from "react";
import CreateItemDialog from "../../components/dialogs/CreateItemDialog";
import { render, fireEvent, waitForElement } from "react-testing-library";
import {
  setModerator,
  clearLocalStorage,
  moderatorRole
} from "../../utils/testUtils";
import { BoardContext } from "../../components/context/BoardContext";
import { UserContext } from "../../components/context/UserContext";

const BOARD_ID = "some-board-id";

beforeEach(() => {
  setModerator(BOARD_ID);
});

afterEach(() => {
  clearLocalStorage();
});

it("should display icon", () => {
  const componentTree = (
    <BoardContext.Provider value={BOARD_ID}>
      <UserContext.Provider
        value={{ userState: moderatorRole, dispatch: null }}
      >
        <CreateItemDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId } = render(componentTree);
  const newItemBtn = getByTestId("new-item-btn");
  const addIcon = getByTestId("new-item-btn-icon");

  expect(newItemBtn).toContainElement(addIcon);
});

it("should display dialog on click", async () => {
  const componentTree = (
    <BoardContext.Provider value={BOARD_ID}>
      <UserContext.Provider
        value={{ userState: moderatorRole, dispatch: null }}
      >
        <CreateItemDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId, getByText } = render(componentTree);
  const newItemBtn = getByTestId("new-item-btn");

  fireEvent.click(newItemBtn);

  await waitForElement(() => getByText(/new card/i));
});
