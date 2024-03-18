import React, { Suspense } from 'react';
// import StoreToDcTable from '../components/StoreToDcMapping/StoreToDcTable';
import StoreToDc from '../components/StoreToDcMapping/StoreToDc';

const StoreToDcMapping = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <StoreToDcTable /> */}
      <StoreToDc />
    </Suspense>
  );
};

export default StoreToDcMapping;
