import React from 'react';
import { render, screen, act, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import ThresholdSettingsData from './ThresholdSettingsData';

import {
  cpfThresholdAdd,
  cpfThresholdDelete,
  cpfThresholdEdit,
  cpfThresholdList,
  fetchThresholdFilters
} from '../../api/cpfForecastApi';
import userEvent from '@testing-library/user-event';

// Mock APIs
jest.mock('../../api/cpfForecastApi');

// Mock store
const initialState = {
  userProfileData: {
    customers: [{ id: 1, name: '2000038335' }],
    userData: null,
    status: 'idle',
    error: null,
    customerId: '2000038335',
    fetchAttempted: false
  }
};

const mockSubsectorsFilters = [
  'Health Care No Detail',
  'Other Products',
  'Hair Care',
  'Baby Care',
  'Premium Skin Care & Cosmetics',
  'Family Care',
  'Skin Care',
  'Skin and Personal Care',
  'Hair Care Products',
  'New Business Unit',
  'Discontinued Professional Salon',
  'Blades & Razors',
  'To Be Deleted',
  'Discontinued Coffee',
  'Unknown',
  'Feminine Care No Detail',
  'Female Hair Care',
  'Discontinued Businesses',
  'Gillette AP/DO & Body Spray',
  'Discontinued Personal Power',
  'Chemicals',
  'Beauty Care No Detail',
  'Snacks & Coffee No Detail',
  'Discontinued Snacks',
  'Mass Skin Care',
  'Discontinued Cosmetics',
  'Inactv Incontinence',
  'Discontinued Prestige',
  'Gillette Other',
  'Discontinued Pet Care',
  'Prestige',
  'Grooming Care',
  'Corp Innovation Fund',
  'Appliances',
  'Pet Care',
  'ZInactive Hair Color',
  'Fabric Care',
  'Antiperspirant/Deodorant',
  'Other Products No Detail',
  'Oral Care',
  'Other Beauty Care',
  'Family Care No Detail',
  'Feminine Care',
  'Professional Salon',
  'Baby & Feminine Care No Detail',
  'Grooming No Detail SS',
  'Personal Power',
  'Gillette Personal Care NBD',
  'Personal Care',
  'Beauty Care',
  'Non-Competitor',
  'Old Skin FYB24',
  'Discontinued Pharmaceuticals',
  'Personal Beauty Care',
  'Wella',
  'Corporate Activities',
  'Prestige & Prof Care No Detail',
  'Personal Cleansing',
  'Home Care',
  'Shave Care',
  'Personal Health Care',
  'Inactive Sub_Sector',
  'Feminine Care plus Adult Incontinence',
  'Color Cosmetics',
  'Hair Color',
  'Fabric & Home Care No Detail'
];

const mockData = {
  results: [
    {
      id: 1,
      updated_at: '08/14/2024',
      subsector: 'Appliances',
      category: 'Clock Appliance',
      brand: 'Braun',
      brand_form: 'Model AW75',
      compare_with: 'Customer Forecast',
      operation_type: '% difference',
      value: 10,
      updated_by: 'baddapuri.pr',
      customer: '2000038335',
      unit: '%'
    }
  ]
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

const simulateData = async () => {
  await act(async () => {
    const subsector = screen.getByRole('combobox', {
      name: /subsector/i
    });
    fireEvent.mouseDown(subsector);
  });

  await waitFor(() => {
    const subsectorOptions = screen.getByRole('listbox', {
      name: /subsector/i
    });
    expect(subsectorOptions).toBeInTheDocument();
    fireEvent.click(within(subsectorOptions).getByText('Appliances'));
  });

  await act(async () => {
    const compareWith = screen.getByRole('combobox', {
      name: /Compare with/i
    });
    fireEvent.mouseDown(compareWith);
  });

  await waitFor(() => {
    const comparewithOptions = screen.getByRole('listbox', {
      name: /Compare with/i
    });
    expect(comparewithOptions).toBeInTheDocument();
    fireEvent.click(within(comparewithOptions).getByText('Customer Forecast'));
  });

  await act(async () => {
    const operationType = screen.getByRole('combobox', {
      name: /Operation type/i
    });
    fireEvent.mouseDown(operationType);
  });

  await waitFor(() => {
    const operationTypeOptions = screen.getByRole('listbox', {
      name: /Operation type/i
    });
    expect(operationTypeOptions).toBeInTheDocument();
    fireEvent.click(within(operationTypeOptions).getByText('% difference'));
  });

  await act(async () => {
    const value = screen.getByRole('textbox', {
      name: /value/i
    });
    fireEvent.change(value, {
      target: { value: 10 }
    });
  });

  await act(async () => {
    const unit = screen.getByRole('textbox', {
      name: /Unit/i
    });
    fireEvent.change(unit, {
      target: { value: '%' }
    });
  });
};

describe('ThresholdSettingsData Component', () => {
  beforeEach(() => {
    (cpfThresholdList as jest.Mock).mockResolvedValue(mockData);
    (cpfThresholdAdd as jest.Mock).mockResolvedValue({});
    (cpfThresholdEdit as jest.Mock).mockResolvedValue({});
    (cpfThresholdDelete as jest.Mock).mockResolvedValue({});
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

    expect(cpfThresholdList).toHaveBeenCalledWith('2000038335');
  });

  test('handle error fetches data', async () => {
    (cpfThresholdList as jest.Mock).mockRejectedValueOnce({});
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );

    expect(cpfThresholdList).toHaveBeenCalledWith('2000038335');
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
    (fetchThresholdFilters as jest.Mock).mockResolvedValue(mockSubsectorsFilters);
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

  test('Close Add Rule dialog', async () => {
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
    const closeButton = screen.getByText('Return to Settings');
    await act(async () => {
      fireEvent.click(closeButton);
    });
  });

  test('should open Edit Dialog when Edit button clicked', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );
    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const EditButton = await screen.findByLabelText('Edit');
    await act(async () => {
      fireEvent.click(EditButton);
    });

    // Check if the dialog opened
    await waitFor(() => {
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    // Submit the form
    const saveButton = screen.getByText('Save Changes');
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
  test('should open delete Dialog when delete button clicked and submit', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );
    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const DeleteButton = await screen.findByLabelText('Delete');
    await act(async () => {
      fireEvent.click(DeleteButton);
    });

    // Check if the dialog opened
    await waitFor(() => {
      expect(screen.getByText('Delete Threshold Rule')).toBeInTheDocument();
    });

    // Submit the form
    const saveButton = screen.getByText('Delete Rule');
    await act(async () => {
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(cpfThresholdDelete).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Threshold rule has been deleted successfully')).toBeInTheDocument();
    });
  });

  test('handle delete failure', async () => {
    (cpfThresholdDelete as jest.Mock).mockRejectedValueOnce(new Error('delete failed'));
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );
    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const DeleteButton = await screen.findByLabelText('Delete');
    await act(async () => {
      fireEvent.click(DeleteButton);
    });

    // Check if the dialog opened
    await waitFor(() => {
      expect(screen.getByText('Delete Threshold Rule')).toBeInTheDocument();
    });

    // Submit the form
    const saveButton = screen.getByText('Delete Rule');
    await act(async () => {
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(cpfThresholdDelete).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to delete threshold rule')).toBeInTheDocument();
    });

    // close Icon the form
    const Snackbar = screen.getByTestId('snackbar');
    const CloseButton = within(Snackbar).getByTestId('CloseIcon');

    await act(async () => {
      fireEvent.click(CloseButton);
    });
  });

  test('should fetch and render filters', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );
    const addButton = screen.getByText('Add New Threshold Rule');
    await act(async () => {
      fireEvent.click(addButton);
    });
    await waitFor(() => {
      expect(fetchThresholdFilters).toHaveBeenCalled();
    });
  });

  test('handle filters errors', async () => {
    (fetchThresholdFilters as jest.Mock).mockRejectedValueOnce({});
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );
    const addButton = screen.getByText('Add New Threshold Rule');
    await act(async () => {
      fireEvent.click(addButton);
    });
    await waitFor(() => {
      expect(fetchThresholdFilters).toHaveBeenCalled();
    });
  });

  test('should handle form submission correctly add rule', async () => {
    (cpfThresholdAdd as jest.Mock).mockResolvedValueOnce({});
    (cpfThresholdList as jest.Mock).mockResolvedValue(mockData);
    (fetchThresholdFilters as jest.Mock).mockResolvedValue(mockSubsectorsFilters);
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
    await waitFor(() => {
      expect(fetchThresholdFilters).toHaveBeenCalled();
    });

    await simulateData();

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(cpfThresholdAdd).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(
        screen.getByText('New threshold rule has been added successfully')
      ).toBeInTheDocument();
    });
  });

  test('should handle error during adding rule with response message ', async () => {
    (cpfThresholdAdd as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Rule already exist ' } }
    });
    (cpfThresholdList as jest.Mock).mockResolvedValue(mockData);
    (fetchThresholdFilters as jest.Mock).mockResolvedValue(mockSubsectorsFilters);
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
    await waitFor(() => {
      expect(fetchThresholdFilters).toHaveBeenCalled();
    });
    await simulateData();

    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(cpfThresholdAdd).toHaveBeenCalled();
    });
  });

  test('should handle error during adding rule without response message ', async () => {
    (cpfThresholdAdd as jest.Mock).mockRejectedValueOnce(new Error('error'));
    (cpfThresholdList as jest.Mock).mockResolvedValue(mockData);
    (fetchThresholdFilters as jest.Mock).mockResolvedValue(mockSubsectorsFilters);
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
    await waitFor(() => {
      expect(fetchThresholdFilters).toHaveBeenCalled();
    });
    await simulateData();
    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(cpfThresholdAdd).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Failed to add threshold rule')).toBeInTheDocument();
    });
  });

  test('should handle form submission correctly edit rule', async () => {
    (cpfThresholdEdit as jest.Mock).mockResolvedValueOnce({});
    (cpfThresholdList as jest.Mock).mockResolvedValue(mockData);
    (fetchThresholdFilters as jest.Mock).mockResolvedValue(mockSubsectorsFilters);
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const EditButton = await screen.findByLabelText('Edit');
    await act(async () => {
      fireEvent.click(EditButton);
    });

    await waitFor(() => {
      expect(fetchThresholdFilters).toHaveBeenCalled();
    });
    await simulateData();

    await act(async () => {
      fireEvent.click(screen.getByText('Save Changes'));
    });

    await waitFor(() => {
      expect(cpfThresholdEdit).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Threshold rule has been changed successfully')).toBeInTheDocument();
    });
  });

  test('should handle error during editing rule with response message ', async () => {
    (cpfThresholdEdit as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Rule already exist ' } }
    });
    (cpfThresholdList as jest.Mock).mockResolvedValue(mockData);
    (fetchThresholdFilters as jest.Mock).mockResolvedValue(mockSubsectorsFilters);
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const EditButton = await screen.findByLabelText('Edit');
    await act(async () => {
      fireEvent.click(EditButton);
    });

    await waitFor(() => {
      expect(fetchThresholdFilters).toHaveBeenCalled();
    });
    await simulateData();

    await act(async () => {
      fireEvent.click(screen.getByText('Save Changes'));
    });

    await waitFor(() => {
      expect(cpfThresholdEdit).toHaveBeenCalled();
    });
  });

  test('should handle error during editing rule without response message ', async () => {
    (cpfThresholdEdit as jest.Mock).mockRejectedValueOnce(new Error('error'));
    (cpfThresholdList as jest.Mock).mockResolvedValue(mockData);
    (fetchThresholdFilters as jest.Mock).mockResolvedValue(mockSubsectorsFilters);
    await act(async () =>
      render(
        <Provider store={store}>
          <ThresholdSettingsData />
        </Provider>
      )
    );

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const EditButton = await screen.findByLabelText('Edit');
    await act(async () => {
      fireEvent.click(EditButton);
    });

    await waitFor(() => {
      expect(fetchThresholdFilters).toHaveBeenCalled();
    });
    await simulateData();
    await act(async () => {
      fireEvent.click(screen.getByText('Save Changes'));
    });

    await waitFor(() => {
      expect(cpfThresholdEdit).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Failed to change the threshold rule')).toBeInTheDocument();
    });
  });
});
