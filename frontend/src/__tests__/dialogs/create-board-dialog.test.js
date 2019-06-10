import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import CreateBoardDialog from "../../components/dialogs/CreateBoardDialog";

const NEW_BOARD_BTN_ID = "new-board-btn";
const CREATE_BOARD_BTN_ID = "create-board-btn";

async function openCreateBoardDialog() {
  const { getByTestId, getByText, getByLabelText } = render(
    <Router>
      <CreateBoardDialog />
    </Router>
  );
  const newBoardBtn = getByTestId(NEW_BOARD_BTN_ID);

  fireEvent.click(newBoardBtn);

  await waitForElement(() => getByText(/create new board/i));
  await waitForElement(() => getByText(/board name cannot be empty./i));

  const boardNameInput = getByLabelText(/board name/i);
  const createBoardButton = getByTestId(CREATE_BOARD_BTN_ID);
  expect(boardNameInput.value).toBe("");
  expect(createBoardButton.disabled).toBeTruthy();

  return {
    getByText,
    boardNameInput,
    createBoardButton
  };
}

it("should have correct button text", () => {
  const { getByTestId } = render(
    <Router>
      <CreateBoardDialog />
    </Router>
  );
  const newBoardBtn = getByTestId(NEW_BOARD_BTN_ID);

  expect(newBoardBtn).toHaveTextContent(/new board/i);
});

it("should have empty input and disabled button when opening the dialog", async () => {
  await openCreateBoardDialog();
});

it("should enable create-button when board name is valid", async () => {
  const { boardNameInput, createBoardButton } = await openCreateBoardDialog();
  const boardName = "Retrospective 101";

  fireEvent.change(boardNameInput, { target: { value: boardName } });

  expect(boardNameInput.value).toBe(boardName);
  expect(createBoardButton.disabled).toBeFalsy();
});

it("should show error when having a too long board name", async () => {
  const {
    boardNameInput,
    createBoardButton,
    getByText
  } = await openCreateBoardDialog();
  const tooLongBoardName = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb";

  fireEvent.change(boardNameInput, { target: { value: tooLongBoardName } });

  expect(createBoardButton.disabled).toBeTruthy();
  await waitForElement(() => getByText(/board name is too long./i));
});
