import { useMemo } from 'react';
import EventList from './EventList';
// Define columns for the previous forecast table
const PreviousForecastColumns = ({ selectedUnit, convertedUnits }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'prevUnits',
        header: 'Units',
        Cell: ({ row, column }) => convertedUnits(row.original[column.id], selectedUnit)
      },
      {
        accessorKey: 'prevEvents',
        header: 'Event type',
        Cell: ({ cell }) => <EventList events={cell.getValue()} />,
        enableEditing: false
      }
    ],
    [selectedUnit]
  );

  return columns;
};
export default PreviousForecastColumns;
