import { apiClient } from './client';
import type { Call, KPIStats, OutcomeStats, PromiseDate } from '../types';

export const callsApi = {
  // Get paginated calls list
  getCalls: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    outcome?: string;
    assistantId?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const { data } = await apiClient.get<{ calls: Call[]; total: number }>('/calls', { params });
    return data;
  },

  // Get single call details
  getCall: async (id: string) => {
    const { data } = await apiClient.get<Call>(`/calls/${id}`);
    return data;
  },

  // Get call statistics
  getStats: async (params?: { startDate?: string; endDate?: string }) => {
    const { data } = await apiClient.get<KPIStats>('/calls/stats', { params });
    return data;
  },

  // Get outcome distribution
  getOutcomeStats: async (params?: { startDate?: string; endDate?: string }) => {
    const { data } = await apiClient.get<OutcomeStats>('/calls/outcomes', { params });
    return data;
  },

  // Get upcoming promise dates
  getPromiseDates: async () => {
    const { data } = await apiClient.get<PromiseDate[]>('/calls/promise-dates');
    return data;
  },

  // Get call volume by day
  getCallVolume: async (days?: number) => {
    const { data } = await apiClient.get<{ date: string; count: number }[]>('/calls/volume', {
      params: { days },
    });
    return data;
  },
};
