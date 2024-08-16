import { useMemo } from 'react';

const ThresholdSettingsColumns = () => {
  const columns = useMemo(
    () => [
      { accessorKey: 'subsector', header: 'Subsector' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'brand', header: 'Brand' },
      { accessorKey: 'brand_form', header: 'Brand form' },
      { accessorKey: 'compare_with', header: 'Compare with', filterVariant: 'select' },
      { accessorKey: 'operation_type', header: 'Operation type', filterVariant: 'select' },
      { accessorKey: 'value', header: 'Value', size: 100 },
      { accessorKey: 'unit', header: 'Unit', size: 50 },
      {
        accessorKey: 'updated_by',
        header: 'Updated by',
        filterVariant: 'autocomplete',
        Cell: ({ row }) => (
          <span>
            {row.original.updated_by}, {row.original.updated_at}
          </span>
        )
      }
    ],
    []
  );
  return columns;
};
export default ThresholdSettingsColumns;
