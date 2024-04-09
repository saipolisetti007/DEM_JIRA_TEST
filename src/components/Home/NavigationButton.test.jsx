import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationButton from './NavigationButton';

describe('Navigation Button', () => {
  test('renders a button with navigation URL', () => {
    const navUrl = '/homepage';
    const buttonText = 'Button';

    render(
      <BrowserRouter>
        <NavigationButton navUrl={navUrl}> {buttonText}</NavigationButton>
      </BrowserRouter>
    );
    const buttonComponent = screen.getByRole('link', { name: buttonText });
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveAttribute('href', navUrl);
    fireEvent.click(buttonComponent);
    expect(window.location.pathname).toBe(navUrl);
  });
});
