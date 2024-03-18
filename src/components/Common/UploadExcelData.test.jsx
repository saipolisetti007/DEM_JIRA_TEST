import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UploadExcelData from './UploadExcelData';

describe('UploadExcelComponent', () => {
  test('render uplaod button', () => {
    render(
      <BrowserRouter>
        <UploadExcelData />
      </BrowserRouter>
    );
    const ButtonComponent = screen.getByRole('button');
    expect(ButtonComponent).toBeInTheDocument();
    fireEvent.click(ButtonComponent);
  });

  test('render File Input', () => {
    render(
      <BrowserRouter>
        <UploadExcelData />
      </BrowserRouter>
    );
    const fileInput = screen.getByLabelText(/Upload File/i);
    expect(fileInput).toBeInTheDocument();
  });
});
