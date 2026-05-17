import { BellIcon, SettingsIcon, SearchIcon } from '@/components/ui/Icons';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
      <span className="text-sm font-semibold text-gray-900">{title}</span>

      <div className="flex items-center gap-3">
        <div className="relative">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full w-48 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>

        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <BellIcon className="w-5 h-5" />
        </button>

        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <SettingsIcon className="w-5 h-5" />
        </button>

        <div className="w-8 h-8 rounded-full bg-indigo-100 overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
