import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import CreateBoardDialog from "../../components/dialogs/CreateBoardDialog";

it("should display correct button text", () => {
  const { getByTestId } = render(<CreateBoardDialog />);
  const newBoardBtn = getByTestId("new-board-btn");

  expect(newBoardBtn).toHaveTextContent(/new board/i);
});

it("should display dialog on button click", async () => {
  const { getByTestId, getByText } = render(<CreateBoardDialog />);
  const newBoardBtn = getByTestId("new-board-btn");

  fireEvent.click(newBoardBtn);

  await waitForElement(() => getByText(/create new board/i));
});
