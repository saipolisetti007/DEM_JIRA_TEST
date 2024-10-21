import { act, renderHook } from '@testing-library/react';
import CommentsColumns from './CommentsColumns';

describe('CommentsColumns', () => {
  const comments = { 1: 'Test comment' };
  const setComments = jest.fn();
  test('renders correct columns', () => {
    const { result } = renderHook(() =>
      CommentsColumns({ comments, setComments, cpfEnabled: true })
    );

    const columns = result.current;
    expect(columns).toHaveLength(1);
    const headers = ['Your Comment'];
    headers.forEach((header, index) => {
      expect(columns[index].header).toBe(header);
    });
  });
  test('editMode is true on focus and false on blur', () => {
    const comments = { id: 1, comment: 'Test comment' };
    const setComments = jest.fn();

    const { result }: any = renderHook(() =>
      CommentsColumns({ comments, setComments, cpfEnabled: true })
    );

    const columns: any = result.current;
    const row = { id: 1 };

    // Simulate focus event
    act(() => {
      columns[0].muiEditTextFieldProps({ row }).onFocus();
    });
    expect(result.current[0].muiEditTextFieldProps({ row }).className).toContain('focused');

    // Simulate blur event
    act(() => {
      columns[0].muiEditTextFieldProps({ row }).onBlur();
    });
    expect(result.current[0].muiEditTextFieldProps({ row }).className).not.toContain('focused');
  });

  test('allows editing the text field on single click', () => {
    const { result } = renderHook(() =>
      CommentsColumns({ comments, setComments, cpfEnabled: true })
    );
    const columns = result.current;
    const commentColumn: any = columns.find((col) => col.accessorKey === 'comment');

    const row = { index: 0, original: { comment: 'test', active: true } };
    const column = { id: 'comment' };

    act(() => {
      const editTextFieldProps = commentColumn.muiEditTextFieldProps({ row, column });

      // Simulate focus event
      editTextFieldProps.onFocus({
        target: { value: 'test' }
      });

      // Simulate change event
      editTextFieldProps.onChange({
        target: { value: 'new comment' }
      });

      // Simulate blur event
      editTextFieldProps.onBlur({
        target: { value: 'new comment' }
      });
    });
  });
});
