import { render, screen } from "@testing-library/react";
import Header from "./components/Header/Header";

test("Should have header", () => {
  render(<Header />);
  const headingElement = screen.getByRole("heading", {
    name: /Digital Event Manager/i,
  });
  expect(headingElement).toBeInTheDocument();
});
