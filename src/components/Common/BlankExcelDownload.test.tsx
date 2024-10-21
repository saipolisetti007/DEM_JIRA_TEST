import { render, fireEvent, screen } from '@testing-library/react';
import BlankExcelDownload from './BlankExcelDownload';
import React from 'react';

describe('Blank Excel Component', () => {
  test('render blank excel button', () => {
    const mockHandleDownload = jest.fn();
    render(<BlankExcelDownload handleDownloadBlankExcel={mockHandleDownload} />);
    const buttonComponent = screen.getByRole('button', { name: /Download blank template/i });
    expect(buttonComponent).toBeInTheDocument();
    fireEvent.click(buttonComponent);
  });
});
