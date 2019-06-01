import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";

import ExportBoardDialog from "../../components/dialogs/ExportBoardDialog";
import { setModerator, clearLocalStorage } from "../../utils/testUtils";
import { BoardContext } from "../../components/context/BoardContext";

const BOARD_ID = "some-board-id";

beforeEach(() => {
  setModerator(BOARD_ID);
});

afterEach(() => {
  clearLocalStorage();
});

it("should display button text", () => {
  const componentTree = (
    <BoardContext.Provider value={BOARD_ID}>
      <ExportBoardDialog />
    </BoardContext.Provider>
  );
  const { getByTestId } = render(componentTree);
  const exportBoardBtn = getByTestId("export-board-btn");

  expect(exportBoardBtn).toHaveTextContent(/export board/i);
});

it("should display dialog on click", async () => {
  const componentTree = (
    <BoardContext.Provider value={BOARD_ID}>
      <ExportBoardDialog />
    </BoardContext.Provider>
  );
  const { getByTestId, getByText } = render(componentTree);
  const exportBoardBtn = getByTestId("export-board-btn");

  fireEvent.click(exportBoardBtn);

  await waitForElement(() => getByText(/Hope you had a great retrospective!/i));
});
