import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("Homepage Example Text renders successfully", () => {
  render(<Home />);
  const HomeTextElement = screen.getByText(/welcome to Digital Event Manager/i);

  expect(HomeTextElement).toBeInTheDocument();
});
