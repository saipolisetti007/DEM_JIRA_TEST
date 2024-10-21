import { fireEvent, render, screen } from '@testing-library/react';
import RowSelections from './RowSelections';
import React from 'react';
const handleSelectedDataDownloadExcel = jest.fn();
const handleDataDownloadOptionExcel = jest.fn();

describe('RowSelection Component', () => {
  test('render RowCount, Export and Cancel buttons', () => {
    render(
      <RowSelections
        rowCount={10}
        selectedRowCount={3}
        isExportDropdown={true}
        cancelTitle="Cancel DA"
        exportTitle="Export DA"
        exportMain="Export DA"
        exportOption="Export DA with split"
        handleCancel={() => {}}
        handleSelectedDataDownloadExcel={handleSelectedDataDownloadExcel}
        handleSelectedDataOptionExcel={handleDataDownloadOptionExcel}
      />
    );
    const selectedText = screen.getByText('3');
    expect(selectedText).toBeInTheDocument();
    const editButton = screen.getByRole('button', { name: /Export DA/i });
    expect(editButton).toBeInTheDocument();
    const cancelButton = screen.getByLabelText('Cancel DA');
    fireEvent.click(cancelButton);
  });
  test('Click Export files button', () => {
    render(
      <RowSelections
        rowCount={10}
        selectedRowCount={3}
        isExportDropdown={true}
        cancelTitle="Cancel DA"
        exportTitle="Export DA"
        exportMain="Export DA"
        exportOption="Export DA with split"
        handleCancel={() => {}}
        handleSelectedDataDownloadExcel={handleSelectedDataDownloadExcel}
        handleSelectedDataOptionExcel={handleDataDownloadOptionExcel}
      />
    );
    const editButton = screen.getByRole('button', { name: /Export DA/i });
    fireEvent.click(editButton);
  });
  test('Click Cancel events button', () => {
    render(
      <RowSelections
        rowCount={10}
        selectedRowCount={3}
        isExportDropdown={true}
        cancelTitle="Cancel DA"
        exportTitle="Export DA"
        exportMain="Export DA"
        exportOption="Export DA with split"
        handleCancel={() => {}}
        handleSelectedDataDownloadExcel={handleSelectedDataDownloadExcel}
        handleSelectedDataOptionExcel={handleDataDownloadOptionExcel}
      />
    );
    const exportBtn = screen.getByRole('button', { name: /Export DA/i });
    fireEvent.click(exportBtn);
    const btn = screen.getByRole('menuitem', { name: /Export DA with split/i });
    fireEvent.click(btn);
  });
  test('Render RowSelection component when export DA is not a dropdown', () => {
    render(
      <RowSelections
        rowCount={10}
        selectedRowCount={3}
        isExportDropdown={false}
        cancelTitle="Cancel DA"
        exportTitle="Export DA"
        exportMain="Export DA"
        exportOption="Export DA with split"
        handleCancel={() => {}}
        handleSelectedDataDownloadExcel={handleSelectedDataDownloadExcel}
        handleSelectedDataOptionExcel={handleDataDownloadOptionExcel}
      />
    );
    const exportBtn = screen.getByRole('button', { name: /Export DA/i });
    fireEvent.click(exportBtn);
  });
});
