import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from './DefaultPageHeader';

describe('PageHeader Component', () => {
  test('render Title and Subtitle', () => {
    render(<PageHeader title="Test Title" subtitle="Test Subtitle" />);
    const TitleElement = screen.getByText('Test Title');
    const SubtitleElement = screen.getByText('Test Subtitle');
    expect(TitleElement).toBeInTheDocument();
    expect(SubtitleElement).toBeInTheDocument();
  });
});
