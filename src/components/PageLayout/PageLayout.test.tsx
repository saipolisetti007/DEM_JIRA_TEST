import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './PageLayout';
import { Provider } from 'react-redux';
import store from '../../store/store';
import React from 'react';
describe('PageLayout Component', () => {
  test('renders header footer component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageLayout>
            <div>Test Child</div>
          </PageLayout>
        </BrowserRouter>
      </Provider>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
