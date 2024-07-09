import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CancelEventDialog from '../Common/CancelEventDialog';

describe('CancelEventDialog Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const eventIds = ['event1', 'event2', 'event3', 'event4'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with event IDs', () => {
    render(
      <CancelEventDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        eventIds={eventIds.slice(0, 2)}
      />
    );

    expect(screen.getByText('Cancel Events')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) =>
        content.startsWith('You are about to cancel the events:')
      )
    ).toBeInTheDocument();

    expect(screen.getByText((content, element) => content.includes('event1'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('event2'))).toBeInTheDocument();

    expect(
      screen.getByText((content, element) =>
        content.includes('Are you sure you want to cancel these events?')
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) =>
        content.includes('The items will be canceled immediately. You can’t undo this action.')
      )
    ).toBeInTheDocument();
  });

  test('renders ellipsis when more than three event IDs are provided', () => {
    render(
      <CancelEventDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        eventIds={eventIds}
      />
    );

    expect(screen.getByText('Cancel Events')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) =>
        content.startsWith('You are about to cancel the events:')
      )
    ).toBeInTheDocument();

    expect(screen.getByText((content, element) => content.includes('event1'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('event2'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('event3'))).toBeInTheDocument();

    expect(screen.getByText((content, element) => content.includes('...'))).toBeInTheDocument();

    expect(
      screen.getByText((content, element) =>
        content.includes('Are you sure you want to cancel these events?')
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) =>
        content.includes('The items will be canceled immediately. You can’t undo this action.')
      )
    ).toBeInTheDocument();
  });

  test('calls onClose when Return to Manage Events button is clicked', () => {
    render(
      <CancelEventDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        eventIds={eventIds}
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
        eventIds={eventIds}
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
        eventIds={eventIds}
      />
    );

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
