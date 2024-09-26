// Function to reduce filters by removing 'All' values and converting single values to arrays
export const reduceFilters = (filters) => {
  return Object.keys(filters).reduce((acc, key) => {
    if (
      filters[key] &&
      (Array.isArray(filters[key]) ? !filters[key].includes('All') : filters[key] !== 'All')
    ) {
      // If the filter value is not 'All', add it to the accumulator
      acc[key] = Array.isArray(filters[key]) ? filters[key] : [filters[key]];
    } else {
      // If the filter value is 'All', set it to an empty array
      acc[key] = [];
    }
    return acc;
  }, {});
};

// Function to map filter parameters to a specific structure
export const mapFilterParams = (filterParams) => {
  return {
    brand: filterParams.brand,
    category: filterParams.category,
    subsector: filterParams.subsector,
    brandForm: filterParams.brandForm,
    active: filterParams.active,
    sku: filterParams.sku,
    customerItemNumber: filterParams.customerItemNumber,
    custFlag: filterParams.custFlag,
    prodName: filterParams.prodName,
    eventType: filterParams.eventType,
    eventSubtype: filterParams.eventSubtype,
    customerId: filterParams.customerId,
    status: filterParams.status,
    comments: filterParams.comments
  };
};
