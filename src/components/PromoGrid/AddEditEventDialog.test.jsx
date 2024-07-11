import { render, screen, fireEvent } from '@testing-library/react';
import AddEditEventDialog from './AddEditEventDialog';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('AddEditDialog Component', () => {
  test('should render Add dialog', () => {
    render(
      <Provider store={store}>
        <AddEditEventDialog open={true} isEdit={false} />
      </Provider>
    );
    expect(screen.getByTestId('newEvent')).toBeInTheDocument();
  });

  test('should render Edit dialog', () => {
    render(
      <Provider store={store}>
        <AddEditEventDialog open={true} isEdit={true} />
      </Provider>
    );
    expect(screen.getByTestId('editEvent')).toBeInTheDocument();
  });

  test('should call handleClose when return button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Provider store={store}>
        <AddEditEventDialog open={true} handleClose={handleClose} />
      </Provider>
    );
    fireEvent.click(screen.getByText('Return to PromoGrid'));
    expect(handleClose).toHaveBeenCalled();
  });

  test('should change tabs when a tab is clicked', () => {
    render(
      <Provider store={store}>
        <AddEditEventDialog open={true} isEdit={false} />
      </Provider>
    );
    expect(screen.getByTestId('newRecord')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('settingsTab'));
    expect(screen.getByTestId('settings')).toBeInTheDocument();
  });
});
