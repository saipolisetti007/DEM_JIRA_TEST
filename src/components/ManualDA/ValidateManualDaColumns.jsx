import React, { useMemo } from 'react';
import InputTextComponent from '../Common/InputTextComponent';
import DatePickerComponent from '../Common/DatePickerComponent';
import DropdownComponent from '../Common/DropdownComponent';
import { useSelector } from 'react-redux';

const ValidateManualDaColumns = ({ validationErrors, validationWarnings, handleInputChange }) => {
  const { countriesData } = useSelector((state) => state.countriesData);
  const { userData } = useSelector((state) => state.userProfileData);
  const region = userData?.region;
  // Memoize the columns array to optimize performance
  const columns = useMemo(
    () => [
      {
        accessorKey: 'da_id',
        header: 'DA ID',
        size: 130,
        enableEditing: false
      },
      {
        accessorKey: 'da_line',
        header: 'DA Line ID',
        size: 130,
        enableEditing: false
      },

      {
        accessorKey: 'da_name',
        header: 'DA Name',
        size: 150,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.da_name}
              helperText={validationErrors[row.index]?.da_name}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'country_code',
        header: 'Country Code',
        size: 120,
        Edit: ({ column, row }) => {
          return (
            <DropdownComponent
              row={row}
              column={column}
              isRequired={true}
              label="Country Code"
              isError={!!validationErrors[row.index]?.country_code}
              helperText={validationErrors[row.index]?.country_code}
              options={countriesData}
              isEventSelected={true}
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'customer_id',
        header: 'Customer ID',
        size: 150,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.customer_id}
              helperText={validationErrors[row.index]?.customer_id}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'customer_name',
        header: 'Customer Name',
        size: 180,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.customer_name}
              helperText={validationErrors[row.index]?.customer_name}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_description',
        header: 'Event Description',
        size: 250,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.event_description}
              helperText={validationErrors[row.index]?.event_description}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      ...(region === 'EU'
        ? []
        : [
            {
              accessorKey: 'rdd_start',
              header: 'RDD Start',
              size: 250,
              Edit: ({ column, row }) => {
                return (
                  <DatePickerComponent
                    row={row}
                    column={column}
                    isRequired={true}
                    isWarning={!!validationWarnings[row.index]?.rdd_start}
                    isError={!!validationErrors[row.index]?.rdd_start}
                    helperText={validationErrors[row.index]?.rdd_start}
                    handleInputChange={handleInputChange}
                  />
                );
              }
            }
          ]),
      ...(region === 'EU'
        ? [
            {
              accessorKey: 'ship_start',
              header: 'Ship Start',
              size: 250,
              Edit: ({ column, row }) => {
                return (
                  <DatePickerComponent
                    row={row}
                    column={column}
                    isRequired={true}
                    isWarning={!!validationWarnings[row.index]?.ship_start}
                    isError={!!validationErrors[row.index]?.ship_start}
                    helperText={validationErrors[row.index]?.ship_start}
                    handleInputChange={handleInputChange}
                  />
                );
              }
            }
          ]
        : []),
      {
        accessorKey: 'item_gtin',
        header: 'Item GTIN',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.item_gtin}
              helperText={validationErrors[row.index]?.item_gtin}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'case_gtin',
        header: 'Case GTIN',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.case_gtin}
              helperText={validationErrors[row.index]?.case_gtin}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'fpc',
        header: 'FPC',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.fpc}
              helperText={validationErrors[row.index]?.fpc}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'item_type',
        header: 'Item Type',
        size: 130,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.item_type}
              helperText={validationErrors[row.index]?.item_type}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'customer_item_number',
        header: 'Customer Item Number',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.customer_item_number}
              helperText={validationErrors[row.index]?.customer_item_number}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'org',
        header: 'Org',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.org}
              helperText={validationErrors[row.index]?.org}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'comment',
        header: 'Comment',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.comment}
              helperText={validationErrors[row.index]?.comment}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'sub_sector',
        header: 'Sub Sector',
        size: 150,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.sub_sector}
              helperText={validationErrors[row.index]?.sub_sector}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 140,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.category}
              helperText={validationErrors[row.index]?.category}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 250,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.description}
              helperText={validationErrors[row.index]?.description}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'customized_code',
        header: 'Customized Code',
        size: 140,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.customized_code}
              helperText={validationErrors[row.index]?.customized_code}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'volume_split_method ',
        header: 'Volume Split Method ',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.volume_split_method}
              helperText={validationErrors[row.index]?.volume_split_method}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'uom',
        header: 'UOM',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.uom}
              helperText={validationErrors[row.index]?.uom}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },

      {
        accessorKey: 'destination_profile ',
        header: 'Destination Profile ',
        size: 160,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.destination_profile}
              helperText={validationErrors[row.index]?.destination_profile}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'total_volume',
        header: 'Total Volume',
        size: 150,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.total_volume}
              helperText={validationErrors[row.index]?.total_volume}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      }
    ],
    [region, countriesData, validationErrors, validationWarnings, handleInputChange]
  );
  return columns;
};
export default ValidateManualDaColumns;
