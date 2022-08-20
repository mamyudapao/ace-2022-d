import { apiClient } from '@utils/api';
import { useApiHandled } from '@utils/swr';

export const useDatePlans = () =>
  useApiHandled('/constant/date_plans', apiClient.constant.getDatePlans);
