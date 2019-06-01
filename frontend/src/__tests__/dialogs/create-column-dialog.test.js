import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";

import CreateColumnDialog from "../../components/dialogs/CreateColumnDialog";
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

it("should display correct button text", () => {
  const componentTree = (
    <BoardContext.Provider value={BOARD_ID}>
      <UserContext.Provider
        value={{ userState: moderatorRole, dispatch: null }}
      >
        <CreateColumnDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId } = render(componentTree);
  const newColBtn = getByTestId("new-col-btn");

  expect(newColBtn).toHaveTextContent(/new column/i);
});

it("should display dialog on button click", async () => {
  const componentTree = (
    <BoardContext.Provider value={BOARD_ID}>
      <UserContext.Provider
        value={{ userState: moderatorRole, dispatch: null }}
      >
        <CreateColumnDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId, getByText } = render(componentTree);
  const newColBtn = getByTestId("new-col-btn");

  fireEvent.click(newColBtn);

  await waitForElement(() => getByText(/create new column/i));
});
