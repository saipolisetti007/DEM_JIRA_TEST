import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadges from './StatusBadges';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../customTheme';

describe('StatusBadges', () => {
  const statuses = [
    { value: 'Created', label: 'Created', color: 'Create' },
    { value: 'Submitted', label: 'Submitted', color: 'Success' },
    { value: 'Error', label: 'Error', color: 'Error' },
    { value: 'Cancelled', label: 'Cancelled', color: 'Cancel' },
    { value: 'Expired', label: 'Expired', color: 'Expired' }
  ];

  statuses.forEach(({ value, label, color }) => {
    test(`renders ${label} badge correctly`, () => {
      render(
        <ThemeProvider theme={customTheme}>
          <StatusBadges value={value} />
        </ThemeProvider>
      );
      const button = screen.getByRole('button', { name: label });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        `MuiButton-contained${color.charAt(0).toUpperCase() + color.slice(1)}`
      );
    });
  });
});
