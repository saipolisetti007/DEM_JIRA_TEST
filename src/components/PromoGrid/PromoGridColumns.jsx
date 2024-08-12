import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const PromoGridColumns = () => {
  const RadioCellValue = (value) => {
    if (value === true) {
      return 'Yes';
    } else if (value === false) {
      return 'No';
    }
    return '';
  };
  const { userData } = useSelector((state) => state.userProfileData);
  const region = userData?.region;
  const columns = useMemo(
    () => [
      {
        accessorKey: 'cpf_id',
        header: 'CPF ID',
        grow: false,
        size: 150
      },
      {
        accessorKey: 'golden_customer_id',
        header: 'Golden Customer  ID  ',
        size: 130
      },
      ...(region !== 'NA'
        ? [
            {
              accessorKey: 'unique_event_id',
              header: 'Unique Event ID',
              size: 100
            }
          ]
        : []),
      {
        accessorKey: 'event_in_store_start_date',
        header: 'Event in store start date'
      },
      {
        accessorKey: 'event_in_store_end_date',
        header: 'Event in store end date'
      },
      {
        accessorKey: 'start_of_shipments',
        header: 'Start of shipments   ',
        size: 130
      },
      {
        accessorKey: 'end_of_shipments',
        header: 'End of shipments     ',
        size: 130
      },
      {
        accessorKey: 'event_type',
        header: 'Event type'
      },
      {
        accessorKey: 'event_subtype',
        header: 'Event subtype'
      },
      {
        accessorKey: 'event_description',
        header: 'Event description'
      },
      {
        accessorKey: 'umbrella_event',
        header: 'Umbrella event'
      },
      {
        accessorKey: 'comments',
        header: 'Comments'
      },

      {
        accessorKey: 'event_publish_to_demand',
        header: 'Event publish to demand',
        Cell: ({ row, column }) => RadioCellValue(row.original[column.id])
      },
      {
        accessorKey: 'event_sales_channel',
        header: 'Event sales channel'
      },
      {
        accessorKey: 'expected_shipments_forecast',
        header: 'Expected shipments forecast',
        size: 200
      },
      {
        accessorKey: 'expected_consumption_forecast',
        header: 'Expected consumption forecast',
        size: 200
      },
      {
        accessorKey: 'item_type',
        header: 'Item type'
      },
      {
        accessorKey: 'bu',
        header: 'BU'
      },
      {
        accessorKey: 'product_id',
        header: 'Product ID'
      },
      {
        accessorKey: 'id_type',
        header: 'ID type'
      },
      {
        accessorKey: 'customer_item_number',
        header: 'Customer item number'
      },
      {
        accessorKey: 'proxy_like_item_number',
        header: 'Proxy like item number'
      },
      {
        accessorKey: 'pgp_flag',
        header: 'PGP flag',
        Cell: ({ row, column }) => RadioCellValue(row.original[column.id])
      },
      {
        accessorKey: 'promoted_product_group_id',
        header: 'Promoted product group ID'
      },
      {
        accessorKey: 'country_code',
        header: 'Country code'
      },

      {
        accessorKey: 'distribution_profile',
        header: 'Distribution profile'
      },
      {
        accessorKey: 'discount_amt',
        header: 'Discount amount'
      },
      {
        accessorKey: 'base_price',
        header: 'Base price'
      },
      {
        accessorKey: 'price_after_discount',
        header: 'Price after discount'
      },
      ...(region !== 'NA'
        ? [
            {
              accessorKey: 'minerva_volume',
              header: 'Minerva volume'
            }
          ]
        : []),
      {
        accessorKey: 'status',
        header: 'Status'
      },
      {
        accessorKey: 'event_string_property_1',
        header: 'Event string property 1',
        size: 150
      },
      {
        accessorKey: 'event_string_property_2',
        header: 'Event string property 2',
        size: 150
      },
      {
        accessorKey: 'event_string_property_3',
        header: 'Event string property 3',
        size: 150
      },
      {
        accessorKey: 'event_string_property_4',
        header: 'Event string property 4',
        size: 150
      },
      {
        accessorKey: 'event_string_property_5',
        header: 'Event string property 5',
        size: 150
      },
      {
        accessorKey: 'event_num_property_1',
        header: 'Event num  property 1',
        size: 150
      },
      {
        accessorKey: 'event_num_property_2',
        header: 'Event num  property 2',
        size: 150
      },
      {
        accessorKey: 'event_num_property_3',
        header: 'Event num  property 3',
        size: 150
      },
      {
        accessorKey: 'event_num_property_4',
        header: 'Event num  property 4',
        size: 150
      },
      {
        accessorKey: 'event_num_property_5',
        header: 'Event num  property 5',
        size: 150
      },
      {
        accessorKey: 'offer_type',
        header: 'Offer type'
      },
      {
        accessorKey: 'off',
        header: 'Off'
      },
      {
        accessorKey: 'limit',
        header: 'Limit'
      },
      {
        accessorKey: 'tpr',
        header: 'TPR'
      },
      {
        accessorKey: 'off_2',
        header: 'OFF 2'
      },
      {
        accessorKey: 'gc_buy',
        header: 'GC-Buy'
      },
      {
        accessorKey: 'gc_save',
        header: 'GC-Save'
      },
      {
        accessorKey: 'percentage',
        header: 'Percentage(%)'
      }
    ],
    []
  );
  return columns;
};
export default PromoGridColumns;
