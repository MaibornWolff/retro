import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";
import EditItemDialog from "../../components/dialogs/EditItemDialog";

it("should display icon", () => {
  const { getByTestId } = render(<EditItemDialog />);
  const editItemBtn = getByTestId("edit-item-btn");
  const editIcon = getByTestId("edit-item-btn-icon");

  expect(editItemBtn).toContainElement(editIcon);
});

it("should display dialog on click", async () => {
  const { getByTestId, getByText } = render(<EditItemDialog />);
  const editItemBtn = getByTestId("edit-item-btn");

  fireEvent.click(editItemBtn);

  await waitForElement(() => getByText(/edit card/i));
});
