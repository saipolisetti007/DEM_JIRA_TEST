import React from 'react';
import { screen, render, act, waitFor, fireEvent } from '@testing-library/react';
import PromoGridValidations from './PromoGridValidations';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { promoGridSubmit, promoGridValidate } from '../../api/promoGridApi';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
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
  beforeEach(() => {
    useLocation.mockReturnValue(mockLocation);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );
  });

  test('fetches data from useLocation', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );
    await waitFor(() => {
      const inputElement = screen.getByTestId('golden_customer_id');
      expect(inputElement).toBeInTheDocument();
    });
  });

  test('fetches data from useLocation error', async () => {
    useLocation.mockReturnValue({ state: { responseData: null } });
    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
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
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );
    const divElement = screen.getByTestId('golden_customer_id');
    const inputElement = divElement.querySelector('input');
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'newValue' } });
    await waitFor(() => {
      expect(inputElement.value).toBe('newValue');
    });
  });

  test('handle validate calls promoGridValidate', async () => {
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
    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );

    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    fireEvent.click(validateButton);
    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText('Validation Succesfull, please submit the data !!!')
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
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
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
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );
    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    fireEvent.click(validateButton);
    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText('Validation Succesfull, please submit the data !!!')
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
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );
    const validateButton = screen.getByText('Validate');
    expect(validateButton).toBeInTheDocument();
    fireEvent.click(validateButton);
    await waitFor(() => {
      expect(promoGridValidate).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText('Validation Succesfull, please submit the data !!!')
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(promoGridSubmit).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText('Error occured while updating the data ! Please try again !!!')
      ).toBeInTheDocument();
    });
  });

  test('should clear event subtype error when event type changes', async () => {
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
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );
    const divElement = screen.getByTestId('event_type');
    const inputElement = divElement.querySelector('input');
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'newEventType' } });
    await waitFor(() => {
      expect(inputElement.value).toBe('newEventType');
    });

    const updatedErrors = [
      {
        event_type: 'newEventType',
        event_subtype: null
      }
    ];

    expect(updatedErrors[0].event_subtype).toBeNull();
  });

  test('should clear event type error when event subtype changes', async () => {
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
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );
    const divElement = screen.getByTestId('event_subtype');
    const inputElement = divElement.querySelector('input');
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'newEventsubType' } });
    await waitFor(() => {
      expect(inputElement.value).toBe('newEventsubType');
    });

    const updatedErrors = [
      {
        event_type: null,
        event_subtype: 'newEventsubType'
      }
    ];

    expect(updatedErrors[0].event_type).toBeNull();
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
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
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
          golden_customer_id: '1'
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
        <BrowserRouter>
          <PromoGridValidations />
        </BrowserRouter>
      )
    );

    await waitFor(() => {
      const inputElement = screen.getByTestId('golden_customer_id');
      expect(inputElement).toBeInTheDocument();
    });
  });
});
