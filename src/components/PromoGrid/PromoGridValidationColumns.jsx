import React, { useEffect, useMemo, useState } from 'react';
import DatePickerComponent from '../Common/DatePickerComponent';
import InputRadioComponent from '../Common/InputRadioComponent';
import InputTextComponent from '../Common/InputTextComponent';
import { salesChannelOptions, itemTypeOptions, iDTypeOptions } from './FormStepFields';

import { useSelector } from 'react-redux';
import DropdownComponent from '../Common/DropdownComponent';

const PromoGridValidationColumns = ({ validationErrors, handleInputChange }) => {
  const { eventsData, eventTypeOptions, isLoading } = useSelector((state) => state.eventsData);
  const [selectedEvents, setSelectedEvents] = useState({});
  const [eventSubTypeOptions, setEventSubTypeOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const { countriesData } = useSelector((state) => state.countriesData);
  const { userData } = useSelector((state) => state.userProfileData);
  const region = userData?.region;
  const handleEventChange = (newValue, rowIndex) => {
    if (isLoading) return;
    setSelectedEvents((prev) => ({ ...prev, [rowIndex]: newValue }));
    setSelectedOptions((prev) => ({ ...prev, [rowIndex]: '' }));
  };

  const handleSubtypeChange = (newState, rowIndex) => {
    setSelectedOptions((prev) => ({ ...prev, [rowIndex]: newState }));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'cpf_id',
        header: 'CPF ID',
        size: 100,
        enableEditing: false
      },
      {
        accessorKey: 'golden_customer_id',
        header: 'Golden Customer ID',
        enableEditing: false
      },
      ...(region !== 'NA'
        ? [
            {
              accessorKey: 'unique_event_id',
              header: 'Unique Event ID',
              Edit: ({ column, row }) => {
                return (
                  <InputTextComponent
                    row={row}
                    column={column}
                    isRequired={true}
                    isError={!!validationErrors[row.index]?.unique_event_id}
                    helperText={validationErrors[row.index]?.unique_event_id}
                    validationType="stringValidation"
                    handleInputChange={handleInputChange}
                  />
                );
              }
            }
          ]
        : []),
      {
        accessorKey: 'event_in_store_start_date',
        header: 'Event in Store Start Date',
        size: 220,
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.event_in_store_start_date}
              helperText={validationErrors[row.index]?.event_in_store_start_date}
              validationType="startDate"
              startDateField="event_in_store_start_date"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_in_store_end_date',
        header: 'Event in Store End Date',
        size: 220,
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.event_in_store_end_date}
              helperText={validationErrors[row.index]?.event_in_store_end_date}
              validationType="endDate"
              startDateField="event_in_store_start_date"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'start_of_shipments',
        header: 'Start Of Shipments',
        size: 220,
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors[row.index]?.start_of_shipments}
              helperText={validationErrors[row.index]?.start_of_shipments}
              validationType="startDate"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'end_of_shipments',
        header: 'End Of Shipments',
        size: 220,
        Edit: ({ column, row }) => {
          return (
            <DatePickerComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors[row.index]?.end_of_shipments}
              helperText={validationErrors[row.index]?.end_of_shipments}
              validationType="endDate"
              startDateField="start_of_shipments"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_type',
        header: 'Event Type',
        Edit: ({ column, row }) => {
          return (
            <DropdownComponent
              row={row}
              column={column}
              isRequired={true}
              label="Event Type"
              isError={!!validationErrors[row.index]?.event_type}
              helperText={validationErrors[row.index]?.event_type}
              options={eventTypeOptions}
              isEventSelected={true}
              onChange={(newValue) => handleEventChange(newValue, row.index)}
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_subtype',
        header: 'Event Subtype',
        Edit: ({ column, row }) => {
          const rowIndex = row.index;
          const selectedEvent = row.original.event_type || selectedEvents[rowIndex];
          const SubTypeOptions = eventSubTypeOptions[rowIndex] || [];

          useEffect(() => {
            if (selectedEvent && eventsData) {
              setEventSubTypeOptions((prev) => ({
                ...prev,
                [rowIndex]: eventsData[selectedEvent] || []
              }));
            }
          }, [selectedEvent, eventsData, rowIndex]);
          return (
            <DropdownComponent
              row={row}
              column={column}
              isRequired={true}
              label="Event Subtype"
              options={SubTypeOptions}
              selectedState={selectedOptions[rowIndex]}
              isEventSelected={!!selectedEvent}
              isError={!!validationErrors[row.index]?.event_subtype}
              helperText={validationErrors[row.index]?.event_subtype}
              handleInputChange={handleInputChange}
              onChange={(newState) => handleSubtypeChange(newState, rowIndex)}
            />
          );
        }
      },
      {
        accessorKey: 'event_description',
        header: 'Event Description',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors[row.index]?.event_description}
              helperText={validationErrors[row.index]?.event_description}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'umbrella_event',
        header: 'Umbrella Event',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors[row.index]?.umbrella_event}
              helperText={validationErrors[row.index]?.umbrella_event}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'comments',
        header: 'Comments',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors[row.index]?.comments}
              helperText={validationErrors[row.index]?.comments}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },

      {
        accessorKey: 'event_publish_to_demand',
        header: 'Event Publish to Demand',
        Edit: ({ row, column }) => {
          return (
            <InputRadioComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.event_publish_to_demand}
              helperText={validationErrors[row.index]?.event_publish_to_demand}
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_sales_channel',
        header: 'Event Sales Channel',
        Edit: ({ column, row }) => {
          return (
            <DropdownComponent
              row={row}
              column={column}
              isRequired={true}
              label="Event Sales Channel"
              isError={!!validationErrors[row.index]?.event_sales_channel}
              helperText={validationErrors[row.index]?.event_sales_channel}
              options={salesChannelOptions}
              isEventSelected={true}
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'expected_shipments_forecast',
        header: 'Expected Shipments Forecast',
        size: 250,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={false}
              handleInputChange={handleInputChange}
              isError={!!validationErrors[row.index]?.expected_shipments_forecast}
              helperText={validationErrors[row.index]?.expected_shipments_forecast}
              validationType="integerValidation"
            />
          );
        }
      },
      {
        accessorKey: 'expected_consumption_forecast',
        header: 'Expected Consumption Forecast',
        size: 250,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={false}
              handleInputChange={handleInputChange}
              isError={!!validationErrors[row.index]?.expected_consumption_forecast}
              helperText={validationErrors[row.index]?.expected_consumption_forecast}
              validationType="integerValidation"
            />
          );
        }
      },
      {
        accessorKey: 'item_type',
        header: 'Item Type',
        Edit: ({ column, row }) => {
          return (
            <DropdownComponent
              row={row}
              column={column}
              isRequired={true}
              label="Item Type"
              isError={!!validationErrors[row.index]?.item_type}
              helperText={validationErrors[row.index]?.item_type}
              options={itemTypeOptions}
              isEventSelected={true}
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'bu',
        header: 'BU',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors[row.index]?.bu}
              helperText={validationErrors[row.index]?.bu}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'product_id',
        header: 'Product Id',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isRequired={true}
              isError={!!validationErrors[row.index]?.product_id}
              helperText={validationErrors[row.index]?.product_id}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'id_type',
        header: 'Id Type',
        Edit: ({ column, row }) => {
          return (
            <DropdownComponent
              row={row}
              column={column}
              isRequired={true}
              label="Id Type"
              isError={!!validationErrors[row.index]?.id_type}
              helperText={validationErrors[row.index]?.id_type}
              options={iDTypeOptions}
              isEventSelected={true}
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
              validationType="integerValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'proxy_like_item_number',
        header: 'Proxy Like Item Number',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              handleInputChange={handleInputChange}
              isError={!!validationErrors[row.index]?.proxy_like_item_number}
              helperText={validationErrors[row.index]?.proxy_like_item_number}
              validationType="integerValidation"
            />
          );
        }
      },
      {
        accessorKey: 'pgp_flag',
        header: 'PGP Flag',
        Edit: ({ row, column }) => {
          return (
            <InputRadioComponent
              row={row}
              column={column}
              isRequired={false}
              isError={!!validationErrors[row.index]?.pgp_flag}
              helperText={validationErrors[row.index]?.pgp_flag}
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'promoted_product_group_id',
        header: 'Promoted Product Group Id',
        size: 220,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              handleInputChange={handleInputChange}
              isError={!!validationErrors[row.index]?.promoted_product_group_id}
              helperText={validationErrors[row.index]?.promoted_product_group_id}
              validationType="stringValidation"
            />
          );
        }
      },
      {
        accessorKey: 'country_code',
        header: 'Country Code',
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
        accessorKey: 'distribution_profile',
        header: 'Distribution Profile',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              handleInputChange={handleInputChange}
              isError={!!validationErrors[row.index]?.distribution_profile}
              helperText={validationErrors[row.index]?.distribution_profile}
              validationType="stringValidation"
            />
          );
        }
      },
      {
        accessorKey: 'discount_amt',
        header: 'Discount Amount',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.discount_amt}
              helperText={validationErrors[row.index]?.discount_amt}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'base_price',
        header: 'Base Price',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.base_price}
              helperText={validationErrors[row.index]?.base_price}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'price_after_discount',
        header: 'Price After Discount',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.price_after_discount}
              helperText={validationErrors[row.index]?.price_after_discount}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      ...(region !== 'NA'
        ? [
            {
              accessorKey: 'minerva_volume',
              header: 'Minerva volume',
              Edit: ({ column, row }) => {
                return (
                  <InputTextComponent
                    row={row}
                    column={column}
                    isError={!!validationErrors[row.index]?.minerva_volume}
                    helperText={validationErrors[row.index]?.minerva_volume}
                    validationType="floatValidation"
                    handleInputChange={handleInputChange}
                  />
                );
              }
            }
          ]
        : []),
      {
        accessorKey: 'status',
        header: 'Status',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.status}
              helperText={validationErrors[row.index]?.status}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },

      {
        accessorKey: 'event_string_property_1',
        header: 'Event String Property 1',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_string_property_1}
              helperText={validationErrors[row.index]?.event_string_property_1}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_string_property_2',
        header: 'Event String Property 2',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_string_property_2}
              helperText={validationErrors[row.index]?.event_string_property_2}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_string_property_3',
        header: 'Event String Property 3',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_string_property_3}
              helperText={validationErrors[row.index]?.event_string_property_3}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_string_property_4',
        header: 'Event String Property 4',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_string_property_4}
              helperText={validationErrors[row.index]?.event_string_property_4}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_string_property_5',
        header: 'Event String Property 5',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_string_property_5}
              helperText={validationErrors[row.index]?.event_string_property_5}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_num_property_1',
        header: 'Event Num  Property 1',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_num_property_1}
              helperText={validationErrors[row.index]?.event_num_property_1}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_num_property_2',
        header: 'Event Num  Property 2',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_num_property_2}
              helperText={validationErrors[row.index]?.event_num_property_2}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_num_property_3',
        header: 'Event Num  Property 3',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_num_property_3}
              helperText={validationErrors[row.index]?.event_num_property_3}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_num_property_4',
        header: 'Event Num  Property 4',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_num_property_4}
              helperText={validationErrors[row.index]?.event_num_property_4}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'event_num_property_5',
        header: 'Event Num  Property 5',
        size: 200,
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.event_num_property_5}
              helperText={validationErrors[row.index]?.event_num_property_5}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'offer_type',
        header: 'Offer Type',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.offer_type}
              helperText={validationErrors[row.index]?.offer_type}
              validationType="stringValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'off',
        header: 'Off',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.off}
              helperText={validationErrors[row.index]?.off}
              validationType="integerValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'limit',
        header: 'Limit',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.limit}
              helperText={validationErrors[row.index]?.limit}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'tpr',
        header: 'TPR',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.tpr}
              helperText={validationErrors[row.index]?.tpr}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'off_2',
        header: 'OFF 2',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.off_2}
              helperText={validationErrors[row.index]?.off_2}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'gc_buy',
        header: 'GC-Buy',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.gc_buy}
              helperText={validationErrors[row.index]?.gc_buy}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'gc_save',
        header: 'GC-Save',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.gc_save}
              helperText={validationErrors[row.index]?.gc_save}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      },
      {
        accessorKey: 'percentage',
        header: 'Percentage(%)',
        Edit: ({ column, row }) => {
          return (
            <InputTextComponent
              row={row}
              column={column}
              isError={!!validationErrors[row.index]?.percentage}
              helperText={validationErrors[row.index]?.percentage}
              validationType="floatValidation"
              handleInputChange={handleInputChange}
            />
          );
        }
      }
    ],
    [
      validationErrors,
      eventsData,
      eventTypeOptions,
      selectedEvents,
      eventSubTypeOptions,
      selectedOptions
    ]
  );

  return columns;
};
export default PromoGridValidationColumns;
