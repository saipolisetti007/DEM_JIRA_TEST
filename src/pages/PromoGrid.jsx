import React, { Suspense } from 'react';
import ErrorBoundary from '../errorHanlding/ErrorBoundary';
import PromoGridData from '../components/PromoGrid/PromoGridData';

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
