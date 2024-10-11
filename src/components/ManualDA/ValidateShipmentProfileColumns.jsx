import React, { useMemo } from 'react';
import InputTextComponent from '../Common/InputTextComponent';

const ValidateShipmentProfileColumns = ({ validationErrors, handleInputChange }) => {
  // Memoize the columns array to optimize performance
  const columns = useMemo(
    () => [
      {
        accessorKey: 'destination_profile',
        header: 'Destination Profile ',
        enableEditing: false
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableEditing: false
      },
      {
        accessorKey: 'golden_customer_id',
        header: 'Golden Customer ID',
        enableHiding: true,
        Edit: ({ column, row }) => {
          const isRootRow = !!row.original.subRows; // Root rows have subRows
          return (
            !isRootRow && (
              <InputTextComponent
                row={row}
                column={column}
                isRequired={true}
                isError={!!validationErrors[row.index]?.golden_customer_id}
                helperText={validationErrors[row.index]?.golden_customer_id}
                validationType="intValidation"
                handleInputChange={handleInputChange}
              />
            )
          );
        }
      },

      {
        accessorKey: 'ship_to',
        header: 'Ship to ',
        enableHiding: true,
        Edit: ({ column, row }) => {
          const isRootRow = !!row.original.subRows; // Root rows have subRows
          return (
            !isRootRow && (
              <InputTextComponent
                row={row}
                column={column}
                isRequired={true}
                isError={!!validationErrors[row.index]?.ship_to}
                helperText={validationErrors[row.index]?.ship_to}
                validationType="intValidation"
                handleInputChange={handleInputChange}
              />
            )
          );
        }
      },
      {
        accessorKey: 'percentage_split',
        header: '% Split',
        enableHiding: true,
        Edit: ({ column, row }) => {
          const isRootRow = !!row.original.subRows; // Root rows have subRows
          return (
            !isRootRow && (
              <InputTextComponent
                row={row}
                column={column}
                isRequired={true}
                isError={!!validationErrors[row.index]?.percentage_split}
                helperText={validationErrors[row.index]?.percentage_split}
                validationType="floatValidation"
                handleInputChange={handleInputChange}
              />
            )
          );
        }
      }
    ],
    []
  );
  return columns;
};
export default ValidateShipmentProfileColumns;
