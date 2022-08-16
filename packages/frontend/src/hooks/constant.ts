import { apiClient } from '@utils/api';
import { useApiHandled } from '@utils/swr';

export const useDatePlans = () => useApiHandled(apiClient.constant.getDatePlans);
export const useDatePlanCategories = () => useApiHandled(apiClient.constant.getDatePlanCategories);

export const useHobbies = () => useApiHandled(apiClient.constant.getHobbies);
export const useHobbyCategories = () => useApiHandled(apiClient.constant.getHobbyCategories);
