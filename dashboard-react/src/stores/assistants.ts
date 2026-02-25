import { create } from 'zustand';
import type { Assistant } from '../types';

interface AssistantsState {
  assistants: Assistant[];
  selectedAssistant: Assistant | null;
  isLoading: boolean;
  error: string | null;
  
  setAssistants: (assistants: Assistant[]) => void;
  selectAssistant: (assistant: Assistant | null) => void;
  addAssistant: (assistant: Assistant) => void;
  updateAssistant: (id: string, data: Partial<Assistant>) => void;
  removeAssistant: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAssistantsStore = create<AssistantsState>((set) => ({
  assistants: [],
  selectedAssistant: null,
  isLoading: false,
  error: null,

  setAssistants: (assistants) => set({ assistants }),
  selectAssistant: (assistant) => set({ selectedAssistant: assistant }),
  addAssistant: (assistant) => set((state) => ({ 
    assistants: [...state.assistants, assistant] 
  })),
  updateAssistant: (id, data) => set((state) => ({
    assistants: state.assistants.map((a) => 
      a.id === id ? { ...a, ...data } : a
    ),
    selectedAssistant: state.selectedAssistant?.id === id 
      ? { ...state.selectedAssistant, ...data } 
      : state.selectedAssistant,
  })),
  removeAssistant: (id) => set((state) => ({
    assistants: state.assistants.filter((a) => a.id !== id),
    selectedAssistant: state.selectedAssistant?.id === id ? null : state.selectedAssistant,
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
