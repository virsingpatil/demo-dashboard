'use client';

import { useState } from 'react';
import type { Lead, NewLeadFormData, QuotationFormData } from '@/types/leads';
import { mockLeads, leadsStats } from '@/data/leads';
import LeadsStats from '@/components/leads/LeadsStats';
import LeadsTable from '@/components/leads/LeadsTable';
import NewLeadModal from '@/components/leads/NewLeadModal';
import ConvertQuotationModal from '@/components/leads/ConvertQuotationModal';
import { PlusIcon } from '@/components/ui/Icons';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const [quotationLead, setQuotationLead] = useState<Lead | null>(null);

  function handleSaveLead(data: NewLeadFormData) {
    const initials = data.customerName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newLead: Lead = {
      id: String(Date.now()),
      customerName: data.customerName,
      initials,
      contactNumber: data.contactNumber,
      inquiryDate: data.inquiryDate,
      tripType: data.tripType,
      vehicleType: data.vehicleType,
      status: 'NEW',
      pickupLocation: data.pickupLocation,
      destinationCity: data.destinationCity,
      returnDate: data.returnDate,
      estimatedKms: data.estimatedKms ? parseInt(data.estimatedKms) : undefined,
      additionalRequirements: data.additionalRequirements,
    };
    setLeads((prev) => [newLead, ...prev]);
  }

  function handleSaveQuotation(lead: Lead, _data: QuotationFormData) {
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: 'CONVERTED' } : l))
    );
  }

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track and convert your recent transportation inquiries.</p>
        </div>
        <button
          onClick={() => setNewLeadOpen(true)}
          className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Lead
        </button>
      </div>

      <LeadsStats
        totalLeads={leadsStats.totalLeads}
        hotLeads={leadsStats.hotLeads}
        conversionRate={leadsStats.conversionRate}
        totalLeadsChange={leadsStats.totalLeadsChange}
      />

      <LeadsTable leads={leads} onConvert={(lead) => setQuotationLead(lead)} />

      <NewLeadModal
        isOpen={newLeadOpen}
        onClose={() => setNewLeadOpen(false)}
        onSave={handleSaveLead}
      />

      <ConvertQuotationModal
        isOpen={quotationLead !== null}
        lead={quotationLead}
        onClose={() => setQuotationLead(null)}
        onSave={handleSaveQuotation}
      />
    </>
  );
}
