import { render, fireEvent, screen } from '@testing-library/react';
import ExcelWithDataDownload from './ExcelWithDataDownload';

describe('ExcelDataComponent', () => {
  test('render excel with data button', () => {
    render(<ExcelWithDataDownload />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveTextContent(/Download Filled Template/i);
    fireEvent.click(buttonComponent);
  });
});
