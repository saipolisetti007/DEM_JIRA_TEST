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
    const validationErrors = {};
    const handleChange = jest.fn();
    const { result } = renderHookRedux(() => PromoGridColumns({ validationErrors, handleChange }));

    const columns = result.current;

    // Test for all columns
    expect(columns).toHaveLength(46);

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {},
          {
            accessorKey: 'cpf_id',
            header: 'CPF ID',
            muiEditTextFieldProps: {
              error: expect.any(Boolean),
              helperText: expect.anything(),
              onChange: expect.any(Function),
              required: true,
              variant: 'outlined'
            }
          },
          {
            accessorKey: 'golden_customer_id',
            header: 'Golden Customer ID',
            muiEditTextFieldProps: {
              error: expect.any(Boolean),
              helperText: expect.anything(),
              onChange: expect.any(Function),
              required: true,
              variant: 'outlined'
            }
          }
        )
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
      row.original[column.id] = null;
      expect(column.Cell({ row, column })).toBe('');
    });
  });

  test('checks required fields', () => {
    const validationErrors = {};
    const handleChange = jest.fn();
    const { result } = renderHookRedux(() => PromoGridColumns({ validationErrors, handleChange }));

    const columns = result.current;

    const requiredColumns = columns.filter((column) => column.muiEditTextFieldProps?.required);

    requiredColumns.forEach((column) => {
      expect(column.muiEditTextFieldProps.required).toBe(true);
    });
  });

  test('checks for radio cell values', () => {
    const validationErrors = {};
    const handleChange = jest.fn();
    const { result } = renderHookRedux(() => PromoGridColumns({ validationErrors, handleChange }));

    const columns = result.current;

    const radioColumns = columns.filter((column) => typeof column.Cell === 'function');

    radioColumns.forEach((column) => {
      const row = { original: { [column.id]: true } };
      expect(column.Cell({ row, column })).toBe('Yes');
      row.original[column.id] = false;
      expect(column.Cell({ row, column })).toBe('No');
      row.original[column.id] = null;
      expect(column.Cell({ row, column })).toBe('');
    });
  });
});
