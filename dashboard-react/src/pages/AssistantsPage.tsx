import { Plus, Bot, Phone, MessageSquare } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

const assistants = [
  {
    id: '1',
    name: 'Debt Collection',
    description: 'Automated debt recovery calls with payment promise extraction',
    type: 'debt-collection',
    status: 'active',
    calls: 847,
    successRate: 78,
    language: 'Romanian',
    voice: 'Carmen (Female)',
  },
  {
    id: '2',
    name: 'Sales Outreach',
    description: 'Proactive sales calls for service upgrades and renewals',
    type: 'sales-outreach',
    status: 'active',
    calls: 234,
    successRate: 45,
    language: 'Romanian',
    voice: 'Andrei (Male)',
  },
  {
    id: '3',
    name: 'Customer Support',
    description: 'Handle inbound support inquiries and FAQs',
    type: 'support',
    status: 'draft',
    calls: 0,
    successRate: 0,
    language: 'Romanian',
    voice: 'Maria (Female)',
  },
];

export function AssistantsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Assistants</h1>
          <p className="text-sm text-slate-500 mt-0.5">Configure and manage voice AI agents</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium transition">
          <Plus className="w-4 h-4" />
          New Assistant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-sm transition-shadow"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-700 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <Badge variant={assistant.status === 'active' ? 'success' : 'default'}>
                  {assistant.status}
                </Badge>
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-1">{assistant.name}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{assistant.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {assistant.calls.toLocaleString()} calls
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  {assistant.successRate}% success
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{assistant.language}</span>
                <span>•</span>
                <span>{assistant.voice}</span>
              </div>
            </div>
            <div className="border-t border-slate-100 px-4 py-3 bg-slate-50/50 flex justify-end gap-2">
              <button className="text-sm text-accent-600 hover:underline">Test</button>
              <button className="text-sm text-slate-600 hover:underline">Edit</button>
            </div>
          </div>
        ))}

        {/* Create new card */}
        <button className="bg-white rounded-lg border-2 border-dashed border-slate-200 p-4 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition min-h-[240px]">
          <Plus className="w-8 h-8 mb-2" />
          <span className="text-sm font-medium">Create Assistant</span>
        </button>
      </div>
    </div>
  );
}
