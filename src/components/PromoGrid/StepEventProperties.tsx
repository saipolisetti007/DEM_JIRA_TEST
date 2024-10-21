import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import FormInputControl from '../Common/FormInputControl';
import { Control } from 'react-hook-form';

type StepEventPropertiesPropsType = {
  control: Control;
  settings: Record<string, any>;
};

//Step 3 - Event Properties
const StepEventProperties = ({ control, settings }: StepEventPropertiesPropsType) => {
  return (
    <Box sx={{ margin: '1.5rem 0px' }}>
      <Typography component="h4" variant="h5" sx={{ margin: '1rem 0px' }}>
        Paragraph Name
      </Typography>

      <Grid container spacing={2}>
        {/* Conditionally render offer type input field based on settings */}
        {settings.offer_type && (
          <Grid item xs={6}>
            <FormInputControl control={control} name="offer_type" label="Offer type" type="text" />
          </Grid>
        )}

        {settings.multi_category_offer && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="multi_category_offer"
              label="Multi Category Offer"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}

        {settings.multi_manufacturer_offer && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="multi_manufacturer_offer"
              label="Multi Manufacturer Offer"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}

        {settings.off && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="off"
              label="Off"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}
        {settings.limit && (
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
        )}

        {settings.off_2 && (
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
        )}

        {settings.quantity_threshold && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="quantity_threshold"
              label="Quantity Threshold"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}
        {settings.x_free && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="x_free"
              label="X Free"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}
        {settings.gc_buy && (
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
        )}
        {settings.gc_save && (
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
        )}
        {settings.percentage && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="percentage"
              label="% Discount"
              type="text"
              rules={{
                validationType: 'floatValidation'
              }}
            />
          </Grid>
        )}

        {settings.event_string_property_1 && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_string_property_1"
              label="Event string property 1"
              type="text"
            />
          </Grid>
        )}
        {settings.event_string_property_2 && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_string_property_2"
              label="Event string property 2"
              type="text"
            />
          </Grid>
        )}
        {settings.event_string_property_3 && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_string_property_3"
              label="Event string property 3"
              type="text"
            />
          </Grid>
        )}
        {settings.event_string_property_4 && (
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_string_property_4"
              label="Event string property 4"
              type="text"
            />
          </Grid>
        )}

        {settings.event_num_property_1 && (
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
        )}
        {settings.event_num_property_2 && (
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
        )}
        {settings.event_num_property_3 && (
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
        )}
      </Grid>
    </Box>
  );
};

export default StepEventProperties;
