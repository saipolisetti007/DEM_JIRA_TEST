import { renderHook } from '@testing-library/react';
import CPFTableColumns from './CPFTableColumns';

describe('PromoGridColumns', () => {
  test('renders correct columns', () => {
    const { result } = renderHook(() => CPFTableColumns());

    const columns = result.current;

    // Test for all columns
    expect(columns).toHaveLength(27);

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {},
          {
            accessorKey: 'product',
            header: 'Product'
          },
          {
            accessorKey: 'wk1',
            header: 'Wk1'
          }
        )
      ])
    );
  });
});
