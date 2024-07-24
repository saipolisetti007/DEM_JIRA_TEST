import { renderHook, act, waitFor } from '@testing-library/react';
import NewForecastColumns from './NewForecastColumns';

describe('NewForecastColumns', () => {
  const selectedUnit = 'su';
  let convertedUnits;
  let handleEditUnits;
  beforeEach(() => {
    // eslint-disable-next-line no-unused-vars
    convertedUnits = jest.fn((value, unit) => value * 10);
    handleEditUnits = jest.fn();
  });

  test('renders correct columns', () => {
    const { result } = renderHook(() =>
      NewForecastColumns({
        selectedUnit,
        convertedUnits: convertedUnits,
        handleEditUnits: handleEditUnits,
        editedValues: {}
      })
    );

    const columns = result.current;
    expect(columns).toHaveLength(6);
    const headers = ['Weeks', '% Change', 'Unit Diff', 'Units', 'Edited Units', 'Final Units'];
    headers.forEach((header, index) => {
      expect(columns[index].header).toBe(header);
    });
  });
  test('handles local change correctly', () => {
    const { result } = renderHook(() =>
      NewForecastColumns({
        selectedUnit,
        convertedUnits: convertedUnits,
        handleEditUnits: handleEditUnits,
        editedValues: {}
      })
    );

    const columns = result.current;
    const editUnitColumn = columns.find((col) => col.accessorKey === 'editedUnits');

    const row = { index: 0, original: { editedUnits: 5, active: true } };
    const column = { id: 'editedUnits' };

    act(() => {
      editUnitColumn.muiEditTextFieldProps({ row, column }).onChange({
        target: { value: '20' }
      });
    });

    const cellValue = result.current
      .find((col) => col.accessorKey === 'editedUnits')
      .muiEditTextFieldProps({ row, column }).value;
    expect(cellValue).toBe('20');
  });
  test('handles blur correctly', () => {
    const { result } = renderHook(() =>
      NewForecastColumns({
        selectedUnit,
        convertedUnits: convertedUnits,
        handleEditUnits: handleEditUnits,
        editedValues: {}
      })
    );

    const columns = result.current;
    const editUnitColumn = columns.find((col) => col.accessorKey === 'editedUnits');

    const row = { index: 0, original: { editedUnits: 5, active: true } };
    const column = { id: 'editedUnits' };

    act(() => {
      editUnitColumn.muiEditTextFieldProps({ row, column }).onChange({
        target: { value: '20' }
      });
    });

    act(() => {
      editUnitColumn.muiEditTextFieldProps({ row, column }).onBlur();
    });

    const cellValue = result.current
      .find((col) => col.accessorKey === 'editedUnits')
      .muiEditTextFieldProps({ row, column }).value;

    expect(cellValue).toBe('20');

    waitFor(() => {
      expect(handleEditUnits).toHaveBeenCalledWith(0, 'editedUnits', '20');
    });
  });
  test('Cell renders converted value correctly', () => {
    const { result } = renderHook(() =>
      NewForecastColumns({
        selectedUnit,
        convertedUnits: convertedUnits,
        handleEditUnits: handleEditUnits,
        editedValues: {}
      })
    );

    const columns = result.current;

    const rowColumns = columns.filter((column) => typeof column.Cell === 'function');

    rowColumns.forEach((column) => {
      if (column.accessorKey === 'percentChange') {
        const row = { original: { [column.id]: 5 } };
        expect(column.Cell({ row, column })).toBe('5.00%');
      } else {
        const row = { original: { [column.id]: 5 } };
        waitFor(() => {
          expect(convertedUnits).toHaveBeenCalledWith(5, selectedUnit);
        });
        expect(column.Cell({ row, column })).toBe(50);
      }
    });
  });
});
