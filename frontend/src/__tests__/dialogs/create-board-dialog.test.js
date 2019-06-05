import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import CreateBoardDialog from "../../components/dialogs/CreateBoardDialog";

const NEW_BOARD_BTN_ID = "new-board-btn";
const CREATE_BOARD_BTN_ID = "create-board-btn";

it("should have correct button text", () => {
  const { getByTestId } = render(<CreateBoardDialog />);
  const newBoardBtn = getByTestId(NEW_BOARD_BTN_ID);

  expect(newBoardBtn).toHaveTextContent(/new board/i);
});

it("should display dialog on open", async () => {
  const { getByTestId, getByText } = render(<CreateBoardDialog />);
  const newBoardBtn = getByTestId(NEW_BOARD_BTN_ID);

  fireEvent.click(newBoardBtn);

  await waitForElement(() => getByText(/create new board/i));
});

it("should have empty context on newly opened dialog", async () => {
  const { getByTestId, getByText, getByLabelText } = render(
    <CreateBoardDialog />
  );
  const newBoardBtn = getByTestId(NEW_BOARD_BTN_ID);

  fireEvent.click(newBoardBtn);

  // dialog is open and error message is shown
  await waitForElement(() => getByText(/create new board/i));
  await waitForElement(() => getByText(/board name cannot be empty./i));

  // input is empty at first
  const boardNameInput = getByLabelText(/board name/i);
  expect(boardNameInput.value).toBe("");

  // create button is disabled at first
  const createBoardButton = getByTestId(CREATE_BOARD_BTN_ID);
  expect(createBoardButton.disabled).toBeTruthy();
});
