import React from 'react';
import { renderHook, render } from '@testing-library/react';
import ManualDaColumns from './ManualDaColumns';
import { Provider } from 'react-redux';
import store from '../../store/store';

const renderHookRedux = (hook) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return renderHook(hook, { wrapper });
};

describe('ManualDaColumns', () => {
  test('renders correct columns for EU region', () => {
    const { result } = renderHookRedux(() => ManualDaColumns({ region: 'EU' }));
    const columns = result.current as Array<any>;
    // Test for all columns in EU region
    expect(columns).toHaveLength(49);
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          accessorKey: 'da_id',
          header: 'DA ID'
        })
      ])
    );
    const rowColumns = columns.filter((column) => typeof column.Cell === 'function');
    const row = { original: { status: 'Submitted' } };
    const columnprops = { id: 'status' };
    rowColumns.forEach((column) => {
      if (column.accessorKey === 'status') {
        render(<column.Cell row={row} column={columnprops} />);
      }
    });
  });

  test('renders correct columns for non-EU region', () => {
    const { result } = renderHookRedux(() => ManualDaColumns({ region: 'US' }));
    const columns = result.current;
    // Test for all columns in non-EU region
    expect(columns).toHaveLength(49);
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          accessorKey: 'da_id',
          header: 'DA ID'
        })
      ])
    );
  });
});
