export type TripType = 'Outstation' | 'Local';
export type VehicleType = '12-seater' | '17-seater' | '7-seater' | '4-seater';
export type LeadStatus = 'HOT' | 'NEW' | 'FOLLOW-UP' | 'CONVERTED';

export interface Lead {
  id: string;
  customerName: string;
  initials: string;
  contactNumber: string;
  inquiryDate: string;
  tripType: TripType;
  vehicleType: VehicleType;
  status: LeadStatus;
  pickupLocation?: string;
  destinationCity?: string;
  returnDate?: string;
  estimatedKms?: number;
  additionalRequirements?: string;
}

export interface NewLeadFormData {
  customerType: 'NEW' | 'EXISTING';
  customerName: string;
  contactNumber: string;
  inquiryDate: string;
  tripType: TripType;
  vehicleType: VehicleType;
  pickupLocation?: string;
  destinationCity?: string;
  returnDate?: string;
  estimatedKms?: string;
  additionalRequirements?: string;
}

export interface QuotationFormData {
  baseFare: string;
  ratePerKm: string;
  estimatedDistance: string;
  driverAllowance: string;
  tollParking: string;
  validUntil: string;
  additionalNotes: string;
}
