import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ThresholdSettings from './ThresholdSettings';

describe('ThresholdSettings', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <ThresholdSettings />
      </Router>
    );
  });

  test('renders the threshold settings icon image', () => {
    render(
      <Router>
        <ThresholdSettings />
      </Router>
    );
    const imageElement = screen.getByAltText('Threshold settings icon');
    expect(imageElement).toBeInTheDocument();
  });

  test('renders the title correctly', () => {
    render(
      <Router>
        <ThresholdSettings />
      </Router>
    );
    const titleElement = screen.getByText('Threshold settings');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the subtitle correctly', () => {
    render(
      <Router>
        <ThresholdSettings />
      </Router>
    );
    const subtitleElement = screen.getByText('Adjust the settings and manage the forecast');
    expect(subtitleElement).toBeInTheDocument();
  });
});
