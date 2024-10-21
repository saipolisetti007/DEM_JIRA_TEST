import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';
import DatePickerComponent from './DatePickerComponent';
import userEvent from '@testing-library/user-event';

moment.locale('en');

describe('DatePickerComponent', () => {
  const handleInputChangeMock = jest.fn();
  test('updates the value when a new date is selected', async () => {
    const row = {
      original: {
        date: moment().format('MM/DD/YYYY')
      },
      _valuesCache: {},
      id: '1',
      index: 1
    };
    const column = {
      columnDef: {
        header: 'Date',
        columnDefType: 'date'
      },
      id: 'date'
    };

    render(
      <DatePickerComponent
        row={row}
        column={column}
        handleInputChange={handleInputChangeMock}
        isRequired={true}
        isWarning={false}
        isError={false}
        helperText={'helperText'}
        validationType="startDate"
        startDateField="event_in_store_start_date"
      />
    );

    const newDate = moment().add(1, 'days').format('MM/DD/YYYY');
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    await act(async () => {
      userEvent.type(input, newDate);
    });
  });
  test('Start Date validation', async () => {
    const row = {
      original: {
        date: moment().format('MM/DD/YYYY')
      },
      _valuesCache: {},
      id: '1',
      index: 1
    };
    const column = {
      columnDef: {
        header: 'Date',
        columnDefType: 'date'
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
        isWarning={false}
        isError={false}
        helperText={'helperText'}
        handleInputChange={handleInputChangeMock}
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
      _valuesCache: {},
      id: '1',
      index: 1
    };
    const column = {
      columnDef: {
        header: 'Date',
        columnDefType: 'date'
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
        isWarning={false}
        isError={false}
        helperText={'helperText'}
        handleInputChange={handleInputChangeMock}
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
      },
      id: '1',
      index: 1
    };
    const column = {
      columnDef: {
        header: 'Date',
        columnDefType: 'date'
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
        isWarning={false}
        isError={false}
        helperText={'helperText'}
        handleInputChange={handleInputChangeMock}
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
      },
      id: '1',
      index: 1
    };
    const column = {
      columnDef: {
        header: 'Date',
        columnDefType: 'date'
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
        isWarning={false}
        isError={false}
        helperText={'helperText'}
        handleInputChange={handleInputChangeMock}
      />
    );
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
