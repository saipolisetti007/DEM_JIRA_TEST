import { fireEvent, render, screen } from '@testing-library/react';
import RowActions from './RowActions';

describe('RowActions Component', () => {
  const row = { id: 1, name: 'john' };
  const table = {
    setEditingRow: jest.fn()
  };
  const isEdit = true;
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('render Edit and Cancel buttons', () => {
    render(<RowActions row={row} table={table} hoveredRow={row.id} isEdit={isEdit} />);
    const editButton = screen.getByRole('button', { name: /edit event/i });
    expect(editButton).toBeInTheDocument();
    const cancelButton = screen.getByRole('button', { name: /cancel event/i });
    expect(cancelButton).toBeInTheDocument();
  });
  test('Click Edit button calls setEditingRow with correct row', () => {
    const handleEdit = jest.fn();
    render(
      <RowActions
        row={row}
        table={table}
        hoveredRow={row.id}
        handleEdit={handleEdit}
        isEdit={isEdit}
      />
    );
    const editButton = screen.getByRole('button', { name: /edit event/i });
    fireEvent.click(editButton);
    expect(handleEdit).toHaveBeenCalledWith(row);
  });
  test('Click Cancel button calls handleCancel with correct row', () => {
    const handleCancel = jest.fn();
    render(
      <RowActions
        row={row}
        table={table}
        hoveredRow={row.id}
        handleCancel={handleCancel}
        isEdit={isEdit}
      />
    );
    const cancelButton = screen.getByRole('button', { name: /cancel event/i });
    fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalledWith(row);
  });
});
