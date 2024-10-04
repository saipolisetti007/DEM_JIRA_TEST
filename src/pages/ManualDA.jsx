import React, { Suspense } from 'react';
import ErrorBoundary from '../errorHandling/ErrorBoundary';
import ManualDaList from '../components/ManualDA/ManualDaList';

// Lazy load the PromoGridData component
const ManualDA = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <ManualDaList />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ManualDA;
