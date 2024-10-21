import React from 'react';
import { render } from '@testing-library/react';
import ValidateManualDaDetails from './ValidateManualDaDetails'; // Adjust the import path as necessary
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {}
});

describe('ValidateManualDaDetails Component', () => {
  const handleValidate = jest.fn();
  const handleNext = jest.fn();
  const data = [{ da_line: 1, da_name: 'Test DA', country_code: 'US' }];

  test('should render without crash', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ValidateManualDaDetails
            handleValidate={handleValidate}
            handleNext={handleNext}
            isValid={true}
            data={data}
          />
        </BrowserRouter>
      </Provider>
    );
  });
});
