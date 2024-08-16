import React from 'react';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import ThresholdSettingsData from './ThresholdSettingsData';

import {
  cpfThresholdAdd,
  cpfThresholdDelete,
  cpfThresholdEdit,
  cpfThresholdList
} from '../../api/cpfForecastApi';

// Mock APIs
jest.mock('../../api/cpfForecastApi');

// Mock store
const initialState = {
  userProfileData: {
    userData: {
      customers: ['Customer 1', 'Customer 2']
    }
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

describe('ThresholdSettingsData Component', () => {
  beforeEach(() => {
    cpfThresholdList.mockResolvedValue({ results: [{ id: 1, name: 'testdata' }] });
    cpfThresholdAdd.mockResolvedValue({});
    cpfThresholdEdit.mockResolvedValue({});
    cpfThresholdDelete.mockResolvedValue({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component without crashing', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );
  });

  test('displays customer options and fetches data', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );

    expect(cpfThresholdList).toHaveBeenCalledWith('Customer 1');
  });

  test('opens Add Rule dialog', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );
    // Click on the Add button
    const addButton = screen.getByText('Add New Threshold Rule');
    await act(async () => {
      fireEvent.click(addButton);
    });

    // Check if the dialog opened
    await waitFor(() => {
      expect(screen.getByText('Return to Settings')).toBeInTheDocument();
    });

    // Submit the form
    const saveButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
});
