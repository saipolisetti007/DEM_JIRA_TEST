import React from 'react';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import SkuItem from './SkuItem';
import { cpfDecisions, cpfSkuForecast } from '../../api/cpfForecastApi';

jest.mock('../../api/cpfForecastApi');

describe('SkuItem', () => {
  const cpfData = {
    cs_factor: 100,
    it_factor: 10,
    forecast: [
      {
        week: '08/05/2024',
        unit: 28567.35,
        prevUnits: 0,
        percentChange: null,
        unit_diff: null,
        editedUnits: 10,
        finalunits: null,
        approved: true,
        active: true,
        comment: 'Updated comment'
      },
      {
        week: '12/05/2024',
        unit: 28567.35,
        prevUnits: 0,
        percentChange: null,
        unit_diff: null,
        editedUnits: 5,
        finalunits: null,
        approved: false,
        active: true,
        comment: 'Updated comment'
      }
    ]
  };
  const selectedFilters = {
    customerId: ['123'],
    eventType: ['text'],
    eventSubtype: ['text'],
    status: ['text'],
    comments: ['text']
  };

  const sku = 'test';
  const prod_name = 'test 123';
  const itFactor = 10;
  const csFactor = 100;
  const selectedUnit = 'su';
  const editedValues = {};
  const setEditedValues = jest.fn();
  const mockAccordionChange = jest.fn();
  const selectedRowIds = ['0', '1'];

  beforeEach(() => {
    cpfSkuForecast.mockResolvedValue(cpfData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedFilters={selectedFilters}
      />
    );
    expect(screen.getByText(`SKU : ${sku}`)).toBeInTheDocument();
    expect(screen.getByText('Save Decision')).toBeInTheDocument();
  });

  test('should expand accordion and trigger onAccordionChange', async () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedFilters={selectedFilters}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText(`SKU : ${sku}`));
    });
    expect(mockAccordionChange).toHaveBeenCalled();
  });
  test('fetch data  on Accordion click', async () => {
    cpfSkuForecast.mockResolvedValue(cpfData);
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedFilters={selectedFilters}
        selectedRowIds={selectedRowIds}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText(`SKU : ${sku}`));
    });
    await waitFor(() => {
      expect(cpfSkuForecast).toHaveBeenCalled();
    });
  });
  test('fetch data error on Accordion click', async () => {
    cpfSkuForecast.mockRejectedValueOnce();
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedFilters={selectedFilters}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText(`SKU : ${sku}`));
    });
    await waitFor(() => {
      expect(cpfSkuForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error. Could not fetch the data !!!')).toBeInTheDocument();
    });
  });

  test('should open dialog on save button click', async () => {
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedFilters={selectedFilters}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText(`SKU : ${sku}`));
    });
    await waitFor(() => {
      expect(cpfSkuForecast).toHaveBeenCalled();
    });
    fireEvent.click(screen.getByText('Save Decision'));
    expect(screen.getByText('Are you sure.. ? Save decision?')).toBeInTheDocument();
  });
  test('should handle dialog actions submit', async () => {
    cpfSkuForecast.mockResolvedValue(cpfData);
    const editedValues = { 0: { editedUnits: 10 }, 1: { editedUnits: 5 } };
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedRowIds={selectedRowIds}
        selectedFilters={selectedFilters}
      />
    );

    fireEvent.click(screen.getByText('Save Decision'));
    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });

    const mockUpdatedData = [
      {
        week: '08/05/2024',
        active: true,
        approved: true,
        editedUnits: '10',
        comment: 'Updated comment'
      }
    ];
    const updatedData = { sku: sku, units: selectedUnit, forecast: mockUpdatedData };
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
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedFilters={selectedFilters}
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
        itFactor={itFactor}
        csFactor={csFactor}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedFilters={selectedFilters}
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
      expect(screen.getByText('Error occurred ! Please submit again !!!')).toBeInTheDocument();
    });
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('CloseIcon'));
    });
  });
  // test('calls handleCellEdit correctly', async () => {
  //   cpfSkuForecast.mockResolvedValue(cpfData);
  //   render(
  //     <SkuItem
  //       sku={sku}
  //       prod_name={prod_name}
  //       selectedUnit={selectedUnit}
  //       editedValues={editedValues}
  //       setEditedValues={setEditedValues}
  //       onAccordionChange={mockAccordionChange}
  //       cpfEnabled={true}
  //       selectedFilters={selectedFilters}
  //     />
  //   );
  //   await act(async () => {
  //     fireEvent.click(screen.getByText(`SKU : ${sku}`));
  //   });
  //   await waitFor(() => {
  //     expect(cpfSkuForecast).toHaveBeenCalled();
  //   });

  //   waitFor(() => {
  //     const editedUnits = screen.getByLabelText('Edited Units');
  //     fireEvent.change(editedUnits, { target: { value: '110' } });
  //     expect(editedUnits.value).toBe(110);
  //   });
  //   waitFor(() => {
  //     expect(setEditedValues).toHaveBeenCalledWith({
  //       1: { editedUnits: '110' }
  //     });
  //   });
  // });

  test('convert units test', async () => {
    const newcpfData = {
      cs_factor: 100,
      it_factor: 10,
      forecast: [
        {
          week: '08/05/2024',
          unit: 28567.35,
          prevUnits: 0,
          percentChange: null,
          unit_diff: null,
          editedUnits: 10,
          finalunits: null,
          approved: true,
          active: true,
          comment: 'Updated comment'
        },
        {
          week: '12/05/2024',
          unit: 28567.35,
          prevUnits: 0,
          percentChange: null,
          unit_diff: null,
          editedUnits: 5,
          finalunits: null,
          approved: false,
          active: true,
          comment: 'Updated comment'
        }
      ]
    };
    cpfSkuForecast.mockResolvedValue(newcpfData);
    render(
      <SkuItem
        sku={sku}
        prod_name={prod_name}
        selectedUnit={selectedUnit}
        editedValues={{}}
        setEditedValues={setEditedValues}
        onAccordionChange={mockAccordionChange}
        cpfEnabled={true}
        selectedFilters={selectedFilters}
        selectedRowIds={selectedRowIds}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText(`SKU : ${sku}`));
    });
    await waitFor(() => {
      expect(cpfSkuForecast).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByText('Save Decision'));
    expect(screen.getByText('Are you sure.. ? Save decision?')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });
  });
});
