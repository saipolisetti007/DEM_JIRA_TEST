import { renderHook, waitFor, render } from '@testing-library/react';
import PreviousForecastColumns from './PreviousForecastColumns';

describe('PreviousForecastColumns', () => {
  const selectedUnit = 'su';
  let convertedUnits;

  beforeEach(() => {
    // eslint-disable-next-line no-unused-vars
    convertedUnits = jest.fn((value, unit) => value * 10);
  });

  test('renders correct columns', () => {
    const { result } = renderHook(() =>
      PreviousForecastColumns({
        selectedUnit,
        convertedUnits: convertedUnits
      })
    );

    const columns = result.current;
    expect(columns).toHaveLength(2);
    const headers = ['Units', 'Event type'];
    headers.forEach((header, index) => {
      expect(columns[index].header).toBe(header);
    });
  });

  test('Cell renders converted value correctly', () => {
    const { result } = renderHook(() =>
      PreviousForecastColumns({
        selectedUnit,
        convertedUnits: convertedUnits
      })
    );

    const columns = result.current;

    const rowColumns = columns.filter((column) => typeof column.Cell === 'function');

    rowColumns.forEach((column) => {
      const cellProps = {
        cell: {
          getValue: jest.fn(() => {
            if (column.accessorKey === 'prevEvents') {
              return [
                {
                  event_type: 'Display',
                  event_subtype: 'Fence',
                  event_start: '2024-08-09',
                  event_end: '2024-09-22'
                },
                {
                  event_type: 'MVM',
                  event_subtype: 'Single Item Discount',
                  event_start: '2024-06-17',
                  event_end: '2024-09-23'
                }
              ];
            }
            return 'Sample Value';
          })
        }
      };

      if (column.accessorKey === 'prevEvents') {
        render(<column.Cell {...cellProps} />);
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
