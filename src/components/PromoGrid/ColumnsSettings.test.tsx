import React from 'react';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColumnsSettings from './ColumnsSettings';
import { toggleSetting, updateSettings } from './settingsSlice';
jest.mock('react-redux');
import * as reactRedux from 'react-redux';
const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

jest.mock('./settingsSlice', () => ({
  updateSettings: jest.fn(),
  toggleSetting: jest.fn()
}));

describe('Column Settings Component', () => {
  let dispatch: jest.Mock;
  let handleClose: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    handleClose = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Settings component', () => {
    useSelectorMock.mockReturnValue({
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
    useSelectorMock.mockReturnValue({
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
    useSelectorMock.mockReturnValue({
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
    useSelectorMock.mockReturnValue({
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
    useSelectorMock.mockReturnValue({
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
