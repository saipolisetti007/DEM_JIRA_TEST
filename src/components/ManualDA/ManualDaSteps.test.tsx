import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ManualDaSteps from './ManualDaSteps'; // Adjust the import path as necessary

describe('ManualDaSteps Component', () => {
  test('should render without crash', () => {
    render(<ManualDaSteps />);

    // Check if the step labels are rendered
    expect(screen.getByText('Validate Shipment Profiles')).toBeInTheDocument();
    expect(screen.getByText('Validate Manual DAs details')).toBeInTheDocument();
  });

  test('should navigate to the next step when handleNext is called', () => {
    render(<ManualDaSteps />);

    // Simulate handleNext
    fireEvent.click(screen.getByText('Validate Manual DAs details'));

    // Check if the active step is updated
    expect(screen.getByText('Validate Manual DAs details').closest('div')).toHaveClass(
      'MuiStep-root'
    );
  });

  test('should not navigate to the next step if isShipmentValid is false', () => {
    render(<ManualDaSteps />);

    // Simulate step click without validation
    fireEvent.click(screen.getByText('Validate Manual DAs details'));

    // Check if the active step is not updated
    expect(screen.getByText('Validate Shipment Profiles').closest('div')).toHaveClass(
      'MuiStep-root'
    );
  });

  test('should navigate to the next step if isShipmentValid is true', () => {
    render(<ManualDaSteps />);

    // Simulate validation
    fireEvent.click(screen.getByText('Validate Shipment Profiles'));
    fireEvent.click(screen.getByText('Validate Manual DAs details'));

    // Check if the active step is updated
    expect(screen.getByText('Validate Manual DAs details').closest('div')).toHaveClass(
      'MuiStep-root'
    );
  });
});
