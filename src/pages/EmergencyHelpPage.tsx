import React from 'react';
import { PhoneCall, AlertTriangle, CheckCircle2, Building2 } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface EmergencyHelpPageProps {
  onSelectTab: (tab: string) => void;
  language?: SupportedLanguage;
}

export const EmergencyHelpPage: React.FC<EmergencyHelpPageProps> = ({ onSelectTab }) => {
  const { t } = useTranslation();
  const e = t.emergencyHelp;

  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-destructive/10 via-primary/5 to-accent/10 border-b border-destructive/15">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-destructive/15 text-destructive text-xs sm:text-sm font-medium mb-3">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span>{e.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-destructive via-foreground to-primary bg-clip-text text-transparent">
            {e.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {e.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-5xl">

      {/* Primary Emergency Hotline Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#C62828] to-[#991B1B] text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-200">
              {e.nationalCentre}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              {e.ncdcHotlineTitle}
            </h2>
            <p className="text-xs sm:text-sm text-red-100">
              {e.ncdcHotlineDesc}
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
            <span className="font-bold text-white block">{e.altHotlineLabel}</span>
            <a href="tel:+23480097000010" className="underline font-mono">+234 800 9700 0010</a>
          </div>
          <div>
            <span className="font-bold text-white block">{e.smsDeskLabel}</span>
            <span className="font-mono">+234 708 711 0839</span>
          </div>
        </div>
      </div>

      {/* MANDATORY CALL-AHEAD PROTOCOL */}
      <div className="bg-card rounded-2xl p-6 sm:p-8 border border-destructive/30 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-foreground">
            {e.callAheadTitle}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {e.callAheadWarning}
        </p>

        <div className="space-y-3 pt-2 text-xs text-foreground">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{e.step1}</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{e.step2}</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{e.step3}</span>
          </div>
        </div>
      </div>

      {/* Other National Emergency Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {t.common.emergency}
          </span>
          <h4 className="text-base font-display font-bold text-foreground">{e.nemaTitle}</h4>
          <p className="text-xs text-muted-foreground">{e.nemaDesc}</p>
          <a
            href="tel:112"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline pt-2 font-mono"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{e.nemaBtn}</span>
          </a>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Lagos State
          </span>
          <h4 className="text-base font-display font-bold text-foreground">{e.lagosTitle}</h4>
          <p className="text-xs text-muted-foreground">{e.lagosDesc}</p>
          <a
            href="tel:0800052467432584"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline pt-2 font-mono"
          >
            <PhoneCall className="w-4 h-4" />
            <span>08000LAGOSHEALTH</span>
          </a>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Red Cross
          </span>
          <h4 className="text-base font-display font-bold text-foreground">{e.redCrossTitle}</h4>
          <p className="text-xs text-muted-foreground">{e.redCrossDesc}</p>
          <button
            onClick={() => onSelectTab('find-help')}
            className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:underline pt-2"
          >
            <Building2 className="w-4 h-4" />
            <span>{e.viewDirectoryBtn}</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
