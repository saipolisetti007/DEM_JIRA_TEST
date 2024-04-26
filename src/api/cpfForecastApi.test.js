import { performApiRequest } from './apiUtils';
import { cpfDecisionAction, cpfGetData, cpfPendingCount } from './cpfForecastApi';

jest.mock('./apiUtils', () => ({
  performApiRequest: jest.fn()
}));

describe('promoGridApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('get data with correct parameters', async () => {
    const data = [{ id: 1, product_id: 1 }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfGetData();
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/pending-cpf-forecasts/');
  });

  test('get pending products count', async () => {
    const data = [{ pending_approvals_count: 4 }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfPendingCount();
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/count-pending-approvals/');
  });

  test('Approve Reject Selections', async () => {
    const selections = { 1: 'approve' };
    performApiRequest.mockResolvedValueOnce(selections);
    await cpfDecisionAction(selections);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/cpf-decision/', 'POST', selections);
  });
});
