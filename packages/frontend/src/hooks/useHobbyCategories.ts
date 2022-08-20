import { apiClient } from '@utils/api';
import { useApiHandled } from '@utils/swr';

export const useHobbyCategories = () =>
  useApiHandled('/constant/hobby_categories', apiClient.constant.getHobbyCategories);
