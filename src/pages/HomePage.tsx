import React, { useState } from 'react';
import {
  Shield,
  Activity,
  HeartPulse,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Share2,
  PhoneCall,
  CheckCircle,
  Building2,
  Bell,
  Check,
  MapPin,
  Users,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { OutbreakUpdate, OutbreakStatistic, SupportedLanguage } from '../types';
import { submitNewsletterSubscription } from '../lib/supabase';
import { useTranslation } from '../contexts/LanguageContext';

interface HomePageProps {
  onSelectTab: (tab: string) => void;
  onViewUpdate: (update: OutbreakUpdate) => void;
  language?: SupportedLanguage;
  latestUpdate: OutbreakUpdate;
  statistics: OutbreakStatistic[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onViewUpdate,
  language: propLanguage,
  latestUpdate,
  statistics
}) => {
  const { language: ctxLanguage, t } = useTranslation();
  const activeLanguage = propLanguage || ctxLanguage;

  // Subscription state
  const [phoneInput, setPhoneInput] = useState('');
  const [subType, setSubType] = useState<'sms' | 'whatsapp'>('sms');
  const [subState, setSubState] = useState('Lagos');
  const [subSuccess, setSubSuccess] = useState(false);

  // Map state
  const [selectedMapState, setSelectedMapState] = useState<string>('Lagos');

  // Hotspot states data matching reference table structure
  const hotspotStates = [
    { state: 'Lagos', cases: 0, screenings: '68,240', status: activeLanguage === 'pcm' ? 'Checking for Airport & Seaport' : activeLanguage === 'yo' ? 'Àyẹ̀wò ní Pápá Ọkọ̀ & Etí Omi' : activeLanguage === 'ha' ? 'Gwajin Filin Jirgi da Tashar Ruwa' : activeLanguage === 'ig' ? 'Nyocha n\'Ọdụ Ụgbọ Elu na Mmiri' : 'Intensive Screening (MMIA Airport & Seaport)', risk: t.common.lowRisk },
    { state: 'FCT (Abuja)', cases: 0, screenings: '42,110', status: activeLanguage === 'pcm' ? 'NCDC Headquarter & Main Lab' : activeLanguage === 'yo' ? 'Olú-Ilé-Iṣẹ́ NCDC & Ilé-Àyẹ̀wò NRL' : activeLanguage === 'ha' ? 'Cibiyar NCDC ta Kasa & NRL' : activeLanguage === 'ig' ? 'Isi Ụlọ Ọrụ NCDC & NRL' : 'National Emergency Operations & NRL Active', risk: t.common.lowRisk },
    { state: 'Kano', cases: 0, screenings: '18,500', status: activeLanguage === 'pcm' ? 'AKIA Kano Airport Screening' : activeLanguage === 'yo' ? 'Àyẹ̀wò Pápá Ọkọ̀ AKIA Kano' : activeLanguage === 'ha' ? 'Gwajin Shiga Filin Jirgin AKIA' : activeLanguage === 'ig' ? 'Nyocha Ọdụ Ụgbọ Elu AKIA' : 'Port Health Screening (AKIA Airport)', risk: t.common.lowRisk },
    { state: 'Rivers', cases: 0, screenings: '8,400', status: activeLanguage === 'pcm' ? 'Port Harcourt Sea & River Checks' : activeLanguage === 'yo' ? 'Ìṣọ́ Bodè Omi Port Harcourt' : activeLanguage === 'ha' ? 'Sa-idon Tashar Ruwan Fatakwal' : activeLanguage === 'ig' ? 'Nchebe Ọdụ Ụgbọ Mmiri Port Harcourt' : 'Maritime Port Health Vigilance', risk: t.common.lowRisk },
    { state: 'Oyo', cases: 0, screenings: '3,200', status: activeLanguage === 'pcm' ? 'UCH Ibadan Isolation Unit' : activeLanguage === 'yo' ? 'Ìmúrasílẹ̀ Ilé-Ìwòsàn UCH Ìbàdàn' : activeLanguage === 'ha' ? 'Shirin Asibitin UCH Ibadan' : activeLanguage === 'ig' ? 'Njikere Ụlọ Ọgwụ UCH Ibadan' : 'UCH Isolation Preparedness & Sentinel Lab', risk: t.common.lowRisk },
    { state: 'Edo', cases: 0, screenings: '2,400', status: activeLanguage === 'pcm' ? 'Irrua Specialist Hospital' : activeLanguage === 'yo' ? 'Ilé-Ìwòsàn Àkànṣe Irrua' : activeLanguage === 'ha' ? 'Babban Asibitin Irrua' : activeLanguage === 'ig' ? 'Ụlọ Ọgwụ Pụrụ Iche Irrua' : 'Irrua Specialist Hospital Diagnostic Standby', risk: t.common.lowRisk }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;

    const target = phoneInput.includes('@') ? phoneInput.trim() : `${phoneInput.replace(/\s+/g, '')}@alerts.ebolaguard.ng`;
    await submitNewsletterSubscription(target, activeLanguage);

    setSubSuccess(true);
    setPhoneInput('');
    setTimeout(() => setSubSuccess(false), 5000);
  };

  return (
    <div className="space-y-0 pb-0">
      {/* ====================================================
          1. HERO SECTION
          ==================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 gradient-hero" />

        <div className="relative z-10 container mx-auto px-4 py-20 pt-24 md:py-24 text-center max-w-4xl">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/95 text-xs sm:text-sm font-medium">
              {t.hero.topPill}
            </span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-5 md:mb-6 leading-[1.1] tracking-tight">
            {t.hero.headline}
            <span className="block mt-1 text-white">{t.hero.headlineHighlight}</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-3 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subheadline}
          </p>

          {/* Prominent Developer Credit */}
          <p className="text-xl md:text-3xl font-extrabold mb-3">
            <span className="text-red-400 drop-shadow-md">
              Developed by OLANREWAJU SAMUEL
            </span>
          </p>

          <p className="text-white/60 text-xs sm:text-sm md:text-base mb-8 md:mb-10">
            {t.hero.trustLine}
          </p>

          {/* Start Here Pointer */}
          <div className="flex flex-col items-center mb-4">
            <span className="text-accent font-semibold text-sm sm:text-base animate-bounce mb-1">
              {t.hero.startHere}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 md:mb-16 px-2">
            <button
              onClick={() => onSelectTab('virtual-doctor')}
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-xl rounded-xl shadow-[0_4px_20px_-4px_rgba(24,121,78,0.5)] active:scale-[0.98] transition-all ring-2 ring-accent/30 ring-offset-2 ring-offset-transparent flex items-center justify-center gap-2"
            >
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t.hero.doctorBtn}</span>
            </button>

            <button
              onClick={() => onSelectTab('statistics')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              <span>{t.hero.updatesBtn}</span>
            </button>

            <button
              onClick={() => onSelectTab('prevention')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              <span>{t.hero.learnBtn}</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">200M+</div>
              <div className="text-[11px] sm:text-xs text-white/70">
                {activeLanguage === 'pcm' ? 'Naija People We Protect' : activeLanguage === 'yo' ? 'Àwọn Ọmọ Nàìjíríà' : activeLanguage === 'ha' ? 'Al\'ummar Najeriya' : activeLanguage === 'ig' ? 'Ndị Naịjirịa' : 'Nigerians Protected'}
              </div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">36 + FCT</div>
              <div className="text-[11px] sm:text-xs text-white/70">
                {activeLanguage === 'pcm' ? 'State Wey We Dey Watch' : activeLanguage === 'yo' ? 'Ìpínlẹ̀ Tí A Ń Ṣọ́' : activeLanguage === 'ha' ? 'Jihohin Da Ake Kulawa' : activeLanguage === 'ig' ? 'Steeti A Na-eche' : 'States Monitored'}
              </div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">142K+</div>
              <div className="text-[11px] sm:text-xs text-white/70">
                {t.home.metrics.portScreenings}
              </div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-accent">0</div>
              <div className="text-[11px] sm:text-xs text-white/70">{t.common.zeroCases}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          1B. 4 QUICK ACTION CARDS
          ==================================================== */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div
              onClick={() => onSelectTab('about-ebola')}
              className="p-5 rounded-2xl border border-border bg-background hover:border-primary/50 hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">{t.cards.understand}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.cards.understandDesc}</p>
            </div>

            <div
              onClick={() => onSelectTab('symptoms')}
              className="p-5 rounded-2xl border border-border bg-background hover:border-primary/50 hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">{t.cards.symptoms}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.cards.symptomsDesc}</p>
            </div>

            <div
              onClick={() => onSelectTab('prevention')}
              className="p-5 rounded-2xl border border-border bg-background hover:border-primary/50 hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">{t.cards.prevention}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.cards.preventionDesc}</p>
            </div>

            <div
              onClick={() => onSelectTab('find-help')}
              className="p-5 rounded-2xl border border-border bg-background hover:border-primary/50 hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center group-hover:scale-105 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">{t.cards.guidance}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.cards.guidanceDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. OUTBREAK STATISTICS SECTION
          ==================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>{t.home.liveSurveillance}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              {t.statistics.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              {t.statistics.subtitle}
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
              <span className="text-xs font-medium text-muted-foreground block mb-2">{t.home.metrics.activeCases}</span>
              <div className="text-3xl font-bold font-display text-foreground font-mono mb-1">0</div>
              <span className="text-xs text-accent font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t.home.metrics.nationalStatus}</span>
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
              <span className="text-xs font-medium text-muted-foreground block mb-2">{t.home.metrics.totalFatalities}</span>
              <div className="text-3xl font-bold font-display text-foreground font-mono mb-1">0</div>
              <span className="text-xs text-muted-foreground">CFR: 0.0% · 2026</span>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
              <span className="text-xs font-medium text-muted-foreground block mb-2">{t.home.metrics.portScreenings}</span>
              <div className="text-3xl font-bold font-display text-primary font-mono mb-1">142,850+</div>
              <span className="text-xs text-muted-foreground">MMIA Lagos, Abuja, Kano</span>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
              <span className="text-xs font-medium text-muted-foreground block mb-2">{t.home.metrics.diagnosticLabs}</span>
              <div className="text-3xl font-bold font-display text-foreground font-mono mb-1">8 Labs</div>
              <span className="text-xs text-muted-foreground">NRL Gaduwa, LUTH, Irrua ISTH, UCH</span>
            </div>
          </div>

          {/* State Surveillance Readiness Table */}
          <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{t.home.stateTableTitle}</span>
              </h3>
              <button
                onClick={() => onSelectTab('statistics')}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {t.common.viewDetails} →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground">
                    <th className="py-3 px-5 font-semibold">{t.home.stateColState}</th>
                    <th className="py-3 px-5 font-semibold text-center">{t.common.status}</th>
                    <th className="py-3 px-5 font-semibold text-center">{t.home.stateColScreenings}</th>
                    <th className="py-3 px-5 font-semibold text-left">{t.home.stateColStatus}</th>
                    <th className="py-3 px-5 font-semibold text-right">{t.home.stateColRisk}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {hotspotStates.map((st) => (
                    <tr key={st.state} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-foreground">{st.state}</td>
                      <td className="py-3.5 px-5 text-center font-mono font-semibold">{st.cases}</td>
                      <td className="py-3.5 px-5 text-center font-mono text-muted-foreground">{st.screenings}</td>
                      <td className="py-3.5 px-5 text-muted-foreground">{st.status}</td>
                      <td className="py-3.5 px-5 text-right">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {st.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. NIGERIA HOTSPOT MAP SECTION
          ==================================================== */}
      <section className="py-16 md:py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              {t.home.stateTableTitle}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              {t.home.stateTableSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-card rounded-2xl border border-border p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs text-muted-foreground">
                <span>{activeLanguage === 'pcm' ? 'Pick state make you see hospital preparedness:' : activeLanguage === 'yo' ? 'Yan ìpínlẹ̀ láti wo ìmúrasílẹ̀:' : activeLanguage === 'ha' ? 'Zabi jiha don duba shirin asibiti:' : activeLanguage === 'ig' ? 'Họrọ steeti iji hụ njikere ụlọ ọgwụ:' : 'Select a state to inspect sentinel capacity:'}</span>
                <span className="text-accent font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>36 States + FCT Active</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {[
                  { name: 'Lagos', hub: 'Mainland Hospital IDH Yaba', screenings: '68k+' },
                  { name: 'FCT (Abuja)', hub: 'NCDC National Reference Lab', screenings: '42k+' },
                  { name: 'Kano', hub: 'AKTH Infectious Isolation Unit', screenings: '18k+' },
                  { name: 'Rivers', hub: 'UPTH Port Harcourt', screenings: '8k+' },
                  { name: 'Oyo', hub: 'UCH Ibadan Viral Laboratory', screenings: '3k+' },
                  { name: 'Edo', hub: 'Irrua Specialist Teaching Hospital', screenings: '2k+' },
                  { name: 'Enugu', hub: 'UNTH Ituku-Ozalla', screenings: '1k+' },
                  { name: 'Kaduna', hub: 'ABUTH Zaria Referral Centre', screenings: '1k+' },
                  { name: 'Borno', hub: 'UMTH Rapid Response Team', screenings: '1k+' },
                  { name: 'Plateau', hub: 'JUTH Lamingo Complex', screenings: '1k+' },
                  { name: 'Delta', hub: 'FMC Asaba Isolation', screenings: '1k+' },
                  { name: 'Ogun', hub: 'OOUTH Sagamu VHF Unit', screenings: '1k+' }
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedMapState(item.name)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedMapState === item.name
                        ? 'bg-primary/10 border-primary text-primary shadow-xs font-semibold'
                        : 'bg-background hover:bg-secondary border-border text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold truncate">{item.name}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] text-muted-foreground block truncate">{item.hub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected State Detail Card */}
            <div className="lg:col-span-4 bg-card rounded-2xl border border-border p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {activeLanguage === 'pcm' ? 'State Tori' : activeLanguage === 'yo' ? 'Àkọsílẹ̀ Ìpínlẹ̀' : activeLanguage === 'ha' ? 'Bayanin Jiha' : activeLanguage === 'ig' ? 'Profaịlụ Steeti' : 'State Profile'}
                  </span>
                  <h3 className="text-xl font-bold font-display text-foreground">{selectedMapState}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t.common.lowRisk}
                </span>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <div>
                  <strong className="text-foreground block">
                    {activeLanguage === 'pcm' ? 'Hospital Isolation Centre:' : activeLanguage === 'yo' ? 'Ibùdó Ìsọtọ̀:' : activeLanguage === 'ha' ? 'Dakin Kebewa:' : activeLanguage === 'ig' ? 'Ebe Nsọtọ:' : 'Active Isolation Centre:'}
                  </strong>
                  <span>{selectedMapState === 'Lagos' ? 'Mainland Hospital (IDH) Yaba, Harvey Road' : selectedMapState === 'FCT (Abuja)' ? 'NCDC National Reference Lab, Gaduwa' : `${selectedMapState} State Isolation & Treatment Facility`}</span>
                </div>

                <div>
                  <strong className="text-foreground block">
                    {activeLanguage === 'pcm' ? 'Testing Lab:' : activeLanguage === 'yo' ? 'Ilé-Àyẹ̀wò:' : activeLanguage === 'ha' ? 'Dakin Gwaji:' : activeLanguage === 'ig' ? 'Ụlọ Nyocha:' : 'Sentinel Diagnostic Assay:'}
                  </strong>
                  <span>Real-time RT-PCR Filovirus screening active</span>
                </div>

                <div>
                  <strong className="text-foreground block">{t.findHelp.emergencyDesk}</strong>
                  <a href="tel:6232" className="text-primary font-bold hover:underline font-mono">
                    6232 ({t.common.emergencyCallText})
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectTab('find-help')}
                  className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-colors text-center"
                >
                  {t.nav.facilities} ({selectedMapState}) →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. SMS / WHATSAPP OUTBREAK ALERTS
          ==================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-sm space-y-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {t.home.newsletterTitle}
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                {t.home.newsletterDesc}
              </p>
            </div>

            {subSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{t.home.subscribedSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4 max-w-md mx-auto">
                <div className="flex rounded-xl bg-muted p-1">
                  <button
                    type="button"
                    onClick={() => setSubType('sms')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      subType === 'sms' ? 'bg-card text-foreground shadow-xs font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    {t.home.smsTab}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubType('whatsapp')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      subType === 'whatsapp' ? 'bg-card text-foreground shadow-xs font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    {t.home.whatsappTab}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">
                      {t.home.stateColState}
                    </label>
                    <select
                      value={subState}
                      onChange={(e) => setSubState(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {['Lagos', 'Abuja (FCT)', 'Kano', 'Rivers', 'Oyo', 'Edo', 'Enugu', 'Kaduna', 'All Nigeria'].map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">
                      {activeLanguage === 'pcm' ? 'Phone Number' : activeLanguage === 'yo' ? 'Nọ́mbà Fóònù' : activeLanguage === 'ha' ? 'Lambar Waya' : activeLanguage === 'ig' ? 'Akara Ekwentị' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder={t.home.phonePlaceholder}
                      className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs transition-colors shadow-xs"
                >
                  {t.home.subscribeBtn}
                </button>

                <p className="text-[11px] text-muted-foreground">
                  {t.home.privacyNote}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. ALIGNED WITH SDG 3
          ==================================================== */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>{t.home.sdgTitle}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Aligned with <span className="text-primary">SDG 3:</span> Good Health and Well-being
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {t.home.sdgDesc}
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-5 bg-card rounded-2xl border border-border shadow-xs">
                <div className="text-3xl font-extrabold text-primary font-mono mb-1">3.3</div>
                <div className="text-xs font-bold text-foreground mb-1">End Epidemics</div>
                <p className="text-[11px] text-muted-foreground">Filovirus & infectious outbreak containment.</p>
              </div>

              <div className="p-5 bg-card rounded-2xl border border-border shadow-xs">
                <div className="text-3xl font-extrabold text-accent font-mono mb-1">3.8</div>
                <div className="text-xs font-bold text-foreground mb-1">Universal Coverage</div>
                <p className="text-[11px] text-muted-foreground">Free AI guidance for hard-to-reach areas.</p>
              </div>

              <div className="p-5 bg-card rounded-2xl border border-border shadow-xs">
                <div className="text-3xl font-extrabold text-success font-mono mb-1">3.d</div>
                <div className="text-xs font-bold text-foreground mb-1">Early Warning</div>
                <p className="text-[11px] text-muted-foreground">National risk detection and reduction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
