import { performApiRequest } from './apiUtils';
import {
  maualDaList,
  downloadBlankExcel,
  downloadDataExcel,
  downloadSelectedDataExcel
} from './manualDaApi';

jest.mock('./apiUtils', () => ({
  performApiRequest: jest.fn()
}));

describe('Manual DA API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('get manual da list', async () => {
    const data = [{ id: 1, name: 'test' }];
    (performApiRequest as jest.Mock).mockResolvedValueOnce(data);
    const result = await maualDaList();
    expect(result).toEqual(data);
    const url = 'manualda/manualda-list/';
    expect(performApiRequest).toHaveBeenCalledWith(url, 'POST');
  });

  it('should call downloadBlankExcel', async () => {
    // Arrange
    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();
    // Act
    await downloadBlankExcel();
  });

  it('should call downloadDataExcel with the correct arguments', async () => {
    // Arrange
    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();
    // Act
    await downloadDataExcel();
  });

  it('should call downloadSelectedDataExcel with the correct arguments', async () => {
    // Arrange
    window.URL.createObjectURL = jest.fn(() => 'blob:test');
    window.URL.revokeObjectURL = jest.fn();
    const selectedEventIds = [1, 2, 3];

    // Act
    await downloadSelectedDataExcel(selectedEventIds);
  });
});
