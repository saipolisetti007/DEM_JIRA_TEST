import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ValidateManualDaDetails from './ValidateManualDaDetails';
import ValidateShipmentProfiles from './ValidateShipmentProfiles';

const steps = ['Validate Shipment Profiles', 'Validate Manual DAs details'];

const ManualDaSteps = () => {
  const manualDaDetailsData = [
    {
      da_id: '123',
      da_line: '456',
      status: 'created',
      country_code: 'US',
      customer_identifier: '2000038335',
      event_description: 'Test',
      rdd_start: '2021-10-10',
      ship_start: '2021-10-10',
      item_gtin: '123',
      case_gtin: '456',
      fpc: '789'
    }
  ];

  const shipmentData = [
    {
      destination_profile: 'Profile A',
      subRows: [
        {
          golden_customer_id: '123',
          ship_to: 'jhkjsd',
          percentage_split: 0.7
        },
        {
          golden_customer_id: '234',
          ship_to: 'Poland',
          percentage_split: 0.8
        }
      ]
    },
    {
      destination_profile: 'Profile B',
      subRows: [
        {
          golden_customer_id: '123',
          ship_to: 'yui',
          percentage_split: 0.7
        }
      ]
    }
  ];

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isShipmentValid, setIsShipmentValid] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleValidate = () => {
    setIsShipmentValid(true);
  };

  // Handle step click
  const handleStep = async (step) => {
    if (step !== activeStep) {
      if (isShipmentValid) {
        setActiveStep(step);
      }
    }
  };

  return (
    <>
      <Box className="max-w-2xl m-auto bg-gray-100 p-2 border rounded">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label} onClick={() => handleStep(index)} sx={{ cursor: 'pointer' }}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      <Box>
        {activeStep === 0 && (
          <ValidateShipmentProfiles
            handleValidate={handleValidate}
            handleNext={handleNext}
            isValid={isShipmentValid}
            data={shipmentData}
          />
        )}
        {activeStep === 1 && (
          <ValidateManualDaDetails
            data={manualDaDetailsData}
            handleValidate={handleValidate}
            handleNext={handleNext}
            isValid={isShipmentValid}
          />
        )}
      </Box>
    </>
  );
};

export default ManualDaSteps;
