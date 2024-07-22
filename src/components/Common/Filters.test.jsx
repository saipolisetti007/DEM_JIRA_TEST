import { render, screen, fireEvent, act } from '@testing-library/react';
import Filters from './Filters';

describe('Filters Component', () => {
  const MOCK_OPTIONS = {
    subsector: ['Skin and Personal Care', 'Home Care', 'Fabric Care', 'Oral Care'],
    category: [
      'Auto Dish',
      'Whitening/Sensitivity',
      'Laundry',
      'Dental Floss',
      'AP/DO & Body Spray',
      'Fabric Enhancers'
    ],
    brand: ['Crest', 'Glide', 'Tide', 'Secret', 'Downy', 'Cascade'],
    brandForm: ['brandForm1', 'brandForm2', 'brandForm3', 'brandForm4'],
    sku: ['sku1', 'sku2', 'sku3', 'sku4'],
    active: ['Active', 'Cancelled']
  };

  let selectedFilters = {
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    active: []
  };

  const handleFilterChange = jest.fn((filterKey, values) => {
    selectedFilters = {
      ...selectedFilters,
      [filterKey]: values
    };
  });

  const formatFilterKey = (filterKey) => {
    const customLabels = {
      sku: 'SKU',
      active: 'Status'
    };
    return customLabels[filterKey] || filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
  };

  const getLabelRegex = (label) => new RegExp(`^${label}`);

  test('should display the correct label for each filter', async () => {
    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );
    const labels = ['Subsector', 'Category', 'Brand', 'Brand Form', 'SKU', 'Status'];
    for (const label of labels) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  test('should render placeholder when no filter options are provided', () => {
    render(
      <Filters
        isLoading={false}
        filterOptions={{}}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );
    expect(screen.queryAllByTestId('filter-form-control')).toHaveLength(0);
  });

  test('interaction with subsector filter', async () => {
    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );

    const filterKey = 'subsector';
    const label = formatFilterKey(filterKey);
    const select = screen.getByLabelText(label);

    await act(async () => {
      fireEvent.mouseDown(select);
    });

    const options = await screen.findAllByRole('option');
    if (options.length > 0) {
      await act(async () => {
        fireEvent.click(options[1]);
      });

      const selectedOption = options[1].textContent;
      const expectedSelections = [selectedOption];

      const lastCall = handleFilterChange.mock.calls[handleFilterChange.mock.calls.length - 1];
      expect(lastCall).toEqual([filterKey, expectedSelections]);

      expect(lastCall[1]).toEqual(expect.arrayContaining([selectedOption]));
    } else {
      expect(screen.queryByText('No options available')).not.toBeInTheDocument();
    }
  });

  test('interaction with category filter', async () => {
    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );

    const filterKey = 'category';
    const label = formatFilterKey(filterKey);
    const select = screen.getByLabelText(label);

    await act(async () => {
      fireEvent.mouseDown(select);
    });

    const options = await screen.findAllByRole('option');
    if (options.length > 0) {
      await act(async () => {
        fireEvent.click(options[1]);
      });

      const selectedOption = options[1].textContent;
      const expectedSelections = [selectedOption];

      const lastCall = handleFilterChange.mock.calls[handleFilterChange.mock.calls.length - 1];
      expect(lastCall).toEqual([filterKey, expectedSelections]);

      expect(lastCall[1]).toEqual(expect.arrayContaining([selectedOption]));
    } else {
      expect(screen.queryByText('No options available')).not.toBeInTheDocument();
    }
  });

  test('should not render tags', async () => {
    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );

    const filterKey = 'subsector';
    const label = formatFilterKey(filterKey);
    const select = screen.getByLabelText(label);

    await act(async () => {
      fireEvent.mouseDown(select);
    });

    const options = await screen.findAllByRole('option');
    if (options.length > 0) {
      await act(async () => {
        fireEvent.click(options[1]);
      });

      expect(screen.queryByRole('tag')).not.toBeInTheDocument();
    }
  });
  test('should select all options when "All" is selected', async () => {
    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );

    const filterKey = 'subsector';
    const label = formatFilterKey(filterKey);
    const select = screen.getByLabelText(getLabelRegex(label));

    await act(async () => {
      fireEvent.mouseDown(select);
    });

    const options = await screen.findAllByRole('option');
    const allOption = options.find((option) => option.textContent === 'All');

    if (allOption) {
      await act(async () => {
        fireEvent.click(allOption);
      });

      const expectedSelections = ['All', ...MOCK_OPTIONS[filterKey]];
      const lastCall = handleFilterChange.mock.calls[handleFilterChange.mock.calls.length - 1];
      expect(lastCall).toEqual([filterKey, expectedSelections]);
    } else {
      throw new Error('"All" option not found');
    }
  });

  test('should deselect "All" and select specific options', async () => {
    selectedFilters = {
      ...selectedFilters,
      subsector: ['All', ...MOCK_OPTIONS.subsector]
    };

    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );

    const filterKey = 'subsector';
    const label = formatFilterKey(filterKey);
    const select = screen.getByLabelText(getLabelRegex(label));

    await act(async () => {
      fireEvent.mouseDown(select);
    });

    const options = await screen.findAllByRole('option');
    const specificOption = options.find(
      (option) => option.textContent === MOCK_OPTIONS.subsector[0]
    );

    if (specificOption) {
      await act(async () => {
        fireEvent.click(specificOption);
      });

      const expectedSelections = MOCK_OPTIONS.subsector.filter(
        (option) => option !== specificOption.textContent
      );
      const lastCall = handleFilterChange.mock.calls[handleFilterChange.mock.calls.length - 1];
      expect(lastCall).toEqual([filterKey, expectedSelections]);
    } else {
      throw new Error('Specific option not found');
    }
  });

  test('should deselect all options when "All" is deselected', async () => {
    selectedFilters = {
      ...selectedFilters,
      subsector: ['All', ...MOCK_OPTIONS.subsector]
    };

    render(
      <Filters
        isLoading={false}
        filterOptions={MOCK_OPTIONS}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
    );

    const filterKey = 'subsector';
    const label = formatFilterKey(filterKey);
    const select = screen.getByLabelText(getLabelRegex(label));

    await act(async () => {
      fireEvent.mouseDown(select);
    });

    const options = await screen.findAllByRole('option');
    const allOption = options.find((option) => option.textContent === 'All');

    if (allOption) {
      await act(async () => {
        fireEvent.click(allOption);
      });

      const expectedSelections = [];
      const lastCall = handleFilterChange.mock.calls[handleFilterChange.mock.calls.length - 1];
      expect(lastCall).toEqual([filterKey, expectedSelections]);
    } else {
      throw new Error('"All" option not found');
    }
  });
});
