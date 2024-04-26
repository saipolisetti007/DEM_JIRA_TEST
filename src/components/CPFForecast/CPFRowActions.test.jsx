import { render, fireEvent } from '@testing-library/react';
import CPFRowActions from './CPFRowActions';

describe('ToggleButtons', () => {
  it('should render with initial state', () => {
    const onChange = jest.fn();
    const row = { original: { id: 1 } };
    const { getByLabelText } = render(<CPFRowActions row={row} onChange={onChange} />);

    const approveButton = getByLabelText('approve');
    const rejectButton = getByLabelText('reject');

    expect(approveButton).toBeInTheDocument();
    expect(rejectButton).toBeInTheDocument();
  });

  it('should update state when approve button is clicked', () => {
    const onChange = jest.fn();
    const row = { original: { id: 1, product_id: 1 } };
    const { getByLabelText } = render(<CPFRowActions row={row} onChange={onChange} />);

    const approveButton = getByLabelText('approve');
    fireEvent.click(approveButton);
    expect(onChange).toHaveBeenCalledWith(1, 1, 'approve');

    expect(approveButton).toHaveAttribute('aria-pressed', 'true');
    expect(approveButton).toHaveClass('MuiToggleButton-success');
  });

  it('should update state when reject button is clicked', () => {
    const onChange = jest.fn();
    const row = { original: { id: 1, product_id: 1 } };
    const { getByLabelText } = render(<CPFRowActions row={row} onChange={onChange} />);

    const rejectButton = getByLabelText('reject');
    fireEvent.click(rejectButton);
    expect(onChange).toHaveBeenCalledWith(1, 1, 'reject');

    expect(rejectButton).toHaveAttribute('aria-pressed', 'true');
    expect(rejectButton).toHaveClass('Mui-error');
  });
});
