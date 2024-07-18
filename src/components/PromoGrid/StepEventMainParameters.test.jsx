import { fireEvent, screen, render } from '@testing-library/react';
import StepEventMainParameters from './StepEventMainParameters';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import store from '../../store/store';

const Wrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('StepEventMainParameters Component', () => {
  const settings = {
    start_of_shipments: true,
    end_of_shipments: true,
    event_description: true,
    umbrella_event: true,
    comments: true
  };
  test('should render without crash', () => {
    render(
      <Provider store={store}>
        <Wrapper>
          <StepEventMainParameters settings={settings} />
        </Wrapper>
      </Provider>
    );
  });
  test('should validate date fields', async () => {
    render(
      <Provider store={store}>
        <Wrapper>
          <StepEventMainParameters settings={settings} />
        </Wrapper>
      </Provider>
    );

    const event_in_store_start_date = screen.getByRole('textbox', {
      name: /Event in Store Start Date/i
    });
    const event_in_store_end_date = screen.getByRole('textbox', {
      name: /Event in Store End Date/i
    });

    fireEvent.change(event_in_store_start_date, {
      target: { value: '07/22/2024' }
    });

    fireEvent.change(event_in_store_end_date, {
      target: { value: '07/22/2023' }
    });
  });

  test('should reset customerSubType if customerType changes', async () => {
    render(
      <Provider store={store}>
        <Wrapper>
          <StepEventMainParameters settings={settings} />
        </Wrapper>
      </Provider>
    );

    const event_type = screen.getByRole('combobox', { name: /Event type/i });
    fireEvent.mouseDown(event_type);

    const event_type_list = screen.getByRole('listbox', { name: /Event type/i });
    fireEvent.mouseDown(event_type_list);
  });
});
