import React, { Suspense } from "react";
import StoreToDcTable from "../components/StoreToDcMapping/StoreToDcTable";
import { ErrorBoundary } from "react-error-boundary";

const StoreToDcMapping = () => {
  return (
    <ErrorBoundary fallback={<div>Error on page </div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <StoreToDcTable />
      </Suspense>
    </ErrorBoundary>
  );
};

export default StoreToDcMapping;
