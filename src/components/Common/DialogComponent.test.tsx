import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DialogComponent from './DialogComponent';
import '@testing-library/jest-dom/extend-expect';

test('renders DialogComponent and checks interactions', () => {
  const mockHandleClose = jest.fn();
  const mockHandleConfirm = jest.fn();

  const defaultProps = {
    open: true,
    title: 'Dialog Title',
    dialogHeading: 'Dialog Heading',
    dialogContent: 'Dialog Content',
    handleClose: mockHandleClose,
    handleConfirm: mockHandleConfirm,
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  };
  render(<DialogComponent {...defaultProps} />);

  expect(screen.getByText('Dialog Title')).toBeInTheDocument();
  expect(screen.getByText('Dialog Heading')).toBeInTheDocument();
  expect(screen.getByText('Dialog Content')).toBeInTheDocument();

  // Check if confirm button is rendered
  const confirmButton = screen.getByText('Confirm');
  expect(confirmButton).toBeInTheDocument();

  // Check if cancel button is rendered
  const cancelButton = screen.getByText('Cancel');
  expect(cancelButton).toBeInTheDocument();

  // Simulate click on cancel button and check if handleClose is called
  fireEvent.click(cancelButton);
  expect(mockHandleClose).toHaveBeenCalledTimes(1);

  // Simulate click on confirm button and check if handleConfirm is called
  fireEvent.click(confirmButton);
  expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
});
