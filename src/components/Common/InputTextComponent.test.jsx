import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputTextComponent from './InputTextComponent';

describe('InputText Component', () => {
  const mockHandleInputChange = jest.fn();
  const row = {
    index: 1,
    original: { columnName: 'Value' }
  };
  const column = {
    columnDef: {
      header: 'Column Name'
    },
    id: 'columnName'
  };
  const isRequired = true;
  const isError = false;
  const helperText = 'Helper Text';
  const validationType = 'type';
  test('should render without crashing', () => {
    render(
      <InputTextComponent row={row} column={column} handleInputChange={mockHandleInputChange} />
    );
  });
  test('renders error message when error is true', () => {
    render(
      <InputTextComponent
        row={row}
        column={column}
        isRequired={isRequired}
        isError={true}
        helperText="Error message"
        validationType={validationType}
        handleInputChange={mockHandleInputChange}
      />
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('initializes with correct initial state values', () => {
    render(
      <InputTextComponent
        row={row}
        column={column}
        isRequired={isRequired}
        isError={isError}
        helperText={helperText}
        validationType={validationType}
        handleInputChange={mockHandleInputChange}
      />
    );
    const inputElement = screen.getByRole('textbox', { name: 'Column Name' });
    expect(inputElement.value).toBe('Value');
  });
  test('initializes row value is undefined', () => {
    const row = { original: {}, index: 1 };
    render(
      <InputTextComponent
        row={row}
        column={column}
        isRequired={isRequired}
        isError={isError}
        helperText={helperText}
        validationType={validationType}
        handleInputChange={mockHandleInputChange}
      />
    );
    const inputElement = screen.getByRole('textbox', { name: 'Column Name' });
    expect(inputElement.value).toBe('');
  });

  test('updates state and calls handleTextChange', () => {
    render(
      <InputTextComponent
        row={row}
        column={column}
        isRequired={isRequired}
        isError={isError}
        helperText={helperText}
        validationType={validationType}
        handleInputChange={mockHandleInputChange}
      />
    );
    const inputElement = screen.getByRole('textbox', { name: 'Column Name' });
    expect(inputElement.value).toBe('Value');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(inputElement.value).toBe('New Value');
    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    expect(mockHandleInputChange).toHaveBeenCalledWith('New Value', 1, 'columnName', '', 'type');
  });
});
