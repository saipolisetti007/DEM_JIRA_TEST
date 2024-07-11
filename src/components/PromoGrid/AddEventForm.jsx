import React, { useState } from 'react';
import moment from 'moment';
import { useForm, FormProvider } from 'react-hook-form';
import StepEventMainParameters from './StepEventMainParameters';
import StepEventProperties from './StepEventProperties';
import StepEventAdditionalData from './StepEventAdditionalData';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { addNewRowData } from '../../api/promoGridApi';
import InfoSnackBar from '../Common/InfoSnackBar';
import { steps, stepFileds } from './FormStepFileds';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AddEventForm = ({ handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepErrors, setStepErrors] = useState({});
  const [stepCompleted, setStepCompleted] = useState({});
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const methods = useForm({ mode: 'onChange' });
  const { handleSubmit, trigger, control, setError, formState } = methods;

  const handleNext = async () => {
    setIsNextDisabled(true);
    const isValid = await trigger();
    if (isValid) {
      setIsNextDisabled(false);
      setStepErrors((prevErrors) => ({
        ...prevErrors,
        [activeStep]: false
      }));
      if (activeStep === steps.length - 1) {
        handleSubmit(onSubmit)();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setStepErrors((prevErrors) => ({
        ...prevErrors,
        [activeStep]: true
      }));
    }
  };

  const handleStep = (step) => {
    if (!stepErrors[activeStep]) {
      setActiveStep(step);
      setStepCompleted({ ...stepCompleted, [steps.length - 1]: false });
    }
  };

  const formatDataForSubmit = (data) => {
    const formattedData = {};
    Object.keys(data).forEach((key) => {
      let value = data[key];
      if (data[key] !== '') {
        const field = control._fields[key];
        if (moment.isMoment(data[key])) {
          formattedData[key] = data[key].format('MM/DD/YYYY');
        } else if (field._f.validationType == 'intValidation') {
          formattedData[key] = parseInt(value);
        } else if (field._f.validationType == 'floatValidation') {
          formattedData[key] = parseFloat(value);
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
      await addNewRowData(formattedData);
      setIsLoading(false);
      handleClose(null, 'add');
    } catch (error) {
      setIsLoading(false);
      setStepCompleted({ ...stepCompleted, [steps.length - 1]: true });
      setIsNextDisabled(true);
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

      const errorFiledIndices = [];
      Object.keys(stepFileds).forEach((index) => {
        if (stepFileds[index].some((field) => transformedErrors[field])) {
          errorFiledIndices.push(parseInt(index));
        }
      });

      setStepErrors((prevErrors) => ({
        ...prevErrors,
        ...errorFiledIndices.reduce((acc, index) => {
          acc[index] = true;
          return acc;
        }, {})
      }));

      const stepNumbers = errorFiledIndices.map((index) => {
        return `Step ${index + 1}`;
      });
      const errorMessage = stepNumbers.join(', ');

      setIsSnackOpen(true);
      setSnackBar({
        message: (
          <span>
            Please fix errors in <strong> {errorMessage} </strong> and try to save again
          </span>
        ),
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
      <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
        {steps.map((label, index) => {
          return (
            <Step
              key={label}
              completed={stepCompleted[index]}
              onClick={() => handleStep(index)}
              sx={{ cursor: 'pointer' }}>
              <StepLabel error={stepErrors[index]}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <FormProvider {...methods}>
        <form>
          {activeStep === 0 && <StepEventMainParameters control={control} />}
          {activeStep === 1 && <StepEventAdditionalData control={control} />}
          {activeStep === 2 && <StepEventProperties control={control} />}
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
              Return to PromoGrid
            </Button>

            <Button
              onClick={handleNext}
              color="primary"
              variant="contained"
              disabled={isNextDisabled && !formState.isValid}
              startIcon={isNextDisabled && !formState.isValid ? <UnpublishedIcon /> : ''}
              endIcon={activeStep === steps.length - 1 ? '' : <ArrowForwardIcon />}>
              {activeStep === steps.length - 1
                ? isLoading
                  ? 'Saving Data...'
                  : 'Save New Event'
                : 'Next Step'}
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

export default AddEventForm;
