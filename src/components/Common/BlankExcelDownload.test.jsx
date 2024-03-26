import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlankExcelDownload from './BlankExcelDownload';

describe('BlankExcelComponent', () => {
  test('render blank excel button', () => {
    render(
      <BrowserRouter>
        <BlankExcelDownload />
      </BrowserRouter>
    );
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveTextContent(/Download\sBlank Template/i);
    fireEvent.click(buttonComponent);
  });
});
