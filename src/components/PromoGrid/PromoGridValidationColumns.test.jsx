import { renderHook } from '@testing-library/react';
import PromoGridValidationColumns from './PromoGridValidationColumns';
import { Provider } from 'react-redux';
import store from '../../store/store';

const renderHookRedux = (hook) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return renderHook(hook, { wrapper });
};

describe('PromoGridColumns', () => {
  test('renders correct columns', () => {
    const validationErrors = {};
    const handleInputChange = jest.fn();
    const { result } = renderHookRedux(() =>
      PromoGridValidationColumns({ validationErrors, handleInputChange })
    );

    const columns = result.current;

    // Test for all columns
    expect(columns).toHaveLength(46);

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {},
          {
            accessorKey: 'cpf_id',
            header: 'CPF ID',
            enableEditing: false
          },
          {
            accessorKey: 'golden_customer_id',
            header: 'Golden Customer ID',
            Edit: expect.any(Function)
          }
        )
      ])
    );
  });
});
