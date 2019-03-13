import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";
import ExportBoardDialog from "../../components/dialogs/ExportBoardDialog";

it("should display button text", () => {
  const { getByTestId } = render(<ExportBoardDialog />);
  const exportBoardBtn = getByTestId("export-board-btn");

  expect(exportBoardBtn).toHaveTextContent(/export board/i);
});

it("should display dialog on click", async () => {
  const { getByTestId, getByText } = render(<ExportBoardDialog />);
  const exportBoardBtn = getByTestId("export-board-btn");

  fireEvent.click(exportBoardBtn);

  await waitForElement(() => getByText(/Do you want to export this board\?/i));
});
