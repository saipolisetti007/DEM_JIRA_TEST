import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BreadcrumbNavigation from './BreadcrumbNavigation';

describe('BreadcrumbNavigation', () => {
  test('renders breadcrumb links correctly', () => {
    render(
      <BreadcrumbNavigation
        previousPage="Event Promo Plan"
        previousLink="/promo-grid"
        currentPage="Promo Grid Validation Page"
        onNavigate={() => {}}
      />
    );

    expect(screen.getByText('Homepage')).toBeInTheDocument();
    expect(screen.getByText('Event Promo Plan')).toBeInTheDocument();
    expect(screen.getByText('Promo Grid Validation Page')).toBeInTheDocument();
  });

  test('calls onNavigate with the correct argument when Homepage link is clicked', () => {
    const onNavigateMock = jest.fn();
    render(
      <BreadcrumbNavigation
        previousPage="Event Promo Plan"
        previousLink="/promo-grid"
        currentPage="Promo Grid Validation Page"
        onNavigate={onNavigateMock}
      />
    );

    fireEvent.click(screen.getByText('Homepage'));

    expect(onNavigateMock).toHaveBeenCalledWith('/');
  });

  test('calls onNavigate with the correct argument when Event Promo Plan link is clicked', () => {
    const onNavigateMock = jest.fn();
    render(
      <BreadcrumbNavigation
        previousPage="Event Promo Plan"
        previousLink="/promo-grid"
        currentPage="Promo Grid Validation Page"
        onNavigate={onNavigateMock}
      />
    );

    fireEvent.click(screen.getByText('Event Promo Plan'));

    expect(onNavigateMock).toHaveBeenCalledWith('/promo-grid');
  });

  test('does not call onNavigate when Promo Grid Validation Page text is clicked', () => {
    const onNavigateMock = jest.fn();
    render(
      <BreadcrumbNavigation
        previousPage="Event Promo Plan"
        previousLink="/promo-grid"
        currentPage="Promo Grid Validation Page"
        onNavigate={onNavigateMock}
      />
    );

    fireEvent.click(screen.getByText('Promo Grid Validation Page'));

    expect(onNavigateMock).not.toHaveBeenCalled();
  });
});
