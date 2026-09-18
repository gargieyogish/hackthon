import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { 
  CustomerApplicationData, 
  FormErrors, 
  PhotoItem, 
  SubmittedApplication, 
  NavItemKey 
} from './types';
import { INITIAL_FORM_DATA, INITIAL_PHOTOS } from './data/mockData';
import { Sidebar } from './components/sidebar/Sidebar';
import { TopHeader } from './components/header/TopHeader';
import { ApplicationForm } from './components/form/ApplicationForm';
import { LivePhotoPreview } from './components/preview/LivePhotoPreview';
import { CertificatePreview } from './components/preview/CertificatePreview';
import { ApplicationStatus } from './components/preview/ApplicationStatus';
import { OtherViews } from './components/views/OtherViews';
import { ToastContainer, type ToastMessage } from './components/common/Toast';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavItemKey>('customer-panel');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<CustomerApplicationData>(INITIAL_FORM_DATA);
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [errors, setErrors] = useState<FormErrors>({});

  // Submission State
  const [submission, setSubmission] = useState<SubmittedApplication | null>(null);

  // Toast System State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFieldChange = (field: keyof CustomerApplicationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddPhoto = (photo: PhotoItem) => {
    if (photos.length >= 5) {
      addToast({
        type: 'error',
        title: 'Limit Exceeded',
        description: 'Maximum 5 photos allowed per property verification.',
      });
      return;
    }
    setPhotos((prev) => [...prev, photo]);
    if (errors.photos) {
      setErrors((prev) => ({ ...prev, photos: undefined }));
    }
    addToast({
      type: 'success',
      title: 'Photo Uploaded',
      description: `Added ${photo.name} to live preview slots.`,
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'info',
      title: 'Photo Removed',
      description: 'The photo slot has been cleared.',
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Customer Details
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer Name is required';
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Name must be at least 2 characters';
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (cleanMobile.length !== 10 && !(cleanMobile.length === 12 && cleanMobile.startsWith('91'))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    // 2. Location Details
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
      newErrors.pinCode = 'PIN Code must be exactly 6 digits (e.g., 570001)';
    }

    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Full Address is required';
    }

    // 3. Property Details
    if (!formData.propertyId.trim()) {
      newErrors.propertyId = 'Property ID is required';
    }

    // 4. Live Photos
    if (photos.length === 0) {
      newErrors.photos = 'Please provide at least 1 live property photo';
    }

    // 5. Certificate Details
    if (!formData.certificateNumber.trim()) {
      newErrors.certificateNumber = 'Certificate Number is required';
    }
    if (!formData.certificateType) {
      newErrors.certificateType = 'Please select a certificate type';
    }
    if (!formData.issueDate) {
      newErrors.issueDate = 'Issue Date is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setPhotos([]);
    setErrors({});
    setSubmission(null);
    addToast({
      type: 'info',
      title: 'Form Reset',
      description: 'All fields and photo slots have been reset to blank state.',
    });
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      addToast({
        type: 'error',
        title: 'Validation Incomplete',
        description: 'Please review and fill in all mandatory fields marked with *.',
      });
      return;
    }

    // Generate dynamic MCC Application ID
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(100000 + Math.random() * 900000);
    const newAppId = `#MCC${year}${randomSeq}`;

    const newSubmission: SubmittedApplication = {
      applicationId: newAppId,
      submittedAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Submitted',
      data: { ...formData },
      photos: [...photos],
    };

    setSubmission(newSubmission);

    // Confetti effect
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#0d9488', '#f59e0b', '#ffffff'],
      });
    } catch {
      // ignore
    }

    addToast({
      type: 'success',
      title: 'Application Submitted!',
      description: `Reference ${newAppId} created and queued for MCC review.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7f6] text-slate-800">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 px-4 md:px-8 pb-10">
          {activeTab === 'customer-panel' ? (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Left Column: Application Form (approx 62%) */}
              <div className="xl:col-span-8">
                <ApplicationForm
                  formData={formData}
                  onChange={handleFieldChange}
                  photos={photos}
                  onAddPhoto={handleAddPhoto}
                  onReset={handleReset}
                  onSubmit={handleSubmit}
                  errors={errors}
                />
              </div>

              {/* Right Column: Previews & Status (approx 38%) */}
              <div className="xl:col-span-4 space-y-5">
                {/* 1. Live Photo Preview Card (Dark Theme) */}
                <LivePhotoPreview
                  photos={photos}
                  onRemovePhoto={handleRemovePhoto}
                  maxPhotos={5}
                />

                {/* 2. Certificate Details Preview Card (Light Theme) */}
                <CertificatePreview formData={formData} />

                {/* 3. Application Status Card */}
                <ApplicationStatus submission={submission} />
              </div>
            </div>
          ) : (
            <OtherViews
              activeTab={activeTab}
              onNavigateToForm={() => setActiveTab('customer-panel')}
            />
          )}
        </main>
      </div>

      {/* Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default App;
