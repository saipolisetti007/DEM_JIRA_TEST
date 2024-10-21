import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PageHeader from './PageHeader';
const mockHandleAddEventOpen = jest.fn();
const mockHandleDataDownloadExcel = jest.fn();
const mockHandleDownloadBlankExcel = jest.fn();
const mockHandleUploadDataExcel = jest.fn();
describe('PageHeader Component', () => {
  test('renders Title and Subtitle', () => {
    render(
      <PageHeader
        title="Test Title"
        subtitle="Test Subtitle"
        isDataLoading={false}
        handleAddEventOpen={mockHandleAddEventOpen}
        handleDataDownloadExcel={mockHandleDataDownloadExcel}
        handleDownloadBlankExcel={mockHandleDownloadBlankExcel}
        handleUploadDataExcel={mockHandleUploadDataExcel}
      />
    );
    const titleElement = screen.getByText('Test Title');
    const subtitleElement = screen.getByText('Test Subtitle');
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders Add New Event button correctly', () => {
    render(
      <PageHeader
        title="Test Title"
        subtitle="Test Subtitle"
        isDataLoading={false}
        handleAddEventOpen={mockHandleAddEventOpen}
        handleDataDownloadExcel={mockHandleDataDownloadExcel}
        handleDownloadBlankExcel={mockHandleDownloadBlankExcel}
        handleUploadDataExcel={mockHandleUploadDataExcel}
      />
    );
    const addButton = screen.getByRole('button', { name: 'Add New Event' });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('Add New Event');
  });

  test('calls handleAddEventOpen function when Add New Event button is clicked', () => {
    render(
      <PageHeader
        title="Test Title"
        subtitle="Test Subtitle"
        isDataLoading={false}
        handleAddEventOpen={mockHandleAddEventOpen}
        handleDataDownloadExcel={mockHandleDataDownloadExcel}
        handleDownloadBlankExcel={mockHandleDownloadBlankExcel}
        handleUploadDataExcel={mockHandleUploadDataExcel}
      />
    );
    const addButton = screen.getByRole('button', { name: 'Add New Event' });
    fireEvent.click(addButton);
    expect(mockHandleAddEventOpen).toHaveBeenCalled();
  });

  test('opens UploadFileDialog when upload button is clicked', () => {
    render(
      <PageHeader
        title="Test Title"
        subtitle="Test Subtitle"
        isDataLoading={false}
        handleAddEventOpen={mockHandleAddEventOpen}
        handleDataDownloadExcel={mockHandleDataDownloadExcel}
        handleDownloadBlankExcel={mockHandleDownloadBlankExcel}
        handleUploadDataExcel={mockHandleUploadDataExcel}
      />
    );
    const uploadButton = screen.getByLabelText('Upload file');
    fireEvent.click(uploadButton);
    const dialogTitle = screen.getByText('Upload New Data');
    expect(dialogTitle).toBeInTheDocument();
  });

  test('calls handleUploadDataExcel when a valid file is uploaded', async () => {
    render(
      <PageHeader
        title="Test Title"
        subtitle="Test Subtitle"
        isDataLoading={false}
        handleAddEventOpen={mockHandleAddEventOpen}
        handleDataDownloadExcel={mockHandleDataDownloadExcel}
        handleDownloadBlankExcel={mockHandleDownloadBlankExcel}
        handleUploadDataExcel={mockHandleUploadDataExcel}
      />
    );

    const uploadButton = screen.getByLabelText('Upload file');
    fireEvent.click(uploadButton);

    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const fileInput = screen.getByTestId('upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockHandleUploadDataExcel).toHaveBeenCalledWith(
        expect.objectContaining({
          target: { files: [file] }
        }),
        expect.any(Object) // waiting abortsignal
      );
    });
  });
});
