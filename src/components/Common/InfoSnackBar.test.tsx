import { render, screen } from '@testing-library/react';
import InfoSnackBar from './InfoSnackBar';
import React from 'react';

describe('InfoSnackBar Component', () => {
  const onClose = jest.fn();
  test('render message and severity when open', () => {
    const message = 'Test message';
    const severity = 'success';
    render(<InfoSnackBar isOpen={true} message={message} severity={severity} onClose={onClose} />);
    const messageText = screen.getByText(message);
    expect(messageText).toBeInTheDocument();
  });
});
