import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("Should have Footer", () => {
  render(<Footer />);
  const footerTextElement = screen.getByText(/Digital Event Manager/i);

  expect(footerTextElement).toBeInTheDocument();
});
