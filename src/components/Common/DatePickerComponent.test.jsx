import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';
import DatePickerComponent from './DatePickerComponent';
import userEvent from '@testing-library/user-event';

moment.locale('en');

describe('DatePickerComponent', () => {
  test('updates the value when a new date is selected', async () => {
    const handleInputChangeMock = jest.fn();
    const row = {
      original: {
        date: moment().format('MM/DD/YYYY')
      },
      _valuesCache: {}
    };
    const column = {
      columnDef: {
        header: 'Date'
      },
      id: 'date'
    };

    render(
      <DatePickerComponent row={row} column={column} handleInputChange={handleInputChangeMock} />
    );

    const newDate = moment().add(1, 'days').format('MM/DD/YYYY');
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    await act(async () => {
      userEvent.type(input, newDate);
    });
    await waitFor(() => {
      expect(row._valuesCache[column.id]).toBe(newDate);
      expect(handleInputChangeMock).toHaveBeenCalledWith(newDate, row.index, column.id, null);
    });
  });
  test('Start Date validation', async () => {
    const row = {
      original: {
        date: moment().format('MM/DD/YYYY')
      },
      _valuesCache: {}
    };
    const column = {
      columnDef: {
        header: 'Date'
      },
      id: 'date'
    };

    render(
      <DatePickerComponent
        row={row}
        column={column}
        validationType="startDate"
        startDateField="startDateField"
      />
    );

    const currentDate = moment().format('MM/DD/YYYY');
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    await act(async () => {
      userEvent.type(input, currentDate);
    });
  });
  test('Start Date required validation on change', async () => {
    const row = {
      original: {
        date: moment().format('MM/DD/YYYY')
      },
      _valuesCache: {}
    };
    const column = {
      columnDef: {
        header: 'Date'
      },
      id: 'date'
    };

    render(
      <DatePickerComponent
        row={row}
        column={column}
        validationType="startDate"
        startDateField="startDateField"
        isRequired={true}
      />
    );

    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
  test('End Date validation', async () => {
    const row = {
      original: {
        date: moment().format('MM/DD/YYYY')
      },
      _valuesCache: {
        startDateField: moment().format('MM/DD/YYYY')
      }
    };
    const column = {
      columnDef: {
        header: 'Date'
      },
      id: 'date'
    };

    render(
      <DatePickerComponent
        row={row}
        column={column}
        validationType="endDate"
        startDateField="startDateField"
      />
    );

    const endDate = moment().subtract(1, 'days').format('MM/DD/YYYY');
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    await act(async () => {
      userEvent.type(input, endDate);
    });
    await waitFor(() => {
      expect(screen.queryByText('End Date should be equal/after start date')).toBeInTheDocument();
    });
  });
  test('End Date required validation', async () => {
    const row = {
      original: {
        date: moment().format('MM/DD/YYYY')
      },
      _valuesCache: {
        startDateField: moment().format('MM/DD/YYYY')
      }
    };
    const column = {
      columnDef: {
        header: 'Date'
      },
      id: 'date'
    };

    render(
      <DatePickerComponent
        row={row}
        column={column}
        validationType="endDate"
        startDateField="startDateField"
        isRequired={true}
      />
    );
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
