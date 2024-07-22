export const reduceFilters = (filters) => {
  return Object.keys(filters).reduce((acc, key) => {
    if (
      filters[key] &&
      (Array.isArray(filters[key]) ? !filters[key].includes('All') : filters[key] !== 'All')
    ) {
      acc[key] = Array.isArray(filters[key]) ? filters[key] : [filters[key]];
    } else {
      acc[key] = [];
    }
    return acc;
  }, {});
};

export const mapFilterParams = (filterParams) => {
  return {
    brand: filterParams.brand,
    category: filterParams.category,
    subsector: filterParams.subsector,
    brandForm: filterParams.brandForm,
    active: filterParams.active,
    sku: filterParams.sku,
    customerItemNumber: filterParams.customerItemNumber,
    prodName: filterParams.prodName
  };
};
