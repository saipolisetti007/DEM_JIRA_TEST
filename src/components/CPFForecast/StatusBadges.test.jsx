import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadges from './StatusBadges';

describe('StatusBadges', () => {
  test('renders Warning button when warningCount is greater than 0', () => {
    render(<StatusBadges warningCount={1} missingCount={0} pendingCount={0} />);
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  test('renders Missing button when missingCount is greater than 0', () => {
    render(<StatusBadges warningCount={0} missingCount={1} pendingCount={0} />);
    expect(screen.getByText('Missing')).toBeInTheDocument();
  });

  test('renders Pending Approval button when pendingCount is greater than 0', () => {
    render(<StatusBadges warningCount={0} missingCount={0} pendingCount={1} />);
    expect(screen.getByText('Pending Approval')).toBeInTheDocument();
  });

  test('renders Approved button when pendingCount is 0', () => {
    render(<StatusBadges warningCount={0} missingCount={0} pendingCount={0} />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });
});
