import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TrainingDocument from './TrainingDocument';

describe('TrainingDocument Component', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <TrainingDocument />
      </Router>
    );

    // Check if the main title is rendered
    expect(screen.getByText('Documentation')).toBeInTheDocument();

    // Check if the subtitle is rendered
    expect(screen.getByText('Access training materials')).toBeInTheDocument();

    // Check if the button is rendered with the correct text
    const button = screen.getByText('Show More');
    expect(button).toBeInTheDocument();

    // Check if the button has the correct target attribute
    expect(button.closest('a')).toHaveAttribute('target', '_blank');
  });
});
