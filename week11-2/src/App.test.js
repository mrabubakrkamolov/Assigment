import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders all projects and filters them by technology", () => {
  render(<App />);

  expect(screen.getAllByRole("article")).toHaveLength(4);
  expect(
    screen.getByRole("heading", { level: 1, name: /portfolio gallery/i })
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "React" }));

  expect(screen.getAllByRole("article")).toHaveLength(2);
  expect(
    screen.getByRole("heading", { level: 3, name: "Portfolio Gallery" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { level: 3, name: "Book Search" })
  ).not.toBeInTheDocument();
});
