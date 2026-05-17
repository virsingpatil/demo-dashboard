import { TrendUpIcon, ChartIcon } from '@/components/ui/Icons';

interface LeadsStatsProps {
  totalLeads: number;
  hotLeads: number;
  conversionRate: number;
  totalLeadsChange: string;
}

export default function LeadsStats({ totalLeads, hotLeads, conversionRate, totalLeadsChange }: LeadsStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Leads</p>
        <p className="text-4xl font-bold text-gray-900">{totalLeads}</p>
        <div className="flex items-center gap-1 mt-2">
          <TrendUpIcon className="w-3.5 h-3.5 text-green-500" />
          <span className="text-xs text-green-600 font-medium">{totalLeadsChange}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Hot Leads</p>
        <p className="text-4xl font-bold text-orange-500">{hotLeads}</p>
        <div className="mt-3 h-0.5 w-12 bg-orange-300 rounded" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Conversion Rate</p>
        <p className="text-4xl font-bold text-indigo-600">{conversionRate}%</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-center">
        <ChartIcon className="w-16 h-16 text-gray-200" />
      </div>
    </div>
  );
}
