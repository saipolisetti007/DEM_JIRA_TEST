import React, { Suspense } from 'react';
import ErrorBoundary from '../errorHanlding/ErrorBoundary';
import CPFForescastMain from '../components/CPFForecast/CPFForescastMain';

const CPFForecast = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <CPFForescastMain />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CPFForecast;
