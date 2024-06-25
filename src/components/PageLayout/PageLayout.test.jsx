import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './PageLayout';
import { Provider } from 'react-redux';
import store from '../../store/store';
describe('PageLayout Component', () => {
  test('renders header footer component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageLayout />
        </BrowserRouter>
      </Provider>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
