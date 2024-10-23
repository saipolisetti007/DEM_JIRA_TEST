import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import React from 'react';
import rateImage from '../../assets/images/RYE.svg';

test('Should have Footer', () => {
  render(<Footer />);
  const footerTextElement = screen.getByText(/Digital Event Manager/i);
  expect(footerTextElement).toBeInTheDocument();

  const linkElement = screen.getByRole('link', { name: /Rate your experience/i });
  expect(linkElement).toHaveAttribute('href', 'https://rateexperience.pg.com/ratings?id=30902');
  expect(linkElement).toHaveAttribute('target', '_blank');

  const imgElement = screen.getByRole('img', { name: /Rate Your Experience/i });
  expect(imgElement).toHaveAttribute('src', rateImage);
  expect(imgElement).toHaveAttribute('alt', 'Rate Your Experience');

  const spanElement = screen.getByText('Rate your experience');
  expect(spanElement).toBeInTheDocument();
});
