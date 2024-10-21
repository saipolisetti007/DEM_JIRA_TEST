import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DropFileInput from './DropFileInput';

describe('DropFileInput Component', () => {
  test('renders drag and drop text when no file is uploaded', () => {
    render(<DropFileInput onFileChange={() => {}} reset={false} />);
    const dragText = screen.getByText(/Drag & Drop file here or click upload/i);
    expect(dragText).toBeInTheDocument();
  });

  test('renders file details when a file is uploaded', () => {
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    render(<DropFileInput onFileChange={() => {}} reset={false} />);
    const input = screen.getByTestId('upload');
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('example.xlsx')).toBeInTheDocument();
    expect(screen.getByText(/KB/i)).toBeInTheDocument();
  });

  test('renders error icon when an unsupported file is uploaded', () => {
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    render(<DropFileInput onFileChange={() => {}} reset={false} />);
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
    render(<DropFileInput onFileChange={handleFileChange} reset={false} />);

    const dropArea = screen.getByText(/Drag & Drop file here or click upload/i).closest('div');

    if (dropArea) {
      fireEvent.dragOver(dropArea);
    }

    if (dropArea) {
      fireEvent.dragEnter(dropArea);
    }

    if (dropArea) {
      fireEvent.drop(dropArea, {
        dataTransfer: {
          files: [file]
        }
      });
    }

    expect(screen.getByText('example.xlsx')).toBeInTheDocument();
    expect(handleFileChange).toHaveBeenCalledWith({ target: { files: [file] } });
  });
  test('triggers file input click when upload button is clicked', () => {
    render(<DropFileInput onFileChange={() => {}} reset={false} />);

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
    render(<DropFileInput onFileChange={handleFileChange} reset={false} />);

    const fileInput = screen.getByTestId('upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('example.xlsx')).toBeInTheDocument();
    expect(handleFileChange).toHaveBeenCalledWith({ target: { files: [file] } });
  });

  test('adds and removes dragover class on drag events', () => {
    render(<DropFileInput onFileChange={() => {}} reset={false} />);

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

  test('adds dragover class on drag enter and removes on drag leave', () => {
    render(<DropFileInput onFileChange={() => {}} reset={false} />);

    const dropArea = screen.getByTestId('drop-area');

    fireEvent.dragEnter(dropArea);
    expect(dropArea).toHaveClass('dragover');

    fireEvent.dragLeave(dropArea);
    expect(dropArea).not.toHaveClass('dragover');
  });

  test('removes dragover class on drop', () => {
    render(<DropFileInput onFileChange={() => {}} reset={false} />);

    const dropArea = screen.getByTestId('drop-area');

    fireEvent.dragEnter(dropArea);
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

  test('handles file input change with a valid file', () => {
    const handleFileChange = jest.fn();
    render(<DropFileInput onFileChange={handleFileChange} reset={false} />);

    const fileInput = screen.getByTestId('upload');
    const file = new File(['dummy content'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('example.xlsx')).toBeInTheDocument();
    expect(handleFileChange).toHaveBeenCalledWith({ target: { files: [file] } });
  });

  test('handles file input change with an invalid file', () => {
    render(<DropFileInput onFileChange={() => {}} reset={false} />);

    const fileInput = screen.getByTestId('upload');
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('example.txt')).toBeInTheDocument();
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
  });

  test('alerts when no file is selected', () => {
    window.alert = jest.fn();
    render(<DropFileInput onFileChange={() => {}} reset={false} />);

    const fileInput = screen.getByTestId('upload');
    fireEvent.change(fileInput, { target: { files: [] } });

    expect(window.alert).toHaveBeenCalledWith('Please select a file');
  });
});
