import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";

import ExportBoardDialog from "../../components/dialogs/ExportBoardDialog";
import { setModeratorRole, removeModeratorRole } from "../../utils/testUtils";

const BOARD_ID = "some-board-id";

beforeEach(() => {
  setModeratorRole(BOARD_ID);
});

afterEach(() => {
  removeModeratorRole(BOARD_ID);
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
