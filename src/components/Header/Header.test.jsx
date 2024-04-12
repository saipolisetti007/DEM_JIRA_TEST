import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logo from './Logo';
import LogoImage from '../../assets/images/logo.png';
import Header from './Header';

describe('HeaderComponent', () => {
  test('render Header Component with Logo and Navbar', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
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
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute('src', LogoImage);
    expect(logoImage).toHaveAttribute('alt', 'DEM Logo');

    const textElement = screen.getByText('Digital Event Manager');
    expect(textElement).toBeInTheDocument();
  });
});
