import React, { useEffect, useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { salesChannelOptions } from './FormStepFields';

import FormInputControl from '../Common/FormInputControl';
import { useSelector } from 'react-redux';
import { useFormContext, useWatch } from 'react-hook-form';

const StepEventMainParameters = ({ control, settings }) => {
  const { setValue } = useFormContext();
  const { userData } = useSelector((state) => state.userProfileData);
  const customerId = userData?.customers[0];

  const { eventsData, eventTypeOptions } = useSelector((state) => state.eventsData);

  const selectedEventType = useWatch({
    control,
    name: 'event_type'
  });

  const currentSubType = useWatch({
    control,
    name: 'event_subtype'
  });

  const eventSubTypeOptions = useMemo(() => {
    if (selectedEventType && eventsData[selectedEventType]) {
      return eventsData[selectedEventType];
    } else {
      return [];
    }
  }, [selectedEventType]);

  useEffect(() => {
    if (selectedEventType && !eventsData[selectedEventType].includes(currentSubType)) {
      setValue('event_subtype', '');
    }
  }, [selectedEventType, currentSubType]);

  const validateEndDate = (endDateField, startDateField) => (value, allValues) => {
    const startDate = allValues[startDateField];
    if (startDate && value?.isSameOrBefore(startDate)) {
      return `${endDateField} should be after start date`;
    }
    return true;
  };

  return (
    <>
      <Box sx={{ margin: '1.5rem 0px' }}>
        <Typography component="h4" variant="h5" sx={{ margin: '1rem 0px' }}>
          Event Main Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="unique_event_id"
              label="Unique Event ID"
              type="text"
              isDisabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="golden_customer_id"
              label="Golden Customer  ID "
              type="text"
              defaultValue={customerId}
              isDisabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_in_store_start_date"
              label="Event in store start date"
              type="date"
              isRequired={true}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_in_store_end_date"
              label="Event in store end date"
              type="date"
              isRequired={true}
              rules={{
                validate: validateEndDate('Event in store end date', 'event_in_store_start_date')
              }}
            />
          </Grid>
          {settings.start_of_shipments && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="start_of_shipments"
                label="Start of shipments"
                type="date"
              />
            </Grid>
          )}

          {settings.end_of_shipments && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="end_of_shipments"
                label="End of shipments"
                type="date"
                rules={{ validate: validateEndDate('End of shipments', 'start_of_shipments') }}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      <Box>
        <Typography component="h4" variant="h5" sx={{ margin: '1rem 0px' }}>
          Event Description
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_type"
              label="Event type"
              type="select"
              isRequired={true}
              options={eventTypeOptions}
            />
          </Grid>

          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_subtype"
              label="Event subtype"
              type="select"
              isRequired={true}
              options={
                eventSubTypeOptions.length ? eventSubTypeOptions : ['Please select a Event type']
              }
              rules={{
                validate: (value) => (eventSubTypeOptions.length ? !!value : true)
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInputControl
              control={control}
              name="event_description"
              label="Event description"
              type="text"
              isRequired={true}
              rules={{
                maxLength: {
                  value: 49,
                  message: 'Description can not be exceed 49 characters'
                }
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormInputControl
              control={control}
              name="event_sales_channel"
              label="Event sales channel"
              type="select"
              isRequired={true}
              options={salesChannelOptions}
            />
          </Grid>
          {settings.event_description && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="umbrella_event"
                label="Umbrella event"
                type="text"
              />
            </Grid>
          )}
          <Grid item xs={12} sx={{}}>
            <FormInputControl
              control={control}
              name="event_publish_to_demand"
              label="Event publish to demand"
              type="switch"
              isChecked={true}
            />
          </Grid>
          {settings.comments && (
            <Grid item xs={12}>
              <FormInputControl
                control={control}
                name="comments"
                label="Comments"
                type="text"
                isMultiline={true}
                rows="3"
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default StepEventMainParameters;
