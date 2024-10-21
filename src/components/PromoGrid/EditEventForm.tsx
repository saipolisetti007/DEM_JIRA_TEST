import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useForm, FormProvider, Control } from 'react-hook-form';
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
import DialogComponent from '../Common/DialogComponent';
import { SnackBarType } from '../ThresholdSettings/ThresholdSettingsData';
import { useAppSelector } from '../../store/hooks';

type EditEventFormPropsType = {
  rowData: Record<string, any> | null;
  handleClose: any;
};

type AccordionPanelPropsType = {
  panel: string;
  index: number;
  expanded: string;
  handleChange: Function;
  title: string;
  control: Control;
  settings: Record<string, any>;
};

/**
 * Format row data to convert date fields to moment objects.
 * @param {Object} rowData - The row data to format.
 * @returns {Object} - The formatted row data.
 */
const formatRowData = (rowData: Record<string, any> | null) => {
  const formattedData = { ...rowData };

  dateFields.forEach((field) => {
    if (formattedData[field]) {
      formattedData[field] = moment(formattedData[field], 'MM/DD/YYYY');
    }
  });
  return formattedData;
};

/**
 * AccordionPanel component to render each accordion panel with form fields.
 * @param {Object} props - Component props.
 * @param {string} props.panel - The panel identifier.
 * @param {number} props.index - The index of the panel.
 * @param {string} props.expanded - The currently expanded panel.
 * @param {Function} props.handleChange - Function to handle panel expansion.
 * @param {string} props.title - The title of the panel.
 * @param {Object} props.control - The control object from react-hook-form.
 * @param {Object} props.settings - The settings object to determine field visibility.
 */
const AccordionPanel = ({
  panel,
  index,
  expanded,
  handleChange,
  title,
  control,
  settings
}: AccordionPanelPropsType) => {
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

/**
 * EditEventForm component to edit an existing event.
 * @param {Object} props - Component props.
 * @param {Object} props.rowData - The data of the row to be edited.
 * @param {Function} props.handleClose - Function to handle closing the form.
 */
const EditEventForm = ({ rowData, handleClose }: EditEventFormPropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<SnackBarType | null>({ message: '', severity: '' });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<Record<string, any> | null>(null);
  const formattedData = formatRowData(rowData);
  const methods = useForm({ mode: 'onChange', defaultValues: formattedData });
  const { handleSubmit, control, setError, trigger, formState } = methods;
  const [expanded, setExpanded] = React.useState<string>('panel1');
  const [warningMessage, setWarningMessage] = useState<string>('');

  useEffect(() => {
    // Trigger validation on load
    trigger('event_description').then((isValid) => {
      if (!isValid) {
        setError('event_description', {
          type: 'maxLength',
          message: 'Description can not be exceed 49 characters'
        });
      }
    });
  }, [trigger, setError]);

  /**
   * Handle panel expansion change.
   * @param {string} panel - The panel identifier.
   * @returns {Function} - Function to handle panel expansion.
   */
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { settings } = useAppSelector((state) => state.settingsData);

  /**
   * Handle save button click.
   */
  const handleSave = async () => {
    handleSubmit(onSubmit)();
  };

  /**
   * Format data for submission.
   * @param {Object} data - The data to format.
   * @returns {Object} - The formatted data.
   */
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

  /**
   * Handle form submission.
   * @param {Object} data - The form data.
   */
  const onSubmit = async (data: Record<string, any>) => {
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
        let warningMsg = ``;
        if (
          Object.prototype.hasOwnProperty.call(transformedWarnings, 'customer_item_number') &&
          Object.prototype.hasOwnProperty.call(transformedWarnings, 'proxy_like_item_number')
        ) {
          warningMsg += `<strong>Customer item and Proxy like item not found in modelling data.</strong>
          <h5>Cold start logic will be used for forecasting.</h5>
          `;
        } else if (
          Object.prototype.hasOwnProperty.call(transformedWarnings, 'customer_item_number')
        ) {
          warningMsg += `<strong>Customer item not found in modelling data.</strong>
          <h5>Proxy like item will be used for forecasting.</h5>
          `;
        }
        warningMsg += `<h5>Are you sure you want to save this data?</h5>`;
        setWarningMessage(warningMsg);
      }
    }
  };

  /**
   * Handle dialog confirmation.
   */
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
        message: 'Error occurred while updating the data',
        severity: 'error'
      });
    }
  };
  /**
   * Handle dialog close.
   */
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  /**
   * Handle snackbar close.
   */
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
        dialogContent={warningMessage}
        cancelText="Return to PromoGrid"
        confirmText="Proceed to Submit"
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
