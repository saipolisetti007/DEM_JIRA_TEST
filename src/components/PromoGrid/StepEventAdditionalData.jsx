import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import FormInputControl from '../Common/FormInputControl';

const StepEventAdditionalData = ({ control }) => {
  return (
    <Box sx={{ margin: '1.5rem 0px' }}>
      <Typography component="h4" variant="h5" sx={{ margin: '1rem 0px' }}>
        Paragraph Name
      </Typography>

      <Grid container spacing={2}>
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
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="item_type"
            label="Item type"
            type="text"
            isRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl control={control} name="bu" label="BU" type="text" />
        </Grid>
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
            type="text"
            isRequired={true}
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

        <Grid item xs={12}>
          <FormInputControl
            control={control}
            name="pgp_flag"
            label="PGP flag"
            type="switch"
            isChecked={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="promoted_product_group_id"
            label="Promoted product group ID"
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="country_code"
            label="Country code"
            type="text"
            isRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="distribution_profile"
            label="Distribution profile"
            type="text"
          />
        </Grid>
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
        <Grid item xs={6}>
          <FormInputControl control={control} name="status" label="Status" type="text" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepEventAdditionalData;
