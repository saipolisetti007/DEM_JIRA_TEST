import React, { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';
import InfoSnackBar from '../Common/InfoSnackBar';
import { steps, settingsFields } from './FormStepFields';
import { ArrowDropDown } from '@mui/icons-material';
import { toggleSetting, updateSettings } from './settingsSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { SnackBarType } from '../ThresholdSettings/ThresholdSettingsData';

/**
 * AccordionPanel component to render each accordion panel with checkboxes.
 * @param {Object} props - Component props.
 * @param {string} props.panel - The panel identifier.
 * @param {string} props.expanded - The currently expanded panel.
 * @param {Function} props.handleChange - Function to handle panel expansion.
 * @param {string} props.title - The title of the panel.
 * @param {Array} props.fields - The fields to display as checkboxes.
 * @param {Object} props.localSettings - The current settings state.
 * @param {boolean} props.isLoading - Boolean indicating if data is loading.
 * @param {Function} props.handleCheckboxChange - Function to handle checkbox state change.
 */
const AccordionPanel = ({
  panel,
  expanded,
  handleChange,
  title,
  fields,
  localSettings,
  isLoading,
  handleCheckboxChange
}) => (
  <Accordion
    disableGutters
    elevation={0}
    expanded={expanded === panel}
    onChange={handleChange(panel)}>
    <AccordionSummary
      sx={{ flexDirection: 'row-reverse', padding: 0 }}
      expandIcon={<ArrowDropDown sx={{ fontSize: '2rem' }} />}
      aria-controls={`${panel}-content`}
      data-testid={panel}
      id={`${panel}-header`}>
      <Typography component="h4" variant="h5">
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ my: 1, mx: 2 }}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item key={field} md={6} xs={12} sx={{ marginTop: '-10px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={localSettings?.[field] || false}
                  onChange={() => handleCheckboxChange(field)}
                  disabled={isLoading}
                />
              }
              label={field === 'percentage' ? '% Discount' : field.replace(/_/g, ' ')}
            />
          </Grid>
        ))}
      </Grid>
    </AccordionDetails>
  </Accordion>
);

/**
 * ColumnsSettings component to manage column settings.
 * @param {Object} props - Component props.
 * @param {Function} props.handleClose - Function to handle closing the settings.
 */
const ColumnsSettings = ({ handleClose }: any) => {
  const dispatch = useAppDispatch();
  const { settings, isLoading } = useAppSelector((state) => state.settingsData);
  const [expanded, setExpanded] = useState('panel1');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<SnackBarType | null>({ message: '', severity: '' });
  const { userData } = useAppSelector((state) => state.userProfileData);
  const region = userData?.region;

  // Fields to hide based on region NA
  const hiddenFieldsNA = [
    'minerva_volume',
    'event_type',
    'event_subtype',
    'event_description',
    'event_sales_channel',
    'item_type',
    'customer_item_number'
  ];
  // Fields to hide based on region EU
  const hiddenFieldsEU = ['start_of_shipments', 'expected_shipments_forecast'];

  // Handle panel expansion change.
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //Handle checkbox state change.
  const handleCheckboxChange = (field) => {
    dispatch(toggleSetting(field));
  };

  //Handle save button click.
  const handleSave = () => {
    setIsSaving(true);
    dispatch(updateSettings(settings));
    setIsSnackOpen(true);
    setSnackBar({
      message: 'Changes saved successfully',
      severity: 'success'
    });
  };
  //Handle snackbar close
  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  return (
    <>
      {steps.map((step, index) => {
        //Filter fields based on region
        let filteredFields = settingsFields[index];
        if (region === 'NA') {
          filteredFields = settingsFields[index].filter((field) => !hiddenFieldsNA.includes(field));
        } else if (region === 'EU') {
          filteredFields = settingsFields[index].filter((field) => !hiddenFieldsEU.includes(field));
        }

        return (
          <AccordionPanel
            key={step}
            panel={`panel${index + 1}`}
            expanded={expanded}
            handleChange={handleChange}
            title={step}
            fields={filteredFields}
            localSettings={settings}
            isLoading={isLoading}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      })}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          py: 1,
          mt: 2,
          gap: 2,
          zIndex: 9,
          position: 'sticky',
          bottom: '-1.3rem',
          backgroundColor: '#fff'
        }}>
        <Button color="primary" variant="outlined" onClick={handleClose}>
          Return to Event Promo Plan
        </Button>

        <Button color="primary" variant="contained" onClick={handleSave}>
          {isSaving && isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
      {isSaving && isLoading
        ? ''
        : isSnackOpen &&
          snackBar && (
            <InfoSnackBar
              isOpen={isSnackOpen}
              message={snackBar.message}
              severity={snackBar.severity}
              onClose={handleSnackbar}
              dataTestId={snackBar.dataTestId}
            />
          )}
    </>
  );
};

export default ColumnsSettings;
