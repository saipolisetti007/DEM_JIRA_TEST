import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import UploadFileDialog from './UploadFileDialog';

describe('UploadFileDialog Component', () => {
  test('renders dialog title', () => {
    render(
      <UploadFileDialog open={true} handleClose={() => {}} handleUploadDataExcel={() => {}} />
    );
    const dialogTitle = screen.getByText('Upload New Data');
    expect(dialogTitle).toBeInTheDocument();
  });

  test('renders cancel button', () => {
    render(
      <UploadFileDialog open={true} handleClose={() => {}} handleUploadDataExcel={() => {}} />
    );
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();
  });

  test('handles valid file upload', async () => {
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const handleUploadDataExcel = jest.fn().mockResolvedValue({});
    render(
      <UploadFileDialog
        open={true}
        handleClose={() => {}}
        handleUploadDataExcel={handleUploadDataExcel}
      />
    );

    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(handleUploadDataExcel).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
  });

  test('handles invalid file upload', async () => {
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    render(
      <UploadFileDialog open={true} handleClose={() => {}} handleUploadDataExcel={() => {}} />
    );

    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(
        screen.getByText('Invalid file format. Please upload an Excel file.')
      ).toBeInTheDocument();
    });
  });

  test('calls handleClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <UploadFileDialog open={true} handleClose={handleClose} handleUploadDataExcel={() => {}} />
    );
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  test('calls handleClose when cancel button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <UploadFileDialog open={true} handleClose={handleClose} handleUploadDataExcel={() => {}} />
    );
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });

  test('handles upload error', async () => {
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const handleUploadDataExcel = jest.fn().mockRejectedValue(new Error('Upload failed'));
    render(
      <UploadFileDialog
        open={true}
        handleClose={() => {}}
        handleUploadDataExcel={handleUploadDataExcel}
      />
    );

    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(handleUploadDataExcel).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });

    await waitFor(() => {
      expect(
        screen.getByText('Error occurred while uploading the file. Please try again.')
      ).toBeInTheDocument();
    });
  });
});
