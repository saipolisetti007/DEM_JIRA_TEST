import { render, screen } from '@testing-library/react';
import LogoImage from '../../assets/images/logo.svg';
import DefaultPageLoader from './DefaultPageLoader';

describe('Default Page Loader', () => {
  test('renders with image', () => {
    render(<DefaultPageLoader />);
  });
});
