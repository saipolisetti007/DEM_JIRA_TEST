import { render } from '@testing-library/react';
import StepEventAdditionalData from './StepEventAdditionalData';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import store from '../../store/store';

const Wrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('StepEventAdditionalData Component', () => {
  test('should render without crash', () => {
    const settings = {
      expected_shipments_forecast: true,
      expected_consumption_forecast: true,
      bu: true,
      proxy_like_item_number: true,
      pgp_flag: true,
      promoted_product_group_id: true,
      distribution_profile: true,
      discount_amt: true,
      base_price: true,
      price_after_discount: true
    };
    render(
      <Provider store={store}>
        <Wrapper>
          <StepEventAdditionalData settings={settings} />
        </Wrapper>
      </Provider>
    );
  });
});
