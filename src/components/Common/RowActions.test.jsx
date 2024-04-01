import { fireEvent, render, screen } from '@testing-library/react';
import RowActions from './RowActions';

describe('RowActions Component', () => {
  const row = { id: 1, name: 'john' };
  const table = {
    setEditingRow: jest.fn()
  };
  //const handleDelete = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('render Edit and Delete buttons', () => {
    render(<RowActions row={row} table={table} />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    // const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(editButton).toBeInTheDocument();
    // expect(deleteButton).toBeInTheDocument();
  });
  test('Click Edit button calls setEditingRow with correct row', () => {
    render(<RowActions row={row} table={table} />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    expect(table.setEditingRow).toHaveBeenCalledWith(row);
  });
  // test('Click Delete button calls handleDelete with correct row', () => {
  //   render(<RowActions row={row} table={table} handleDelete={handleDelete} />);
  //   const deleteDutton = screen.getByRole('button', { name: /delete/i });
  //   fireEvent.click(deleteDutton);
  //   expect(handleDelete).toHaveBeenCalledWith(row);
  // });
});
