import { apiClient } from '@utils/api';
import { useApiHandled } from '@utils/swr';

export const useHobbies = () => useApiHandled('/constant/hobbies', apiClient.constant.getHobbies);
