import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    const createButton = screen.getByRole('button', { name: 'Add New Record' });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveTextContent('Add New Record');
  });
  test('calls setCreatingRow function when create button is clicked', () => {
    const setCreatingRowMock = jest.fn();
    const table = { setCreatingRow: setCreatingRowMock };
    render(<PageHeader table={table} />);
    const createButton = screen.getByRole('button', { name: 'Add New Record' });
    fireEvent.click(createButton);
    expect(setCreatingRowMock).toHaveBeenCalled();
  });
});
