import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputRadioComponent from './InputRadioComponent';

describe('InputRadioComponent', () => {
  const mockHandleInputChange = jest.fn();
  const row = {
    original: { eventRadio: false },
    index: 0,
    _valuesCache: {}
  };
  const column = {
    columnDef: {
      header: 'eventRadio'
    },
    id: 'eventRadio'
  };

  test('calls handleInputChange on value change', () => {
    render(
      <InputRadioComponent row={row} column={column} handleInputChange={mockHandleInputChange} />
    );

    fireEvent.click(screen.getByLabelText('Yes'));
    expect(mockHandleInputChange).toHaveBeenCalledWith('yes', row.index, column.id, null);
  });

  test('renders error message when error is true', () => {
    render(
      <InputRadioComponent row={row} column={column} isError={true} helperText="Error message" />
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('should render with correct label and options', () => {
    render(<InputRadioComponent row={row} column={column} />);

    expect(screen.getByLabelText('Yes')).toBeInTheDocument();
    expect(screen.getByLabelText('No')).toBeInTheDocument();

    expect(screen.getByLabelText('Yes').checked).toBe(false);
    expect(screen.getByLabelText('No').checked).toBe(true);
  });

  test('should update value on option selection', () => {
    render(<InputRadioComponent row={row} column={column} />);

    expect(screen.getByLabelText('Yes').checked).toBe(false);
    expect(screen.getByLabelText('No').checked).toBe(true);

    // Select "Yes" option
    fireEvent.click(screen.getByLabelText('Yes'));
    expect(screen.getByLabelText('Yes').checked).toBe(true);
    expect(screen.getByLabelText('No').checked).toBe(false);

    // Select "No" option
    fireEvent.click(screen.getByLabelText('No'));
    expect(screen.getByLabelText('Yes').checked).toBe(false);
    expect(screen.getByLabelText('No').checked).toBe(true);
  });

  test('should select neither Yes nor No when value is null', () => {
    const row = {
      original: { eventRadio: null },
      index: 0,
      _valuesCache: {}
    };

    render(<InputRadioComponent row={row} column={column} />);

    expect(screen.getByLabelText('Yes').checked).toBe(false);
    expect(screen.getByLabelText('No').checked).toBe(false);
  });
});
