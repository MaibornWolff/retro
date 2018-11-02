import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup } from "react-testing-library";

import CreateBoardDialog from "../components/dialogs/CreateBoardDialog";

afterEach(cleanup);

test("create board button should have correct text", () => {
  const { getByTestId } = render(<CreateBoardDialog />);
  const newBoardBtn = getByTestId("new-board-btn");
  expect(newBoardBtn).toHaveTextContent(/new board/i);
});
