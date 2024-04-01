import React, { Suspense } from 'react';
import PromoGridData from '../components/PromoGrid/PromoGridData';
import ErrorBoundary from '../errorHanlding/ErrorBoundary';

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
