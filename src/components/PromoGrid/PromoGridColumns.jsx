import React, { useEffect, useMemo, useState } from 'react';
import DatePickerComponent from '../Common/DatePickerComponent';
import InputRadioComponent from '../Common/InputRadioComponent';
import { useSelector } from 'react-redux';
import DropdownComponent from '../Common/DropdownComponent';

const PromoGridColumns = ({ validationErrors, handleChange, clearEventErrors }) => {
  const { userData } = useSelector((state) => state.userProfileData);
  const customerId = userData?.customers[0];

  const { eventsData, eventTypeOptions, isLoading } = useSelector((state) => state.eventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventSubTypeOptions, setEventSubTypeOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const handleEventChange = (newValue) => {
    if (isLoading) return;
    setSelectedEvent(newValue);
    setSelectedState('');
    if (newValue && eventsData) {
      setEventSubTypeOptions(eventsData[newValue] || []);
    } else {
      setEventSubTypeOptions([]);
    }
  };

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
        header: 'Unique Event ID',
        grow: false,
        size: 150,
        enableEditing: false,
        muiEditTextFieldProps: {
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'golden_customer_id',
        header: 'Golden Customer  ID  ',
        size: 130,
        enableEditing: false,
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.golden_customer_id,
          helperText: validationErrors?.golden_customer_id,
          value: customerId
        }
      },
      {
        accessorKey: 'event_in_store_start_date',
        header: 'Event in store start date',
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors?.event_in_store_start_date}
              helperText={validationErrors?.event_in_store_start_date}
              validationType="startDate"
              startDateField="event_in_store_start_date"
            />
          );
        }
      },
      {
        accessorKey: 'event_in_store_end_date',
        header: 'Event in store end date',
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors?.event_in_store_end_date}
              helperText={validationErrors?.event_in_store_end_date}
              validationType="endDate"
              startDateField="event_in_store_start_date"
            />
          );
        }
      },
      {
        accessorKey: 'start_of_shipments',
        header: 'Start of shipments   ',
        size: 130,
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors?.start_of_shipments}
              helperText={validationErrors?.start_of_shipments}
              validationType="startDate"
            />
          );
        }
      },
      {
        accessorKey: 'end_of_shipments',
        header: 'End of shipments     ',
        size: 130,
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors?.end_of_shipments}
              helperText={validationErrors?.end_of_shipments}
              validationType="endDate"
              startDateField="start_of_shipments"
            />
          );
        }
      },
      {
        accessorKey: 'event_type',
        header: 'Event type',
        Edit: ({ column, row }) => {
          return (
            <DropdownComponent
              row={row}
              column={column}
              isRequired={true}
              label="Event Type"
              isError={!!validationErrors?.event_type}
              helperText={validationErrors?.event_type}
              options={eventTypeOptions}
              isEventSelected={true}
              clearEventErrors={clearEventErrors}
              onChange={handleEventChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_subtype',
        header: 'Event subtype',
        Edit: ({ column, row }) => {
          const selectEvent = row.original.event_type || selectedEvent;
          const subTypeOptions = eventSubTypeOptions || [];
          useEffect(() => {
            if (selectEvent && eventsData) {
              setEventSubTypeOptions(eventsData[selectEvent] || []);
            }
          }, [selectEvent, eventsData]);
          return (
            <DropdownComponent
              row={row}
              column={column}
              isRequired={true}
              label="Event Subtype"
              selectedState={selectedState}
              options={subTypeOptions}
              isEventSelected={!!selectEvent}
              isError={!!validationErrors?.event_subtype}
              helperText={validationErrors?.event_subtype}
              clearEventErrors={clearEventErrors}
              onChange={(newState) => setSelectedState(newState)}
            />
          );
        }
      },
      {
        accessorKey: 'event_description',
        header: 'Event description',
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
        header: 'Umbrella event',
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
        header: 'Event publish to demand',
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
        header: 'Event sales channel',
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
        header: 'Expected shipments forecast',
        size: 200,
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.expected_shipments_forecast,
          helperText: validationErrors?.expected_shipments_forecast,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'expected_shipments_forecast');
          }
        }
      },
      {
        accessorKey: 'expected_consumption_forecast',
        header: 'Expected consumption forecast',
        size: 200,
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.expected_consumption_forecast,
          helperText: validationErrors?.expected_consumption_forecast,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'expected_shipments_forecast');
          }
        }
      },
      {
        accessorKey: 'item_type',
        header: 'Item type',
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
          required: false,
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
        header: 'Product ID',
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
        header: 'ID type',
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
        header: 'Customer item number',
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
        header: 'Proxy like item number',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.proxy_like_item_number,
          helperText: validationErrors?.proxy_like_item_number,
          onChange: (event) => {
            handleChange(event, 'integerValidation', 'proxy_like_item_number');
          }
        }
      },
      {
        accessorKey: 'pgp_flag',
        header: 'PGP flag',
        Cell: ({ row, column }) => RadioCellValue(row.original[column.id]),
        Edit: ({ row, column }) => {
          return <InputRadioComponent row={row} column={column} isRequired={false} />;
        }
      },
      {
        accessorKey: 'promoted_product_group_id',
        header: 'Promoted product group ID',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.promoted_product_group_id,
          helperText: validationErrors?.promoted_product_group_id,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'promoted_product_group_id');
          }
        }
      },
      {
        accessorKey: 'country_code',
        header: 'Country code',
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
        header: 'Distribution profile',
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.distribution_profile,
          helperText: validationErrors?.distribution_profile,
          onChange: (event) => {
            handleChange(event, 'stringValidation', 'distribution_profile');
          }
        }
      },
      {
        accessorKey: 'discount_amt',
        header: 'Discount amount',
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
        header: 'Base price',
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
        header: 'Price after discount',
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
        header: 'Event string property 1',
        size: 150,
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
        header: 'Event string property 2',
        size: 150,
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
        header: 'Event string property 3',
        size: 150,
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
        header: 'Event string property 4',
        size: 150,
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
        header: 'Event string property 5',
        size: 150,
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
        header: 'Event num  property 1',
        size: 150,
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_1,
          helperText: validationErrors?.event_num_property_1,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'event_num_property_1');
          }
        }
      },
      {
        accessorKey: 'event_num_property_2',
        header: 'Event num  property 2',
        size: 150,
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_2,
          helperText: validationErrors?.event_num_property_2,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'event_num_property_2');
          }
        }
      },
      {
        accessorKey: 'event_num_property_3',
        header: 'Event num  property 3',
        size: 150,
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_3,
          helperText: validationErrors?.event_num_property_3,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'event_num_property_3');
          }
        }
      },
      {
        accessorKey: 'event_num_property_4',
        header: 'Event num  property 4',
        size: 150,
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_4,
          helperText: validationErrors?.event_num_property_4,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'event_num_property_4');
          }
        }
      },
      {
        accessorKey: 'event_num_property_5',
        header: 'Event num  property 5',
        size: 150,
        muiEditTextFieldProps: {
          variant: 'outlined',
          error: !!validationErrors?.event_num_property_5,
          helperText: validationErrors?.event_num_property_5,
          onChange: (event) => {
            handleChange(event, 'floatValidation', 'event_num_property_5');
          }
        }
      },
      {
        accessorKey: 'offer_type',
        header: 'Offer type',
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
    [validationErrors, eventTypeOptions, eventSubTypeOptions, selectedEvent, selectedState]
  );
  return columns;
};
export default PromoGridColumns;
