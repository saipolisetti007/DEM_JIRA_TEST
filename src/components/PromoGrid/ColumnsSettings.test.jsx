import React from 'react';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch, useSelector } from 'react-redux';
import ColumnsSettings from './ColumnsSettings';
import { toggleSetting, updateSettings } from './settingsSlice';

// Mocking the necessary modules
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('./settingsSlice', () => ({
  updateSettings: jest.fn(),
  toggleSetting: jest.fn()
}));

describe('Column Settings Component', () => {
  let dispatch;
  let handleClose;

  beforeEach(() => {
    dispatch = jest.fn();
    handleClose = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Settings component', () => {
    useSelector.mockReturnValue({
      settings: { start_of_shipments: true, end_of_shipments: false },
      userData: { region: 'NA' },
      isLoading: false,
      isSaving: false
    });
    render(<ColumnsSettings handleClose={handleClose} />);
    expect(screen.getByText('Event Main Parameters')).toBeInTheDocument();
    expect(screen.getByText(/start of shipments/i)).toBeInTheDocument();
    expect(screen.getByText(/end of shipments/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start of shipments/i)).toBeChecked();
    expect(screen.getByLabelText(/end of shipments/i)).not.toBeChecked();
  });

  test('renders Settings component for EU', () => {
    useSelector.mockReturnValue({
      settings: { end_of_shipments: false },
      userData: { region: 'EU' },
      isLoading: false,
      isSaving: false
    });
    render(<ColumnsSettings handleClose={handleClose} />);
    expect(screen.getByText('Event Main Parameters')).toBeInTheDocument();
    expect(screen.queryByLabelText(/start of shipments/i)).not.toBeInTheDocument();
  });

  test('handles accordion panel change', async () => {
    useSelector.mockReturnValue({
      settings: { start_of_shipments: true, end_of_shipments: false },
      userData: { region: 'NA' },
      isLoading: false,
      isSaving: false
    });
    render(<ColumnsSettings handleClose={handleClose} />);

    fireEvent.click(screen.getByText('Event Main Parameters'));
    const accordionDiv = screen.getByTestId('panel1');

    expect(accordionDiv).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByText('Event Main Parameters'));
    expect(accordionDiv).toHaveAttribute('aria-expanded', 'true');
  });

  test('handle checkbox changes and dispatches action correctly', () => {
    useSelector.mockReturnValue({
      settings: { start_of_shipments: true, end_of_shipments: false },
      userData: { region: 'NA' },
      isLoading: false,
      isSaving: false
    });
    render(<ColumnsSettings handleClose={handleClose} />);
    fireEvent.click(screen.getByLabelText(/end of shipments/i));
    expect(dispatch).toHaveBeenCalledWith(toggleSetting('end_of_shipments'));
  });

  test('handles save action and shows snackbar', async () => {
    useSelector.mockReturnValue({
      settings: { start_of_shipments: true, end_of_shipments: false },
      userData: { region: 'NA' },
      isLoading: false,
      isSaving: false
    });
    render(<ColumnsSettings handleClose={handleClose} />);
    fireEvent.click(screen.getByLabelText(/end of shipments/i));
    expect(dispatch).toHaveBeenCalledWith(toggleSetting('end of shipments'));
    fireEvent.click(screen.getByText('Save Changes'));
    expect(dispatch).toHaveBeenCalledWith(
      updateSettings({ start_of_shipments: true, end_of_shipments: true })
    );
    await act(async () => {
      expect(screen.getByText('Changes saved successfully')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('CloseIcon'));
  });
});
