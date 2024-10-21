import { useEffect, useMemo, useState } from 'react';
import EventList from './EventList';
import React from 'react';

type NewForecastColumnsPropsType = {
  selectedUnit: string | null;
  convertedUnits: Function;
  editedValues: Record<string, any>;
  handleEditUnits: Function;
  cpfEnabled: boolean;
};

const NewForecastColumns = ({
  selectedUnit,
  convertedUnits,
  editedValues,
  handleEditUnits,
  cpfEnabled
}: NewForecastColumnsPropsType) => {
  // State to manage local edit values
  const [localEditValues, setLocalEditValues] = useState({});
  // Handle change in edit input fields
  const handleEditChange = (rowIndex: number, columnId: number, value: string) => {
    setLocalEditValues((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [columnId]: value
      }
    }));
  };

  // Handle blur event to save edited values
  const handleBlur = (rowIndex: number, columnId: number) => {
    if (localEditValues[rowIndex] && localEditValues[rowIndex][columnId] !== undefined) {
      handleEditUnits(rowIndex, columnId, localEditValues[rowIndex][columnId]);
    }
  };

  // Reset local edit values when selected unit changes
  useEffect(() => {
    setLocalEditValues({});
  }, [selectedUnit]);

  // Define columns for the forecast table
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
          if (value == null) {
            return ' ';
          }
          const numericValue = Number(value);
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
        enableEditing: cpfEnabled && ((row) => row.original.active),
        Cell: ({ row, column }) => convertedUnits(row.original[column.id], selectedUnit),
        muiEditTextFieldProps: ({ row, column }) => ({
          type: 'number',
          size: 'small' as 'small' | 'medium',
          'data-testid': 'editedUnit',
          className: 'edited-unit',
          value:
            localEditValues?.[row.index]?.[column.id] !== undefined
              ? localEditValues?.[row.index]?.[column.id]
              : convertedUnits(row.original[column.id], selectedUnit) || '',
          onChange: (event) => {
            handleEditChange(row.index, column.id, event.target.value);
          },
          onBlur: () => {
            handleBlur(row.index, column.id);
          },
          disabled: !cpfEnabled,
          style: { color: !cpfEnabled ? 'gray' : undefined }
        })
      },
      {
        accessorKey: 'finalunits',
        header: 'Final Units',
        Cell: ({ row, column }) => convertedUnits(row.original[column.id], selectedUnit),
        enableEditing: false
      },
      {
        accessorKey: 'events',
        header: 'Event type',
        Cell: ({ cell }) => <EventList events={cell.getValue()} />,
        enableEditing: false
      }
    ],
    [selectedUnit, handleEditUnits, editedValues, localEditValues, cpfEnabled]
  );

  return columns;
};
export default NewForecastColumns;
