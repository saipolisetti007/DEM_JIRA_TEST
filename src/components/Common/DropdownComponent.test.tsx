import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownComponent from './DropdownComponent';
const handleInputChange = jest.fn();
// Mock data for testing
const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
const mockEventRow = { original: { event_type: '' }, index: 0, _valuesCache: {}, id: '0' };
const mockEventSybTypeRow = {
  original: { event_subtype: '' },
  _valuesCache: {},
  id: '0',
  index: 0
};
const mockColumnEvent = {
  id: 'event_type',
  columnDef: {
    header: 'Event Type',
    columnDefType: 'string'
  }
};
const mockColumnEventSubType = {
  id: 'event_subtype',
  columnDef: {
    header: 'Event SubType',
    columnDefType: 'string'
  }
};

describe('DropdownComponent', () => {
  test('calls onChange with the correct value when an option is selected', () => {
    const mockOnChange = jest.fn();
    render(
      <DropdownComponent
        row={mockEventRow}
        column={mockColumnEvent}
        label="Event Type"
        options={mockOptions}
        isError={false}
        helperText=""
        onChange={mockOnChange}
        isEventSelected={true}
        handleInputChange={handleInputChange}
      />
    );

    fireEvent.mouseDown(screen.getByLabelText('Event Type'));
    fireEvent.click(screen.getByText(mockOptions[0]));

    expect(mockOnChange).toHaveBeenCalledWith(mockOptions[0]);
  });
  test('displays "Please select a Event Type first" when event type is not selected', () => {
    render(
      <DropdownComponent
        row={mockEventSybTypeRow}
        column={mockColumnEventSubType}
        label="Event Subtype"
        options={mockOptions}
        isError={false}
        helperText=""
        onChange={jest.fn()}
        isEventSelected={false}
        handleInputChange={handleInputChange}
      />
    );

    fireEvent.mouseDown(screen.getByLabelText('Event Subtype'));

    expect(screen.getByText('Please select event type first')).toBeInTheDocument();
  });
  test('displays subtypes options when event type is selected', () => {
    render(
      <DropdownComponent
        row={mockEventSybTypeRow}
        column={mockColumnEventSubType}
        label="Event Subtype"
        options={mockOptions}
        isError={false}
        helperText=""
        onChange={jest.fn()}
        handleInputChange={handleInputChange}
        isEventSelected={false}
      />
    );

    fireEvent.mouseDown(screen.getByLabelText('Event Subtype'));
    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
  test('calls onChange with the correct value when an option is selected', () => {
    const mockOnChange = jest.fn();
    render(
      <DropdownComponent
        row={mockEventRow}
        column={mockColumnEvent}
        label="Event Type"
        options={mockOptions}
        isError={false}
        helperText=""
        onChange={mockOnChange}
        isEventSelected={false}
        handleInputChange={handleInputChange}
      />
    );

    fireEvent.mouseDown(screen.getByLabelText('Event Type'));
    fireEvent.click(screen.getByText(mockOptions[0]));

    expect(mockOnChange).toHaveBeenCalledWith(mockOptions[0]);
  });
  test('calls clearEvents and handleInputChange when value changes', () => {
    const mockOnChange = jest.fn();
    const mockClearEventErrors = jest.fn();
    const mockHandleInputChange = jest.fn();
    const rowIndex = mockEventRow.index;
    render(
      <DropdownComponent
        row={mockEventRow}
        column={mockColumnEvent}
        label="Event Type"
        options={mockOptions}
        isError={false}
        helperText=""
        onChange={mockOnChange}
        isEventSelected={false}
        clearEventErrors={mockClearEventErrors}
        handleInputChange={mockHandleInputChange}
      />
    );

    fireEvent.mouseDown(screen.getByLabelText('Event Type'));
    fireEvent.click(screen.getByText(mockOptions[0]));

    expect(mockClearEventErrors).toHaveBeenCalledWith(mockOptions[0], 'event_type');
    expect(mockHandleInputChange).toHaveBeenCalledWith(
      mockOptions[0],
      rowIndex,
      'event_type',
      null
    );
  });
  test('calls onChange with row value when an isInitValue is true', () => {
    const mockOnChange = jest.fn();
    render(
      <DropdownComponent
        row={{ original: { event_type: 'Option 2' }, index: 0, _valuesCache: {}, id: '0' }}
        column={mockColumnEvent}
        label="Event Type"
        options={mockOptions}
        isError={false}
        helperText=""
        handleInputChange={handleInputChange}
        onChange={mockOnChange}
        isEventSelected={false}
      />
    );

    expect(mockOnChange).toHaveBeenCalledWith('Option 2');
  });
});
