import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import FormInputControl from '../Common/FormInputControl';

const StepEventProperties = ({ control }) => {
  return (
    <Box sx={{ margin: '1.5rem 0px' }}>
      <Typography component="h4" variant="h5" sx={{ margin: '1rem 0px' }}>
        Paragraph Name
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_string_property_1"
            label="Event string property 1"
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_string_property_2"
            label="Event string property 2"
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_string_property_3"
            label="Event string property 3"
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_string_property_4"
            label="Event string property 4"
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_string_property_5"
            label="Event string property 5"
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_num_property_1"
            label="Event num  property 1"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_num_property_2"
            label="Event num  property 2"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_num_property_3"
            label="Event num  property 3"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_num_property_4"
            label="Event num  property 4"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="event_num_property_5"
            label="Event num  property 5"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl control={control} name="offer_type" label="Offer type" type="text" />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="off"
            label="Off"
            type="text"
            rules={{
              validationType: 'intValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="limit"
            label="Limit"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="tpr"
            label="TPR"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="off_2"
            label="OFF 2"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="gc_buy"
            label="GC-Buy"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="gc_save"
            label="GC-Save"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputControl
            control={control}
            name="percentage"
            label="Percentage"
            type="text"
            rules={{
              validationType: 'floatValidation'
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepEventProperties;
