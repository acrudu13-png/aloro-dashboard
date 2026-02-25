import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ro-RO', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    completed: 'bg-green-50 text-green-700',
    active: 'bg-green-50 text-green-700',
    online: 'bg-green-50 text-green-700',
    approved: 'bg-green-50 text-green-700',
    promise: 'bg-green-50 text-green-700',
    
    'no-answer': 'bg-slate-50 text-slate-600',
    draft: 'bg-slate-50 text-slate-600',
    pending: 'bg-amber-50 text-amber-700',
    connecting: 'bg-blue-50 text-blue-700',
    indexing: 'bg-blue-50 text-blue-700',
    
    failed: 'bg-red-50 text-red-600',
    offline: 'bg-red-50 text-red-600',
    rejected: 'bg-red-50 text-red-700',
    escalate: 'bg-red-50 text-red-600',
    error: 'bg-red-50 text-red-600',
    
    refused: 'bg-amber-50 text-amber-600',
    callback: 'bg-purple-50 text-purple-600',
    paused: 'bg-amber-50 text-amber-600',
    running: 'bg-blue-50 text-blue-600',
  };
  
  return colors[status] || 'bg-slate-50 text-slate-600';
}
