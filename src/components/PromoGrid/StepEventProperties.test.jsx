import { render } from '@testing-library/react';
import StepEventProperties from './StepEventProperties';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import store from '../../store/store';
import React from 'react';

const Wrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('StepEventProperties Component', () => {
  test('should render without crash', () => {
    const settings = {
      event_string_property_1: true,
      event_string_property_2: true,
      event_string_property_3: true,
      event_string_property_4: true,
      event_string_property_5: true,
      event_num_property_1: true,
      event_num_property_2: true,
      event_num_property_3: true,
      event_num_property_4: true,
      event_num_property_5: true,
      offer_type: true,
      off: true,
      limit: true,
      tpr: true,
      off_2: true,
      gc_buy: true,
      gc_save: true,
      percentage: true
    };
    render(
      <Provider store={store}>
        <Wrapper>
          <StepEventProperties settings={settings} />
        </Wrapper>
      </Provider>
    );
  });
});
