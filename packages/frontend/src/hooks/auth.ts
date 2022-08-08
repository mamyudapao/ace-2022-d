import { apiClient } from '@utils/api';
import { useApiHandled } from '@utils/swr';

export const useAuth = () => useApiHandled(apiClient.users.me);
