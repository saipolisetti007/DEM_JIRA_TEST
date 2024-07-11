import { render, fireEvent, screen } from '@testing-library/react';
import ExcelWithDataDownload from './ExcelWithDataDownload';

describe('Excel Data Component', () => {
  test('render excel with data button', () => {
    render(<ExcelWithDataDownload />);
    const buttonComponent = screen.getByRole('button', { name: /Download file/i });
    expect(buttonComponent).toBeInTheDocument();
    fireEvent.click(buttonComponent);
  });
});
