import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ValidationPageDialog from './ValidationPageDialog';

describe('ValidationPageDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnReturnToPromoGrid = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnConfirm.mockClear();
    mockOnReturnToPromoGrid.mockClear();
  });

  test('renders the dialog with correct text and buttons', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToPromoGrid={mockOnReturnToPromoGrid}
        isCanceling={false}
      />
    );

    expect(screen.getByText('Do you want to leave this page?')).toBeInTheDocument();
    expect(
      screen.getByText('You are about to leave the Promo Grid Validation page')
    ).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to leave this page?')).toBeInTheDocument();
    expect(screen.getByText('Return to Promo Grid Validation')).toBeInTheDocument();
    expect(screen.getByText('Leave this page')).toBeInTheDocument();
  });

  test('calls onClose when the close icon is clicked', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToPromoGrid={mockOnReturnToPromoGrid}
        isCanceling={false}
      />
    );

    fireEvent.click(screen.getByLabelText('close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onReturnToPromoGrid when the "Return to Promo Grid Validation" button is clicked', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToPromoGrid={mockOnReturnToPromoGrid}
        isCanceling={false}
      />
    );

    fireEvent.click(screen.getByText('Return to Promo Grid Validation'));
    expect(mockOnReturnToPromoGrid).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when the "Leave this page" button is clicked', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToPromoGrid={mockOnReturnToPromoGrid}
        isCanceling={false}
      />
    );

    fireEvent.click(screen.getByText('Leave this page'));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('disables the "Return to Promo Grid Validation" button when isCanceling is true', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToPromoGrid={mockOnReturnToPromoGrid}
        isCanceling={true}
      />
    );

    expect(screen.getByText('Return to Promo Grid Validation')).toBeDisabled();
  });
});
