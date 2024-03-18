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
    const ButtonComponent = screen.getByRole('button');
    expect(ButtonComponent).toBeInTheDocument();
    expect(ButtonComponent).toHaveTextContent(/Download\sBlank Template/i);
    fireEvent.click(ButtonComponent);
  });
});
