import { render, fireEvent, screen } from '@testing-library/react';
import BlankExcelDownload from './BlankExcelDownload';

describe('BlankExcelComponent', () => {
  test('render blank excel button', () => {
    render(<BlankExcelDownload />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveTextContent(/Download Blank Template/i);
    fireEvent.click(buttonComponent);
  });
});
