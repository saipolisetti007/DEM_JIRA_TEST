import { performApiRequest } from './apiUtils';
import {
  getData,
  addNewRowData,
  updateRowData,
  downloadBlankExcel,
  downloadDataExcel,
  uploadDataExcel
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
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await getData(pageIndex, pageSize);
    expect(result).toEqual(data);
    const url = `promo/promo-grid-list/?page=${pageIndex + 1}&page_size=${pageSize}`;
    expect(performApiRequest).toHaveBeenCalledWith(url);
  });

  test('adds new row data', async () => {
    const rowData = { id: 1, name: 'test' };
    performApiRequest.mockResolvedValueOnce(rowData);
    await addNewRowData(rowData);
    expect(performApiRequest).toHaveBeenCalledWith('promo/promo-grid-add/', 'POST', rowData);
  });

  test('updates row data', async () => {
    const id = 1;
    const rowData = { id: 1, name: 'test' };
    performApiRequest.mockResolvedValueOnce(rowData);
    await updateRowData(id, rowData);
    expect(performApiRequest).toHaveBeenCalledWith(`promodata/${id}`, 'PUT', rowData);
  });

  test('downloads blank Excel', async () => {
    const response = new Blob(['test'], { type: 'application/vnd.ms-excel' });
    performApiRequest.mockResolvedValueOnce(response);

    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();

    const createElementSpy = jest.spyOn(document, 'createElement');
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
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
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
});
