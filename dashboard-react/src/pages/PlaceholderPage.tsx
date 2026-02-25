import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
        {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
      </div>
      
      <div className="bg-white rounded-lg p-10 border border-slate-200 text-center">
        <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <Construction className="w-6 h-6 text-slate-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">Coming Soon</h3>
        <p className="text-sm text-slate-500">
          This page is under development. Check back soon!
        </p>
      </div>
    </div>
  );
}
