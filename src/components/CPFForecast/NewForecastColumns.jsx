import { useMemo } from 'react';

const NewForecastColumns = ({ selectedUnit, convertedUnits, editedValues, handleEditUnits }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'week',
        header: 'Weeks',
        enableEditing: false,
        size: 100
      },
      {
        accessorKey: 'percentChange',
        header: '% Change',
        enableEditing: false,
        Cell: ({ row, column }) => {
          const value = row.original[column.id];
          const numericValue = value != null ? Number(value) : 0;
          return `${numericValue.toFixed(2)}%`;
        }
      },
      {
        accessorKey: 'unit_diff',
        header: 'Unit Diff',
        Cell: ({ row, column }) => convertedUnits(row.original[column.id], selectedUnit),
        enableEditing: false
      },
      {
        accessorKey: 'unit',
        header: 'Units',
        Cell: ({ row, column }) => convertedUnits(row.original[column.id], selectedUnit),
        enableEditing: false
      },
      {
        accessorKey: 'editedUnits',
        header: 'Edited Units',
        enableEditing: (row) => row.original.active,
        Cell: ({ row, column }) => convertedUnits(row.original[column.id], selectedUnit),
        muiEditTextFieldProps: ({ row, column }) => ({
          type: 'number',
          size: 'small',
          className: 'edited-unit',
          value:
            editedValues?.[row.index]?.[column.id] !== undefined
              ? editedValues?.[row.index]?.[column.id]
              : convertedUnits(row.original[column.id], selectedUnit) || '',
          onChange: (event) => {
            handleEditUnits(row.index, column.id, event.target.value);
          }
        })
      },
      {
        accessorKey: 'finalunits',
        header: 'Final Units',
        Cell: ({ row, column }) => convertedUnits(row.original[column.id], selectedUnit),
        enableEditing: false
      }
    ],
    [selectedUnit, handleEditUnits, editedValues]
  );

  return columns;
};
export default NewForecastColumns;
