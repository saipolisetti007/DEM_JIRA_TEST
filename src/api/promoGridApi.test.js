import { performApiRequest } from './apiUtils';
import {
  getData,
  addNewRowData,
  updateRowData,
  downloadDataExcel,
  uploadDataExcel,
  promoGridGetValidations,
  promoGridValidate,
  promoGridSubmit,
  cancelRowData,
  promoGridFilters,
  getUserProfile,
  getEvents,
  promoGridColumnCreate,
  promoGridColumnSettings,
  downloadBlankExcel,
  downloadSelectedDataExcel
} from './promoGridApi';

jest.mock('./apiUtils', () => ({
  performApiRequest: jest.fn()
}));

describe('promoGridApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('get data with no filters', async () => {
    const pageIndex = 0;
    const pageSize = 10;
    const filters = {};
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await getData(pageIndex, pageSize, filters);
    expect(result).toEqual(data);
    const url = `promo/promo-grid-list/?page=${pageIndex + 1}&page_size=${pageSize}`;
    expect(performApiRequest).toHaveBeenCalledWith(url, 'POST', {});
  });

  test('get data with array filters', async () => {
    const pageIndex = 0;
    const pageSize = 10;
    const filters = { brand: ['testBrand'], category: ['testCategory'] };
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await getData(pageIndex, pageSize, filters);
    expect(result).toEqual(data);
    const url = `promo/promo-grid-list/?page=${pageIndex + 1}&page_size=${pageSize}`;
    expect(performApiRequest).toHaveBeenCalledWith(url, 'POST', {
      brand: ['testBrand'],
      category: ['testCategory']
    });
  });

  test('get data with single value filters', async () => {
    const pageIndex = 0;
    const pageSize = 10;
    const filters = { brand: 'testBrand', category: 'testCategory' };
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await getData(pageIndex, pageSize, filters);
    expect(result).toEqual(data);
    const url = `promo/promo-grid-list/?page=${pageIndex + 1}&page_size=${pageSize}`;
    expect(performApiRequest).toHaveBeenCalledWith(url, 'POST', {
      brand: ['testBrand'],
      category: ['testCategory']
    });
  });

  test('adds new row data', async () => {
    const rowData = { id: 1, name: 'test' };
    performApiRequest.mockResolvedValueOnce(rowData);
    await addNewRowData(rowData);
    expect(performApiRequest).toHaveBeenCalledWith('promo/promo-grid-add/', 'POST', rowData);
  });

  test('updates row data', async () => {
    const rowData = { id: 1, name: 'test' };
    performApiRequest.mockResolvedValueOnce(rowData);
    await updateRowData(rowData);
    expect(performApiRequest).toHaveBeenCalledWith('promo/promo-grid-edit/', 'POST', rowData);
  });

  test('cancel row data', async () => {
    const rowData = { id: 1, name: 'test' };
    performApiRequest.mockResolvedValueOnce(rowData);
    await cancelRowData(rowData);
    expect(performApiRequest).toHaveBeenCalledWith('promo/promo-grid-cancel/', 'POST', rowData);
  });

  test('downloads Data Excel', async () => {
    const response = new Blob(['test'], { type: 'application/vnd.ms-excel' });
    performApiRequest.mockResolvedValueOnce(response);

    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();

    const createElementSpy = jest.spyOn(document, 'createElement');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    const filters = {};
    await downloadDataExcel(filters);

    expect(performApiRequest).toHaveBeenCalledWith(
      'promo/existing-data/download/',
      'POST',
      {
        brand: [],
        category: [],
        subsector: [],
        brandForm: [],
        active: [],
        sku: [],
        customerItemNumber: [],
        prodName: []
      },
      'blob'
    );
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  test('Upload Excel file', async () => {
    const formData = { key: 'value' };
    const mockResponse = { data: 'test', status: 200 };
    performApiRequest.mockResolvedValueOnce(mockResponse);
    const result = await uploadDataExcel(formData);
    expect(performApiRequest).toHaveBeenCalledWith(
      'promo/promo-grid-file-upload/',
      'POST',
      formData
    );
    expect(result).toEqual(mockResponse);
  });

  test('get promoGridGetValidations with promo header', async () => {
    const promoHeader = 13;
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await promoGridGetValidations(promoHeader);
    expect(result).toEqual(data);
    const url = `promo/promo-grid-validate/?promo_header=${promoHeader}`;
    expect(performApiRequest).toHaveBeenCalledWith(url);
  });

  test('promoGridValidate', async () => {
    const rowData = { id: 1, name: 'test' };
    performApiRequest.mockResolvedValueOnce(rowData);
    await promoGridValidate(rowData);
    expect(performApiRequest).toHaveBeenCalledWith('promo/promo-grid-validate/', 'POST', rowData);
  });

  test('promoGridSubmit', async () => {
    const promoHeader = 13;
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    await promoGridSubmit(promoHeader);
    expect(performApiRequest).toHaveBeenCalledWith('promo/promo-grid-submit/', 'POST', promoHeader);
  });

  test('get promo Grid Filters', async () => {
    const mockFilters = {
      subsector: ['Skin and Personal Care'],
      category: ['Auto Dish'],
      brand: ['Cascade'],
      brandForm: ['brandForm4'],
      sku: ['sku4']
    };
    performApiRequest.mockResolvedValueOnce(mockFilters);
    const result = await promoGridFilters();
    expect(result).toEqual(mockFilters);
    expect(performApiRequest).toHaveBeenCalledWith('promo/filter/', 'POST', {
      brand: [],
      category: [],
      subsector: [],
      brandForm: [],
      active: [],
      sku: [],
      customerItemNumber: [],
      prodName: []
    });
  });

  test('get User Profile ', async () => {
    const data = [{ username: 'test', customers: [1234567890] }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await getUserProfile();
    expect(result).toEqual(data);

    expect(performApiRequest).toHaveBeenCalledWith('user-profile');
  });

  test('get Events ', async () => {
    const customerId = 2000038335;
    const data = [
      {
        customer_id: 2000038335,
        events: {
          MVM: ['Single Item Discount', 'Regimen Discount', 'Future Value']
        }
      }
    ];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await getEvents(customerId);
    expect(result).toEqual(data);
    const url = `promo/event-types/?golden_customer_id=${customerId}`;
    expect(performApiRequest).toHaveBeenCalledWith(url);
  });

  test('downloads Data Excel with filters', async () => {
    const response = new Blob(['test'], { type: 'application/vnd.ms-excel' });
    performApiRequest.mockResolvedValueOnce(response);

    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();

    const mockAnchorElement = document.createElement('a');
    mockAnchorElement.setAttribute = jest.fn();
    mockAnchorElement.click = jest.fn();
    mockAnchorElement.href = '';

    const createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockAnchorElement);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    const filters = { brand: ['testBrand'], category: ['testCategory'] };
    await downloadDataExcel(filters);

    expect(performApiRequest).toHaveBeenCalledWith(
      'promo/existing-data/download/',
      'POST',
      {
        brand: ['testBrand'],
        category: ['testCategory'],
        subsector: [],
        brandForm: [],
        active: [],
        sku: [],
        customerItemNumber: [],
        prodName: []
      },
      'blob'
    );
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(mockAnchorElement);
    expect(removeChildSpy).toHaveBeenCalledWith(mockAnchorElement);
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  test('downloads blank Excel', async () => {
    const response = new Blob(['test'], { type: 'application/vnd.ms-excel' });
    performApiRequest.mockResolvedValueOnce(response);

    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();

    const mockAnchorElement = document.createElement('a');
    mockAnchorElement.setAttribute = jest.fn();
    mockAnchorElement.click = jest.fn();
    mockAnchorElement.href = '';

    const createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockAnchorElement);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    await downloadBlankExcel();

    expect(performApiRequest).toHaveBeenCalledWith(
      'promo/excel-template/download/',
      'GET',
      null,
      'blob'
    );
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(mockAnchorElement);
    expect(removeChildSpy).toHaveBeenCalledWith(mockAnchorElement);
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  test('downloads Data Excel with no filters', async () => {
    const response = new Blob(['test'], { type: 'application/vnd.ms-excel' });
    performApiRequest.mockResolvedValueOnce(response);

    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();

    const mockAnchorElement = document.createElement('a');
    mockAnchorElement.setAttribute = jest.fn();
    mockAnchorElement.click = jest.fn();
    mockAnchorElement.href = '';

    const createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockAnchorElement);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    await downloadDataExcel();

    expect(performApiRequest).toHaveBeenCalledWith(
      'promo/existing-data/download/',
      'POST',
      {
        brand: [],
        category: [],
        subsector: [],
        brandForm: [],
        active: [],
        sku: [],
        customerItemNumber: [],
        prodName: []
      },
      'blob'
    );
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(mockAnchorElement);
    expect(removeChildSpy).toHaveBeenCalledWith(mockAnchorElement);
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  test('get promoGridColumnSettings ', async () => {
    const mockSettings = {
      start_of_shipments: true,
      end_of_shipments: true
    };
    performApiRequest.mockResolvedValueOnce(mockSettings);
    const result = await promoGridColumnSettings();
    expect(result).toEqual(mockSettings);
    expect(performApiRequest).toHaveBeenCalledWith('promo/promo-grid-column-settings/', 'GET');
  });

  test('promoGridColumnCreate settings', async () => {
    const mockSettings = {
      start_of_shipments: true,
      end_of_shipments: true
    };
    performApiRequest.mockResolvedValueOnce(mockSettings);
    await promoGridColumnCreate(mockSettings);
    expect(performApiRequest).toHaveBeenCalledWith(
      'promo/promo-grid-column-settings/create/',
      'POST',
      mockSettings
    );
  });

  // New test case to cover downloadSelectedDataExcel
  test('downloads selected Data Excel', async () => {
    const response = new Blob(['test'], { type: 'application/vnd.ms-excel' });
    performApiRequest.mockResolvedValueOnce(response);

    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();

    const mockAnchorElement = document.createElement('a');
    mockAnchorElement.setAttribute = jest.fn();
    mockAnchorElement.click = jest.fn();
    mockAnchorElement.href = '';

    const createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockAnchorElement);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    const selectedEventIds = [1, 2, 3];
    await downloadSelectedDataExcel(selectedEventIds);

    expect(performApiRequest).toHaveBeenCalledWith(
      'promo/selected-data/download/',
      'POST',
      { events: selectedEventIds },
      'blob'
    );
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(mockAnchorElement);
    expect(removeChildSpy).toHaveBeenCalledWith(mockAnchorElement);
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
