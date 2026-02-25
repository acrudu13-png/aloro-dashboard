// Core types for the Aloro Dashboard

export interface KPIStats {
  totalCalls: number;
  connectedRate: number;
  resolutions: number;
  escalations: number;
  talkTime: string;
}

export interface Call {
  id: string;
  status: 'completed' | 'no-answer' | 'failed';
  phone: string;
  assistant: string;
  duration: string;
  outcome: 'promise' | 'escalate' | 'refused' | 'callback' | 'none';
  date: string;
  variables?: CallVariable[];
}

export interface CallVariable {
  name: string;
  value: string;
  type?: 'promise_date' | 'amount' | 'escalation_reason' | 'priority' | 'other';
}

export interface Assistant {
  id: string;
  name: string;
  description: string;
  type: 'debt-collection' | 'sales-outreach' | 'support' | 'custom';
  status: 'active' | 'draft' | 'archived';
  callsCount: number;
  successRate: number;
  language: string;
  voice: string;
}

export interface Campaign {
  id: string;
  name: string;
  assistant: string;
  status: 'running' | 'paused' | 'completed' | 'draft';
  totalContacts: number;
  callsMade: number;
  connectedCalls: number;
  successRate: number;
  createdAt: string;
}

export interface WhatsAppSender {
  id: string;
  number: string;
  displayName: string;
  type: 'platform' | 'cloud-api';
  status: 'online' | 'connecting' | 'pending' | 'offline';
  quality: 'high' | 'medium' | 'low';
  messagesCount: number;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'utility' | 'authentication' | 'marketing';
  language: string;
  status: 'approved' | 'pending' | 'rejected';
  sender: string;
}

export interface Conversation {
  id: string;
  source: 'whatsapp' | 'web' | 'sms';
  customerName: string;
  assistant: string;
  messagesCount: number;
  tokensUsed: number;
  lastMessage: string;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  documentsCount: number;
  lastUpdated: string;
  status: 'ready' | 'indexing' | 'error';
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'error';
  lastTriggered?: string;
}

export interface PhoneNumber {
  id: string;
  number: string;
  type: 'dedicated' | 'shared' | 'sip';
  assignedTo: string;
  status: 'active' | 'inactive';
  monthlyCost: string;
}

export interface PromiseDate {
  date: string;
  count: number;
  amount: string;
  isToday?: boolean;
}

export interface OutcomeStats {
  promiseToPay: number;
  partialPayment: number;
  refused: number;
  escalation: number;
  callBack: number;
  noResolution: number;
}
