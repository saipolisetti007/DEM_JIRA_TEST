import React, { Suspense } from 'react';
import ErrorBoundary from '../errorHandling/ErrorBoundary';
import ThresholdSettingsData from '../components/ThresholdSettings/ThresholdSettingsData';

const ThresholdSettings = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <ThresholdSettingsData />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ThresholdSettings;
