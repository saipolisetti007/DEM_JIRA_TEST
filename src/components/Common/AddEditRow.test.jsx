import { render, screen } from '@testing-library/react';
import AddEditRow from './AddEditRow';

jest.mock('material-react-table', () => ({
  MRT_EditActionButtons: jest.fn()
}));

describe('AddEditRow Component', () => {
  test('render dialog Title', () => {
    render(<AddEditRow title="Add New Record" />);
    const titleElement = screen.getByText(/Add New Record/i);
    expect(titleElement).toBeInTheDocument();
  });
  test('renders internalEditComponents', () => {
    render(<AddEditRow internalEditComponents={<input data-testid="test-input" />} />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toBeInTheDocument();
  });
  test('calls NRT_EditActionButtons with Correct props', () => {
    const tableMock = {};
    const rowMock = {};
    render(<AddEditRow table={tableMock} row={rowMock} />);
    const actionProps = require('material-react-table').MRT_EditActionButtons;
    expect(actionProps).toHaveBeenCalledWith(
      {
        variant: 'text',
        table: tableMock,
        row: rowMock
      },
      {}
    );
  });
});
