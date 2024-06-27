import { render, fireEvent, screen } from '@testing-library/react';
import BlankExcelDownload from './BlankExcelDownload';

describe('Blank Excel Component', () => {
  test('render blank excel button', () => {
    render(<BlankExcelDownload />);
    const buttonComponent = screen.getByRole('button', { name: /Download blank template/i });
    expect(buttonComponent).toBeInTheDocument();
    fireEvent.click(buttonComponent);
  });
});
