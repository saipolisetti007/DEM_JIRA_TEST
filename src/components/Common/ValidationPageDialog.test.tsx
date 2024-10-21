import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ValidationPageDialog from './ValidationPageDialog';

describe('ValidationPageDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnReturnToCurrentPage = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnConfirm.mockClear();
    mockOnReturnToCurrentPage.mockClear();
  });

  test('renders the dialog with correct text and buttons', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToCurrentPage={mockOnReturnToCurrentPage}
        currentPage="Validation"
      />
    );

    expect(screen.getByText('Do you want to leave this page?')).toBeInTheDocument();
    expect(screen.getByText('You are about to leave the Validation page')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to leave this page?')).toBeInTheDocument();
    expect(screen.getByText('Return to Validation')).toBeInTheDocument();
    expect(screen.getByText('Leave this page')).toBeInTheDocument();
  });

  test('calls onClose when the close icon is clicked', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToCurrentPage={mockOnReturnToCurrentPage}
        currentPage="Validation"
      />
    );

    fireEvent.click(screen.getByLabelText('close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onReturnToPromoGrid when the "Return to Validation" button is clicked', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToCurrentPage={mockOnReturnToCurrentPage}
        currentPage="Validation"
      />
    );

    fireEvent.click(screen.getByText('Return to Validation'));
  });

  test('calls onConfirm when the "Leave this page" button is clicked', () => {
    render(
      <ValidationPageDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onReturnToCurrentPage={mockOnReturnToCurrentPage}
        currentPage="Validation"
      />
    );

    fireEvent.click(screen.getByText('Leave this page'));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});
