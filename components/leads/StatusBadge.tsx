import type { LeadStatus } from '@/types/leads';

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  HOT: { label: 'HOT', className: 'bg-orange-100 text-orange-600 border border-orange-200' },
  NEW: { label: 'NEW', className: 'bg-green-100 text-green-600 border border-green-200' },
  'FOLLOW-UP': { label: 'FOLLOW-UP', className: 'bg-amber-100 text-amber-700 border border-amber-200' },
  CONVERTED: { label: 'CONVERTED', className: 'bg-indigo-100 text-indigo-700 border border-indigo-200' },
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
