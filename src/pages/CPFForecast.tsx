import React, { Suspense } from 'react';
import ErrorBoundary from '../errorHandling/ErrorBoundary';
import CPFForecastMain from '../components/CPFForecast/CPFForecastMain';

// Lazy load the CPFForecastMain component
const CPFForecast = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <CPFForecastMain />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CPFForecast;
