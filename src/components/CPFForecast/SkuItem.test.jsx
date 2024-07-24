import React from 'react';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import SkuItem from './SkuItem';
import { cpfDecisions } from '../../api/cpfForecastApi';
jest.mock('../../api/cpfForecastApi');
describe('SkuItem', () => {
  const mockData = [
    {
      week: '08/05/2024',
      unit: 28567.35,
      prevUnits: 0,
      percentChange: null,
      unit_diff: null,
      editedUnits: null,
      finalunits: null,
      approved: false,
      active: false
    },
    {
      week: '08/12/2024',
      unit: 30840.92,
      prevUnits: 30640.92,
      percentChange: 0.6527219156604959,
      unit_diff: 200.0,
      editedUnits: 40000.0,
      finalunits: 40000.0,
      approved: true,
      active: true
    }
  ];
  const sku = 'test';
  const prod_name = 'test 123';
  const itFactor = 10;
  const csFactor = 100;
  const selectedUnit = 'su';
  const editedValues = {};
  const setIsLoading = jest.fn();
  const isLoading = false;
  const setEditedValues = jest.fn();
  const onSubmit = jest.fn();
  const mockAccordianChange = jest.fn();

  it('renders correctly', () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        data={mockData}
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
        onAccordionChange={mockAccordianChange}
      />
    );
    expect(screen.getByText(`SKU : ${sku}`)).toBeInTheDocument();
    expect(screen.getByText('Save Decision')).toBeInTheDocument();
  });

  test('should expand accordion and trigger onAccorionChange', () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        data={mockData}
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
        onAccordionChange={mockAccordianChange}
      />
    );
    fireEvent.click(screen.getByText(`SKU : ${sku}`));
    expect(mockAccordianChange).toHaveBeenCalled();
  });

  test('should open dialog on save button click', () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        data={mockData}
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
        onAccordionChange={mockAccordianChange}
      />
    );
    fireEvent.click(screen.getByText('Save Decision'));
    expect(screen.getByText('Are you sure.. ? Save decision?')).toBeInTheDocument();
  });
  test('should handle dialog actions submit', async () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        data={mockData}
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
        onAccordionChange={mockAccordianChange}
      />
    );

    fireEvent.click(screen.getByText('Save Decision'));
    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });

    const mockUpdatedData = [{ week: '06/03/24', active: true, approved: true }];
    const updatedData = { sku: sku, forecast: mockUpdatedData };
    cpfDecisions.mockResolvedValue(updatedData);

    await waitFor(() => {
      expect(cpfDecisions).toHaveBeenCalled();
    });
  });
  test('should handle dialog actions cancel', async () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        data={mockData}
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
        onAccordionChange={mockAccordianChange}
      />
    );

    fireEvent.click(screen.getByText('Save Decision'));
    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'));
    });
  });
  test('should handle error actions', async () => {
    cpfDecisions.mockRejectedValue();
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        data={mockData}
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
        onAccordionChange={mockAccordianChange}
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
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('CloseIcon'));
    });
  });
  test('calls handleCellEdit correctly', () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        data={mockData}
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
        onAccordionChange={mockAccordianChange}
      />
    );
    waitFor(() => !isLoading);
    waitFor(() => {
      const editedUnits = screen.getByLabelText('Edited Units');
      fireEvent.change(editedUnits, { target: { value: '110' } });
      expect(editedUnits.value).toBe(110);
    });
    waitFor(() => {
      expect(setEditedValues).toHaveBeenCalledWith({
        1: { editedUnits: '110' }
      });
    });
  });

  test('converts units  correctly', () => {
    const mockCovertedUnits = jest.fn().mockImplementation((value, unit) => {
      if (unit === 'cs') return Math.round(value / csFactor);
      if (unit === 'it') return Math.round(value / itFactor);
      if (unit === 'msu') return (value / 1000).toFixed(2);
      return value;
    });
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        data={mockData}
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
        onAccordionChange={mockAccordianChange}
        convertedUnits={mockCovertedUnits}
      />
    );

    expect(mockCovertedUnits(100, 'cs')).toBe(1);
    expect(mockCovertedUnits(100, 'it')).toBe(10);
    expect(mockCovertedUnits(1000, 'msu')).toBe('1.00');
    expect(mockCovertedUnits(100, 'su')).toBe(100);
  });
});
