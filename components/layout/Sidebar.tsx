'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DashboardIcon,
  LeadsIcon,
  QuotationsIcon,
  VehiclesIcon,
  CustomersIcon,
  HelpIcon,
  LogoutIcon,
  PlusIcon,
  CloseIcon,
} from '@/components/ui/Icons';
import { useLeadModal } from '@/context/LeadModalContext';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { label: 'Leads', href: '/dashboard/leads', icon: LeadsIcon },
  { label: 'Quotations', href: '/dashboard/quotations', icon: QuotationsIcon },
  { label: 'Vehicles', href: '/dashboard/vehicles', icon: VehiclesIcon },
  { label: 'Customers', href: '/dashboard/customers', icon: CustomersIcon },
];

interface SidebarProps {
  projectName?: string;
  projectSubtitle?: string;
  onClose?: () => void;
}

export default function Sidebar({
  projectName = 'Demo Project',
  projectSubtitle = 'Fleet Management',
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { openNewLead } = useLeadModal();

  return (
    <aside className="w-44 h-full bg-indigo-50 flex flex-col">
      {/* Logo / Project name */}
      <div className="px-5 pt-6 pb-5 flex items-start justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-indigo-900 leading-tight">{projectName}</h1>
          <p className="text-xs text-indigo-400 mt-0.5">{projectSubtitle}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-indigo-400 hover:text-indigo-700 -mr-1 -mt-0.5"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-white text-indigo-700 font-semibold shadow-sm border-l-[3px] border-indigo-600'
                  : 'text-indigo-500 hover:bg-indigo-100 hover:text-indigo-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* New Inquiry button */}
      <div className="px-3 py-4">
        <button
          onClick={() => { openNewLead(); onClose?.(); }}
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          New Inquiry
        </button>
      </div>

      {/* Footer */}
      <div className="px-2 pb-4 space-y-0.5">
        <button className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-sm text-indigo-500 hover:bg-indigo-100 hover:text-indigo-800 transition-colors">
          <HelpIcon className="w-4 h-4" />
          Help
        </button>
        <button className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-sm text-indigo-500 hover:bg-indigo-100 hover:text-indigo-800 transition-colors">
          <LogoutIcon className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
