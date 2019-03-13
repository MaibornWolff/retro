import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";
import CreateItemDialog from "../../components/dialogs/CreateItemDialog";

it("should display icon", () => {
  const { getByTestId } = render(<CreateItemDialog />);
  const newItemBtn = getByTestId("new-item-btn");
  const addIcon = getByTestId("new-item-btn-icon");

  expect(newItemBtn).toContainElement(addIcon);
});

it("should display dialog on click", async () => {
  const { getByTestId, getByText } = render(<CreateItemDialog />);
  const newItemBtn = getByTestId("new-item-btn");

  fireEvent.click(newItemBtn);

  await waitForElement(() => getByText(/new card/i));
});
