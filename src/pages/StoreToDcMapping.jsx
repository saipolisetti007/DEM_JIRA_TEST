import React, { Suspense } from 'react';
import StoreToDcTable from '../components/StoreToDcMapping/StoreToDcTable';
import ErrorBoundary from '../errorHanlding/ErrorBoundary';

const StoreToDcMapping = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <StoreToDcTable />
      </Suspense>
    </ErrorBoundary>
  );
};

export default StoreToDcMapping;
