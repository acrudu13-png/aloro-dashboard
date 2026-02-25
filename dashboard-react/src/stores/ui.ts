import { create } from 'zustand';

type ModalType = 
  | 'assistant' 
  | 'campaign' 
  | 'knowledge-base' 
  | 'phone-number'
  | 'webhook'
  | 'whatsapp-sender'
  | 'whatsapp-template'
  | null;

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // Modals
  activeModal: ModalType;
  modalData: Record<string, unknown> | null;
  openModal: (modal: ModalType, data?: Record<string, unknown>) => void;
  closeModal: () => void;

  // Test chat panel
  testChatOpen: boolean;
  testChatAssistantId: string | null;
  openTestChat: (assistantId: string) => void;
  closeTestChat: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Sidebar
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),

  // Modals
  activeModal: null,
  modalData: null,
  openModal: (modal: ModalType, data?: Record<string, unknown>) => set({ activeModal: modal, modalData: data ?? null }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  // Test chat
  testChatOpen: false,
  testChatAssistantId: null,
  openTestChat: (assistantId) => set({ testChatOpen: true, testChatAssistantId: assistantId }),
  closeTestChat: () => set({ testChatOpen: false, testChatAssistantId: null }),
}));
