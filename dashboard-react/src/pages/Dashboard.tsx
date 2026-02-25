import {
  Phone,
  PhoneOff,
  CheckCircle,
  UserPlus,
  Clock,
  PhoneCall,
} from 'lucide-react';
import { KPICard } from '../components/ui/KPICard';
import { Badge } from '../components/ui/Badge';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Mock data - will be replaced with API calls
const kpiData = [
  {
    title: 'Total Calls',
    value: '1,247',
    subtitle: 'vs last month',
    icon: Phone,
    iconBgColor: 'bg-accent-100',
    iconColor: 'text-accent-600',
    trend: { value: 12.5, isPositive: true },
  },
  {
    title: 'Connected',
    value: '89.2%',
    subtitle: 'connection rate',
    icon: PhoneCall,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    trend: { value: 2.3, isPositive: true },
  },
  {
    title: 'Resolutions',
    value: '89',
    subtitle: 'successful outcomes',
    icon: CheckCircle,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Pending Payments',
    value: '234',
    subtitle: 'awaiting follow-up',
    icon: Clock,
    iconBgColor: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Human Escalations',
    value: '18',
    subtitle: '2.0% needs follow-up',
    subtitleColor: 'text-amber-600',
    icon: UserPlus,
    iconBgColor: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    title: 'Talk Time',
    value: '53.2h',
    subtitle: 'This billing period',
    icon: PhoneOff,
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
];

const recentCalls = [
  {
    id: '1',
    status: 'completed',
    phone: '+40 744 987 654',
    assistant: 'Debt Collection',
    outcome: 'promise',
    date: 'Today, 11:15',
    variables: [
      { name: 'promise_date', value: 'Mar 5, 2026', type: 'promise_date' as const },
      { name: 'amount', value: '€245.00', type: 'amount' as const },
      { name: 'payment_method', value: 'Card', type: 'other' as const },
    ],
  },
  {
    id: '2',
    status: 'completed',
    phone: '+40 756 123 789',
    assistant: 'Debt Collection',
    outcome: 'escalate',
    date: 'Yesterday, 16:22',
    variables: [
      { name: 'escalation_reason', value: 'Legal threat', type: 'escalation_reason' as const },
      { name: 'amount', value: '€1,250.00', type: 'amount' as const },
      { name: 'priority', value: 'High', type: 'priority' as const },
    ],
  },
];

const callOutcomes = [
  { label: 'Promise to Pay', count: 234, color: 'bg-green-500', percent: 26.2, bgClass: 'bg-green-50' },
  { label: 'Escalate to Human', count: 18, color: 'bg-red-500', percent: 2.0, bgClass: 'bg-red-50' },
  { label: 'Refused / Dispute', count: 45, color: 'bg-amber-500', percent: 5.0, bgClass: 'bg-amber-50' },
  { label: 'No Resolution', count: 89, color: 'bg-slate-400', percent: 10.0, bgClass: 'bg-slate-50' },
];

const outcomeIcons: Record<string, { variant: 'success' | 'danger' | 'warning' | 'info' | 'default'; label: string }> = {
  promise: { variant: 'success', label: 'Promise' },
  escalate: { variant: 'danger', label: 'Escalate' },
  refused: { variant: 'warning', label: 'Refused' },
  callback: { variant: 'info', label: 'Call Back' },
  none: { variant: 'default', label: 'None' },
};

export function Dashboard() {
  const [expandedCall, setExpandedCall] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Call Volume Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-4 lg:p-5 border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Call Volume (Last 7 Days)</h2>
          <div className="h-40 flex items-end justify-between gap-2">
            {[60, 80, 45, 90, 70, 40, 20].map((height, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t ${
                  i === 4 ? 'bg-accent-500' : i === 6 ? 'bg-slate-100' : 'bg-accent-200'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Call Outcomes */}
        <div className="bg-white rounded-lg p-4 lg:p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">Call Outcomes</h2>
            <a href="#" className="text-xs text-accent-600 hover:underline">
              Details
            </a>
          </div>
          <div className="space-y-2">
            {callOutcomes.map((outcome, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-2.5 rounded-lg ${outcome.bgClass}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center`}
                  >
                    <div className={`w-2 h-2 rounded-full ${outcome.color}`} />
                  </div>
                  <span className="text-sm text-slate-700">{outcome.label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{outcome.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">Recent Calls</h2>
          <a href="#" className="text-accent-600 font-medium hover:underline text-sm">
            View all →
          </a>
        </div>
        <div className="table-responsive">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8"></th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Assistant
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Outcome
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call) => (
                <>
                  <tr
                    key={call.id}
                    className="border-b border-slate-50 cursor-pointer hover:bg-slate-50"
                    onClick={() => setExpandedCall(expandedCall === call.id ? null : call.id)}
                  >
                    <td className="py-3 px-4">
                      <ChevronRight
                        className={`w-3 h-3 text-slate-300 transition-transform ${
                          expandedCall === call.id ? 'rotate-90' : ''
                        }`}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="success">Completed</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">{call.phone}</td>
                    <td className="py-3 px-4 text-sm text-accent-600 font-medium">{call.assistant}</td>
                    <td className="py-3 px-4">
                      <Badge variant={outcomeIcons[call.outcome].variant}>
                        {outcomeIcons[call.outcome].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-500">{call.date}</td>
                  </tr>
                  {expandedCall === call.id && call.variables && (
                    <tr key={`${call.id}-details`} className="bg-slate-50">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="text-xs text-slate-500 mb-2 font-medium">
                          Extracted Variables:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {call.variables.map((v, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 border rounded text-xs ${
                                v.type === 'promise_date'
                                  ? 'bg-green-50 border-green-200 text-green-700'
                                  : v.type === 'escalation_reason'
                                  ? 'bg-red-50 border-red-200 text-red-700'
                                  : v.type === 'priority'
                                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <span className="text-slate-400">{v.name}:</span>{' '}
                              <span className="font-medium">{v.value}</span>
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
