import React from 'react';
import { 
  User, 
  FileText, 
  Award, 
  Bell, 
  HelpCircle, 
  Truck,
  Building2,
  X
} from 'lucide-react';
import type { NavItemKey } from '../../types';
import { MysuruPalaceSkyline } from './MysuruPalaceSkyline';

interface SidebarProps {
  activeTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { key: 'customer-panel' as NavItemKey, label: 'Customer Panel', icon: User },
    { key: 'applications' as NavItemKey, label: 'Applications', icon: FileText },
    { key: 'certificates' as NavItemKey, label: 'Certificates', icon: Award },
    { key: 'notifications' as NavItemKey, label: 'Notifications', icon: Bell, badge: '3' },
    { key: 'help' as NavItemKey, label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#051816] text-slate-100 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out border-r border-[#0d2a27] ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Branding */}
        <div>
          <div className="p-6 pb-6 flex items-center justify-between border-b border-[#0c2e2a]/60">
            <div className="flex items-center gap-3.5">
              {/* Construction & Debris Logo Icon */}
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0c3933] to-[#041f1c] border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/50">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl blur-[2px]" />
                <div className="relative flex items-center justify-center text-emerald-400">
                  <Truck className="w-5 h-5 text-emerald-400" />
                  <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>
              </div>

              <div>
                <h1 className="font-display font-bold text-lg text-white tracking-tight leading-tight">
                  Smart Civic C&D
                </h1>
                <p className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase leading-none mt-1">
                  MYSURU DEBRIS HUB
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    onSelectTab(item.key);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#059669] text-white shadow-md shadow-emerald-950/50 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#0c2c28]/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Civic Heritage & Corporation Branding */}
        <div className="p-4 pt-0">
          <div className="relative pt-2 border-t border-[#0d2a27]/80">
            {/* Mysuru Palace Skyline Artwork */}
            <div className="mb-3 px-1">
              <MysuruPalaceSkyline />
            </div>

            <div className="px-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-slate-200 font-semibold text-xs tracking-tight">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mysuru City Corporation</span>
              </div>
              <p className="text-[10px] text-emerald-400/90 font-medium tracking-tight mt-1 flex items-center justify-center lg:justify-start gap-1">
                <span>Clean City</span>
                <span className="opacity-40">•</span>
                <span>Green City</span>
                <span className="opacity-40">•</span>
                <span>Smart City</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
