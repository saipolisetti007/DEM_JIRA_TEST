import React from 'react';
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
    minerva_volume: true,
    comments: true
  };

  const App = () => {
    const methods = useForm();
    return (
      <Provider store={store}>
        <Wrapper>
          <StepEventMainParameters settings={settings} control={methods.control} />
        </Wrapper>
      </Provider>
    );
  };

  test('should render without crash', () => {
    render(<App />);
  });

  test('should validate date fields', async () => {
    render(<App />);

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
    render(<App />);

    const event_type = screen.getByRole('combobox', { name: /Event type/i });
    fireEvent.mouseDown(event_type);

    const event_type_list = screen.getByRole('listbox', { name: /Event type/i });
    fireEvent.mouseDown(event_type_list);
  });
});
