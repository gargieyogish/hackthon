import React, { useState } from 'react';
import { User, ChevronDown, Menu, ShieldCheck, LogOut, Settings } from 'lucide-react';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="py-6 px-4 md:px-8 bg-transparent">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Title & Breadcrumb */}
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">
              Citizen Services
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight mt-1">
            Customer Application Form
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Provide your details to apply for certificate and related services.
          </p>
        </div>

        {/* Right User Profile Dropdown Pill */}
        <div className="relative self-start md:self-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full py-1.5 pl-2 pr-3.5 shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {/* Green user circle avatar */}
            <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center text-white shadow-sm">
              <User className="w-4 h-4" />
            </div>

            <div className="text-left leading-tight pr-1">
              <div className="text-[10px] text-slate-400 font-medium">Welcome,</div>
              <div className="text-xs font-bold text-slate-800">Citizen</div>
            </div>

            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Citizen profile dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Mysuru Citizen Portal</p>
                <p className="text-[11px] text-slate-500">Ward 14, Chamarajapuram</p>
              </div>

              <div className="py-1">
                <button 
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Aadhaar Verified</span>
                </button>
                <button 
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button 
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
