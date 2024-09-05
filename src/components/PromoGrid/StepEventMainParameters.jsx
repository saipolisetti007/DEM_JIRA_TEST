import React, { useEffect, useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { salesChannelOptions } from './FormStepFields';

import FormInputControl from '../Common/FormInputControl';
import { useSelector } from 'react-redux';
import { useFormContext, useWatch } from 'react-hook-form';

const StepEventMainParameters = ({ control, settings, customerId }) => {
  const { setValue } = useFormContext();
  const { userData } = useSelector((state) => state.userProfileData);
  const region = userData?.region;

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
    if (startDate && value?.isBefore(startDate)) {
      return `${endDateField} should be equal/after start date`;
    }
    return null;
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
              name="cpf_id"
              label="CPF ID"
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
          {(region === 'EU' || settings.start_of_shipments) && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="start_of_shipments"
                label="Start of shipments"
                type="date"
                isRequired={region === 'EU'}
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
          {(region !== 'EU' || settings.event_type) && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="event_type"
                label="Event type"
                type="select"
                isRequired={region !== 'EU'}
                options={eventTypeOptions}
              />
            </Grid>
          )}
          {(region !== 'EU' || settings.event_subtype) && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="event_subtype"
                label="Event subtype"
                type="select"
                isRequired={region !== 'EU'}
                options={
                  eventSubTypeOptions.length ? eventSubTypeOptions : ['Please select a Event type']
                }
                rules={{
                  validate: (value) => (eventSubTypeOptions.length ? !!value : true)
                }}
              />
            </Grid>
          )}
          {region === 'EU' && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="unique_event_id"
                label="Unique Event ID"
                type="text"
                isRequired={true}
              />
            </Grid>
          )}
          {region === 'EU' && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="minerva_volume"
                label="Calculate Volume"
                type="switch"
                isChecked={true}
              />
            </Grid>
          )}
          {(region !== 'EU' || settings.event_description) && (
            <Grid item xs={12}>
              <FormInputControl
                control={control}
                name="event_description"
                label="Event description"
                type="text"
                isRequired={region !== 'EU'}
                rules={{
                  maxLength: {
                    value: 49,
                    message: 'Description can not be exceed 49 characters'
                  }
                }}
              />
            </Grid>
          )}
          {(region !== 'EU' || settings.event_sales_channel) && (
            <Grid item xs={6}>
              <FormInputControl
                control={control}
                name="event_sales_channel"
                label="Event sales channel"
                type="select"
                isRequired={region !== 'EU'}
                options={salesChannelOptions}
              />
            </Grid>
          )}
          {settings.umbrella_event && (
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
