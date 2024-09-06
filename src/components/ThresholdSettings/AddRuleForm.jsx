import React, { useEffect, useState } from 'react';
import FormInputControl from '../Common/FormInputControl';
import { Alert, Box, Grid, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';

const AddRuleForm = ({ control, filters, isEdit, errorMessage }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandForms, setBrandForms] = useState([]);
  const { setValue, getValues } = useFormContext();
  const currentValues = getValues();

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

  useEffect(() => {
    if (subsector) {
      const categories = filters.rawData[subsector] ? Object.keys(filters.rawData[subsector]) : [];
      setCategories(categories);
      setBrands([]);
      setBrandForms([]);
    }
  }, [subsector, filters.rawData]);

  useEffect(() => {
    if (category) {
      const brands = filters.rawData[subsector]?.[category]
        ? Object.keys(filters.rawData[subsector][category])
        : [];
      setBrands(brands);
      setBrandForms([]);
    }
  }, [category, subsector, filters.rawData]);

  useEffect(() => {
    if (brand) {
      const brandForms = filters.rawData[subsector]?.[category]?.[brand] || [];
      setBrandForms(brandForms);
    }
  }, [brand, category, subsector, filters.rawData]);

  const compareOptions = ['Customer Forecast'];
  const OperationOptions = ['% difference', 'Abs. unit difference'];
  const volumsUnitOptions = ['cs', 'it', 'su', 'msu'];

  const operation = useWatch({
    control,
    name: 'operation_type'
  });

  useEffect(() => {
    const unitsValue = getValues('unit');

    if (operation === '% difference') {
      if (unitsValue !== '%') {
        setValue('unit', '%');
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
              disabled={!subsector}
            />
          </Grid>
          <Grid item xs={3}>
            <FormInputControl
              control={control}
              name="brand"
              label="Brand"
              type="select"
              options={brands}
              disabled={!category}
            />
          </Grid>
          <Grid item xs={3}>
            <FormInputControl
              control={control}
              name="brand_form"
              label="Brand form"
              type="select"
              options={brandForms}
              disabled={!brand}
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
