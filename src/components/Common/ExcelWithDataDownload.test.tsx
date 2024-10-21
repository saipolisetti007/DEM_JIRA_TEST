import { render, fireEvent, screen } from '@testing-library/react';
import ExcelWithDataDownload from './ExcelWithDataDownload';
import React from 'react';

describe('Excel Data Component', () => {
  const handleDataDownloadExcel = jest.fn();
  test('render excel with data button', () => {
    render(<ExcelWithDataDownload handleDataDownloadExcel={handleDataDownloadExcel} />);
    const buttonComponent = screen.getByRole('button', { name: /Download file/i });
    expect(buttonComponent).toBeInTheDocument();
    fireEvent.click(buttonComponent);
  });
});
