import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  CheckCheck, 
  FileText, 
  Clock, 
  Search, 
  Award 
} from 'lucide-react';
import type { SubmittedApplication } from '../../types';

interface ApplicationStatusProps {
  submission: SubmittedApplication | null;
}

export const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ submission }) => {
  const [copied, setCopied] = useState(false);

  // Default sample id matching reference image if not yet submitted
  const defaultAppId = '#MCC2026001234';
  const displayId = submission ? submission.applicationId : defaultAppId;
  const displayDate = submission ? submission.submittedAt : '21 Aug 2026';

  const handleCopy = () => {
    navigator.clipboard.writeText(displayId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { 
      key: 'submitted', 
      label: 'Submitted', 
      date: displayDate, 
      icon: FileText, 
      isCompleted: true 
    },
    { 
      key: 'review', 
      label: 'Under Review', 
      icon: Clock, 
      isCompleted: submission?.status === 'Under Review' || submission?.status === 'Inspection' || submission?.status === 'Certificate' 
    },
    { 
      key: 'inspection', 
      label: 'Inspection', 
      icon: Search, 
      isCompleted: submission?.status === 'Inspection' || submission?.status === 'Certificate' 
    },
    { 
      key: 'certificate', 
      label: 'Certificate', 
      icon: Award, 
      isCompleted: submission?.status === 'Certificate' 
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-5 shadow-sm transition-all duration-300">
      {/* Success Title Header */}
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-emerald-700/30">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
        <div>
          <h3 className="font-bold text-xs md:text-sm text-slate-900 leading-tight">
            Application Submitted Successfully!
          </h3>
          <p className="text-[11px] md:text-xs text-slate-500 mt-1 leading-snug">
            Your application has been received. Please save your Application ID for future reference.
          </p>
        </div>
      </div>

      {/* Dark Civic ID Box */}
      <div className="bg-[#051c19] border border-[#0d342f] rounded-xl px-4 py-3 mt-4 flex items-center justify-between shadow-inner">
        <div>
          <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
            Application ID
          </div>
          <div className="font-mono font-bold text-white text-base md:text-lg tracking-wide select-all">
            {displayId}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-2 rounded-lg bg-[#0e332d] hover:bg-[#13463e] border border-emerald-500/30 text-emerald-300 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
          title="Copy Application ID"
          aria-label="Copy Application ID"
        >
          {copied ? (
            <CheckCheck className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Stepper / Progress Bar */}
      <div className="mt-6 pt-2">
        <div className="relative flex items-center justify-between">
          {/* Connecting Track Line */}
          <div className="absolute top-4 left-6 right-6 h-[2px] bg-slate-200 -z-0" />

          {/* Active progress overlay */}
          <div 
            className="absolute top-4 left-6 h-[2px] bg-emerald-500 -z-0 transition-all duration-500"
            style={{
              width: submission?.status === 'Certificate' ? '100%' :
                     submission?.status === 'Inspection' ? '66%' :
                     submission?.status === 'Under Review' ? '33%' : '0%'
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isFirst = index === 0;
            const isDone = isFirst || step.isCompleted;

            return (
              <div key={step.key} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-[#059669] text-white shadow-md shadow-emerald-950/20 ring-4 ring-white'
                      : 'bg-white text-slate-400 border-2 border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-center mt-2">
                  <p
                    className={`text-[11px] font-semibold ${
                      isDone ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.date && (
                    <p className="text-[10px] text-slate-400 font-normal">
                      {step.date}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
