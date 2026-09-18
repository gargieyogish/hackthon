export interface CustomerApplicationData {
  customerName: string;
  mobileNumber: string;
  pinCode: string;
  fullAddress: string;
  propertyId: string;
  certificateNumber: string;
  certificateType: string;
  issueDate: string;
  status: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  name: string;
  size?: number;
  timestamp: string;
}

export type FormErrors = Partial<Record<keyof CustomerApplicationData, string>> & {
  photos?: string;
};

export type ApplicationStage = 'Submitted' | 'Under Review' | 'Inspection' | 'Certificate';

export interface SubmittedApplication {
  applicationId: string;
  submittedAt: string;
  status: ApplicationStage;
  data: CustomerApplicationData;
  photos: PhotoItem[];
}

export type NavItemKey = 'customer-panel' | 'applications' | 'certificates' | 'notifications' | 'help';
