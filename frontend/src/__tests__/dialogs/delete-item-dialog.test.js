import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import DeleteItemDialog from "../../components/dialogs/DeleteItemDialog";

it("should display icon", () => {
  const { getByTestId } = render(<DeleteItemDialog />);
  const deleteItemBtn = getByTestId("delete-item-btn");
  const deleteIcon = getByTestId("delete-item-btn-icon");

  expect(deleteItemBtn).toContainElement(deleteIcon);
});

it("should display dialog on click", async () => {
  const { getByTestId, getByText } = render(<DeleteItemDialog />);
  const deleteItemBtn = getByTestId("delete-item-btn");

  fireEvent.click(deleteItemBtn);

  await waitForElement(() => getByText(/delete this card\?/i));
});
