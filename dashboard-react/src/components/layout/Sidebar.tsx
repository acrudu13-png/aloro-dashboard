import {
  LayoutDashboard,
  Phone,
  Megaphone,
  Bot,
  MessageSquare,
  Database,
  Settings,
  Webhook,
  Smartphone,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'calls', label: 'Calls', icon: Phone },
  { id: 'insights', label: 'Call Insights', icon: BarChart3 },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { id: 'assistants', label: 'Assistants', icon: Bot },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'knowledge-bases', label: 'Knowledge Bases', icon: Database },
  { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
  { id: 'web-widget', label: 'Web Widget', icon: MessageSquare },
  { id: 'phone-numbers', label: 'Phone Numbers', icon: Phone },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
];

const settingsItems = [
  { id: 'custom-dashboards', label: 'Custom Dashboards', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-14 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto z-50',
          'transition-transform duration-300',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Organization */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">Telerenta.ro</p>
              <p className="text-xs text-slate-500">Organization</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="p-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
            Main
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={cn(
                    'sidebar-item w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                    currentPage === item.id
                      ? 'bg-accent-50 text-accent-700 font-medium border-r-2 border-accent-500'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings */}
        <nav className="p-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
            Settings
          </p>
          <ul className="space-y-0.5">
            {settingsItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={cn(
                    'sidebar-item w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                    currentPage === item.id
                      ? 'bg-accent-50 text-accent-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
