import React from "react";
import { render, cleanup } from "react-testing-library";

import Home from "../components/Home";

afterEach(cleanup);

test("should have greeting", () => {
  const { container } = render(<Home />);
  const greeting = container.firstChild;

  expect(greeting.textContent).toBe("Welcome to Retro!");
});
