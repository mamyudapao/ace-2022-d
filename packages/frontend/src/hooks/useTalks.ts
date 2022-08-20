import { apiClient } from '@utils/api';
import { useApiHandled } from '@utils/swr';

export const useTalks = () => useApiHandled('/talks', apiClient.talks.getTalks);
