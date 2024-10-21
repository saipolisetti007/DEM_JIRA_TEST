import { useMemo } from 'react';
import EventList from './EventList';
import React from 'react';
// Define columns for the previous forecast table
type PreviousForecastColumnsPropsType = {
  selectedUnit: string | null;
  convertedUnits: Function;
};

const PreviousForecastColumns = ({
  selectedUnit,
  convertedUnits
}: PreviousForecastColumnsPropsType) => {
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
    [selectedUnit, convertedUnits]
  );

  return columns;
};
export default PreviousForecastColumns;
