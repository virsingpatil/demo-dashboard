'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { LeadModalProvider } from '@/context/LeadModalContext';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LeadModalProvider>
      <div className="flex h-screen bg-indigo-50/60 overflow-hidden">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — fixed drawer on mobile, static on lg+ */}
        <div
          className={`fixed inset-y-0 left-0 z-30 transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:z-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Demo Project" onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </LeadModalProvider>
  );
}
