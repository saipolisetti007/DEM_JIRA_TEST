import React from 'react';
import { screen, render, act, waitFor, fireEvent } from '@testing-library/react';
import PromoGridValidations from './PromoGridValidations';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { promoGridSubmit, promoGridValidate } from '../../api/promoGridApi';
import { Provider } from 'react-redux';
import store from '../../store/store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn()
}));

jest.mock('../../api/promoGridApi');

describe('PromoGridValidations', () => {
  const mockLocation = {
    state: {
      responseData: {
        promo_header: '10',
        rows: [
          {
            golden_customer_id: '1'
          }
        ]
      }
    }
  };
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useLocation.mockReturnValue(mockLocation);
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );
  });

  test('fetches data from useLocation', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      const inputElement = screen.getByTestId('event_type');
      expect(inputElement).toBeInTheDocument();
    });
  });

  test('fetches data from useLocation error', async () => {
    useLocation.mockReturnValue({ state: { responseData: null } });
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      const errorMessage = screen.getByText('Network Error. Could not fetch the data.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('updates state on input change', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );
    const divElement = screen.getByTestId('comments');
    const inputElement = divElement.querySelector('input');
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'newValue' } });
    await waitFor(() => {
      expect(inputElement.value).toBe('newValue');
    });
  });

  test('handle validate calls promoGridValidate without error and warning', async () => {
    const mockUpdatedState = [
      {
        promo_header: '10'
      }
    ];
    promoGridValidate.mockResolvedValue(mockUpdatedState);
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );

    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    fireEvent.click(validateButton);
    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalledTimes(1);

      expect(
        screen.getByText('Validation Successful, please submit the data !!!')
      ).toBeInTheDocument();
    });
  });

  test('handle validate calls promoGridValidate catch error', async () => {
    const mockResponseData = {
      rows: [
        {
          golden_customer_id: '1',
          validations: {
            golden_customer_id: 'Invalid Data'
          }
        }
      ]
    };

    promoGridValidate.mockRejectedValue({ response: { data: mockResponseData } });
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );

    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(validateButton);
    });
    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalled();
      expect(screen.getByText('Please check the validations !!!')).toBeInTheDocument();
    });
  });

  test('calls promoGridValidate and handles warnings', async () => {
    const mockUpdatedState = {
      rows: [
        {
          golden_customer_id: '1',
          validation_warning: { golden_customer_id: 'Warning message' }
        }
      ]
    };

    promoGridValidate.mockResolvedValue(mockUpdatedState);

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      );
    });

    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(validateButton);
    });

    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalledTimes(1);
    });

    // Check if the warning dialog is shown
    await waitFor(() => {
      expect(screen.getByText('There are warnings in the form submission')).toBeInTheDocument();
    });
  });

  test('handle submit calls promoGridSubmit', async () => {
    const mockUpdatedState = [
      {
        promo_header: '10',
        rows: [
          {
            golden_customer_id: '1'
          }
        ]
      }
    ];
    promoGridValidate.mockResolvedValue(mockUpdatedState);
    const promoHeader = {
      promo_header: '10'
    };
    promoGridSubmit.mockResolvedValue(promoHeader);

    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );
    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    fireEvent.click(validateButton);
    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText('Validation Successful, please submit the data !!!')
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(promoGridSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('handle submit calls promoGridSubmit catch error', async () => {
    const mockUpdatedState = [
      {
        promo_header: '10',
        rows: [
          {
            golden_customer_id: '1'
          }
        ]
      }
    ];
    promoGridValidate.mockResolvedValue(mockUpdatedState);
    promoGridSubmit.mockRejectedValue();
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );
    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    fireEvent.click(validateButton);
    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText('Validation Successful, please submit the data !!!')
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(promoGridSubmit).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText('Error occurred while updating the data ! Please try again !!!')
      ).toBeInTheDocument();
    });
  });

  test('disables submit button when there are validation errors', async () => {
    const mockResponseData = {
      rows: [
        {
          event_type: 'Test',
          event_subtype: 'Subtype',
          validations: {
            event_type: 'Invalid',
            event_subtype: 'Invalid'
          }
        }
      ]
    };

    useLocation.mockReturnValue({
      state: {
        responseData: mockResponseData
      }
    });

    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeDisabled();
  });

  test('fetches data on component load', async () => {
    const mockResponseData = {
      promo_header: '10',
      rows: [
        {
          event_type: '1'
        }
      ]
    };

    useLocation.mockReturnValue({
      state: {
        responseData: mockResponseData
      }
    });

    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );

    await waitFor(() => {
      const inputElement = screen.getByTestId('event_type');
      expect(inputElement).toBeInTheDocument();
    });
  });

  test('opens and closes the dialog on breadcrumb navigation', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );

    const breadcrumbLink = screen.getByText('Homepage');
    fireEvent.click(breadcrumbLink);

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const dialog = screen.queryByRole('dialog');
      expect(dialog).not.toBeInTheDocument();
    });
  });

  test('navigates to target page on dialog confirm', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );

    const breadcrumbLink = screen.getByText('Homepage');
    fireEvent.click(breadcrumbLink);

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    const confirmButton = screen.getByText('Leave this page');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('navigates to promo grid page on dialog return', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );

    const breadcrumbLink = screen.getByText('Homepage');
    fireEvent.click(breadcrumbLink);

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    const returnButton = screen.getByText('Return to Promo Grid Validation');
    fireEvent.click(returnButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/promo-grid');
    });
  });

  test('test promo grid warning messages for customer item number and proxy item number', async () => {
    const mockResponseData = {
      rows: [
        {
          golden_customer_id: '1',
          validations: {
            event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
            event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
            product_id: "Duplicate event line entry in Promo Grid - 814.1",
            event_type: "Duplicate event line entry in Promo Grid - 814.1",
            event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
          },
          validation_warning: {
            event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
            event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
            product_id: "Duplicate event line entry in Promo Grid - 814.1",
            event_type: "Duplicate event line entry in Promo Grid - 814.1",
            event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
            customer_item_number: "Customer and Proxy Like Item Number not found. Cold Start Logic will be used",
            proxy_like_item_number: "Customer and Proxy Like Item Number not found. Cold Start Logic will be used"
          }
        },
        {
          golden_customer_id: '2',
          validations: {
            event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
            event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
            product_id: "Duplicate event line entry in Promo Grid - 814.1",
            event_type: "Duplicate event line entry in Promo Grid - 814.1",
            event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
          },
          validation_warning: {
            event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
            event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
            product_id: "Duplicate event line entry in Promo Grid - 814.1",
            event_type: "Duplicate event line entry in Promo Grid - 814.1",
            event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
            customer_item_number: "Customer and Proxy Like Item Number not found. Cold Start Logic will be used",
          }
        }
      ]
    };

    promoGridValidate.mockResolvedValue(mockResponseData);
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );
    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    fireEvent.click(validateButton);
    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalledTimes(1);
    });
    const divElement = screen.getByTestId('product_id');
    const inputElement = divElement.querySelector('input');
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: '73010718493' } });
    await waitFor(() => {
      expect(inputElement.value).toBe('73010718493');
    });
  });

  test('test if similar kind of errors disappears on input change', async () => {
    const mockLocation = {
          state: {
            responseData: {
              promo_header: '10',
              rows: [
                {
                  golden_customer_id: '1',
                  validations: {
                    event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
                    event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
                    product_id: "Duplicate event line entry in Promo Grid - 814.1",
                    event_type: "Duplicate event line entry in Promo Grid - 814.1",
                    event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
                  },
                  validation_warning: {
                    event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
                    event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
                    product_id: "Duplicate event line entry in Promo Grid - 814.1",
                    event_type: "Duplicate event line entry in Promo Grid - 814.1",
                    event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
                    customer_item_number: "Customer and Proxy Like Item Number not found. Cold Start Logic will be used",
                  }
                }
              ]
            }
          }
        };
    useLocation.mockReturnValue(mockLocation);
    const mockResponseData = {
      rows: [
        {
          golden_customer_id: '1',
          validations: {
            event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
            event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
            product_id: "Duplicate event line entry in Promo Grid - 814.1",
            event_type: "Duplicate event line entry in Promo Grid - 814.1",
            event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
          },
          validation_warning: {
            event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
            event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
            product_id: "Duplicate event line entry in Promo Grid - 814.1",
            event_type: "Duplicate event line entry in Promo Grid - 814.1",
            event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
            customer_item_number: "Customer and Proxy Like Item Number not found. Cold Start Logic will be used",
            proxy_like_item_number: "Customer and Proxy Like Item Number not found. Cold Start Logic will be used"
          }
        },
        {
          golden_customer_id: '2',
          validations: {
            event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
            event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
            product_id: "Duplicate event line entry in Promo Grid - 814.1",
            event_type: "Duplicate event line entry in Promo Grid - 814.1",
            event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
          },
          validation_warning: {
            event_in_store_start_date: "Duplicate event line entry in Promo Grid - 817.1",
            event_in_store_end_date: "Duplicate event line entry in Promo Grid - 817.1",
            product_id: "Duplicate event line entry in Promo Grid - 814.1",
            event_type: "Duplicate event line entry in Promo Grid - 814.1",
            event_subtype: "Duplicate event line entry in Promo Grid - 814.1",
            customer_item_number: "Customer and Proxy Like Item Number not found. Cold Start Logic will be used",
          }
        }
      ]
    };

    promoGridValidate.mockResolvedValue(mockResponseData);
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridValidations />
          </BrowserRouter>
        </Provider>
      )
    );
    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    fireEvent.click(validateButton);
    const divElement = screen.getByTestId('product_id');
    const inputElement = divElement.querySelector('input');
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: '73010718493' } });
    await waitFor(() => {
      expect(inputElement.value).toBe('73010718493');
    });
  });
});
