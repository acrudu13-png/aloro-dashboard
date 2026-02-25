import { Plus, Megaphone, Play, Pause } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

const campaigns = [
  {
    id: '1',
    name: 'Q1 Debt Recovery',
    assistant: 'Debt Collection',
    status: 'running',
    contacts: 1250,
    calls: 847,
    connected: 753,
    successRate: 78,
  },
  {
    id: '2',
    name: 'Service Renewal - February',
    assistant: 'Sales Outreach',
    status: 'paused',
    contacts: 500,
    calls: 234,
    connected: 198,
    successRate: 45,
  },
];

export function CampaignsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Campaigns</h1>
          <p className="text-sm text-slate-500 mt-0.5">Outbound campaign management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium transition">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white rounded-lg p-10 border border-slate-200 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Megaphone className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">No campaigns yet</h3>
          <p className="text-sm text-slate-500 mb-5">Create and manage outbound calling campaigns</p>
          <button className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="table-responsive">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assistant</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Connected</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Success</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24"></th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                          <Megaphone className="w-4 h-4 text-accent-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{campaign.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{campaign.assistant}</td>
                    <td className="py-3 px-4">
                      <Badge variant={campaign.status === 'running' ? 'success' : 'warning'}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full">
                          <div
                            className="h-2 bg-accent-500 rounded-full"
                            style={{ width: `${(campaign.calls / campaign.contacts) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">
                          {campaign.calls}/{campaign.contacts}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{campaign.connected}</td>
                    <td className="py-3 px-4 text-sm text-green-600 font-medium">{campaign.successRate}%</td>
                    <td className="py-3 px-4">
                      <button className="text-slate-400 hover:text-slate-600 p-1">
                        {campaign.status === 'running' ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
