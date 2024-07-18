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
import { useDispatch, useSelector } from 'react-redux';
import { toggleSetting, updateSettings } from './settingsSlice';

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
              label={field.replace(/_/g, ' ')}
            />
          </Grid>
        ))}
      </Grid>
    </AccordionDetails>
  </Accordion>
);

const ColumnsSettings = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { settings, isLoading } = useSelector((state) => state.settingsData);
  const [expanded, setExpanded] = useState('panel1');
  const [isSaving, setIsSaving] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCheckboxChange = (field) => {
    dispatch(toggleSetting(field));
  };

  const handleSave = () => {
    setIsSaving(true);
    dispatch(updateSettings(settings));
    setIsSnackOpen(true);
    setSnackBar({
      message: 'Changes saved successfully',
      severity: 'success'
    });
  };

  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  return (
    <>
      {steps.map((step, index) => (
        <AccordionPanel
          key={step}
          panel={`panel${index + 1}`}
          expanded={expanded}
          handleChange={handleChange}
          title={step}
          fields={settingsFields[index]}
          localSettings={settings}
          isLoading={isLoading}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}

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
          Return to Event Promo Grid
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
