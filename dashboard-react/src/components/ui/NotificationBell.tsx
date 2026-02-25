import { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Megaphone, MessageSquare, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'campaign' | 'whatsapp' | 'review';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'campaign',
    title: 'Campaign Completed',
    description: "Campaign 'Q1 Debt Recovery' has completed successfully",
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'whatsapp',
    title: 'Template Approved',
    description: 'New WhatsApp template "payment_reminder" has been approved',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'review',
    title: 'Calls Require Review',
    description: '3 calls have been flagged for human review',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'campaign',
    title: 'Campaign Started',
    description: "Campaign 'Service Renewal - February' has started",
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    type: 'whatsapp',
    title: 'New Message',
    description: 'You have 5 unread WhatsApp messages',
    time: 'Yesterday',
    read: true,
  },
];

const iconMap = {
  campaign: Megaphone,
  whatsapp: MessageSquare,
  review: AlertCircle,
};

const colorMap = {
  campaign: 'bg-green-100 text-green-600',
  whatsapp: 'bg-green-100 text-green-600',
  review: 'bg-amber-100 text-amber-600',
};

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-400 hover:text-slate-600 relative p-2 rounded-lg hover:bg-slate-100 transition"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-accent-600 hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                No notifications
              </div>
            ) : (
              notifications.map(notification => {
                const Icon = iconMap[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer ${
                      !notification.read ? 'bg-accent-50/50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorMap[notification.type]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm ${!notification.read ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
              <button
                onClick={clearAll}
                className="text-xs text-slate-500 hover:text-slate-700 transition"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
