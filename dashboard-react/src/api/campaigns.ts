import { apiClient } from './client';
import type { Campaign } from '../types';

export interface CreateCampaignDto {
  name: string;
  assistantId: string;
  contactListId?: string;
  schedule?: {
    startDate: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    daysOfWeek?: number[];
  };
  retryPolicy?: {
    maxAttempts: number;
    retryIntervalMinutes: number;
  };
}

export const campaignsApi = {
  getAll: async () => {
    const { data } = await apiClient.get<Campaign[]>('/campaigns');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Campaign>(`/campaigns/${id}`);
    return data;
  },

  create: async (dto: CreateCampaignDto) => {
    const { data } = await apiClient.post<Campaign>('/campaigns', dto);
    return data;
  },

  update: async (id: string, dto: Partial<CreateCampaignDto>) => {
    const { data } = await apiClient.patch<Campaign>(`/campaigns/${id}`, dto);
    return data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/campaigns/${id}`);
  },

  start: async (id: string) => {
    const { data } = await apiClient.post<Campaign>(`/campaigns/${id}/start`);
    return data;
  },

  pause: async (id: string) => {
    const { data } = await apiClient.post<Campaign>(`/campaigns/${id}/pause`);
    return data;
  },

  getStats: async (id: string) => {
    const { data } = await apiClient.get(`/campaigns/${id}/stats`);
    return data;
  },
};
