import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CancelEventDialog from './CancelEventDialog';

describe('CancelEventDialog Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const eventCount = 2;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with event count', () => {
    render(
      <CancelEventDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        eventCount={eventCount}
        isCanceling={false}
      />
    );

    expect(screen.getByText('Cancel Events')).toBeInTheDocument();
    expect(screen.getByText(`You are about to cancel ${eventCount} events.`)).toBeInTheDocument();

    expect(screen.getByText(/Are you sure you want to cancel these events?/)).toBeInTheDocument();
    expect(
      screen.getByText(/The items will be canceled immediately. You can’t undo this action./)
    ).toBeInTheDocument();
  });

  test('calls onClose when Return to Manage Events button is clicked', () => {
    render(
      <CancelEventDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        eventCount={eventCount}
        isCanceling={false}
      />
    );

    const returnButton = screen.getByText('Return to Manage Events');
    fireEvent.click(returnButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when Cancel Event button is clicked', () => {
    render(
      <CancelEventDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        eventCount={eventCount}
        isCanceling={false}
      />
    );

    const cancelButton = screen.getByText('Cancel Event');
    fireEvent.click(cancelButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when close icon button is clicked', () => {
    render(
      <CancelEventDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        eventCount={eventCount}
        isCanceling={false}
      />
    );

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
