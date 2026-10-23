import React from 'react';
import { PhoneCall, AlertTriangle, Shield, CheckCircle2, Building2 } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface EmergencyHelpPageProps {
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
}

export const EmergencyHelpPage: React.FC<EmergencyHelpPageProps> = ({ onSelectTab }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-destructive/10 via-primary/5 to-accent/10 border-b border-destructive/15">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-destructive/15 text-destructive text-xs sm:text-sm font-medium mb-3">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span>Immediate Public Health Crisis Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-destructive via-foreground to-primary bg-clip-text text-transparent">
            Emergency Assistance & Response
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Direct emergency hotlines for the Nigeria Centre for Disease Control and Prevention (NCDC), State Rapid Response Teams, and national emergency ambulance lines.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-5xl">

      {/* Primary Emergency Hotline Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#C62828] to-[#991B1B] text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-200">
              National Emergency Operations Centre
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              NCDC Toll-Free Emergency Hotline
            </h2>
            <p className="text-xs sm:text-sm text-red-100">
              Free call 24 hours a day, 7 days a week from MTN, Airtel, Glo, and 9mobile.
            </p>
          </div>

          <a
            href="tel:6232"
            className="px-6 py-4 rounded-xl bg-white text-[#C62828] font-mono font-extrabold text-2xl hover:bg-red-50 shadow-lg transition-all text-center inline-flex items-center justify-center gap-3 active:scale-95"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            <span>6232</span>
          </a>
        </div>

        <div className="pt-4 border-t border-red-500/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-red-100">
          <div>
            <span className="font-bold text-white block">Alternative Hotline:</span>
            <a href="tel:+23480097000010" className="underline font-mono">+234 800 9700 0010</a>
          </div>
          <div>
            <span className="font-bold text-white block">Official SMS Desk:</span>
            <span className="font-mono">+234 708 711 0839</span>
          </div>
        </div>
      </div>

      {/* MANDATORY CALL-AHEAD PROTOCOL */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-red-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#1F2937]">
            The Mandatory "Call-Ahead" Protocol
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          If you or someone in your home has a sudden high fever accompanied by severe vomiting, diarrhoea, or unexplained bleeding, <strong>DO NOT travel directly to an outpatient clinic or emergency ward unannounced</strong>.
        </p>

        <div className="space-y-3 pt-2 text-xs text-gray-700">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>1. Call the hospital before leaving home:</strong> Inform the triage desk that you are arriving with symptoms of viral haemorrhagic illness.</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>2. Allow clinical staff to prepare:</strong> Healthcare workers must don specialized Personal Protective Equipment (PPE) to ensure safe intake without exposing other patients in waiting areas.</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>3. Avoid public commercial transport:</strong> Never use crowded public buses or shared taxis. Ask NCDC or the hospital if designated emergency medical transport can be dispatched.</span>
          </div>
        </div>
      </div>

      {/* Other National Emergency Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            National Emergency Dispatch
          </span>
          <h4 className="text-base font-bold text-[#1F2937]">National Emergency (NEMA)</h4>
          <p className="text-xs text-gray-600">Police, fire, and ambulance unified nationwide hotline.</p>
          <a
            href="tel:112"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#18794E] hover:underline pt-2 font-mono"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Dial 112</span>
          </a>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Lagos State Emergency
          </span>
          <h4 className="text-base font-bold text-[#1F2937]">Lagos Ministry of Health</h4>
          <p className="text-xs text-gray-600">Mainland Hospital IDH Yaba & Emergency Response.</p>
          <a
            href="tel:0800052467432584"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#18794E] hover:underline pt-2 font-mono"
          >
            <PhoneCall className="w-4 h-4" />
            <span>08000LAGOSHEALTH</span>
          </a>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Red Cross Ambulance
          </span>
          <h4 className="text-base font-bold text-[#1F2937]">Nigerian Red Cross Society</h4>
          <p className="text-xs text-gray-600">Community first aid and disaster medical dispatch.</p>
          <button
            onClick={() => onSelectTab('find-help')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F766E] hover:underline pt-2"
          >
            <Building2 className="w-4 h-4" />
            <span>View All 36 States Directory →</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
