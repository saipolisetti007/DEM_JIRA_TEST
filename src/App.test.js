import { render, screen } from "@testing-library/react";
import App from "./App";
describe("App Component", () => {
  test("renders header component", () => {
    render(<App />);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });
  test("renders footer component", () => {
    render(<App />);
    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });
});
