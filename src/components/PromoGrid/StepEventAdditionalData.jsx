import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import FormInputControl from '../Common/FormInputControl';
import { itemTypeOptions, iDTypeOptions } from './FormStepFields';
import { useSelector } from 'react-redux';

const StepEventAdditionalData = ({ control, settings }) => {
  const { countriesData } = useSelector((state) => state.countriesData);
  return (
    <Box sx={{ margin: '1.5rem 0px' }}>
      <Typography component="h4" variant="h5" sx={{ margin: '1rem 0px' }}>
        Paragraph Name
      </Typography>

      <Grid container spacing={2}>
        {settings.expected_shipments_forecast && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="expected_shipments_forecast"
              label="Expected shipments forecast"
              type="text"
              rules={{
                validationType: 'intValidation'
              }}
            />
          </Grid>
        )}
        {settings.expected_consumption_forecast && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="expected_consumption_forecast"
              label="Expected consumption forecast"
              type="text"
              rules={{
                validationType: 'intValidation'
              }}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="item_type"
            label="Item type"
            type="select"
            isRequired={true}
            options={itemTypeOptions}
          />
        </Grid>
        {settings.bu && (
          <Grid item xs={6}>
            <FormInputControl control={control} name="bu" label="BU" type="text" />
          </Grid>
        )}
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="product_id"
            label="Product ID"
            type="text"
            isRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="id_type"
            label="ID type"
            type="select"
            isRequired={true}
            options={iDTypeOptions}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="customer_item_number"
            label="Customer item number"
            isRequired={true}
            type="text"
            rules={{
              validationType: 'intValidation'
            }}
          />
        </Grid>
        {settings.proxy_like_item_number && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="proxy_like_item_number"
              label="Proxy like item number"
              type="text"
              rules={{
                validationType: 'intValidation'
              }}
            />
          </Grid>
        )}
        {settings.pgp_flag && (
          <Grid item xs={12}>
            <FormInputControl
              control={control}
              name="pgp_flag"
              label="PGP flag"
              type="switch"
              isChecked={false}
            />
          </Grid>
        )}
        {settings.promoted_product_group_id && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="promoted_product_group_id"
              label="Promoted product group ID"
              type="text"
            />
          </Grid>
        )}

        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="country_code"
            label="Country code"
            type="autocomplete"
            isRequired={true}
            options={countriesData}
          />
        </Grid>
        {settings.distribution_profile && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="distribution_profile"
              label="Distribution profile"
              type="text"
            />
          </Grid>
        )}
        {settings.discount_amt && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="discount_amt"
              label="Discount amount"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}
        {settings.base_price && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="base_price"
              label="Base price"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}
        {settings.price_after_discount && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="price_after_discount"
              label="Price after discount"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}
        {settings.status && (
          <Grid item xs={6}>
            <FormInputControl control={control} name="status" label="Status" type="text" />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default StepEventAdditionalData;
