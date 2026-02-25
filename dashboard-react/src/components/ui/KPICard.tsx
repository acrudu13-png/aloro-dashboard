import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function KPICard({
  title,
  value,
  subtitle,
  subtitleColor,
  icon: Icon,
  iconBgColor = 'bg-accent-100',
  iconColor = 'text-accent-600',
  trend,
}: KPICardProps) {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-5 border border-slate-200 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', iconBgColor)}>
          <Icon className={cn('w-4 h-4', iconColor)} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
      {(subtitle || trend) && (
        <p className={cn('text-xs mt-1', subtitleColor || 'text-slate-400')}>
          {trend && (
            <span className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%{' '}
            </span>
          )}
          {subtitle}
        </p>
      )}
    </div>
  );
}
