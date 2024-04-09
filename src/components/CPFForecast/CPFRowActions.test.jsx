import { render, fireEvent } from '@testing-library/react';
import CPFRowActions from './CPFRowActions';

describe('ToggleButtons', () => {
  it('should render with initial state', () => {
    const { getByLabelText } = render(<CPFRowActions />);

    const approveButton = getByLabelText('approve');
    const rejectButton = getByLabelText('reject');

    expect(approveButton).toBeInTheDocument();
    expect(rejectButton).toBeInTheDocument();
  });

  it('should update state when approve button is clicked', () => {
    const { getByLabelText } = render(<CPFRowActions />);

    const approveButton = getByLabelText('approve');
    fireEvent.click(approveButton);

    expect(approveButton).toHaveAttribute('aria-pressed', 'true');
    expect(approveButton).toHaveClass('MuiToggleButton-success');
  });

  it('should update state when reject button is clicked', () => {
    const { getByLabelText } = render(<CPFRowActions />);

    const rejectButton = getByLabelText('reject');
    fireEvent.click(rejectButton);

    expect(rejectButton).toHaveAttribute('aria-pressed', 'true');
    expect(rejectButton).toHaveClass('Mui-error');
  });
});
