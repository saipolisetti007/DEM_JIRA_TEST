import React, { useMemo } from 'react';
import DatePickerComponent from '../Common/DatePickerComponent';
import InputRadioComponent from '../Common/InputRadioComponent';

const PromoGridColumns = ({ validationErrors, handleChange }) => {
  const RadioCellValue = (value) => {
    if (value === true) {
      return 'Yes';
    } else if (value === false) {
      return 'No';
    }
    return '';
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: 'unique_event_id',
        header: 'Unique Event Id',
        enableEditing: false,
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'golden_customer_id',
        header: 'Golden Customer ID',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.golden_customer_id,
          helperText: validationErrors?.golden_customer_id,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'golden_customer_id');
          }
        }
      },
      {
        accessorKey: 'event_in_store_start_date',
        header: 'Event in Store Start Date',
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors?.event_in_store_start_date}
              helperText={validationErrors?.event_in_store_start_date}
            />
          );
        }
      },
      {
        accessorKey: 'event_in_store_end_date',
        header: 'Event in store End Date',
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors?.event_in_store_end_date}
              helperText={validationErrors?.event_in_store_end_date}
            />
          );
        }
      },
      {
        accessorKey: 'start_of_shipments',
        header: 'Start Of Shipments',
        Edit: ({ column, row }) => {
          return <DatePickerComponent row={row} column={column} isRequired={false} />;
        }
      },
      {
        accessorKey: 'end_of_shipments',
        header: 'End Of Shipments',
        Edit: ({ column, row }) => {
          return <DatePickerComponent row={row} column={column} isRequired={false} />;
        }
      },
      {
        accessorKey: 'event_type',
        header: 'Event Type',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.event_type,
          helperText: validationErrors?.event_type,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_type');
          }
        }
      },
      {
        accessorKey: 'event_subtype',
        header: 'Event Subtype',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.event_subtype,
          helperText: validationErrors?.event_subtype,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_subtype');
          }
        }
      },
      {
        accessorKey: 'event_description',
        header: 'Event Description',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_description,
          helperText: validationErrors?.event_description,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_description');
          }
        }
      },
      {
        accessorKey: 'umbrella_event',
        header: 'Umbrella Event',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.umbrella_event,
          helperText: validationErrors?.umbrella_event,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'umbrella_event');
          }
        }
      },
      {
        accessorKey: 'comments',
        header: 'Comments',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.comments,
          helperText: validationErrors?.comments,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'comments');
          }
        }
      },

      {
        accessorKey: 'event_publish_to_demand',
        header: 'Event Publish to Demand',
        Cell: ({ row, column }) => RadioCellValue(row.original[column.id]),
        Edit: ({ row, column }) => {
          return (
            <InputRadioComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors?.event_publish_to_demand}
              helperText={validationErrors?.event_publish_to_demand}
            />
          );
        }
      },
      {
        accessorKey: 'event_sales_channel',
        header: 'Event Sales Channel',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.event_sales_channel,
          helperText: validationErrors?.event_sales_channel,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_sales_channel');
          }
        }
      },
      {
        accessorKey: 'expected_shipments_forecast',
        header: 'Expected Shipments Forecast',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'expected_consumption_forecast',
        header: 'Expected Consumption Forecast',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'item_type',
        header: 'Item Type',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.item_type,
          helperText: validationErrors?.item_type,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'item_type');
          }
        }
      },
      {
        accessorKey: 'bu',
        header: 'BU',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.bu,
          helperText: validationErrors?.bu,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'bu');
          }
        }
      },
      {
        accessorKey: 'product_id',
        header: 'Product Id',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.product_id,
          helperText: validationErrors?.product_id,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'product_id');
          }
        }
      },
      {
        accessorKey: 'id_type',
        header: 'Id Type',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.id_type,
          helperText: validationErrors?.id_type,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'id_type');
          }
        }
      },
      {
        accessorKey: 'customer_item_number',
        header: 'Customer Item Number',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.customer_item_number,
          helperText: validationErrors?.customer_item_number,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'customer_item_number');
          }
        }
      },
      {
        accessorKey: 'proxy_like_item_number',
        header: 'Proxy Like Item Number',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'pgp_flag',
        header: 'PGP Flag',
        Cell: ({ row, column }) => RadioCellValue(row.original[column.id]),
        Edit: ({ row, column }) => {
          return <InputRadioComponent row={row} column={column} isRequired={false} />;
        }
      },
      {
        accessorKey: 'promoted_product_group_id',
        header: 'Promoted Product Group Id',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'country_code',
        header: 'Country Code',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.country_code,
          helperText: validationErrors?.country_code,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'country_code');
          }
        }
      },

      {
        accessorKey: 'distribution_profile',
        header: 'Distribution Profile',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'discount_amt',
        header: 'Discount Amount',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.discount_amt,
          helperText: validationErrors?.discount_amt,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'discount_amt');
          }
        }
      },
      {
        accessorKey: 'base_price',
        header: 'Base Price',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.base_price,
          helperText: validationErrors?.base_price,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'base_price');
          }
        }
      },
      {
        accessorKey: 'price_after_discount',
        header: 'Price After Discount',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.price_after_discount,
          helperText: validationErrors?.price_after_discount,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'price_after_discount');
          }
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'status');
          }
        }
      },
      {
        accessorKey: 'event_string_property_1',
        header: 'Event String Property 1',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_string_property_1,
          helperText: validationErrors?.event_string_property_1,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_string_property_1');
          }
        }
      },
      {
        accessorKey: 'event_string_property_2',
        header: 'Event String Property 2',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_string_property_2,
          helperText: validationErrors?.event_string_property_2,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_string_property_2');
          }
        }
      },
      {
        accessorKey: 'event_string_property_3',
        header: 'Event String Property 3',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_string_property_3,
          helperText: validationErrors?.event_string_property_3,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_string_property_3');
          }
        }
      },
      {
        accessorKey: 'event_string_property_4',
        header: 'Event String Property 4',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_string_property_4,
          helperText: validationErrors?.event_string_property_4,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_string_property_4');
          }
        }
      },
      {
        accessorKey: 'event_string_property_5',
        header: 'Event String Property 5',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_string_property_5,
          helperText: validationErrors?.event_string_property_5,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'event_string_property_5');
          }
        }
      },
      {
        accessorKey: 'event_num_property_1',
        header: 'Event Num  Property 1',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_1,
          helperText: validationErrors?.event_num_property_1,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'event_num_property_1');
          }
        }
      },
      {
        accessorKey: 'event_num_property_2',
        header: 'Event Num  Property 2',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_2,
          helperText: validationErrors?.event_num_property_2,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'event_num_property_2');
          }
        }
      },
      {
        accessorKey: 'event_num_property_3',
        header: 'Event Num  Property 3',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_3,
          helperText: validationErrors?.event_num_property_3,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'event_num_property_3');
          }
        }
      },
      {
        accessorKey: 'event_num_property_4',
        header: 'Event Num  Property 4',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_4,
          helperText: validationErrors?.event_num_property_4,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'event_num_property_4');
          }
        }
      },
      {
        accessorKey: 'event_num_property_5',
        header: 'Event Num  Property 5',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_5,
          helperText: validationErrors?.event_num_property_5,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'event_num_property_5');
          }
        }
      },
      {
        accessorKey: 'offer_type',
        header: 'Offer Type',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.offer_type,
          helperText: validationErrors?.offer_type,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'offer_type');
          }
        }
      },
      {
        accessorKey: 'off',
        header: 'Off',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.off,
          helperText: validationErrors?.off,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'off');
          }
        }
      },
      {
        accessorKey: 'limit',
        header: 'Limit',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.limit,
          helperText: validationErrors?.limit,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'limit');
          }
        }
      },
      {
        accessorKey: 'tpr',
        header: 'TPR',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.tpr,
          helperText: validationErrors?.tpr,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'tpr');
          }
        }
      },
      {
        accessorKey: 'off_2',
        header: 'OFF 2',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.off_2,
          helperText: validationErrors?.off_2,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'off_2');
          }
        }
      },
      {
        accessorKey: 'gc_buy',
        header: 'GC-Buy',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.gc_buy,
          helperText: validationErrors?.gc_buy,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'gc_buy');
          }
        }
      },
      {
        accessorKey: 'gc_save',
        header: 'GC-Save',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.gc_save,
          helperText: validationErrors?.gc_save,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'gc_save');
          }
        }
      },
      {
        accessorKey: 'percentage',
        header: 'Percentage(%)',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.percentage,
          helperText: validationErrors?.percentage,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'percentage');
          }
        }
      }
    ],
    [validationErrors]
  );
  return columns;
};
export default PromoGridColumns;
