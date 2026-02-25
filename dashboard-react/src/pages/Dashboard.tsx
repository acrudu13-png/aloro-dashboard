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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock data for charts - last 7 days
const chartData = [
  { name: 'Mon', callVolume: 145, outcomes: 128, talkTime: 42, answered: 138 },
  { name: 'Tue', callVolume: 198, outcomes: 175, talkTime: 58, answered: 185 },
  { name: 'Wed', callVolume: 112, outcomes: 98, talkTime: 31, answered: 105 },
  { name: 'Thu', callVolume: 223, outcomes: 201, talkTime: 67, answered: 215 },
  { name: 'Wed', callVolume: 178, outcomes: 156, talkTime: 52, answered: 168 },
  { name: 'Sat', callVolume: 89, outcomes: 78, talkTime: 24, answered: 82 },
  { name: 'Sun', callVolume: 45, outcomes: 38, talkTime: 12, answered: 40 },
];

// Call outcomes breakdown data
const outcomeData = [
  { name: 'Mon', promiseToPay: 38, humanEscalation: 3, refused: 7, noResolution: 12 },
  { name: 'Tue', promiseToPay: 52, humanEscalation: 5, refused: 9, noResolution: 15 },
  { name: 'Wed', promiseToPay: 29, humanEscalation: 2, refused: 5, noResolution: 10 },
  { name: 'Thu', promiseToPay: 61, humanEscalation: 4, refused: 11, noResolution: 18 },
  { name: 'Fri', promiseToPay: 48, humanEscalation: 3, refused: 8, noResolution: 14 },
  { name: 'Sat', promiseToPay: 24, humanEscalation: 1, refused: 3, noResolution: 7 },
  { name: 'Sun', promiseToPay: 12, humanEscalation: 0, refused: 2, noResolution: 4 },
];

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

type ChartLineKey = 'callVolume' | 'outcomes' | 'talkTime' | 'answered';
type OutcomeLineKey = 'promiseToPay' | 'humanEscalation' | 'refused' | 'noResolution';

export function Dashboard() {
  const [expandedCall, setExpandedCall] = useState<string | null>(null);
  const [activeLines, setActiveLines] = useState<ChartLineKey[]>(['callVolume', 'answered']);
  const [activeOutcomeLines, setActiveOutcomeLines] = useState<OutcomeLineKey[]>(['promiseToPay', 'humanEscalation']);

  const toggleLine = (key: ChartLineKey) => {
    setActiveLines(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const toggleOutcomeLine = (key: OutcomeLineKey) => {
    setActiveOutcomeLines(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const lineConfig: { key: ChartLineKey; label: string; color: string }[] = [
    { key: 'callVolume', label: 'Call Volume', color: '#3b82f6' },
    { key: 'answered', label: 'Answered Calls', color: '#10b981' },
    { key: 'talkTime', label: 'Talk Time (min)', color: '#8b5cf6' },
    { key: 'outcomes', label: 'Successful Outcomes', color: '#f59e0b' },
  ];

  const outcomeLineConfig: { key: OutcomeLineKey; label: string; color: string }[] = [
    { key: 'promiseToPay', label: 'Promise to Pay', color: '#10b981' },
    { key: 'humanEscalation', label: 'Human Escalation', color: '#ef4444' },
    { key: 'refused', label: 'Refused/Dispute', color: '#f59e0b' },
    { key: 'noResolution', label: 'No Resolution', color: '#94a3b8' },
  ];

  return (
    <div className="animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Call Volume Chart */}
        <div className="bg-white rounded-lg p-4 lg:p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">Call Metrics (Last 7 Days)</h2>
          </div>
          {/* Toggle buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {lineConfig.map(line => (
              <button
                key={line.key}
                onClick={() => toggleLine(line.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                  activeLines.includes(line.key)
                    ? 'border-transparent text-white'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                style={activeLines.includes(line.key) ? { backgroundColor: line.color } : {}}
              >
                {line.label}
              </button>
            ))}
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                {lineConfig.map(line =>
                  activeLines.includes(line.key) && (
                    <Line
                      key={line.key}
                      type="monotone"
                      dataKey={line.key}
                      name={line.label}
                      stroke={line.color}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  )
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Call Outcomes Breakdown */}
        <div className="bg-white rounded-lg p-4 lg:p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">Call Outcomes Breakdown</h2>
          </div>
          {/* Toggle buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {outcomeLineConfig.map(line => (
              <button
                key={line.key}
                onClick={() => toggleOutcomeLine(line.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                  activeOutcomeLines.includes(line.key)
                    ? 'border-transparent text-white'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                style={activeOutcomeLines.includes(line.key) ? { backgroundColor: line.color } : {}}
              >
                {line.label}
              </button>
            ))}
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={outcomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                {outcomeLineConfig.map(line =>
                  activeOutcomeLines.includes(line.key) && (
                    <Line
                      key={line.key}
                      type="monotone"
                      dataKey={line.key}
                      name={line.label}
                      stroke={line.color}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  )
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Outcome Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {callOutcomes.map((outcome, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-3 rounded-lg ${outcome.bgClass} border border-slate-100`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${outcome.color}`} />
              <span className="text-sm text-slate-700">{outcome.label}</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">{outcome.count}</span>
          </div>
        ))}
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
