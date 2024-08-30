import React, { useState } from 'react';
import moment from 'moment';
import { useForm, FormProvider } from 'react-hook-form';
import StepEventMainParameters from './StepEventMainParameters';
import StepEventProperties from './StepEventProperties';
import StepEventAdditionalData from './StepEventAdditionalData';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography
} from '@mui/material';
import { updateRowData } from '../../api/promoGridApi';
import InfoSnackBar from '../Common/InfoSnackBar';
import { steps, dateFields, stepFields } from './FormStepFields';
import { ArrowDropDown } from '@mui/icons-material';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { useSelector } from 'react-redux';
import DialogComponent from '../Common/DialogComponent';
const formatRowData = (rowData) => {
  const formattedData = { ...rowData };

  dateFields.forEach((field) => {
    if (formattedData[field]) {
      formattedData[field] = moment(formattedData[field], 'MM/DD/YYYY');
    }
  });
  return formattedData;
};

const AccordionPanel = ({ panel, index, expanded, handleChange, title, control, settings }) => {
  const anyFieldTrue = stepFields[index].some((field) => settings[field]);
  const hasExtraFields = stepFields[index].some((field) => settings[field] === undefined);

  const isVisible = anyFieldTrue || hasExtraFields;

  if (!isVisible) {
    return null;
  }
  return (
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
      <AccordionDetails sx={{ marginTop: '-10px' }}>
        {panel === 'panel1' && <StepEventMainParameters control={control} settings={settings} />}
        {panel === 'panel2' && <StepEventAdditionalData control={control} settings={settings} />}
        {panel === 'panel3' && <StepEventProperties control={control} settings={settings} />}
      </AccordionDetails>
    </Accordion>
  );
};

const EditEventForm = ({ rowData, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const formattedData = formatRowData(rowData);
  const methods = useForm({ mode: 'onChange', defaultValues: formattedData });
  const { handleSubmit, control, setError, formState } = methods;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { settings } = useSelector((state) => state.settingsData);

  const handleSave = async () => {
    handleSubmit(onSubmit)();
  };

  const formatDataForSubmit = (data) => {
    const formattedData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== '') {
        if (moment.isMoment(data[key])) {
          formattedData[key] = data[key].format('MM/DD/YYYY');
        } else {
          formattedData[key] = data[key];
        }
      } else {
        formattedData[key] = null;
      }
    });
    return formattedData;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formattedData = formatDataForSubmit(data);
    setUpdatedData(formattedData);
    try {
      await updateRowData(formattedData);
      handleClose(null, 'edit');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const response = error.response?.data;
      const transformErrors = (response, key) => {
        return response?.reduce((acc, message) => {
          acc[message.field] = message[key];
          return acc;
        }, {});
      };

      const transformedErrors = transformErrors(response?.errors || [], 'error');
      const transformedWarnings = transformErrors(response?.warnings || [], 'warning');

      if (Object.keys(transformedErrors).length > 0) {
        for (const field in transformedErrors) {
          setError(field, { type: 'error', message: transformedErrors[field] });
        }
        setIsSnackOpen(true);
        setSnackBar({
          message: <span>Please fix errors in and try to save again</span>,
          severity: 'error'
        });
      } else if (Object.keys(transformedWarnings).length > 0) {
        for (const field in transformedWarnings) {
          setError(field, { type: 'warning', message: transformedWarnings[field] });
        }
        setDialogOpen(true);
      }
    }
  };

  const handleDialogConfirm = async () => {
    setDialogOpen(false);
    try {
      setIsLoading(true);
      const dataWithWarningOverride = {
        ...updatedData,
        warning_override: true
      };
      await updateRowData(dataWithWarningOverride);
      setIsLoading(false);
      handleClose(null, 'edit');
    } catch (error) {
      setIsLoading(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error Occured while updating the data',
        severity: 'error'
      });
    }
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form>
          {steps.map((step, index) => (
            <AccordionPanel
              key={step}
              index={index}
              expanded={expanded}
              handleChange={handleChange}
              panel={`panel${index + 1}`}
              title={step}
              control={control}
              settings={settings}
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
              Return to Manage Events
            </Button>

            <Button
              onClick={handleSave}
              color="primary"
              variant="contained"
              disabled={!formState.isValid}
              startIcon={!formState.isValid ? <UnpublishedIcon /> : ''}>
              {isLoading ? 'Saving Data...' : 'Save changes'}
            </Button>
          </Box>
        </form>
      </FormProvider>
      <DialogComponent
        open={dialogOpen}
        title="Confirm submission"
        dialogHeading="There are warnings in the form submission"
        dialogContent="Do you want to proceed?"
        cancelText="Return to PromoGrid"
        confirmText="Procced to Submit"
        handleConfirm={handleDialogConfirm}
        handleClose={handleDialogClose}
      />

      {isSnackOpen && snackBar && (
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

export default EditEventForm;
