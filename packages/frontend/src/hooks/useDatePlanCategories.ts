import { apiClient } from '@utils/api';
import { useApiHandled } from '@utils/swr';

export const useDatePlanCategories = () =>
  useApiHandled('/constant/date_plan_categories', apiClient.constant.getDatePlanCategories);
