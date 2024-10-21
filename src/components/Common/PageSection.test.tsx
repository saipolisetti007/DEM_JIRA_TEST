import React from 'react';
import { render, screen } from '@testing-library/react';
import PageSection from './PageSection';

describe('PageSection Component', () => {
  test('render children properly', () => {
    render(
      <PageSection>
        <div>Test Example</div>
      </PageSection>
    );
    const childElement = screen.getByText('Test Example');
    expect(childElement).toBeInTheDocument();
  });
});
