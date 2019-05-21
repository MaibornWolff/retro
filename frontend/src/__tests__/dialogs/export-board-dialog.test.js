import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";

import ExportBoardDialog from "../../components/dialogs/ExportBoardDialog";
import { setModerator, clearLocalStorage } from "../../utils/testUtils";

const BOARD_ID = "some-board-id";

beforeEach(() => {
  setModerator(BOARD_ID);
});

afterEach(() => {
  clearLocalStorage();
});

it("should display button text", () => {
  const { getByTestId } = render(<ExportBoardDialog boardId={BOARD_ID} />);
  const exportBoardBtn = getByTestId("export-board-btn");

  expect(exportBoardBtn).toHaveTextContent(/export board/i);
});

it("should display dialog on click", async () => {
  const { getByTestId, getByText } = render(
    <ExportBoardDialog boardId={BOARD_ID} />
  );
  const exportBoardBtn = getByTestId("export-board-btn");

  fireEvent.click(exportBoardBtn);

  await waitForElement(() => getByText(/Hope you had a great retrospective!/i));
});
