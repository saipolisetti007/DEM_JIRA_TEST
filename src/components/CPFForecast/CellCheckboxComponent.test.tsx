// CellComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CellCheckboxComponent from './CellCheckboxComponent';

describe('CellComponent', () => {
  const mockHandleCheckboxChange = jest.fn();
  const mockSetRowSelection = jest.fn();
  const row = {
    id: '1',
    index: 1,
    original: {
      active: true,
      forecastIncorrect: true,
      forecastMissing: true,
      week: 'week',
      unit: 1,
      prevUnits: 2,
      percentChange: 2,
      unit_diff: 2,
      editedUnits: {},
      finalunits: 2,
      approved: true,
      events: [],
      prevEvents: null,
      comment: ''
    }
  };
  const rowSelection = { 1: true };

  beforeEach(() => {
    render(
      <CellCheckboxComponent
        row={row}
        rowSelection={rowSelection}
        handleCheckboxChange={mockHandleCheckboxChange}
        setRowSelection={mockSetRowSelection}
        prevUnits={null}
        cpfEnabled={true}
      />
    );
  });

  test('renders correctly', () => {
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('WarningAmberIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
  });

  test('renders checkbox when row.original.active is true', () => {
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders WarningAmberIcon when row.original.forecastIncorrect is true', () => {
    expect(screen.getByTestId('WarningAmberIcon')).toBeInTheDocument();
  });

  test('renders ErrorOutlineIcon when row.original.forecastMissing is true', () => {
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
  });

  test('calls handleCheckboxChange when checkbox is clicked', () => {
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockHandleCheckboxChange).toHaveBeenCalledTimes(1);
  });
  test('checkbox is checked based on rowSelection prop', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});

describe('CellcheckboxComponent', () => {
  const mockHandleCheckboxChange = jest.fn();
  const mockSetRowSelection = jest.fn();

  const rowSelection = { 1: false };

  const row = {
    id: '1',
    index: 1,
    original: {
      active: true,
      forecastIncorrect: true,
      forecastMissing: true,
      week: 'week',
      unit: 1,
      prevUnits: 2,
      percentChange: 2,
      unit_diff: 2,
      editedUnits: {},
      finalunits: 2,
      approved: true,
      events: [],
      prevEvents: null,
      comment: ''
    }
  };

  beforeEach(() => {
    render(
      <CellCheckboxComponent
        row={row}
        rowSelection={rowSelection}
        handleCheckboxChange={mockHandleCheckboxChange}
        setRowSelection={mockSetRowSelection}
        prevUnits={2}
        cpfEnabled={true}
      />
    );
  });

  test('checkbox is not checked when rowSelection prop is false', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
});
