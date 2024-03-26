import React, { useMemo } from 'react';
import DatePickerComponent from '../Common/DatePickerComponent';
import InputRadioComponent from '../Common/InputRadioComponent';

const PromoGridColumns = ({ validationErrors, handleChange }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 40,
        Edit: () => null
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
          return <DatePickerComponent row={row} column={column} />;
        }
      },
      {
        accessorKey: 'event_in_store_end_date',
        header: 'Event in store End Date',
        Edit: ({ column, row }) => {
          return <DatePickerComponent row={row} column={column} />;
        }
      },
      {
        accessorKey: 'start_of_shipments',
        header: 'Start Of Shipments',
        Edit: ({ column, row }) => {
          return <DatePickerComponent row={row} column={column} />;
        }
      },
      {
        accessorKey: 'end_of_shipments',
        header: 'End Of Shipments',
        Edit: ({ column, row }) => {
          return <DatePickerComponent row={row} column={column} />;
        }
      },
      {
        accessorKey: 'unique_event_id',
        header: 'Unique Event Id',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.unique_event_id,
          helperText: validationErrors?.unique_event_id,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'unique_event_id');
          }
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
        muiEditTextFieldProps: {
          variant: 'outlined'
        },
        Cell: ({ row, column }) => {
          return row.original[column.id] === true
            ? 'Yes'
            : row.original[column.id] === false
              ? 'No'
              : '';
        },
        Edit: ({ row, column }) => {
          return <InputRadioComponent row={row} column={column} />;
        }
      },
      {
        accessorKey: 'event_sales_channel',
        header: 'Event Sales Channel',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.eventSalesChannel,
          helperText: validationErrors?.eventSalesChannel,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'eventSalesChannel');
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
            handleChange(event, 'integerValidation', 'product_id');
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
        Cell: ({ row, column }) => {
          return row.original[column.id] === true
            ? 'Yes'
            : row.original[column.id] === false
              ? 'No'
              : '';
        },
        Edit: ({ row, column }) => {
          return <InputRadioComponent row={row} column={column} />;
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
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'base_price',
        header: 'Base Price',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'price_after_discount',
        header: 'Price After Discount',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_string_property_1',
        header: 'Event String Property 1',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_string_property_2',
        header: 'Event String Property 2',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_string_property_3',
        header: 'Event String Property 3',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_string_property_4',
        header: 'Event String Property 4',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_string_property_5',
        header: 'Event String Property 5',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_num_property_1',
        header: 'Event Num  Property 1',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_num_property_2',
        header: 'Event Num  Property 2',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_num_property_3',
        header: 'Event Num  Property 3',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_num_property_4',
        header: 'Event Num  Property 4',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'event_num_property_5',
        header: 'Event Num  Property 5',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'offer_type',
        header: 'Offer Type',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'off',
        header: 'Off',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'limit',
        header: 'Limit',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'tpr',
        header: 'TPR',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'off_2',
        header: 'OFF 2',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'gc_buy',
        header: 'GC-Buy',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'gc_save',
        header: 'GC-Save',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'percentage',
        header: 'Percentage(%)',
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      }
    ],
    [validationErrors]
  );
  return columns;
};
export default PromoGridColumns;
