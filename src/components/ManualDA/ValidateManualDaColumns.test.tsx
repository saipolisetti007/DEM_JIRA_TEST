import React from 'react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import ValidateManualDaColumns from './ValidateManualDaColumns';

const renderHookRedux = (hook) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return renderHook(hook, { wrapper });
};

describe('PromoGridColumns', () => {
  test('renders correct columns', () => {
    const validationErrors = {};
    const validationWarnings = {};
    const handleInputChange = jest.fn();
    const { result } = renderHookRedux(() =>
      ValidateManualDaColumns({ validationErrors, validationWarnings, handleInputChange })
    );

    const columns = result.current;

    // Test for all columns
    expect(columns).toHaveLength(23);

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          accessorKey: 'da_id',
          header: 'DA ID',
          enableEditing: false
        })
      ])
    );
  });
});
