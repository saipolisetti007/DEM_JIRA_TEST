import { renderHook } from '@testing-library/react';
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
    const columns = result.current;
    // Test for all columns in EU region
    expect(columns).toHaveLength(23);
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {},
          {
            accessorKey: 'da_id',
            header: 'DA ID'
          },
          {
            accessorKey: 'gda_line',
            header: 'DA Line ID'
          },
          { accessorKey: 'ship_start', header: 'Ship Start' }
        )
      ])
    );
  });
  test('renders correct columns for non-EU region', () => {
    const { result } = renderHookRedux(() => ManualDaColumns({ region: 'US' }));
    const columns = result.current;
    // Test for all columns in non-EU region
    expect(columns).toHaveLength(23);
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {},
          {
            accessorKey: 'da_id',
            header: 'DA ID'
          },
          {
            accessorKey: 'gda_line',
            header: 'DA Line ID'
          },
          { accessorKey: 'rdd_start', header: 'RDD Start' }
        )
      ])
    );
  });
});
