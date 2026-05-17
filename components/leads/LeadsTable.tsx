import type { Lead } from '@/types/leads';
import StatusBadge from './StatusBadge';

interface LeadsTableProps {
  leads: Lead[];
  onConvert: (lead: Lead) => void;
}

export default function LeadsTable({ leads, onConvert }: LeadsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-150">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 md:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer Name</th>
              <th className="text-left px-4 md:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Inquiry Date</th>
              <th className="text-left px-4 md:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Trip Type</th>
              <th className="text-left px-4 md:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Vehicle Type</th>
              <th className="text-left px-4 md:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 md:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
                      {lead.initials}
                    </div>
                    <span className="font-medium text-gray-900 truncate max-w-25 sm:max-w-none">{lead.customerName}</span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 text-gray-600 hidden sm:table-cell">{lead.inquiryDate}</td>
                <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {lead.tripType}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-gray-600 hidden md:table-cell">{lead.vehicleType}</td>
                <td className="px-4 md:px-6 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 md:px-6 py-4 text-right">
                  <button
                    onClick={() => onConvert(lead)}
                    className="bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-medium px-2.5 md:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">Convert to Quotation</span>
                    <span className="sm:hidden">Convert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
