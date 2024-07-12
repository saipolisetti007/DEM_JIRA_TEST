import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DropFileInput from './DropFileInput';

describe('DropFileInput Component', () => {
  test('renders drag and drop text when no file is uploaded', () => {
    render(<DropFileInput onFileChange={() => {}} />);
    const dragText = screen.getByText(/Drag & Drop file here or click upload/i);
    expect(dragText).toBeInTheDocument();
  });

  test('renders file details when a file is uploaded', () => {
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    render(<DropFileInput onFileChange={() => {}} />);
    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('example.xlsx')).toBeInTheDocument();
    expect(screen.getByText(/KB/i)).toBeInTheDocument();
  });

  test('renders error icon when an unsupported file is uploaded', () => {
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    render(<DropFileInput onFileChange={() => {}} />);
    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('example.txt')).toBeInTheDocument();
    expect(screen.getByText(/KB/i)).toBeInTheDocument();
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
  });

  test('resets file input when reset prop changes to true', () => {
    const { rerender } = render(<DropFileInput onFileChange={() => {}} reset={false} />);
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('example.xlsx')).toBeInTheDocument();

    rerender(<DropFileInput onFileChange={() => {}} reset={true} />);
    expect(screen.queryByText('example.xlsx')).not.toBeInTheDocument();
  });

  test('handles drag and drop events', () => {
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const handleFileChange = jest.fn();
    render(<DropFileInput onFileChange={handleFileChange} />);

    const dropArea = screen.getByText(/Drag & Drop file here or click upload/i).closest('div');

    fireEvent.dragOver(dropArea);

    fireEvent.dragEnter(dropArea);

    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [file]
      }
    });

    expect(screen.getByText('example.xlsx')).toBeInTheDocument();
    expect(handleFileChange).toHaveBeenCalledWith({ target: { files: [file] } });
  });

  test('triggers file input click when upload button is clicked', () => {
    render(<DropFileInput onFileChange={() => {}} />);

    const uploadButton = screen.getByText('Upload');

    const fileInput = screen.getByTestId('upload');
    const handleClick = jest.spyOn(fileInput, 'click');

    fireEvent.click(uploadButton);

    expect(handleClick).toHaveBeenCalled();
  });

  test('handles file input change event', () => {
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const handleFileChange = jest.fn();
    render(<DropFileInput onFileChange={handleFileChange} />);

    const fileInput = screen.getByTestId('upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('example.xlsx')).toBeInTheDocument();
    expect(handleFileChange).toHaveBeenCalledWith({ target: { files: [file] } });
  });

  test('adds and removes dragover class on drag events', () => {
    render(<DropFileInput onFileChange={() => {}} />);

    const dropArea = screen.getByTestId('drop-area');

    fireEvent.dragEnter(dropArea);
    expect(dropArea).toHaveClass('dragover');

    fireEvent.dragLeave(dropArea);
    expect(dropArea).not.toHaveClass('dragover');

    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [
          new File(['dummy content'], 'example.xlsx', {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
        ]
      }
    });
    expect(dropArea).not.toHaveClass('dragover');
  });
});
