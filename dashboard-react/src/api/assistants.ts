import { apiClient } from './client';
import type { Assistant } from '../types';

export interface CreateAssistantDto {
  name: string;
  description?: string;
  type: Assistant['type'];
  language: string;
  voice: string;
  systemPrompt?: string;
  firstMessage?: string;
  temperature?: number;
  tools?: string[];
}

export interface UpdateAssistantDto extends Partial<CreateAssistantDto> {
  status?: Assistant['status'];
}

export const assistantsApi = {
  getAll: async () => {
    const { data } = await apiClient.get<Assistant[]>('/assistants');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Assistant>(`/assistants/${id}`);
    return data;
  },

  create: async (dto: CreateAssistantDto) => {
    const { data } = await apiClient.post<Assistant>('/assistants', dto);
    return data;
  },

  update: async (id: string, dto: UpdateAssistantDto) => {
    const { data } = await apiClient.patch<Assistant>(`/assistants/${id}`, dto);
    return data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/assistants/${id}`);
  },

  // Test assistant with a message
  test: async (id: string, message: string) => {
    const { data } = await apiClient.post<{ response: string }>(`/assistants/${id}/test`, {
      message,
    });
    return data;
  },
};
