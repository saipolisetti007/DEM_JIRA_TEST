import { render, fireEvent, screen } from '@testing-library/react';
import UploadExcelData from './UploadExcelData';

describe('UploadExcelComponent', () => {
  test('render uplaod button', () => {
    render(<UploadExcelData />);
    const ButtonComponent = screen.getByRole('button');
    expect(ButtonComponent).toBeInTheDocument();
    fireEvent.click(ButtonComponent);
  });

  test('render File Input', () => {
    render(<UploadExcelData />);
    const fileInput = screen.getByLabelText(/Upload File/i);
    expect(fileInput).toBeInTheDocument();
  });
});
