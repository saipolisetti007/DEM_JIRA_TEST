import { render, fireEvent, screen } from '@testing-library/react';
import UploadExcelData from './UploadExcelData';

describe('Upload Excel Component', () => {
  test('renders upload button', () => {
    render(<UploadExcelData />);
    const buttonComponent = screen.getByRole('button', { name: /Upload file/i });
    expect(buttonComponent).toBeInTheDocument();
    fireEvent.click(buttonComponent);
  });

  test('renders loading spinner when loading', () => {
    render(<UploadExcelData isLoading={true} />);
    const spinner = screen.getByTestId('RotateLeftIcon');
    expect(spinner).toBeInTheDocument();
  });
});
