import { render, screen } from '@testing-library/react';
import InfoSnackBar from './InfoSnackBar';

describe('InfoSnackBar Component', () => {
  test('render message and severity when open', () => {
    const message = 'Test message';
    const severity = 'sucess';
    render(<InfoSnackBar isOpen={true} message={message} severity={severity} />);
    const messageText = screen.getByText(message);
    expect(messageText).toBeInTheDocument();
  });
});
