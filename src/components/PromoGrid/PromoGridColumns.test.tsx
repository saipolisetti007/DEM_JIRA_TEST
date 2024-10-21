import React from 'react';
import { renderHook } from '@testing-library/react';
import PromoGridColumns from './PromoGridColumns';
import { Provider } from 'react-redux';
import store from '../../store/store';

const renderHookRedux = (hook) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return renderHook(hook, { wrapper });
};

describe('PromoGridColumns', () => {
  test('renders correct columns', () => {
    const handleChange = jest.fn();
    const { result } = renderHookRedux(() => PromoGridColumns({ region: 'NA' }));

    const columns = result.current as Array<any>;

    // Test for all columns
    expect(columns).toHaveLength(46);

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          accessorKey: 'cpf_id',
          header: 'CPF ID',
          grow: false,
          size: 150
        })
      ])
    );

    const columnsWithOnChange = columns.filter((column) => column?.muiEditTextFieldProps?.onChange);

    columnsWithOnChange.forEach((column) => {
      column.muiEditTextFieldProps.onChange({ target: { value: 'test' } });
    });
    expect(handleChange).toHaveBeenCalledTimes(columnsWithOnChange.length);

    const columnswithCellFunction = columns.filter((column) => typeof column.Cell === 'function');

    columnswithCellFunction.forEach((column) => {
      const row = { original: { [column.id]: true } };
      expect(column.Cell({ row, column })).toBe('Yes');
      row.original[column.id] = false;
      expect(column.Cell({ row, column })).toBe('No');
    });
  });

  test('checks for radio cell values', () => {
    const { result } = renderHookRedux(() => PromoGridColumns({ region: 'EU' }));

    const columns = result.current as Array<any>;

    const radioColumns = columns.filter((column) => typeof column.Cell === 'function');

    radioColumns.forEach((column) => {
      const row = { original: { [column.id]: true as boolean | null } };
      expect(column.Cell({ row, column })).toBe('Yes');
      row.original[column.id] = false;
      expect(column.Cell({ row, column })).toBe('No');
      row.original[column.id] = null;
      expect(column.Cell({ row, column })).toBe('');
    });
  });
});
