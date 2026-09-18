import React, { useRef, useState } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  Home, 
  Building, 
  Camera, 
  Upload, 
  FileText, 
  Calendar, 
  RotateCcw, 
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import type { CustomerApplicationData, FormErrors, PhotoItem } from '../../types';
import { CERTIFICATE_TYPES, STATUS_OPTIONS } from '../../data/mockData';
import { StepHeader } from './StepHeader';
import { CameraModal } from '../modal/CameraModal';

interface ApplicationFormProps {
  formData: CustomerApplicationData;
  onChange: (field: keyof CustomerApplicationData, value: string) => void;
  photos: PhotoItem[];
  onAddPhoto: (photo: PhotoItem) => void;
  onReset: () => void;
  onSubmit: () => void;
  errors: FormErrors;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  formData,
  onChange,
  photos,
  onAddPhoto,
  onReset,
  onSubmit,
  errors,
}) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapturePhoto = (dataUrl: string) => {
    if (photos.length >= 5) {
      alert('You can only upload up to 5 photos.');
      return;
    }
    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: `Site-Photo-${photos.length + 1}.jpg`,
      url: dataUrl,
      timestamp: new Date().toLocaleTimeString(),
    };
    onAddPhoto(newPhoto);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - photos.length;
    if (remainingSlots <= 0) {
      alert('Maximum 5 photos allowed. Please remove a photo first.');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto: PhotoItem = {
            id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: file.name,
            size: file.size,
            url: event.target.result as string,
            timestamp: new Date().toLocaleTimeString(),
          };
          onAddPhoto(newPhoto);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-8 shadow-xs">
        {/* Hidden File Input for local uploads */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* 1. CUSTOMER DETAILS */}
        <div className="mb-8">
          <StepHeader step={1} title="Customer Details" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Customer Name <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => onChange('customerName', e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none ${
                    errors.customerName
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
              </div>
              {errors.customerName && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.customerName}</span>
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mobile Number <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => onChange('mobileNumber', e.target.value)}
                  placeholder="+91 98765 43210"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none ${
                    errors.mobileNumber
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Valid 10-digit mobile number
              </p>
              {errors.mobileNumber && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-0.5">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.mobileNumber}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 2. LOCATION DETAILS */}
        <div className="mb-8">
          <StepHeader step={2} title="Location Details" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* PIN Code */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                PIN Code <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pinCode}
                  onChange={(e) => onChange('pinCode', e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN code"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none ${
                    errors.pinCode
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                e.g. 570001
              </p>
              {errors.pinCode && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-0.5">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.pinCode}</span>
                </p>
              )}
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Address <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Home className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.fullAddress}
                  onChange={(e) => onChange('fullAddress', e.target.value)}
                  placeholder="House No., Street, Locality, City"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none ${
                    errors.fullAddress
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Include landmark for easy identification
              </p>
              {errors.fullAddress && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-0.5">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.fullAddress}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. PROPERTY DETAILS & 4. LIVE PHOTOS */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Section 3: Property Details */}
          <div className="lg:col-span-5">
            <StepHeader step={3} title="Property Details" />
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Property ID <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.propertyId}
                  onChange={(e) => onChange('propertyId', e.target.value)}
                  placeholder="Enter property ID"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none ${
                    errors.propertyId
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
              </div>
              {errors.propertyId && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.propertyId}</span>
                </p>
              )}
            </div>
          </div>

          {/* Section 4: Live Photos */}
          <div className="lg:col-span-7">
            <StepHeader step={4} title="Live Photos" />
            
            <div className="border border-slate-200/90 rounded-2xl p-4 bg-[#f8fdfb] flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-slate-900 leading-snug">
                    Capture Live Photo
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Use your camera to take a photo of the property
                  </p>
                </div>
              </div>

              {/* Action Buttons: Capture / or / Upload */}
              <div className="flex flex-wrap items-center gap-2.5 my-1">
                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Capture Photo</span>
                </button>

                <div className="flex items-center gap-2 px-1 text-slate-400 text-xs font-light">
                  <span className="w-3 h-[1px] bg-slate-300"></span>
                  <span>or</span>
                  <span className="w-3 h-[1px] bg-slate-300"></span>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium shadow-xs transition-all active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload Photo</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mt-2">
                You can add multiple photos (up to 5)
              </p>

              {errors.photos && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1.5">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.photos}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 5. CERTIFICATE DETAILS */}
        <div className="mb-8">
          <StepHeader step={5} title="Certificate Details" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Certificate Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Certificate Number <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={formData.certificateNumber}
                  onChange={(e) => onChange('certificateNumber', e.target.value)}
                  placeholder="Enter certificate number"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none ${
                    errors.certificateNumber
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
              </div>
              {errors.certificateNumber && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.certificateNumber}</p>
              )}
            </div>

            {/* Certificate Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Certificate Type <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.certificateType}
                  onChange={(e) => onChange('certificateType', e.target.value)}
                  className={`w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer ${
                    errors.certificateType
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  } ${!formData.certificateType ? 'text-slate-400' : 'text-slate-800'}`}
                >
                  <option value="">Select certificate type</option>
                  {CERTIFICATE_TYPES.map((type) => (
                    <option key={type} value={type} className="text-slate-800">
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              {errors.certificateType && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.certificateType}</p>
              )}
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Issue Date <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => onChange('issueDate', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer ${
                    errors.issueDate
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
              </div>
              {errors.issueDate && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.issueDate}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Status <span className="text-emerald-600">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => onChange('status', e.target.value)}
                  className={`w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border text-xs md:text-sm bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer ${
                    errors.status
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                >
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status} className="text-slate-800">
                      {status}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              {errors.status && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.status}</p>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs md:text-sm font-semibold shadow-md shadow-emerald-950/20 transition-all active:scale-95 hover:shadow-lg"
          >
            <span>Submit Application</span>
            <span className="text-base leading-none">→</span>
          </button>
        </div>
      </form>

      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCapturePhoto}
        onFallbackUpload={() => fileInputRef.current?.click()}
      />
    </>
  );
};
