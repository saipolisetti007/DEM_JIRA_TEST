import { debounce } from 'lodash';

const createDebouncedFetchFilters = (
  fetchFiltersFn,
  setFilterOptions,
  setIsSnackOpen,
  setSnackBar
) =>
  debounce(async (updatedFilters) => {
    try {
      const response = await fetchFiltersFn(updatedFilters);

      // combining fetched options with the previously selected options for the currently changed filter
      setFilterOptions((prevOptions) => ({
        subsector: updatedFilters.subsector.length
          ? Array.from(new Set([...prevOptions.subsector, ...(response.subsector || [])]))
          : response.subsector || [],
        category: updatedFilters.category.length
          ? Array.from(new Set([...prevOptions.category, ...(response.category || [])]))
          : response.category || [],
        brand: updatedFilters.brand.length
          ? Array.from(new Set([...prevOptions.brand, ...(response.brand || [])]))
          : response.brand || [],
        brandForm: updatedFilters.brandForm.length
          ? Array.from(new Set([...prevOptions.brandForm, ...(response.prod_form_name || [])]))
          : response.prod_form_name || [],
        sku: updatedFilters.sku.length
          ? Array.from(new Set([...prevOptions.sku, ...(response.sku || [])]))
          : response.sku || [],
        prodName: updatedFilters.prodName.length
          ? Array.from(new Set([...prevOptions.prodName, ...(response.prod_name || [])]))
          : response.prod_name || [],
        customerItemNumber: updatedFilters.customerItemNumber.length
          ? Array.from(
              new Set([...prevOptions.customerItemNumber, ...(response.customer_item_number || [])])
            )
          : response.customer_item_number || [],
        active:
          updatedFilters.active?.length && Array.isArray(response.active)
            ? Array.from(new Set([...prevOptions.active, ...response.active]))
            : response.active || []
      }));
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  }, 500);

export default createDebouncedFetchFilters;
