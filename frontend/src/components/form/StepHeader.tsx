import React from 'react';

interface StepHeaderProps {
  step: number;
  title: string;
  className?: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ step, title, className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 mb-3 ${className}`}>
      <span className="w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center text-[11px] font-bold shadow-sm flex-shrink-0">
        {step}
      </span>
      <h2 className="font-semibold text-sm text-slate-900 tracking-tight">
        {title}
      </h2>
    </div>
  );
};
