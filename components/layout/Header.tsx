'use client';

import { BellIcon, SettingsIcon, SearchIcon } from '@/components/ui/Icons';

function HamburgerIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <HamburgerIcon className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold text-gray-900">{title}</span>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Search — hidden on small screens */}
        <div className="relative hidden sm:block">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full w-36 md:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>

        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <BellIcon className="w-5 h-5" />
        </button>

        <button className="hidden sm:block p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <SettingsIcon className="w-5 h-5" />
        </button>

        <div className="w-8 h-8 rounded-full shrink-0 bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
          U
        </div>
      </div>
    </header>
  );
}
