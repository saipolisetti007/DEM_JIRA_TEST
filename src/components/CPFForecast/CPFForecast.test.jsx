import { render, screen } from '@testing-library/react';
import CPFForecast from './CPFForecast';

const data = [
  { product: 'product 1' },
  { product: 'product 2' },
  { product: 'product 3' },
  { product: 'product 4' },
  { product: 'product 5' }
];

describe('CPFForecast', () => {
  it('should render without crashing', () => {
    render(<CPFForecast />);
  });

  test('displays correct number of rows', () => {
    render(<CPFForecast />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(data.length + 1);
  });
});
