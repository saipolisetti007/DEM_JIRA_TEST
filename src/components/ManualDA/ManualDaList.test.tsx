// ManualDaList.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import ManualDaList from './ManualDaList';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../customTheme';
import { maualDaList } from '../../api/manualDaApi';

jest.mock('../../api/manualDaApi');
const initialState = {
  userProfileData: {
    customers: [{ id: 1, name: '2000038335' }],
    userData: {
      region: 'NA'
    },
    status: 'idle',
    error: null,
    customerId: null,
    fetchAttempted: false
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

const mockdata = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      rdd_start: '11/01/2024',
      ship_start: null,
      created: '10/09/2024',
      last_modified: '10/09/2024',
      da_id: 1,
      da_line: '1',
      da_name: 'da_1',
      country_code: 'US',
      status: 'Submitted',
      customer_id: '2000038293',
      customer_name: 'TGT-US',
      event_description: '11/10 P9 Cascade Endcap',
      item_gtin: '30772128428',
      case_gtin: null,
      fpc: null,
      item_type: 'In & Out',
      customer_item_number: null,
      org: null,
      comment: null,
      sub_sector: 'HomeCare',
      category: 'AUTODISH',
      description: 'CASC AP Plat Fresh Sc 4/27ct',
      customized_code: 'Yes',
      volume_split_method: 'Volume',
      uom: 'IT',
      destination_profile: null,
      total_volume: 30000,
      total_volume_su: 30000,
      vol_1: 30000,
      vol_2: null,
      vol_3: null,
      vol_4: null,
      vol_5: null,
      vol_6: null,
      vol_7: null,
      vol_8: null,
      vol_9: null,
      vol_10: null,
      vol_11: null,
      vol_12: null,
      vol_13: null,
      vol_14: null,
      vol_15: null,
      vol_16: null,
      vol_17: null,
      vol_18: null,
      vol_19: null,
      vol_20: null,
      vol_21: null,
      vol_22: null,
      vol_23: null,
      vol_24: null,
      last_modified_user_id: 'nag.d'
    },
    {
      id: 2,
      rdd_start: '11/01/2024',
      ship_start: null,
      created: '10/09/2024',
      last_modified: '10/09/2024',
      da_id: 2,
      da_line: '1',
      da_name: 'da_1',
      country_code: 'US',
      status: 'Submitted',
      customer_id: '2000038293',
      customer_name: 'TGT-US',
      event_description: '11/10 P9 Cascade Endcap',
      item_gtin: '30772115619',
      case_gtin: null,
      fpc: null,
      item_type: 'In & Out',
      customer_item_number: null,
      org: null,
      comment: null,
      sub_sector: 'HomeCare',
      category: 'AUTODISH',
      description: 'CASC AP Plat Plus Lemon Sc 2/62ct',
      customized_code: 'Yes',
      volume_split_method: 'Volume',
      uom: 'IT',
      destination_profile: null,
      total_volume: 23000,
      total_volume_su: 23000,
      vol_1: 23000,
      vol_2: null,
      vol_3: null,
      vol_4: null,
      vol_5: null,
      vol_6: null,
      vol_7: null,
      vol_8: null,
      vol_9: null,
      vol_10: null,
      vol_11: null,
      vol_12: null,
      vol_13: null,
      vol_14: null,
      vol_15: null,
      vol_16: null,
      vol_17: null,
      vol_18: null,
      vol_19: null,
      vol_20: null,
      vol_21: null,
      vol_22: null,
      vol_23: null,
      vol_24: null,
      last_modified_user_id: 'nag.d'
    }
  ]
};
describe('ManualDaList Component', () => {
  const downloadBlankExcel = jest.fn();
  const downloadDataExcel = jest.fn();
  test('renders without crashing', async () => {
    (maualDaList as jest.Mock).mockResolvedValue(mockdata);
    render(
      <ThemeProvider theme={customTheme}>
        <Provider store={store}>
          <BrowserRouter>
            <ManualDaList />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
  });

  test('renders with manual da list api error', async () => {
    (maualDaList as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(
      <ThemeProvider theme={customTheme}>
        <Provider store={store}>
          <BrowserRouter>
            <ManualDaList />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );
  });

  test('should handle download blank Excel', async () => {
    (maualDaList as jest.Mock).mockResolvedValue(mockdata);
    (downloadBlankExcel as jest.Mock).mockResolvedValueOnce({});
    await act(async () => {
      render(
        <ThemeProvider theme={customTheme}>
          <Provider store={store}>
            <BrowserRouter>
              <ManualDaList />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Manual DA')).toBeInTheDocument();
    });

    const downloadButton = screen.getByLabelText('Download blank template');
    await act(async () => {
      fireEvent.click(downloadButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Excel template downloaded successfully !!!')).toBeInTheDocument();
    });
  });

  test('should handle download blank Excel with error', async () => {
    (maualDaList as jest.Mock).mockResolvedValue(mockdata);
    downloadBlankExcel.mockRejectedValue(new Error('API Error'));
    await act(async () => {
      render(
        <ThemeProvider theme={customTheme}>
          <Provider store={store}>
            <BrowserRouter>
              <ManualDaList />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Manual DA')).toBeInTheDocument();
    });

    const downloadButton = screen.getByLabelText('Download blank template');
    await act(async () => {
      fireEvent.click(downloadButton);
    });
  });

  test('should handle download data Excel', async () => {
    (maualDaList as jest.Mock).mockResolvedValue(mockdata);
    (downloadDataExcel as jest.Mock).mockResolvedValueOnce({});
    await act(async () => {
      render(
        <ThemeProvider theme={customTheme}>
          <Provider store={store}>
            <BrowserRouter>
              <ManualDaList />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Manual DA')).toBeInTheDocument();
    });

    const downloadButton = screen.getByLabelText('Download file');
    await act(async () => {
      fireEvent.click(downloadButton);
    });
  });

  test('should handle download data Excel with error', async () => {
    (maualDaList as jest.Mock).mockResolvedValue(mockdata);
    downloadDataExcel.mockRejectedValue(new Error('API Error'));
    await act(async () => {
      render(
        <ThemeProvider theme={customTheme}>
          <Provider store={store}>
            <BrowserRouter>
              <ManualDaList />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Manual DA')).toBeInTheDocument();
    });

    const downloadButton = screen.getByLabelText('Download file');
    await act(async () => {
      fireEvent.click(downloadButton);
    });
  });
});
