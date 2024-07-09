import { fireEvent, render, screen } from '@testing-library/react';
import RowSelections from './RowSelections';

describe('RowSelection Component', () => {
  test('render RowCount, Export and Cancel buttons', () => {
    render(<RowSelections rowCount={10} selectedRowCount={3} />);
    const selectedText = screen.getByText('3');
    expect(selectedText).toBeInTheDocument();
    const editButton = screen.getByRole('button', { name: /Export files/i });
    expect(editButton).toBeInTheDocument();
    const cancelButton = screen.getByRole('button', { name: /Cancel events/i });
    expect(cancelButton).toBeInTheDocument();
  });
  test('Click Export files button', () => {
    render(<RowSelections rowCount={10} selectedRowCount={3} />);
    const editButton = screen.getByRole('button', { name: /Export files/i });
    fireEvent.click(editButton);
  });
  test('Click Cancel events button', () => {
    const handleCancel = jest.fn();
    render(<RowSelections rowCount={10} selectedRowCount={3} handleCancel={handleCancel} />);
    const cancelButton = screen.getByRole('button', { name: /Cancel events/i });
    fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalled();
  });
});
