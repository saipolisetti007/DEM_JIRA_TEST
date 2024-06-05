import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filters from './Filters';

describe('Filters Component', () => {
  const MOCK_OPTIONS = {
    subsector: ['All', 'Skin and Personal Care', 'Home Care', 'Fabric Care', 'Oral Care'],
    category: [
      'All',
      'Auto Dish',
      'Whitening/Sensitivity',
      'Laundry',
      'Dental Floss',
      'AP/DO & Body Spray',
      'Fabric Enhancers'
    ],
    brand: ['All', 'Crest', 'Glide', 'Tide', 'Secret', 'Downy', 'Cascade'],
    brandForm: ['All', 'brandForm1', 'brandForm2', 'brandForm3', 'brandForm4'],
    sku: ['All', 'sku1', 'sku2', 'sku3', 'sku4'],
    active: ['Active', 'Cancelled']
  };

  const selectedFilters = {
    subsector: '',
    category: '',
    brand: '',
    brandForm: '',
    sku: '',
    active: ''
  };

  const formatFilterKey = (filterKey) => {
    const customLabels = {
      sku: 'SKU',
      active: 'Status'
    };
    return customLabels[filterKey] || filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
  };

  test('should display the correct label for each filter', async () => {
    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={() => {}}
      />
    );
    const labels = ['Subsector', 'Category', 'Brand', 'BrandForm', 'SKU', 'Status'];
    for (const label of labels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  test('should render placeholder when no filter options are provided', () => {
    render(
      <Filters
        isLoading={false}
        filterOptions={{}}
        selectedFilters={selectedFilters}
        onFilterChange={() => {}}
      />
    );
    expect(screen.queryAllByTestId('filter-form-select-input')).toHaveLength(0);
  });

  test('should display all select inputs as disabled when isLoading is true', () => {
    render(
      <Filters
        isLoading={true}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={() => {}}
      />
    );
    const filterFormSelectInputs = screen.getAllByTestId('filter-form-select-input');
    filterFormSelectInputs.forEach((input) => {
      expect(input).toHaveClass('Mui-disabled');
    });
  });

  test('should handle no options for a filter correctly', async () => {
    const handleFilterChange = jest.fn();
    const updatedOptions = { ...MOCK_OPTIONS, subsector: [] };
    render(
      <Filters
        isLoading={false}
        filterOptions={updatedOptions}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );

    const select = screen.getByLabelText('Subsector');
    userEvent.click(select);

    await waitFor(() => {
      expect(screen.getByText('No options available')).toBeInTheDocument();
    });
  });

  test('full interaction with each filter', async () => {
    const handleFilterChange = jest.fn();
    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );

    for (const filterKey of Object.keys(MOCK_OPTIONS)) {
      const label = formatFilterKey(filterKey);
      const select = screen.getByLabelText(label);
      fireEvent.mouseDown(select);

      const options = await screen.findAllByRole('option');
      if (options.length > 0) {
        fireEvent.click(options[0]);
        expect(handleFilterChange).toHaveBeenCalledWith(filterKey, [MOCK_OPTIONS[filterKey][0]]);
      } else {
        expect(screen.queryByText('No options available')).not.toBeInTheDocument();
      }

      handleFilterChange.mockClear();
    }
  });
});
