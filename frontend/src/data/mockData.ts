import type { CustomerApplicationData, PhotoItem } from '../types';

export const CERTIFICATE_TYPES = [
  'C&D Waste Clearance NOC',
  'Debris Transport Permit',
  'Building Demolition Waste NOC',
  'Site Clearance Certificate',
  'Commercial Waste Authorization',
];

export const STATUS_OPTIONS = [
  'Pending',
  'Under Review',
  'Approved',
  'Inspection Scheduled',
];

export const INITIAL_FORM_DATA: CustomerApplicationData = {
  customerName: '',
  mobileNumber: '',
  pinCode: '',
  fullAddress: '',
  propertyId: '',
  certificateNumber: '',
  certificateType: '',
  issueDate: '',
  status: 'Pending',
};

// Sample photo representing a verified Mysuru property matching the reference screenshot
export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'sample-photo-1',
    name: 'Mysuru-Site-01.jpg',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80',
    timestamp: '2026-09-18 10:30',
  },
];
