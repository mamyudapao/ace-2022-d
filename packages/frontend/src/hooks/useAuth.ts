import { apiClient } from '@utils/api';
import { useApiHandled } from '@utils/swr';

export const useAuth = () => useApiHandled('/users/@me', apiClient.users.me);
