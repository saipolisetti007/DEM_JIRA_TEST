import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputRadioComponent from './InputRadioComponent';

describe('InputRadio Component', () => {
  test('should render with correct label and options', () => {
    const row = {
      original: { eventRadio: true },
      _valuesCache: {}
    };
    const column = {
      columnDef: {
        header: 'eventRadio'
      },
      id: 'eventRadio'
    };

    const { getByLabelText } = render(<InputRadioComponent row={row} column={column} />);

    expect(getByLabelText('Yes')).toBeInTheDocument();
    expect(getByLabelText('No')).toBeInTheDocument();

    expect(getByLabelText('Yes').checked).toBe(true);
    expect(getByLabelText('No').checked).toBe(false);
  });

  test('should update value on option selection', () => {
    const row = {
      original: { eventRadio: false },
      _valuesCache: {}
    };
    const column = {
      columnDef: {
        header: 'eventRadio'
      },
      id: 'eventRadio'
    };

    const { getByLabelText } = render(<InputRadioComponent row={row} column={column} />);

    expect(getByLabelText('Yes').checked).toBe(false);
    expect(getByLabelText('No').checked).toBe(true);

    // Select "Yes" option
    fireEvent.click(getByLabelText('Yes'));
    expect(getByLabelText('Yes').checked).toBe(true);
    expect(getByLabelText('No').checked).toBe(false);

    // Select "No" option
    fireEvent.click(getByLabelText('No'));
    expect(getByLabelText('Yes').checked).toBe(false);
    expect(getByLabelText('No').checked).toBe(true);
  });

  test('should select neither Yes, No when value null', () => {
    const row = {
      original: { eventRadio: null },
      _valuesCache: {}
    };
    const column = {
      columnDef: {
        header: 'eventRadio'
      },
      id: 'eventRadio'
    };

    const { getByLabelText } = render(<InputRadioComponent row={row} column={column} />);

    expect(getByLabelText('Yes').checked).toBe(false);
    expect(getByLabelText('No').checked).toBe(false);
  });
});
