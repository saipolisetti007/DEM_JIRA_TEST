import React from 'react';
import { render } from '@testing-library/react';
import ValidateShipmentProfiles from './ValidateShipmentProfiles';
const handleValidate = jest.fn();
const handleNext = jest.fn();
describe('PromoGridColumns', () => {
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
  test('renders ValidateShipment profile component without crashing', () => {
    render(
      <ValidateShipmentProfiles
        handleValidate={handleValidate}
        handleNext={handleNext}
        isValid={true}
        data={manualDaDetailsData}
      />
    );
  });
});
