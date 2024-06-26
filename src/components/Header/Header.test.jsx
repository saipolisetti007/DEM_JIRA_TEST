import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logo from './Logo';
import LogoImage from '../../assets/images/logo.svg';
import Header from './Header';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('HeaderComponent', () => {
  test('render Header Component with Logo and Navbar', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const logoComponent = screen.getByTestId('logo');
    expect(logoComponent).toBeInTheDocument();
    const navComponent = screen.getByTestId('navbar');
    expect(navComponent).toBeInTheDocument();
  });
});

describe('LogoComponent', () => {
  test('renders without with correct elements and attributes', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Logo />
        </BrowserRouter>
      </Provider>
    );
    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute('src', LogoImage);
    expect(logoImage).toHaveAttribute('alt', 'DEM Logo');

    const textElement = screen.getByText('Digital Event Manager');
    expect(textElement).toBeInTheDocument();
  });
});
