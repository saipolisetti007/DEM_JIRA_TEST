import React, { Suspense } from 'react';
import PromoGridData from '../components/PromoGrid/PromoGridData';

const PromoGrid = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromoGridData />
    </Suspense>
  );
};

export default PromoGrid;
