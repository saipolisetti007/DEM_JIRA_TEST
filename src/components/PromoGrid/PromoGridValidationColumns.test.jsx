import { renderHook } from '@testing-library/react';
import PromoGridValidationColumns from './PromoGridValidationColumns';

describe('PromoGridColumns', () => {
  test('renders correct columns', () => {
    const validationErrors = {};
    const handleInputChange = jest.fn();
    const { result } = renderHook(() =>
      PromoGridValidationColumns({ validationErrors, handleInputChange })
    );

    const columns = result.current;

    // Test for all columns
    expect(columns).toHaveLength(47);

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {},
          {
            accessorKey: 'unique_event_id',
            header: 'Unique Event Id',
            enableEditing: false
          },
          {
            accessorKey: 'golden_customer_id',
            header: 'Golden Customer ID',
            Edit: expect.any(Function)
          }
        )
      ])
    );
  });

  test('calls Edit function with correct arguments', () => {
    const validationErrors = {};
    const handleInputChange = jest.fn();
    const { result } = renderHook(() =>
      PromoGridValidationColumns({ validationErrors, handleInputChange })
    );

    const columns = result.current;

    columns.forEach((column) => {
      if (column.Edit) {
        const mockRow = { id: 1 };
        const mockColumn = { id: 'testColumn' };
        column.Edit({ row: mockRow, column: mockColumn });
      }
    });
  });
});
