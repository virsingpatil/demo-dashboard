'use client';

import { useState, useMemo } from 'react';
import type { Lead, QuotationFormData } from '@/types/leads';
import { CloseIcon } from '@/components/ui/Icons';

interface ConvertQuotationModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSave: (lead: Lead, data: QuotationFormData) => void;
}

const defaultForm: QuotationFormData = {
  baseFare: '',
  ratePerKm: '',
  estimatedDistance: '',
  driverAllowance: '',
  tollParking: '',
  validUntil: '',
  additionalNotes: '',
};

function RupeeInput({
  label,
  value,
  onChange,
  placeholder = '0',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
        />
      </div>
    </div>
  );
}

export default function ConvertQuotationModal({ isOpen, lead, onClose, onSave }: ConvertQuotationModalProps) {
  const [form, setForm] = useState<QuotationFormData>(defaultForm);

  const totalQuote = useMemo(() => {
    const base = parseFloat(form.baseFare) || 0;
    const rate = parseFloat(form.ratePerKm) || 0;
    const dist = parseFloat(form.estimatedDistance) || 0;
    const driver = parseFloat(form.driverAllowance) || 0;
    const toll = parseFloat(form.tollParking) || 0;
    return base + rate * dist + driver + toll;
  }, [form.baseFare, form.ratePerKm, form.estimatedDistance, form.driverAllowance, form.tollParking]);

  if (!isOpen || !lead) return null;

  function handleChange(field: keyof QuotationFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(lead!, form);
    setForm(defaultForm);
    onClose();
  }

  function handleClose() {
    setForm(defaultForm);
    onClose();
  }

  const isOutstation = lead.tripType === 'Outstation';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Lead Summary</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-6 mb-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-bold text-indigo-900">{lead.customerName}</p>
              <p className="text-sm text-indigo-600 mt-0.5">
                {lead.tripType}
                {lead.inquiryDate && (
                  <span className="text-indigo-400"> • Requested {new Date(lead.inquiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                )}
              </p>
            </div>
            <span className="bg-indigo-700 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
              {lead.vehicleType}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Detailed Estimate ({isOutstation ? 'Outstation' : 'Local'})
          </p>

          <div className="grid grid-cols-2 gap-3">
            <RupeeInput label="Base Fare (INR)" value={form.baseFare} onChange={(v) => handleChange('baseFare', v)} />
            <RupeeInput label="Rate Per KM" value={form.ratePerKm} onChange={(v) => handleChange('ratePerKm', v)} placeholder="24" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Est. Distance (KM)</label>
              <input
                type="number"
                value={form.estimatedDistance}
                onChange={(e) => handleChange('estimatedDistance', e.target.value)}
                placeholder="350"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
            <RupeeInput label="Driver Allowance/Day" value={form.driverAllowance} onChange={(v) => handleChange('driverAllowance', v)} placeholder="500" />
          </div>

          <RupeeInput label="Toll & Parking (Estimate)" value={form.tollParking} onChange={(v) => handleChange('tollParking', v)} />

          <div className="flex items-center justify-between bg-indigo-50 rounded-lg px-4 py-3">
            <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wide">Total Estimated Quote</span>
            <span className="text-lg font-bold text-indigo-700">₹ {totalQuote.toFixed(2)}</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Valid Until</label>
            <input
              type="date"
              value={form.validUntil}
              onChange={(e) => handleChange('validUntil', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Additional Notes</label>
            <textarea
              rows={3}
              placeholder="Specify trip details, toll inclusion, etc."
              value={form.additionalNotes}
              onChange={(e) => handleChange('additionalNotes', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Save Quotation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
