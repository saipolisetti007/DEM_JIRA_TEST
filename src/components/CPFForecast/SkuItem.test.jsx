import React from 'react';
import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import SkuItem from './SkuItem';
import { cpfDecisions } from '../../api/cpfForecastApi';
jest.mock('../../api/cpfForecastApi');
const mocksku = 'test';
const mockData = [
  {
    week: '06/03/24',
    unit: '2850',
    active: true,
    approved: false
  }
];

describe('CPFForecast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('render without crashing', () => {
    render(
      <SkuItem
        sku={mocksku}
        data={mockData}
        index={0}
        setIsLoading={() => {}}
        fetchData={() => {}}
        onAccordionChange={() => {}}
      />
    );

    expect(screen.getByText(`SKU : ${mocksku}`)).toBeInTheDocument();
    expect(screen.getByText('Save Decision')).toBeInTheDocument();
  });
  test('should expand accordion and trigger onAccorionChange', () => {
    const mockAccordianChange = jest.fn();
    render(
      <SkuItem
        sku={mocksku}
        data={mockData}
        index={0}
        fetchData={() => {}}
        setIsLoading={() => {}}
        onAccordionChange={mockAccordianChange}
      />
    );
    fireEvent.click(screen.getByText(`SKU : ${mocksku}`));
    expect(mockAccordianChange).toHaveBeenCalled();
  });
  test('should open dialog on save button click', () => {
    render(
      <SkuItem
        sku={mocksku}
        data={mockData}
        index={0}
        setIsLoading={() => {}}
        fetchData={() => {}}
        onAccordionChange={() => {}}
      />
    );
    fireEvent.click(screen.getByText('Save Decision'));
    expect(screen.getByText('Are you sure.. ? save decision?')).toBeInTheDocument();
  });

  test('should handle dialog actions', async () => {
    render(
      <SkuItem
        sku={mocksku}
        data={mockData}
        index={0}
        setIsLoading={() => {}}
        fetchData={() => {}}
        onAccordionChange={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Save Decision'));
    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });

    const mockUpdatedData = [{ week: '06/03/24', active: true, approved: true }];
    const updatedData = { sku: mocksku, forecast: mockUpdatedData };
    cpfDecisions.mockResolvedValue(updatedData);

    await waitFor(() => {
      expect(cpfDecisions).toHaveBeenCalled();
    });
  });

  test('should handle error actions', async () => {
    cpfDecisions.mockRejectedValue();
    render(
      <SkuItem
        sku={mocksku}
        data={mockData}
        index={0}
        setIsLoading={() => {}}
        fetchData={() => {}}
        onAccordionChange={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Save Decision'));

    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(cpfDecisions).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Error occured ! Please submit again !!!')).toBeInTheDocument();
    });
  });
});
