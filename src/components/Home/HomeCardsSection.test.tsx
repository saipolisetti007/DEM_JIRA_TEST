import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeCardSection from './HomeCardSection';

describe('HomeCardSection', () => {
  test('renders without crashing', () => {
    render(<HomeCardSection title="Test Title">Test Children</HomeCardSection>);
  });

  test('renders the title correctly', () => {
    render(<HomeCardSection title="Test Title">Test Children</HomeCardSection>);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the children correctly', () => {
    render(
      <HomeCardSection title="Test Title">
        <div>Test Children</div>
      </HomeCardSection>
    );
    const childrenElement = screen.getByText('Test Children');
    expect(childrenElement).toBeInTheDocument();
  });
});
