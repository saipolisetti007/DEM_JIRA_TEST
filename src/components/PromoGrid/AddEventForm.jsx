import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { useForm, FormProvider } from 'react-hook-form';
import StepEventMainParameters from './StepEventMainParameters';
import StepEventProperties from './StepEventProperties';
import StepEventAdditionalData from './StepEventAdditionalData';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { addNewRowData } from '../../api/promoGridApi';
import InfoSnackBar from '../Common/InfoSnackBar';
import { steps, stepFields } from './FormStepFields';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux';

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

  const { settings } = useSelector((state) => state.settingsData);

  const visibleSteps = useMemo(() => {
    return steps.filter((_, index) => stepFields[index].some((field) => settings[field]));
  }, [settings]);

  const handleNext = async () => {
    setIsNextDisabled(true);
    const isValid = await trigger();
    if (isValid) {
      setIsNextDisabled(false);
      setStepErrors((prevErrors) => ({
        ...prevErrors,
        [activeStep]: false
      }));
      if (activeStep === visibleSteps.length - 1) {
        handleSubmit(onSubmit)();
      } else {
        setActiveStep((prevActiveStep) => {
          const nextStep = prevActiveStep + 1;
          return nextStep < visibleSteps.length ? nextStep : prevActiveStep;
        });
      }
    } else {
      setStepErrors((prevErrors) => ({
        ...prevErrors,
        [activeStep]: true
      }));
    }
  };

  const handleStep = async (step) => {
    if (step !== activeStep) {
      const isValid = await trigger(stepFields[activeStep]);
      if (isValid) {
        setIsNextDisabled(false);
        setActiveStep(step);
        setStepCompleted({ ...stepCompleted, [visibleSteps.length - 1]: false });
      }
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
      Object.keys(stepFields).forEach((index) => {
        if (stepFields[index].some((field) => transformedErrors[field])) {
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
        {visibleSteps.map((label, index) => {
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
          <Box sx={{ minHeight: 400 }}>
            {activeStep === 0 && <StepEventMainParameters control={control} settings={settings} />}
            {activeStep === 1 && <StepEventAdditionalData control={control} settings={settings} />}
            {activeStep === 2 && <StepEventProperties control={control} settings={settings} />}
          </Box>
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
              endIcon={activeStep === visibleSteps.length - 1 ? '' : <ArrowForwardIcon />}>
              {activeStep === visibleSteps.length - 1
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
