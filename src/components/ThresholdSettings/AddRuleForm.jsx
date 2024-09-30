import React, { useEffect, useMemo, useState } from 'react';
import FormInputControl from '../Common/FormInputControl';
import { Alert, Box, Grid, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { fetchThresholdFilters } from '../../api/cpfForecastApi';
const AddRuleForm = ({ control, filters, isEdit, errorMessage }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandForms, setBrandForms] = useState([]);
  const [isBrandFormLoading, setIsBrandFormLoading] = useState(false);
  const [isBrandsLoading, setIsBrandsLoading] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  // Destructure methods from useFormContext
  const { setValue, getValues, clearErrors } = useFormContext();
  const currentValues = getValues(); // Get current form values

  // Watch specific form fields for changes
  const subsector = useWatch({
    control,
    name: 'subsector'
  });

  const category = useWatch({
    control,
    name: 'category'
  });

  const brand = useWatch({
    control,
    name: 'brand'
  });

  const fetchSubsequentFilters = async (reqParams) => {
    return await fetchThresholdFilters(reqParams);
  };

  // added to prevent repetitive api calls
  const stableSubsector = useMemo(() => subsector, [subsector]);
  const stableCategory = useMemo(() => category, [category]);
  const stableBrand = useMemo(() => brand, [brand]);

  // Effect to update categories when subsector changes
  useEffect(() => {
    if (subsector) {
      setIsCategoryLoading(true);
      setCategories([]);
      setValue('category', undefined);
      setValue('brand', undefined);
      setValue('brand_form', undefined);
      const reqParams = 'subsector=' + subsector;
      fetchSubsequentFilters(reqParams).then((data) => {
        const categories = data || [];
        setCategories(categories);
        setBrands([]);
        setBrandForms([]);
        setIsCategoryLoading(false);
      });
    }
  }, [stableSubsector]);

  // Effect to update brands when category changes
  useEffect(() => {
    if (category) {
      setIsBrandsLoading(true);
      setBrands([]);
      setValue('brand', undefined);
      setValue('brand_form', undefined);
      const reqParams = 'subsector=' + subsector + '&category=' + category;
      fetchSubsequentFilters(reqParams).then((data) => {
        const brands = data || [];
        setBrands(brands);
        setBrandForms([]);
        setIsBrandsLoading(false);
      });
    }
  }, [stableCategory]);

  // Effect to update brand forms when brand changes
  useEffect(() => {
    if (brand) {
      setIsBrandFormLoading(true);
      setBrandForms([]);
      setValue('brand_form', undefined);
      const reqParams = 'subsector=' + subsector + '&category=' + category + '&brand=' + brand;
      fetchSubsequentFilters(reqParams).then((data) => {
        const brandForms = data || [];
        setBrandForms(brandForms);
        setIsBrandFormLoading(false);
      });
    }
  }, [stableBrand]);

  // Options for select inputs
  const compareOptions = ['Customer Forecast'];
  const OperationOptions = ['% difference', 'Abs. unit difference'];
  const volumsUnitOptions = ['cs', 'it', 'su', 'msu'];

  // Watch the operation type field for changes
  const operation = useWatch({
    control,
    name: 'operation_type'
  });

  useEffect(() => {
    const unitsValue = getValues('unit');

    if (operation === '% difference') {
      if (unitsValue !== '%') {
        setValue('unit', '%');
        clearErrors('unit');
      }
    } else if (
      operation === 'Abs. unit difference' &&
      unitsValue !== '' &&
      !volumsUnitOptions.includes(unitsValue)
    ) {
      setValue('unit', '');
    }
  }, [operation, getValues, setValue]);

  return (
    <>
      <Box>
        <Typography component="h6" variant="h5" sx={{ margin: '1rem 0px' }}>
          Select section
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormInputControl
              control={control}
              name="subsector"
              label="Subsector"
              type="autocomplete"
              options={filters.subsectors}
              isRequired={true}
            />
          </Grid>
          <Grid item xs={3}>
            <FormInputControl
              control={control}
              name="category"
              label="Category"
              type="select"
              options={categories}
              isDisabled={!subsector && !isEdit}
              loading={isCategoryLoading}
            />
          </Grid>
          <Grid item xs={3}>
            <FormInputControl
              control={control}
              name="brand"
              label="Brand"
              type="select"
              options={brands}
              isDisabled={!category && !isEdit}
              loading={isBrandsLoading}
            />
          </Grid>
          <Grid item xs={3}>
            <FormInputControl
              control={control}
              name="brand_form"
              label="Brand form"
              type="select"
              options={brandForms}
              isDisabled={!brand && !isEdit}
              loading={isBrandFormLoading}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography component="h6" variant="h5" sx={{ margin: '1rem 0px' }}>
          Select type of comparison and operation
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="compare_with"
              label="Compare with"
              type="select"
              options={compareOptions}
              isRequired={true}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="operation_type"
              label="Operation type"
              type="select"
              isRequired={true}
              options={OperationOptions}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography component="h6" variant="h5" sx={{ margin: '1rem 0px' }}>
          User defined value
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormInputControl
              control={control}
              name="value"
              label="Value"
              type="text"
              isRequired={true}
            />
            <Typography variant="body2" component="span">
              Average fluctuation value: 5%
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {operation === '% difference' ? (
              <FormInputControl
                control={control}
                name="unit"
                label="Unit"
                type="text"
                isDisabled={operation === '% difference'}
                isRequired={true}
              />
            ) : (
              <FormInputControl
                control={control}
                name="unit"
                label="Unit"
                type="select"
                options={volumsUnitOptions}
                isRequired={true}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 2 }}>
        {errorMessage && (
          <Alert severity="error">
            <Typography variant="body2">
              Unable to create new rule, entry already exists for <br />
              <strong>
                {currentValues.subsector} /
                {currentValues.category && <span> {currentValues.category} / </span>}
                {currentValues.brand && <span> {currentValues.brand} / </span>}
                {currentValues.brand_form && <span> {currentValues.brand_form} / </span>}
                {currentValues.compare_with} / {currentValues.operation_type}
              </strong>
              <br />
              To edit entry, return to settings and select edit entry
            </Typography>
          </Alert>
        )}
        {isEdit ? (
          <Alert severity="warning">
            <Typography variant="body2">
              Saving will overwrite existing entry for <br />
              <strong>
                {currentValues.subsector} /
                {currentValues.category && <span> {currentValues.category} / </span>}
                {currentValues.brand && <span> {currentValues.brand} / </span>}
                {currentValues.brand_form && <span> {currentValues.brand_form} / </span>}
                {currentValues.compare_with} / {currentValues.operation_type}
              </strong>
            </Typography>
          </Alert>
        ) : (
          ''
        )}
      </Box>
    </>
  );
};

export default AddRuleForm;
