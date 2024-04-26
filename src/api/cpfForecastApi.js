import { performApiRequest } from './apiUtils';

export const cpfGetData = async () => {
  const response = await performApiRequest('cpf/pending-cpf-forecasts/');
  return response;
};

export const cpfPendingCount = async () => {
  const response = await performApiRequest('cpf/count-pending-approvals/');
  return response;
};

export const cpfDecisionAction = async (selections) => {
  await performApiRequest('cpf/cpf-decision/', 'POST', selections);
};
