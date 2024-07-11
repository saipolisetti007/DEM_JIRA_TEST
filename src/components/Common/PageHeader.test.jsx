import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PageHeader from './PageHeader';

describe('PageHeader Component', () => {
  test('render Title and Subtitle', () => {
    render(<PageHeader title="Test Title" subtitle="Test Subtitle" />);
    const TitleElement = screen.getByText('Test Title');
    const SubtitleElement = screen.getByText('Test Subtitle');
    expect(TitleElement).toBeInTheDocument();
    expect(SubtitleElement).toBeInTheDocument();
  });

  test('render Create button correctly', () => {
    render(<PageHeader />);
    const createButton = screen.getByRole('button', { name: 'Add New Event' });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveTextContent('Add New Event');
  });

  test('calls setCreatingRow function when create button is clicked', () => {
    const setCreatingRowMock = jest.fn();
    const table = { setCreatingRow: setCreatingRowMock };
    render(<PageHeader table={table} />);
    const createButton = screen.getByRole('button', { name: 'Add New Event' });
    fireEvent.click(createButton);
    expect(setCreatingRowMock).toHaveBeenCalled();
  });

  test('opens UploadFileDialog when upload button is clicked', () => {
    render(<PageHeader />);
    const uploadButton = screen.getByLabelText('Upload file');
    fireEvent.click(uploadButton);
    const dialogTitle = screen.getByText('Upload New Data');
    expect(dialogTitle).toBeInTheDocument();
  });

  test('calls handleSave when save button is clicked with a valid file', async () => {
    const handleUploadDataExcel = jest.fn();
    render(<PageHeader handleUploadDataExcel={handleUploadDataExcel} />);

    const uploadButton = screen.getByLabelText('Upload file');
    fireEvent.click(uploadButton);

    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const fileInput = screen.getByTestId('upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(handleUploadDataExcel).toHaveBeenCalledWith(
        expect.objectContaining({
          target: { files: [file] }
        })
      );
    });
  });
});
