import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageColumns from './ManageColumns';
import moment from 'moment';

// Mock for cookies
const mockSetCookie = jest.fn();
const mockGetCookie = jest.fn();

Object.defineProperty(document, 'cookie', {
  get: mockGetCookie,
  set: mockSetCookie,
  configurable: true
});

describe('ManageColumns', () => {
  const columns = [
    { id: 'cpf_id', header: 'CPF ID' },
    { id: 'golden_customer_id', header: 'Golden Customer  ID' }
  ];

  const initialVisibility = {
    cpf_id: true,
    golden_customer_id: false
  };

  const mockOnColumnVisibilityChange = jest.fn();

  beforeEach(() => {
    mockSetCookie.mockClear();
    mockGetCookie.mockClear();
  });

  test('renders correctly and menu visibility on button click', () => {
    mockGetCookie.mockReturnValueOnce(JSON.stringify(initialVisibility));

    render(
      <ManageColumns
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );

    const button = screen.getByText('Manage Columns');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument;
    expect(screen.getByLabelText('CPF ID')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF ID')).toBeChecked();
    expect(screen.getByLabelText('Golden Customer ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Golden Customer ID')).not.toBeChecked();

    fireEvent.click(button);
    expect(screen.queryByRole('memu')).not.toBeInTheDocument();
  });

  test('calls handleclose when menu islcosed', () => {
    const mockHanldeClose = jest.fn();
    mockGetCookie.mockReturnValueOnce(JSON.stringify(initialVisibility));

    render(
      <ManageColumns
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
        handleClose={mockHanldeClose}
      />
    );

    const button = screen.getByText('Manage Columns');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const menu = screen.getByRole('menu', { name: /Manage Columns/i });

    expect(menu).toBeInTheDocument;
    expect(screen.getByLabelText('CPF ID')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('closeMenu'));
  });

  test('updates column visibility and sets cookie on checkbox change', () => {
    render(
      <ManageColumns
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );
    const button = screen.getByText('Manage Columns');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    fireEvent.click(screen.getByLabelText('Golden Customer ID'));

    expect(mockOnColumnVisibilityChange).toHaveBeenCalledWith('golden_customer_id', true);
    const expectedVisibility = {
      cpf_id: true,
      golden_customer_id: true
    };
    const name = 'columnVisibility';
    const expectedCookieValue = JSON.stringify(expectedVisibility);
    const encodedcookieValue = encodeURIComponent(expectedCookieValue);
    const expires = moment().add(365, 'days');

    expect(mockSetCookie).toHaveBeenCalledWith(
      `${name}=${encodedcookieValue}; expires=${expires}; path=/`
    );
  });

  test('loads column visibility from cookies', () => {
    mockGetCookie.mockReturnValue(JSON.stringify(initialVisibility));
    render(
      <ManageColumns
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );

    const button = screen.getByText('Manage Columns');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockGetCookie).toHaveBeenCalledTimes(1);
  });

  test('does not render columns when menu is not open', () => {
    render(
      <ManageColumns
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );

    expect(screen.queryByLabelText('CPF ID')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Golden Customer  ID')).not.toBeInTheDocument();
  });
});
