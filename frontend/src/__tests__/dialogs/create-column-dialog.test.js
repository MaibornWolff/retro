import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";

import CreateColumnDialog from "../../components/dialogs/CreateColumnDialog";

it("should display correct button text", () => {
  const { getByTestId } = render(<CreateColumnDialog />);
  const newColBtn = getByTestId("new-col-btn");

  expect(newColBtn).toHaveTextContent(/new column/i);
});

it("should display dialog on button click", async () => {
  const { getByTestId, getByText } = render(<CreateColumnDialog />);
  const newColBtn = getByTestId("new-col-btn");

  fireEvent.click(newColBtn);

  await waitForElement(() => getByText(/create new column/i));
});
