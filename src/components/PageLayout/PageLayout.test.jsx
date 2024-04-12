import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './PageLayout';
describe('PageLayout Component', () => {
  test('renders header footer component', () => {
    render(
      <BrowserRouter>
        <PageLayout />
      </BrowserRouter>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
