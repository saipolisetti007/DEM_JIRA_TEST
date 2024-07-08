import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UploadFileDialog from './UploadFileDialog';

describe('UploadFileDialog Component', () => {
  test('renders dialog title', () => {
    render(<UploadFileDialog open={true} handleFileChange={() => {}} />);
    const dialogTitle = screen.getByText('Upload New Data');
    expect(dialogTitle).toBeInTheDocument();
  });

  test('renders save button when a valid file is uploaded', () => {
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const handleFileChange = jest.fn();
    render(
      <UploadFileDialog open={true} handleFileChange={handleFileChange} fileTypeValid={true} />
    );
    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeInTheDocument();
  });

  test('renders cancel button when an unsupported file is uploaded', () => {
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    const handleFileChange = jest.fn();
    render(
      <UploadFileDialog open={true} handleFileChange={handleFileChange} fileTypeValid={false} />
    );
    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();
  });

  test('calls handleSave when save button is clicked', () => {
    const handleSave = jest.fn();
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    render(
      <UploadFileDialog
        open={true}
        handleFileChange={() => {}}
        handleSave={handleSave}
        fileTypeValid={true}
      />
    );
    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    expect(handleSave).toHaveBeenCalled();
  });

  test('calls handleClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<UploadFileDialog open={true} handleClose={handleClose} handleFileChange={() => {}} />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  test('resets file upload state when cancel button is clicked', () => {
    const handleFileChange = jest.fn();
    render(
      <UploadFileDialog open={true} handleFileChange={handleFileChange} fileTypeValid={false} />
    );
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(handleFileChange).toHaveBeenCalledTimes(1);
  });
});
