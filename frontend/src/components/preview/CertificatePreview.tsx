import React from 'react';
import { FileText } from 'lucide-react';
import type { CustomerApplicationData } from '../../types';

interface CertificatePreviewProps {
  formData: CustomerApplicationData;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ formData }) => {
  const getStatusBadge = (status: string) => {
    if (!status || status === 'Pending') {
      return (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#fef3c7] text-[#b45309] border border-amber-300/60 shadow-xs">
          Pending
        </span>
      );
    }
    if (status === 'Approved') {
      return (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs">
          Approved
        </span>
      );
    }
    if (status === 'Under Review') {
      return (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
          Under Review
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">
        {status}
      </span>
    );
  };

  // Format date if provided as YYYY-MM-DD
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '—';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        // YYYY-MM-DD to DD-MM-YYYY
        if (parts[0].length === 4) {
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-4 h-4 text-emerald-600" />
        <h3 className="font-semibold text-xs md:text-sm text-slate-800">
          Certificate Details Preview
        </h3>
      </div>

      {/* Key-Value Box */}
      <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 space-y-3 text-xs md:text-sm">
        {/* Certificate No */}
        <div className="grid grid-cols-[110px_16px_1fr] items-center">
          <span className="text-slate-500 font-medium">Certificate No.</span>
          <span className="text-slate-400">:</span>
          <span className="text-slate-800 font-semibold truncate">
            {formData.certificateNumber.trim() || '—'}
          </span>
        </div>

        {/* Type */}
        <div className="grid grid-cols-[110px_16px_1fr] items-center">
          <span className="text-slate-500 font-medium">Type</span>
          <span className="text-slate-400">:</span>
          <span className="text-slate-800 font-semibold truncate">
            {formData.certificateType || '—'}
          </span>
        </div>

        {/* Issue Date */}
        <div className="grid grid-cols-[110px_16px_1fr] items-center">
          <span className="text-slate-500 font-medium">Issue Date</span>
          <span className="text-slate-400">:</span>
          <span className="text-slate-800 font-semibold">
            {formatDisplayDate(formData.issueDate)}
          </span>
        </div>

        {/* Status */}
        <div className="grid grid-cols-[110px_16px_1fr] items-center">
          <span className="text-slate-500 font-medium">Status</span>
          <span className="text-slate-400">:</span>
          <div>{getStatusBadge(formData.status)}</div>
        </div>
      </div>
    </div>
  );
};
