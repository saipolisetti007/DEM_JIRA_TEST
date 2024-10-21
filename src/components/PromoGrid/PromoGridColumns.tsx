import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
type PromoGridColumnsPropsType = {
  region: string;
};
export type PromoGridColumnsType = {
  cpf_id: string;
  golden_customer_id: string;
  event_in_store_start_date: string;
  event_in_store_end_date: string;
  start_of_shipments: string;
  end_of_shipments: string;
  event_type: string;
  event_subtype: string;
  unique_event_id?: string;
  event_description: string;
  umbrella_event: string;
  comments: string;
  minerva_volume?: boolean;
  event_publish_to_demand: boolean;
  event_sales_channel: string;
  expected_shipments_forecast: string;
  expected_consumption_forecast: string;
  item_type: string;
  bu: string;
  product_id: string;
  id_type: string;
  customer_item_number: string;
  proxy_like_item_number: string;
  pgp_flag: boolean;
  promoted_product_group_id: string;
  country_code: string;
  distribution_profile: string;
  discount_amt: string;
  base_price: string;
  price_after_discount: string;
  offer_type: string;
  multi_category_offer: string;
  off: string;
  limit: string;
  off_2: string;
  quantity_threshold: string;
  x_free: string;
  gc_buy: string;
  gc_save: string;
  percentage: string;
  event_string_property_1: string;
  event_string_property_2: string;
  event_string_property_3: string;
  event_string_property_4: string;
  event_num_property_1: string;
  event_num_property_2: string;
  event_num_property_3: string;
};
/**
 * PromoGridColumns component to define the columns for the promo grid table.
 * @param {Object} props - Component props.
 * @param {string} props.region - The region to determine specific columns.
 * @returns {Array} - Array of column definitions.
 */
const PromoGridColumns = ({ region }: PromoGridColumnsPropsType) => {
  // Function to convert boolean values to 'Yes' or 'No' strings.
  const RadioCellValue = (value: boolean): string => {
    if (value === true) {
      return 'Yes';
    } else if (value === false) {
      return 'No';
    }
    return '';
  };
  // Memoize the columns array to optimize performance
  const columns = useMemo<MRT_ColumnDef<PromoGridColumnsType>[]>(
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
      ...(region === 'EU'
        ? [
            {
              accessorKey: 'unique_event_id',
              header: 'Unique Event ID',
              size: 100
            }
          ]
        : []),
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
      ...(region === 'EU'
        ? [
            {
              accessorKey: 'minerva_volume',
              header: 'Calculate Volume',
              Cell: ({ row, column }) => RadioCellValue(row.original[column.id])
            }
          ]
        : []),
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
        header: 'Item type',
        size: 130
      },
      {
        accessorKey: 'bu',
        header: 'BU',
        size: 150
      },
      {
        accessorKey: 'product_id',
        header: 'Product ID',
        size: 150
      },
      {
        accessorKey: 'id_type',
        header: 'ID type',
        size: 130
      },
      {
        accessorKey: 'customer_item_number',
        header: 'Customer item number',
        size: 160
      },
      {
        accessorKey: 'proxy_like_item_number',
        header: 'Proxy like item number',
        size: 160
      },
      {
        accessorKey: 'pgp_flag',
        header: 'PGP flag',
        Cell: ({ row, column }) => RadioCellValue(row.original[column.id])
      },
      {
        accessorKey: 'promoted_product_group_id',
        header: 'Promoted product group ID',
        size: 120
      },
      {
        accessorKey: 'country_code',
        header: 'Country code'
      },

      {
        accessorKey: 'distribution_profile',
        header: 'Distribution profile',
        size: 150
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
        header: 'Price after discount',
        size: 120
      },
      {
        accessorKey: 'offer_type',
        header: 'Offer type',
        size: 130
      },
      {
        accessorKey: 'multi_category_offer',
        header: 'Multi Category Offer',
        size: 150
      },
      {
        accessorKey: 'multi_manufacturer_offer',
        header: 'Multi Manufacturer Offer',
        size: 140
      },
      {
        accessorKey: 'off',
        header: 'Off',
        size: 130
      },
      {
        accessorKey: 'limit',
        header: 'Limit'
      },
      {
        accessorKey: 'off_2',
        header: 'OFF 2'
      },
      {
        accessorKey: 'quantity_threshold',
        header: 'Quantity Threshold',
        size: 110
      },
      {
        accessorKey: 'x_free',
        header: 'X Free',
        size: 130
      },
      {
        accessorKey: 'gc_buy',
        header: 'GC-Buy',
        size: 120
      },
      {
        accessorKey: 'gc_save',
        header: 'GC-Save',
        size: 140
      },
      {
        accessorKey: 'percentage',
        header: '% Discount'
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
      }
    ],
    [region]
  );
  return columns;
};
export default PromoGridColumns;
