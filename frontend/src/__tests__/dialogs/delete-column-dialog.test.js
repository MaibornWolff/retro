import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";
import DeleteColumnDialog from "../../components/dialogs/DeleteColumnDialog";

it("should display icon", () => {
  const { getByTestId } = render(<DeleteColumnDialog />);
  const deleteColBtn = getByTestId("delete-col-btn");
  const deleteIcon = getByTestId("delete-col-btn-icon");

  expect(deleteColBtn).toContainElement(deleteIcon);
});

it("should display dialog on click", async () => {
  const { getByTestId, getByText } = render(<DeleteColumnDialog />);
  const deleteColBtn = getByTestId("delete-col-btn");

  fireEvent.click(deleteColBtn);

  await waitForElement(() => getByText(/delete this column\?/i));
});
