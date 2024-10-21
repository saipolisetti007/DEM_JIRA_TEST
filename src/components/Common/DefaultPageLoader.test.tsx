import { render } from '@testing-library/react';
import DefaultPageLoader from './DefaultPageLoader';
import React from 'react';

describe('Default Page Loader', () => {
  test('renders with image', () => {
    render(<DefaultPageLoader />);
  });
});
