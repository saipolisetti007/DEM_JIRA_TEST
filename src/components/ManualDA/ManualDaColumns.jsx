import { Button } from '@mui/material';
import React, { useMemo } from 'react';

// Custom cell renderer for status
const StatusButton = ({ value }) => {
  const statusMap = {
    created: { color: 'create', label: 'Created' },
    submitted: { color: 'success', label: 'Submitted' },
    error: { color: 'error', label: 'Error' },
    cancelled: { color: 'cancel', label: 'Cancelled' },
    expired: { color: 'expired', label: 'Expired' }
  };

  const { color, label } = statusMap[value];

  return (
    <Button size="small" variant="contained" color={color}>
      {label}
    </Button>
  );
};

const ManualDaColumns = ({ region }) => {
  // Memoize the columns array to optimize performance
  const columns = useMemo(
    () => [
      {
        accessorKey: 'da_id',
        header: 'DA ID'
      },
      {
        accessorKey: 'da_line',
        header: 'DA Line ID',
        size: 130
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ row, column }) => <StatusButton value={row.original[column.id]} />
      },
      {
        accessorKey: 'country_code',
        header: 'Country Code',
        size: 120
      },
      {
        accessorKey: 'customer_identifier',
        header: 'Customer Identifier',
        size: 150
      },
      {
        accessorKey: 'event_description',
        header: 'Event Description',
        size: 130
      },
      ...(region === 'EU'
        ? []
        : [
            {
              accessorKey: 'rdd_start',
              header: 'RDD Start',
              size: 130
            }
          ]),
      ...(region === 'EU'
        ? [
            {
              accessorKey: 'ship_start',
              header: 'Ship Start',
              size: 150
            }
          ]
        : []),
      {
        accessorKey: 'item_gtin',
        header: 'Item GTIN'
      },
      {
        accessorKey: 'case_gtin',
        header: 'Case GTIN',
        size: 150
      },
      {
        accessorKey: 'fpc',
        header: 'FPC'
      },
      {
        accessorKey: 'item_type',
        header: 'Item Type',
        size: 130
      },

      {
        accessorKey: 'customer_item_number',
        header: 'Customer Item Number',
        size: 150
      },
      {
        accessorKey: 'org',
        header: 'Org'
      },
      {
        accessorKey: 'comment',
        header: 'Comment',
        size: 150
      },
      {
        accessorKey: 'sub_sector',
        header: 'Sub Sector',
        size: 130
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 140
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 160
      },
      {
        accessorKey: 'customized_code',
        header: 'Customized Code',
        size: 140
      },
      {
        accessorKey: 'volume_split_method ',
        header: 'Volume Split Method ',
        size: 150
      },
      {
        accessorKey: 'uom',
        header: 'UOM'
      },

      {
        accessorKey: 'destination_profile ',
        header: 'Destination Profile ',
        size: 130
      },
      {
        accessorKey: 'total_volume',
        header: 'Total Volume',
        size: 150
      }
    ],
    []
  );
  return columns;
};
export default ManualDaColumns;
