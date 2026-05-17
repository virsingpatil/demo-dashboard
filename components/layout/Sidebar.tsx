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
} from '@/components/ui/Icons';

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
  onNewInquiry?: () => void;
}

export default function Sidebar({
  projectName = 'Demo Project',
  projectSubtitle = 'Fleet Management',
  onNewInquiry,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-40 min-h-screen bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
      <div className="px-4 py-5 border-b border-gray-100">
        <h1 className="text-base font-bold text-gray-900 leading-tight">{projectName}</h1>
        <p className="text-xs text-gray-500 mt-0.5">{projectSubtitle}</p>
      </div>

      <nav className="flex-1 py-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium border-r-2 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <button
          onClick={onNewInquiry}
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          New Inquiry
        </button>
      </div>

      <div className="border-t border-gray-100 py-3">
        <button className="flex items-center gap-2.5 px-4 py-2 w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
          <HelpIcon className="w-4 h-4" />
          Help
        </button>
        <button className="flex items-center gap-2.5 px-4 py-2 w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
          <LogoutIcon className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
