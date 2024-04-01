import { getBrands, getCategories, getData, getSubsectors } from './api';

jest.mock('./apiUtils', () => ({
  performApiRequest: jest.fn()
}));

describe('getData function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches tableData from the API successfully', async () => {
    const mockApiResponse = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];
    require('./apiUtils').performApiRequest.mockResolvedValue(mockApiResponse);

    const data = await getData();

    expect(require('./apiUtils').performApiRequest).toHaveBeenCalledWith('/tabledata');

    expect(data).toEqual(mockApiResponse);
  });

  test('throws an error if API request fails', async () => {
    const errorMessage = 'Failed to fetch data';
    require('./apiUtils').performApiRequest.mockRejectedValue(new Error(errorMessage));

    await expect(getData()).rejects.toThrow(errorMessage);
  });
});

describe('getCategories function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches tableData from the API successfully', async () => {
    const mockApiResponse = [
      { id: 1, category: 'category 1' },
      { id: 2, category: 'category 2' }
    ];
    require('./apiUtils').performApiRequest.mockResolvedValue(mockApiResponse);

    const data = await getCategories();

    expect(require('./apiUtils').performApiRequest).toHaveBeenCalledWith('/category');

    expect(data).toEqual(mockApiResponse);
  });

  test('throws an error if API request fails', async () => {
    const errorMessage = 'Failed to fetch users';
    require('./apiUtils').performApiRequest.mockRejectedValue(new Error(errorMessage));

    await expect(getCategories()).rejects.toThrow(errorMessage);
  });
});

describe('getBrands function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches getBrands from the API successfully', async () => {
    const mockApiResponse = [
      { id: 1, brand: 'brand 1' },
      { id: 2, brand: 'brand 2' }
    ];
    require('./apiUtils').performApiRequest.mockResolvedValue(mockApiResponse);

    const data = await getBrands();

    expect(require('./apiUtils').performApiRequest).toHaveBeenCalledWith('/brand');

    expect(data).toEqual(mockApiResponse);
  });

  test('throws an error if API request fails', async () => {
    const errorMessage = 'Failed to fetch data';
    require('./apiUtils').performApiRequest.mockRejectedValue(new Error(errorMessage));

    await expect(getBrands()).rejects.toThrow(errorMessage);
  });
});

describe('getSubsectors function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches getSubsectors from the API successfully', async () => {
    const mockApiResponse = [
      { id: 1, subsector: 'subsector 1' },
      { id: 2, subsector: 'subsector 2' }
    ];
    require('./apiUtils').performApiRequest.mockResolvedValue(mockApiResponse);

    const data = await getSubsectors();

    expect(require('./apiUtils').performApiRequest).toHaveBeenCalledWith('/subsector');

    expect(data).toEqual(mockApiResponse);
  });

  test('throws an error if API request fails', async () => {
    const errorMessage = 'Failed to fetch data';
    require('./apiUtils').performApiRequest.mockRejectedValue(new Error(errorMessage));

    await expect(getSubsectors()).rejects.toThrow(errorMessage);
  });
});
