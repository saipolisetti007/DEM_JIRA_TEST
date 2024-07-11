import { render } from '@testing-library/react';
import StepEventProperties from './StepEventProperties';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import store from '../../store/store';

const Wrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('StepEventAdditionalData Component', () => {
  test('should render without crash', () => {
    render(
      <Provider store={store}>
        <Wrapper>
          <StepEventProperties />
        </Wrapper>
      </Provider>
    );
  });
});
