import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import AddRuleForm from './AddRuleForm';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
const setErrorMessage = jest.fn();
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
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});
interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('AddRuleForm Component', () => {
  test('should render without crash', () => {
    const App = () => {
      const methods = useForm();
      return (
        <Provider store={store}>
          <Wrapper>
            <AddRuleForm
              control={methods.control}
              filters={{ subsectors: ['Appliances'] }}
              errorMessage="Test"
              setErrorMessage={setErrorMessage}
            />
          </Wrapper>
        </Provider>
      );
    };

    render(<App />);
  });
});
