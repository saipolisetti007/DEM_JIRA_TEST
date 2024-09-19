import { debounce } from 'lodash';
// Function to create a debounced version of the fetch filters function
const createDebouncedFetchFilters = (
  fetchFiltersFn, // function to fetch filters
  setFilterOptions, // function to set the filter options
  setIsSnackOpen, // function to set the snack bar open state
  setSnackBar, // function to set the snack bar message and severity
  excludeKeys = [] // keys to exclude from the fetch filters request
) =>
  debounce(async (updatedFilters) => {
    try {
      // Fetch the filters from the server
      const response = await fetchFiltersFn(updatedFilters);

      // Update the filter options in the state
      setFilterOptions((prevOptions) => {
        const newOptions = {
          // Combine fetched options with previously selected options for each filter
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
                new Set([
                  ...prevOptions.customerItemNumber,
                  ...(response.customer_item_number || [])
                ])
              )
            : response.customer_item_number || []
        };
        // Conditionally add eventType to newOptions if not excluded
        if (!excludeKeys.includes('eventType')) {
          newOptions.eventType = updatedFilters.eventType.length
            ? Array.from(new Set([...prevOptions.eventType, ...(response.event_type || [])]))
            : response.event_type || [];
        }

        // Conditionally add eventSubtype to newOptions if not excluded
        if (!excludeKeys.includes('eventSubtype')) {
          newOptions.eventSubtype = updatedFilters.eventSubtype.length
            ? Array.from(new Set([...prevOptions.eventSubtype, ...(response.event_subtype || [])]))
            : response.event_subtype || [];
        }

        // Conditionally add custFlag to newOptions if not excluded
        if (!excludeKeys.includes('custFlag')) {
          newOptions.custFlag = updatedFilters.custFlag.length
            ? Array.from(new Set([...prevOptions.custFlag, ...(response.cust_flag || [])]))
            : response.cust_flag || [];
        }

        // Conditionally add active to newOptions if not excluded
        if (!excludeKeys.includes('active')) {
          newOptions.active =
            updatedFilters.active?.length && Array.isArray(response.active)
              ? Array.from(new Set([...prevOptions.active, ...response.active]))
              : response.active || [];
        }

        // Conditionally add status to newOptions if not excluded
        if (!excludeKeys.includes('status')) {
          newOptions.status =
            updatedFilters.status?.length && Array.isArray(response.status)
              ? Array.from(new Set([...prevOptions.status, ...response.status]))
              : response.status || [];
        }

        return newOptions;
      });
    } catch (error) {
      // Handle errors by showing a snackbar with an error message
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  }, 500); // Debounce the function with a delay of 500ms

export default createDebouncedFetchFilters;
