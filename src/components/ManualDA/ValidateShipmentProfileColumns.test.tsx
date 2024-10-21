import React from 'react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import ValidateShipmentProfileColumns from './ValidateShipmentProfileColumns';

const renderHookRedux = (hook) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return renderHook(hook, { wrapper });
};

describe('PromoGridColumns', () => {
  test('renders correct columns', () => {
    const validationErrors = {};
    const handleInputChange = jest.fn();
    const { result } = renderHookRedux(() =>
      ValidateShipmentProfileColumns({ validationErrors, handleInputChange })
    );

    const columns = result.current;

    // Test for all columns
    expect(columns).toHaveLength(5);
  });
});
