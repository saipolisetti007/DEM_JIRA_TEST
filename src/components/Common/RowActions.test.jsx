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
  test('render Edit and Delete buttons', () => {
    render(<RowActions row={row} table={table} />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });
  test('Click Edit button calls setEditingRow with correct row', () => {
    render(<RowActions row={row} table={table} />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    expect(table.setEditingRow).toHaveBeenCalledWith(row);
  });
});
