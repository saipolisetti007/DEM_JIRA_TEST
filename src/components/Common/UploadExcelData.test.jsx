import { render, fireEvent, screen } from '@testing-library/react';
import UploadExcelData from './UploadExcelData';

describe('Upload Excel Component', () => {
  test('render uplaod button', () => {
    render(<UploadExcelData />);
    const buttonComponent = screen.getByRole('button', { name: /Import files/i });
    expect(buttonComponent).toBeInTheDocument();
    fireEvent.click(buttonComponent);
  });

  test('render File Input', () => {
    render(<UploadExcelData />);
    const fileInput = screen.getByLabelText(/Upload File/i);
    expect(fileInput).toBeInTheDocument();
  });
});
