import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

function getCard(title) {
  return screen.getByRole("article", { name: new RegExp(title, "i") });
}

test("E1: counter uses functional state updates", () => {
  render(<App />);
  const card = getCard("Update state with a counter");

  expect(within(card).getByText("0")).toBeInTheDocument();

  fireEvent.click(within(card).getByRole("button", { name: "Add one" }));
  fireEvent.click(within(card).getByRole("button", { name: "Add one" }));
  expect(within(card).getByText("2")).toBeInTheDocument();

  fireEvent.click(within(card).getByRole("button", { name: "Decrease" }));
  expect(within(card).getByText("1")).toBeInTheDocument();

  fireEvent.click(within(card).getByRole("button", { name: "Reset" }));
  expect(within(card).getByText("0")).toBeInTheDocument();
});

test("E2: controlled input updates the preview", () => {
  render(<App />);
  const card = getCard("Keep an input in sync");

  expect(within(card).getByText("Hello, there!")).toBeInTheDocument();
  fireEvent.change(within(card).getByLabelText(/your name/i), {
    target: { value: "Abubakr" },
  });
  expect(within(card).getByText("Hello, Abubakr!")).toBeInTheDocument();
});

test("E3: tasks can be added and removed", () => {
  render(<App />);
  const card = getCard("Add and remove list items");

  fireEvent.change(within(card).getByLabelText(/new task/i), {
    target: { value: "New exercise" },
  });
  fireEvent.click(within(card).getByRole("button", { name: "Add" }));
  expect(within(card).getByText("New exercise")).toBeInTheDocument();

  const removeButtons = within(card).getAllByRole("button", { name: "Remove" });
  fireEvent.click(removeButtons[removeButtons.length - 1]);
  expect(within(card).queryByText("New exercise")).not.toBeInTheDocument();
});

test("E4: details toggle exposes its state", () => {
  render(<App />);
  const card = getCard("Show and hide content");
  const toggle = within(card).getByRole("button", { name: "Show details" });

  expect(toggle).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(toggle);
  expect(
    within(card).getByText(/State is a component's memory/i)
  ).toBeInTheDocument();
  expect(
    within(card).getByRole("button", { name: "Hide details" })
  ).toHaveAttribute("aria-expanded", "true");
});

test("E5: todos can be filtered and completed cleared", () => {
  render(<App />);
  const card = getCard("Complete and filter tasks");

  fireEvent.click(within(card).getByRole("button", { name: "Done" }));
  expect(within(card).getByText("Try the counter")).toBeInTheDocument();
  expect(within(card).queryByText("Read the React lesson")).not.toBeInTheDocument();

  fireEvent.click(within(card).getByRole("button", { name: "All" }));
  fireEvent.click(within(card).getByRole("button", { name: "Clear completed" }));
  expect(within(card).queryByText("Try the counter")).not.toBeInTheDocument();
});

test("E6: profile form validates required fields", () => {
  render(<App />);
  const card = getCard("Validate a controlled form");

  fireEvent.click(within(card).getByRole("button", { name: "Save profile" }));
  expect(within(card).getByText(/Please enter a name/i)).toBeInTheDocument();

  fireEvent.change(within(card).getByLabelText("Name"), {
    target: { value: "Abu" },
  });
  fireEvent.change(within(card).getByLabelText("Email"), {
    target: { value: "abu@example.com" },
  });
  fireEvent.click(within(card).getByRole("button", { name: "Save profile" }));

  expect(within(card).getByText(/Saved Abu/i)).toBeInTheDocument();
});

test("E7: note is persisted with localStorage", () => {
  render(<App />);
  const card = getCard("Save a note in the browser");

  fireEvent.change(within(card).getByLabelText(/quick note/i), {
    target: { value: "Remember state" },
  });
  expect(within(card).getByText("Saved in this browser")).toBeInTheDocument();
  expect(window.localStorage.getItem("week11-2-quick-note")).toBe("Remember state");

  fireEvent.click(within(card).getByRole("button", { name: "Clear" }));
  expect(within(card).getByText("Nothing saved yet")).toBeInTheDocument();
});
