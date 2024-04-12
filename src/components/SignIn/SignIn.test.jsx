import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

describe('SignIn component', () => {
  test('render SignIn Component with text', () => {
    render(<SignIn />);
    const textComponent = screen.getByText(/Please sign-in to access the application/i);
    expect(textComponent).toBeInTheDocument();
  });
});
