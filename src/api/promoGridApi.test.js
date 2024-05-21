import { performApiRequest } from './apiUtils';
import {
  getData,
  addNewRowData,
  updateRowData,
  downloadBlankExcel,
  downloadDataExcel,
  uploadDataExcel,
  promoGridGetValidations,
  promoGridValidate,
  promoGridSubmit,
  cancelRowData
} from './promoGridApi';

jest.mock('./apiUtils', () => ({
  performApiRequest: jest.fn()
}));

jest.mock('../components/PromoGrid/promoGridSlice', () => ({
  addPromoData: jest.fn(),
  deletePromoData: jest.fn(),
  editPromoData: jest.fn()
}));

describe('promoGridApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('get data with correct parameters', async () => {
    const pageIndex = 0;
    const pageSize = 10;
    const filters = 'undefined'
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await getData(pageIndex, pageSize);
    expect(result).toEqual(data);
    const url = `promo/promo-grid-list/?page=${pageIndex + 1}&page_size=${pageSize}&${filters}`;
    expect(performApiRequest).toHaveBeenCalledWith(url);
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

    await downloadDataExcel();

    expect(performApiRequest).toHaveBeenCalledWith(
      'promo/existing-data/download/',
      'GET',
      null,
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
});
