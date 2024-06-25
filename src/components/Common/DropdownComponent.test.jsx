import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownComponent from './DropdownComponent';

// Mock data for testing
const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
const mockEventRow = { original: { event_type: '' }, index: 0, _valuesCache: {} };
const mockEventSybTypeRow = { original: { event_subtype: '' }, _valuesCache: {} };
const mockColumnEvent = { id: 'event_type' };
const mockColumnEventSubType = { id: 'event_subtype' };

describe('DropdownComponent', () => {
  test('renders without crashing', () => {
    render(
      <DropdownComponent
        row={mockEventRow}
        column={mockColumnEvent}
        label="Event Type"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isEventSelected={true}
      />
    );

    expect(screen.getByLabelText('Event Type')).toBeInTheDocument();
  });
  test('displays "Please select a Event Type first" when event type is not selected', () => {
    render(
      <DropdownComponent
        row={mockEventSybTypeRow}
        column={mockColumnEventSubType}
        label="Event Subtype"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={false}
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
        helpertext=""
        onChange={jest.fn()}
        isCountrySelected={true}
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
        helpertext=""
        onChange={mockOnChange}
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
        helpertext=""
        onChange={mockOnChange}
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
        row={{ original: { event_type: 'Option 2' }, index: 0, _valuesCache: {} }}
        column={mockColumnEvent}
        label="Event Type"
        options={mockOptions}
        isError={false}
        helpertext=""
        onChange={mockOnChange}
      />
    );

    expect(mockOnChange).toHaveBeenCalledWith('Option 2');
  });
});
