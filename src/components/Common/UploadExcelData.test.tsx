import { render, fireEvent, screen } from '@testing-library/react';
import UploadExcelData from './UploadExcelData';
import React from 'react';

describe('Upload Excel Component', () => {
  const handleClickOpen = jest.fn();
  test('renders upload button', () => {
    render(<UploadExcelData handleClickOpen={handleClickOpen} isLoading={false} />);
    const buttonComponent = screen.getByRole('button', { name: /Upload file/i });
    expect(buttonComponent).toBeInTheDocument();
    fireEvent.click(buttonComponent);
  });

  test('renders loading spinner when loading', () => {
    render(<UploadExcelData isLoading={true} handleClickOpen={handleClickOpen} />);
    const spinner = screen.getByTestId('RotateLeftIcon');
    expect(spinner).toBeInTheDocument();
  });
});
