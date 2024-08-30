import { debounce } from 'lodash';

const createDebouncedFetchFilters = (
  fetchFiltersFn,
  setFilterOptions,
  setIsSnackOpen,
  setSnackBar,
  excludeKeys = []
) =>
  debounce(async (updatedFilters) => {
    try {
      const response = await fetchFiltersFn(updatedFilters);

      // combining fetched options with the previously selected options for the currently changed filter
      setFilterOptions((prevOptions) => {
        const newOptions = {
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
            : response.customer_item_number || [],
          customerId: updatedFilters.customerId.length
            ? Array.from(new Set([...prevOptions.customerId, ...(response.customer_id || [])]))
            : response.customer_id || []
        };

        if (!excludeKeys.includes('eventType')) {
          newOptions.eventType = updatedFilters.eventType.length
            ? Array.from(new Set([...prevOptions.eventType, ...(response.event_type || [])]))
            : response.event_type || [];
        }

        if (!excludeKeys.includes('eventSubtype')) {
          newOptions.eventSubtype = updatedFilters.eventSubtype.length
            ? Array.from(new Set([...prevOptions.eventSubtype, ...(response.event_subtype || [])]))
            : response.event_subtype || [];
        }
        if (!excludeKeys.includes('custFlag')) {
          newOptions.custFlag = updatedFilters.custFlag.length
            ? Array.from(new Set([...prevOptions.custFlag, ...(response.cust_flag || [])]))
            : response.cust_flag || [];
        }
        if (!excludeKeys.includes('active')) {
          newOptions.active =
            updatedFilters.active?.length && Array.isArray(response.active)
              ? Array.from(new Set([...prevOptions.active, ...response.active]))
              : response.active || [];
        }

        return newOptions;
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  }, 500);

export default createDebouncedFetchFilters;
