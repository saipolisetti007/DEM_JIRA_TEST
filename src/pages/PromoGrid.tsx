import React, { Suspense } from 'react';
import ErrorBoundary from '../errorHandling/ErrorBoundary';
import PromoGridData from '../components/PromoGrid/PromoGridData';

// Lazy load the PromoGridData component
const PromoGrid = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <PromoGridData />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PromoGrid;
