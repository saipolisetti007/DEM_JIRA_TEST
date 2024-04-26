import { useMemo } from 'react';

const CPFTableColumns = () => {
  const numWeeks = 26;
  const weekHeaders = Array.from({ length: numWeeks }, (_, index) => ({
    accessorKey: `week${index + 1}`,
    header: `Week ${index + 1}`
  }));
  const columns = useMemo(() => [
    {
      accessorKey: 'product_id',
      header: 'Product ID'
    },
    ...weekHeaders
  ]);
  return columns;
};
export default CPFTableColumns;
