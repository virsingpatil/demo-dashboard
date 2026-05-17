'use client';

import { useState } from 'react';
import type { NewLeadFormData, TripType, VehicleType } from '@/types/leads';
import { CloseIcon, ChevronDownIcon } from '@/components/ui/Icons';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewLeadFormData) => void;
}

const defaultForm: NewLeadFormData = {
  customerType: 'NEW',
  customerName: '',
  contactNumber: '',
  inquiryDate: '',
  tripType: 'Outstation',
  vehicleType: '12-seater',
  pickupLocation: '',
  destinationCity: '',
  returnDate: '',
  estimatedKms: '',
  additionalRequirements: '',
};

export default function NewLeadModal({ isOpen, onClose, onSave }: NewLeadModalProps) {
  const [form, setForm] = useState<NewLeadFormData>(defaultForm);

  if (!isOpen) return null;

  const isOutstation = form.tripType === 'Outstation';

  function handleChange(field: keyof NewLeadFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
    setForm(defaultForm);
    onClose();
  }

  function handleClose() {
    setForm(defaultForm);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Lead</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Customer Name</label>
            <div className="flex gap-2 mb-2">
              {(['NEW', 'EXISTING'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange('customerType', type)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                    form.customerType === type
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder={form.customerType === 'NEW' ? 'Enter full name' : 'Search or enter full name'}
                value={form.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact Number</label>
              <input
                type="tel"
                placeholder="+91 0000000000"
                value={form.contactNumber}
                onChange={(e) => handleChange('contactNumber', e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Inquiry Date</label>
              <input
                type="date"
                value={form.inquiryDate}
                onChange={(e) => handleChange('inquiryDate', e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Trip Type</label>
              <div className="relative">
                <select
                  value={form.tripType}
                  onChange={(e) => handleChange('tripType', e.target.value as TripType)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent pr-8"
                >
                  <option value="Outstation">Outstation</option>
                  <option value="Local">Local</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Vehicle Type</label>
              <div className="relative">
                <select
                  value={form.vehicleType}
                  onChange={(e) => handleChange('vehicleType', e.target.value as VehicleType)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent pr-8"
                >
                  <option value="12-seater">12-seater</option>
                  <option value="17-seater">17-seater</option>
                  <option value="7-seater">7-seater</option>
                  <option value="4-seater">4-seater</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {isOutstation && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pickup Location</label>
                <input
                  type="text"
                  placeholder="Area, Landmark"
                  value={form.pickupLocation ?? ''}
                  onChange={(e) => handleChange('pickupLocation', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Destination City</label>
                <input
                  type="text"
                  placeholder="City name"
                  value={form.destinationCity ?? ''}
                  onChange={(e) => handleChange('destinationCity', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {isOutstation && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Return Date</label>
                <input
                  type="date"
                  value={form.returnDate ?? ''}
                  onChange={(e) => handleChange('returnDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Estimated Kms</label>
                <input
                  type="number"
                  placeholder="Approx. distance"
                  value={form.estimatedKms ?? ''}
                  onChange={(e) => handleChange('estimatedKms', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Additional Requirements</label>
            <textarea
              rows={3}
              placeholder="Special requests, luggage info, etc."
              value={form.additionalRequirements ?? ''}
              onChange={(e) => handleChange('additionalRequirements', e.target.value)}
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
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
