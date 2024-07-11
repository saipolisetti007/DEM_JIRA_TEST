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
import { steps, dateFileds } from './FormStepFileds';
import { ArrowDropDown } from '@mui/icons-material';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
const formatRowData = (rowData) => {
  const formattedData = { ...rowData };

  dateFileds.forEach((field) => {
    if (formattedData[field]) {
      formattedData[field] = moment(formattedData[field], 'MM/DD/YYYY');
    }
  });
  return formattedData;
};

const AccordionPanel = ({ panel, expanded, handleChange, title, children }) => (
  <Accordion
    disableGutters
    elevation={0}
    expanded={expanded === panel}
    onChange={handleChange(panel)}>
    <AccordionSummary
      sx={{ flexDirection: 'row-reverse', padding: 0 }}
      expandIcon={<ArrowDropDown sx={{ fontSize: '2rem' }} />}
      aria-controls={`${panel}-content`}
      id={`${panel}-header`}>
      <Typography component="h4" variant="h5">
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ marginTop: '-10px' }}>{children}</AccordionDetails>
  </Accordion>
);

const EditEventForm = ({ rowData, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const formattedData = formatRowData(rowData);
  const methods = useForm({ mode: 'onChange', defaultValues: formattedData });
  const { handleSubmit, control, setError, formState } = methods;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
    try {
      await updateRowData(formattedData);
      handleClose(null, 'edit');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const response = error.response?.data;
      const transformErrors = (response) => {
        return response?.errors.reduce((acc, { field, error }) => {
          acc[field] = error;
          return acc;
        }, {});
      };
      const transformedErrors = transformErrors(response);
      for (const field in transformedErrors) {
        setError(field, { type: 'server', message: transformedErrors[field] });
      }
      setIsSnackOpen(true);
      setSnackBar({
        message: <span>Please fix errors in and try to save again</span>,
        severity: 'error'
      });
    }
  };

  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <AccordionPanel
            panel="panel1"
            expanded={expanded}
            handleChange={handleChange}
            title={steps[0]}>
            <StepEventMainParameters control={control} />
          </AccordionPanel>

          <AccordionPanel
            panel="panel2"
            expanded={expanded}
            handleChange={handleChange}
            title={steps[1]}>
            <StepEventAdditionalData control={control} />
          </AccordionPanel>

          <AccordionPanel
            panel="panel3"
            expanded={expanded}
            handleChange={handleChange}
            title={steps[2]}>
            <StepEventProperties control={control} />
          </AccordionPanel>

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
