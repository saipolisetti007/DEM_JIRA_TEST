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
import DialogComponent from '../Common/DialogComponent';

const AddEventForm = ({ handleClose, customerId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepErrors, setStepErrors] = useState({});
  const [stepCompleted, setStepCompleted] = useState({});
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formattedData, setFormattedData] = useState(null);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const methods = useForm({ mode: 'onChange' });
  const { handleSubmit, trigger, control, setError, formState } = methods;

  const { settings } = useSelector((state) => state.settingsData);

  const visibleSteps = useMemo(() => {
    return steps.filter((_, index) => {
      const anyFieldTrue = stepFields[index].some((field) => settings[field]);
      const hasExtraFields = stepFields[index].some((field) => settings[field] === undefined);
      return anyFieldTrue || hasExtraFields;
    });
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
    setFormattedData(formattedData);
    try {
      await addNewRowData(formattedData);
      setIsLoading(false);
      handleClose(null, 'add');
    } catch (error) {
      setIsLoading(false);
      setStepCompleted({ ...stepCompleted, [steps.length - 1]: true });
      setIsNextDisabled(true);
      const response = error.response?.data;

      const transformErrors = (response, key) => {
        return response?.reduce((acc, message) => {
          acc[message.field] = message[key];
          return acc;
        }, {});
      };

      const transformedErrors = transformErrors(response?.errors || [], 'error');
      const transformedWarnings = transformErrors(response?.warnings || [], 'warning');

      const handleFieldMessages = (messages, type) => {
        for (const field in messages) {
          setError(field, { type, message: messages[field] });
        }

        const fieldIndices = [];
        Object.keys(stepFields).forEach((index) => {
          if (stepFields[index].some((field) => messages[field])) {
            fieldIndices.push(parseInt(index));
          }
        });

        setStepErrors((prevErrors) => ({
          ...prevErrors,
          ...fieldIndices.reduce((acc, index) => {
            acc[index] = true;
            return acc;
          }, {})
        }));

        const stepNumbers = fieldIndices.map((index) => `Step ${index + 1}`);
        return stepNumbers.join(', ');
      };

      if (Object.keys(transformedErrors).length > 0) {
        const errorMessage = handleFieldMessages(transformedErrors, 'error');
        setIsSnackOpen(true);
        setSnackBar({
          message: (
            <span>
              Please fix errors in <strong> {errorMessage} </strong> and try to save again
            </span>
          ),
          severity: 'error'
        });
      } else if (Object.keys(transformedWarnings).length > 0) {
        handleFieldMessages(transformedWarnings, 'warning');
        setDialogOpen(true);
      }
    }
  };

  const handleDialogConfirm = async () => {
    setDialogOpen(false);
    try {
      setIsLoading(true);
      const dataWithWarningOverride = {
        ...formattedData,
        warning_override: true
      };
      await addNewRowData(dataWithWarningOverride);
      setIsLoading(false);
      handleClose(null, 'add');
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
            {activeStep === 0 && (
              <StepEventMainParameters
                control={control}
                settings={settings}
                customerId={customerId}
              />
            )}
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
    </>
  );
};

export default AddEventForm;
