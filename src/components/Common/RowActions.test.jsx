import { fireEvent, render, screen } from '@testing-library/react';
import RowActions from './RowActions';

describe('RowActions Component', () => {
  const row = { id: 1, name: 'john' };
  const table = {
    setEditingRow: jest.fn()
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('render Edit and Cancel buttons', () => {
    render(<RowActions row={row} table={table} hoveredRow={row.id} />);
    const editButton = screen.getByRole('button', { name: /edit event/i });
    expect(editButton).toBeInTheDocument();
    const cancelButton = screen.getByRole('button', { name: /cancel event/i });
    expect(cancelButton).toBeInTheDocument();
  });
  test('Click Edit button calls setEditingRow with correct row', () => {
    render(<RowActions row={row} table={table} hoveredRow={row.id} />);
    const editButton = screen.getByRole('button', { name: /edit event/i });
    fireEvent.click(editButton);
    expect(table.setEditingRow).toHaveBeenCalledWith(row);
  });
  test('Click Cancel button calls handleCancel with correct row', () => {
    const handleCancel = jest.fn();
    render(<RowActions row={row} table={table} hoveredRow={row.id} handleCancel={handleCancel} />);
    const cancelButton = screen.getByRole('button', { name: /cancel event/i });
    fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalledWith(row);
  });
});
