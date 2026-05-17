'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface LeadModalContextValue {
  newLeadOpen: boolean;
  openNewLead: () => void;
  closeNewLead: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const openNewLead = useCallback(() => setNewLeadOpen(true), []);
  const closeNewLead = useCallback(() => setNewLeadOpen(false), []);

  return (
    <LeadModalContext value={{ newLeadOpen, openNewLead, closeNewLead }}>
      {children}
    </LeadModalContext>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error('useLeadModal must be used inside LeadModalProvider');
  return ctx;
}
