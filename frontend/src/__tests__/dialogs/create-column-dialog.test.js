import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

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

async function openCreateColumnDialog() {
  const componentTree = (
    <BoardContext.Provider value={BOARD_ID}>
      <UserContext.Provider
        value={{ userState: moderatorRole, dispatch: null }}
      >
        <CreateColumnDialog />
      </UserContext.Provider>
    </BoardContext.Provider>
  );
  const { getByTestId, getByText, getByLabelText } = render(componentTree);
  const newColBtn = getByTestId("new-col-btn");

  fireEvent.click(newColBtn);

  await waitForElement(() => getByText(/create new column/i));
  await waitForElement(() => getByText(/Column name cannot be empty./i));

  const columnNameInput = getByLabelText(/column name/i);
  const createColumnButton = getByTestId("create-column-btn");
  expect(columnNameInput.value).toBe("");
  expect(createColumnButton.disabled).toBeTruthy();

  return {
    getByText,
    columnNameInput,
    createColumnButton
  };
}

it("should have correct button text", () => {
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

it("should have empty input and disabled button when opening the dialog", async () => {
  await openCreateColumnDialog();
});

it("should enable create-button when column name is valid", async () => {
  const {
    columnNameInput,
    createColumnButton
  } = await openCreateColumnDialog();
  const columnName = "Column 1";

  fireEvent.change(columnNameInput, { target: { value: columnName } });

  expect(columnNameInput.value).toBe(columnName);
  expect(createColumnButton.disabled).toBeFalsy();
});

it("should show error when having a too long column name", async () => {
  const {
    columnNameInput,
    createColumnButton,
    getByText
  } = await openCreateColumnDialog();
  const tooLongColumnName = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb";

  fireEvent.change(columnNameInput, { target: { value: tooLongColumnName } });

  expect(createColumnButton.disabled).toBeTruthy();
  await waitForElement(() => getByText(/column name is too long./i));
});
