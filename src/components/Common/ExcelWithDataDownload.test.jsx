import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExcelWithDataDownload from './ExcelWithDataDownload';

describe('ExcelDataComponent', () => {
  test('render excel with data button', () => {
    render(
      <BrowserRouter>
        <ExcelWithDataDownload />
      </BrowserRouter>
    );
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveTextContent(/Download\sFilled Template/i);
    fireEvent.click(buttonComponent);
  });
});
