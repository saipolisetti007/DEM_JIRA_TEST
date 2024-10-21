import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManualDaValidations from './ManualDaValidations'; // Adjust the import path as necessary

describe('ManualDaValidations Component', () => {
  test('should render without crash', () => {
    render(
      <BrowserRouter>
        <ManualDaValidations />
      </BrowserRouter>
    );
  });
});
