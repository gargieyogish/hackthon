import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Mail, 
  Building 
} from 'lucide-react';
import type { NavItemKey } from '../../types';

interface OtherViewsProps {
  activeTab: NavItemKey;
  onNavigateToForm: () => void;
}

export const OtherViews: React.FC<OtherViewsProps> = ({ activeTab, onNavigateToForm }) => {
  if (activeTab === 'applications') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900">Your Civic Applications</h2>
            <p className="text-xs text-slate-500 mt-1">Track Mysuru C&D waste clearances and NOC permits</p>
          </div>
          <button
            onClick={onNavigateToForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold shadow-xs"
          >
            <span>+ New Application</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 px-2">Application ID</th>
                <th className="pb-3 px-2">Service / Type</th>
                <th className="pb-3 px-2">Ward / Location</th>
                <th className="pb-3 px-2">Submission Date</th>
                <th className="pb-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-2 font-mono font-bold text-emerald-700">#MCC2026001234</td>
                <td className="py-3.5 px-2 font-medium">C&D Waste Clearance NOC</td>
                <td className="py-3.5 px-2 text-slate-500">Ward 14, Chamarajapuram</td>
                <td className="py-3.5 px-2 text-slate-500">21 Aug 2026</td>
                <td className="py-3.5 px-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> Submitted
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-2 font-mono font-bold text-slate-700">#MCC2026000981</td>
                <td className="py-3.5 px-2 font-medium">Debris Transport Permit</td>
                <td className="py-3.5 px-2 text-slate-500">Ward 28, Gokulam 3rd Stage</td>
                <td className="py-3.5 px-2 text-slate-500">12 Jul 2026</td>
                <td className="py-3.5 px-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    <Clock className="w-3 h-3" /> Inspection Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'certificates') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-xs">
        <div className="pb-4 border-b border-slate-100 mb-6">
          <h2 className="font-display font-bold text-xl text-slate-900">Issued MCC Certificates</h2>
          <p className="text-xs text-slate-500 mt-1">Download official digitally signed certificates from Mysuru City Corporation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">C&D Waste Clearance Certificate</h4>
                <p className="text-xs text-slate-500 mt-0.5">Cert No: MCC-CD-2026-8819</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">Status: Valid until Dec 2027</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              <span>Download</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'notifications') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-xs">
        <div className="pb-4 border-b border-slate-100 mb-6">
          <h2 className="font-display font-bold text-xl text-slate-900">Civic Notifications</h2>
          <p className="text-xs text-slate-500 mt-1">Updates regarding your applications, inspections, and MCC advisories</p>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-slate-800">Application #MCC2026001234 Acknowledged</h4>
              <p className="text-xs text-slate-500 mt-0.5">Your application details have been queued for physical site inspection.</p>
              <span className="text-[10px] text-slate-400 mt-1 inline-block">Today at 10:45 AM</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'help') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-xs">
        <div className="pb-4 border-b border-slate-100 mb-6">
          <h2 className="font-display font-bold text-xl text-slate-900">Help & Support Desk</h2>
          <p className="text-xs text-slate-500 mt-1">Mysuru Debris Hub citizen grievance redressal and contact information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-[#f8fafc]">
            <PhoneCall className="w-6 h-6 text-emerald-600 mb-2" />
            <h4 className="text-xs font-bold text-slate-800">Helpline Numbers</h4>
            <p className="text-xs text-slate-600 mt-1">0821-2418800 / 2440890</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Mon - Sat (09:00 AM - 05:30 PM)</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-[#f8fafc]">
            <Mail className="w-6 h-6 text-emerald-600 mb-2" />
            <h4 className="text-xs font-bold text-slate-800">Email Support</h4>
            <p className="text-xs text-slate-600 mt-1">mccdebris@mysurucity.gov.in</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Responses within 24 business hours</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-[#f8fafc]">
            <Building className="w-6 h-6 text-emerald-600 mb-2" />
            <h4 className="text-xs font-bold text-slate-800">Zonal Office</h4>
            <p className="text-xs text-slate-600 mt-1">Mysuru City Corporation Main Office</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Sayyaji Rao Road, Mysuru - 570024</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
