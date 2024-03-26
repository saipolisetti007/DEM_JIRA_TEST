import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';
import DatePickerComponent from './DatePickerComponent';
import userEvent from '@testing-library/user-event';

moment.locale('en');

describe('DatePickerComponent', () => {
  test('updates the value when a new date is selecetd', async () => {
    // Mock data for the row and column
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

    render(<DatePickerComponent row={row} column={column} />);

    const newDate = moment().add(1, 'days').format('MM/DD/YYYY');
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    await act(async () => {
      userEvent.type(input, newDate);
    });
    await waitFor(() => {
      expect(row._valuesCache[column.id]).toBe(newDate);
    });
  });
});
