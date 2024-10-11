import { renderHook, render } from '@testing-library/react';
import ManualDaColumns from './ManualDaColumns';
import { Provider } from 'react-redux';
import store from '../../store/store';

const renderHookRedux = (hook) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return renderHook(hook, { wrapper });
};
const data = [
  {
    id: 1,
    da_id: 1,
    da_line: '1',
    da_name: 'da_1',
    country_code: 'US',
    status: 'Submitted',
    customer_id: '2000038293',
    customer_name: 'TGT-US',
    event_description: '11/10 P9 Cascade Endcap',
    rdd_start: '2024-11-01',
    ship_start: null,
    item_gtin: '30772128428',
    case_gtin: null,
    fpc: null,
    item_type: 'In & Out',
    customer_item_number: null,
    org: null,
    comment: null,
    sub_sector: 'HomeCare',
    category: 'AUTODISH',
    description: 'CASC AP Plat Fresh Sc 4/27ct',
    customized_code: 'Yes',
    volume_split_method: 'Volume',
    uom: 'IT',
    destination_profile: null,
    total_volume: 30000,
    total_volume_su: 30000,
    vol_1: 30000,
    vol_2: null,
    vol_3: null,
    vol_4: null,
    vol_5: null,
    vol_6: null,
    vol_7: null,
    vol_8: null,
    vol_9: null,
    vol_10: null,
    vol_11: null,
    vol_12: null,
    vol_13: null,
    vol_14: null,
    vol_15: null,
    vol_16: null,
    vol_17: null,
    vol_18: null,
    vol_19: null,
    vol_20: null,
    vol_21: null,
    vol_22: null,
    vol_23: null,
    vol_24: null,
    last_modified_user_id: 'nag.d',
    created: '2024-10-09',
    last_modified: '2024-10-09'
  }
];
describe('ManualDaColumns', () => {
  test('renders correct columns for EU region', () => {
    const { result } = renderHookRedux(() => ManualDaColumns({ region: 'EU', data: data }));
    const columns = result.current;
    // Test for all columns in EU region
    expect(columns).toHaveLength(49);
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
          { accessorKey: 'ship_start', header: 'Ship Start' },
          { accessorKey: 'status', header: 'Status', Cell: expect.any(Function) }
        )
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
    const { result } = renderHookRedux(() => ManualDaColumns({ region: 'US', data: data }));
    const columns = result.current;
    // Test for all columns in non-EU region
    expect(columns).toHaveLength(49);
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
