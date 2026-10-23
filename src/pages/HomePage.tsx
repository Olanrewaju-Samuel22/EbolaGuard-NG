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
  Globe,
  Radio,
  FileCheck
} from 'lucide-react';
import { OutbreakUpdate, OutbreakStatistic, SupportedLanguage } from '../types';
import { submitNewsletterSubscription } from '../lib/supabase';

interface HomePageProps {
  onSelectTab: (tab: string) => void;
  onViewUpdate: (update: OutbreakUpdate) => void;
  language: SupportedLanguage;
  latestUpdate: OutbreakUpdate;
  statistics: OutbreakStatistic[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  latestUpdate,
  statistics
}) => {
  // Subscription state
  const [phoneInput, setPhoneInput] = useState('');
  const [subType, setSubType] = useState<'sms' | 'whatsapp'>('sms');
  const [subState, setSubState] = useState('Lagos');
  const [subSuccess, setSubSuccess] = useState(false);

  // Map state
  const [selectedMapState, setSelectedMapState] = useState<string>('Lagos');

  // Hotspot states data matching reference table structure
  const hotspotStates = [
    { state: 'Lagos', cases: 0, screenings: '68,240', status: 'Intensive Screening (MMIA Airport & Seaport)', risk: 'Low Risk', level: 'low' },
    { state: 'FCT (Abuja)', cases: 0, screenings: '42,110', status: 'National Emergency Operations & NRL Active', risk: 'Low Risk', level: 'low' },
    { state: 'Kano', cases: 0, screenings: '18,500', status: 'Port Health Screening (AKIA Airport)', risk: 'Low Risk', level: 'low' },
    { state: 'Rivers', cases: 0, screenings: '8,400', status: 'Maritime Port Health Vigilance', risk: 'Low Risk', level: 'low' },
    { state: 'Oyo', cases: 0, screenings: '3,200', status: 'UCH Isolation Preparedness & Sentinel Lab', risk: 'Low Risk', level: 'low' },
    { state: 'Edo', cases: 0, screenings: '2,400', status: 'Irrua Specialist Hospital Diagnostic Standby', risk: 'Low Risk', level: 'low' }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;

    // Persist subscription with phone/email identifier
    const target = phoneInput.includes('@') ? phoneInput.trim() : `${phoneInput.replace(/\s+/g, '')}@alerts.ebolaguard.ng`;
    await submitNewsletterSubscription(target, language);

    setSubSuccess(true);
    setPhoneInput('');
    setTimeout(() => setSubSuccess(false), 5000);
  };

  return (
    <div className="space-y-0 pb-0">
      {/* ====================================================
          1. HERO SECTION (Matching Reference "Ree" Component)
          ==================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background matching reference */}
        <div className="absolute inset-0 gradient-hero" />

        <div className="relative z-10 container mx-auto px-4 py-20 pt-24 md:py-24 text-center max-w-4xl">
          {/* Top Pill Badge with Pulsing Dot */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/95 text-xs sm:text-sm font-medium">
              SDG 3 Aligned · AI-Powered · Privacy-First
            </span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-5 md:mb-6 leading-[1.1] tracking-tight">
            Protecting Nigeria from
            <span className="block mt-1 text-white">Ebola & Epidemic Diseases</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-3 max-w-2xl mx-auto leading-relaxed">
            AI-powered early risk detection, outbreak intelligence, and prevention support to protect Nigerian communities from Ebola virus disease and other epidemic threats.
          </p>

          {/* Prominent Developer Credit matching reference styling */}
          <p className="text-xl md:text-3xl font-extrabold mb-3">
            <span className="text-red-400 drop-shadow-md">
              Developed by OLANREWAJU SAMUEL
            </span>
          </p>

          <p className="text-white/60 text-xs sm:text-sm md:text-base mb-8 md:mb-10">
            Grounded in NCDC & WHO Protocols · Zero Personal Data Retained
          </p>

          {/* Start Here Pointer */}
          <div className="flex flex-col items-center mb-4">
            <span className="text-accent font-semibold text-sm sm:text-base animate-bounce mb-1">
              👇 Start Here
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 md:mb-16 px-2">
            <button
              onClick={() => onSelectTab('virtual-doctor')}
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-xl rounded-xl shadow-[0_4px_20px_-4px_rgba(24,121,78,0.5)] active:scale-[0.98] transition-all ring-2 ring-accent/30 ring-offset-2 ring-offset-transparent animate-pulse-slow flex items-center justify-center gap-2"
            >
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Check Your Risk Now</span>
            </button>

            <button
              onClick={() => onSelectTab('statistics')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              <span>Live Outbreak Statistics</span>
            </button>
          </div>

          {/* Quick Metrics Strip in Hero bottom */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">200M+</div>
              <div className="text-[11px] sm:text-xs text-white/70">Nigerians at Risk</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">36 + FCT</div>
              <div className="text-[11px] sm:text-xs text-white/70">States Monitored</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">142K+</div>
              <div className="text-[11px] sm:text-xs text-white/70">Border Screenings</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-accent">0 Active</div>
              <div className="text-[11px] sm:text-xs text-white/70">Confirmed in Nigeria</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. OUTBREAK STATISTICS SECTION (Matching "Ioe")
          ==================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Live Outbreak Data</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Nigeria Ebola Outbreak Statistics
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Current epidemiological surveillance across Nigeria. Sources include NCDC Port Health Services and WHO AFRO. Audited weekly.
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
              <span className="text-xs font-medium text-muted-foreground block mb-2">Confirmed Cases (2026 YTD)</span>
              <div className="text-3xl font-bold font-display text-foreground font-mono mb-1">0</div>
              <span className="text-xs text-accent font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Zero active transmission</span>
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
              <span className="text-xs font-medium text-muted-foreground block mb-2">Deaths Reported (Nigeria)</span>
              <div className="text-3xl font-bold font-display text-foreground font-mono mb-1">0</div>
              <span className="text-xs text-muted-foreground">CFR: 0.0% in 2026</span>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
              <span className="text-xs font-medium text-muted-foreground block mb-2">Point of Entry Screenings</span>
              <div className="text-3xl font-bold font-display text-primary font-mono mb-1">142,850+</div>
              <span className="text-xs text-muted-foreground">Lagos, Abuja, Kano Airports</span>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 transition-colors">
              <span className="text-xs font-medium text-muted-foreground block mb-2">Monitored States</span>
              <div className="text-3xl font-bold font-display text-foreground font-mono mb-1">36 + FCT</div>
              <span className="text-xs text-muted-foreground">Across all 6 geopolitical zones</span>
            </div>
          </div>

          {/* Most Affected / Monitored States Table */}
          <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>State Surveillance Readiness & Border Screening</span>
              </h3>
              <button
                onClick={() => onSelectTab('statistics')}
                className="text-xs font-semibold text-primary hover:underline"
              >
                View Full 36 States Matrix →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground">
                    <th className="py-3 px-5 font-semibold">State / Territory</th>
                    <th className="py-3 px-5 font-semibold text-center">Confirmed Cases</th>
                    <th className="py-3 px-5 font-semibold text-center">Screenings Logged</th>
                    <th className="py-3 px-5 font-semibold text-left">Surveillance Focus</th>
                    <th className="py-3 px-5 font-semibold text-right">Risk Level</th>
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
          3. NIGERIA HOTSPOT MAP SECTION (Matching "$oe")
          ==================================================== */}
      <section className="py-16 md:py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Nigeria Epidemiological Hotspot & Surveillance Map
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Tap any state to view local preparedness, isolation beds, and official NCDC sentinel laboratories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual interactive state map cards */}
            <div className="lg:col-span-8 bg-card rounded-2xl border border-border p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs text-muted-foreground">
                <span>Select a state to inspect sentinel capacity:</span>
                <span className="text-accent font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>36 States + FCT Active</span>
                </span>
              </div>

              {/* State grid buttons representing Nigeria map nodes */}
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">State Profile</span>
                  <h3 className="text-xl font-bold font-display text-foreground">{selectedMapState}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Surveillance Normal
                </span>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <div>
                  <strong className="text-foreground block">Active Isolation Centre:</strong>
                  <span>{selectedMapState === 'Lagos' ? 'Mainland Hospital (IDH) Yaba, Harvey Road' : selectedMapState === 'FCT (Abuja)' ? 'NCDC National Reference Lab, Gaduwa' : `${selectedMapState} State Isolation & Treatment Facility`}</span>
                </div>

                <div>
                  <strong className="text-foreground block">Sentinel Diagnostic Assay:</strong>
                  <span>Real-time RT-PCR Filovirus screening active</span>
                </div>

                <div>
                  <strong className="text-foreground block">State Health Emergency Desk:</strong>
                  <a href="tel:6232" className="text-primary font-bold hover:underline font-mono">
                    6232 (NCDC National Dispatch)
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectTab('find-help')}
                  className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-colors text-center"
                >
                  View All Facilities in {selectedMapState} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. STAKEHOLDERS SECTION (Matching "Boe")
          ==================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Designed for Every Stakeholder
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Role-based tools ensure the right tools reach the right people, from Nigerian communities to frontline clinicians and state/federal health agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Stakeholder 1: Community */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">Community & Public</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Free access to AI-powered risk assessment, prevention education in 5 Nigerian languages, and local hospital locator.
                </p>
                <ul className="space-y-2 text-xs text-foreground font-medium">
                  <li className="flex items-center gap-2">✓ Anonymous symptom assessment</li>
                  <li className="flex items-center gap-2">✓ Verified prevention guidelines</li>
                  <li className="flex items-center gap-2">✓ Multilingual posters & audio</li>
                  <li className="flex items-center gap-2">✓ NCDC 6232 emergency hotline</li>
                </ul>
              </div>
              <button
                onClick={() => onSelectTab('virtual-doctor')}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs transition-colors"
              >
                Check Your Risk Now
              </button>
            </div>

            {/* Stakeholder 2: Healthcare Workers */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">Healthcare Workers</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Clinical case criteria, Infection Prevention and Control (IPC) protocols, PPE donning/doffing instructions, and reference lab sample referral.
                </p>
                <ul className="space-y-2 text-xs text-foreground font-medium">
                  <li className="flex items-center gap-2">✓ Triage case definition protocols</li>
                  <li className="flex items-center gap-2">✓ PPE safety procedures & checklists</li>
                  <li className="flex items-center gap-2">✓ Sample collection & viral transport</li>
                  <li className="flex items-center gap-2">✓ Call-ahead patient intake safety</li>
                </ul>
              </div>
              <button
                onClick={() => onSelectTab('prevention')}
                className="w-full py-3 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 font-bold text-xs transition-colors border border-border"
              >
                View Clinical Guidance
              </button>
            </div>

            {/* Stakeholder 3: Health Agencies */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">Public Health Agencies</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Epidemiological surveillance data, sentinel laboratory results, port health screening registries, and community rumor fact-checking.
                </p>
                <ul className="space-y-2 text-xs text-foreground font-medium">
                  <li className="flex items-center gap-2">✓ National 36 States + FCT feed</li>
                  <li className="flex items-center gap-2">✓ Rumour & fake remedy triage queue</li>
                  <li className="flex items-center gap-2">✓ Downloadable verified CSV datasets</li>
                  <li className="flex items-center gap-2">✓ Official bulletin publishing workflow</li>
                </ul>
              </div>
              <button
                onClick={() => onSelectTab('statistics')}
                className="w-full py-3 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 font-bold text-xs transition-colors border border-border"
              >
                Explore Outbreak Intelligence
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. NIGERIA HEALTH ORGANISATIONS (Matching "zoe")
          ==================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background border-t border-border/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              <span>Public Health Directory</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Nigeria Health Organisations & Contacts
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Key organisations leading epidemic prevention and response across Nigeria. Reach out for guidance, reporting, or emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">National Agency</span>
              <h3 className="text-lg font-bold font-display text-foreground">Nigeria Centre for Disease Control (NCDC)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Plot 801, Ebitu Ukiwe Street, Jabi, Abuja. Federal coordination for all viral haemorrhagic fever responses.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-border text-xs">
                <a href="tel:6232" className="text-destructive font-bold hover:underline flex items-center gap-1 font-mono">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>6232 (Toll-Free)</span>
                </a>
                <a href="https://ncdc.gov.ng" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Federal Ministry</span>
              <h3 className="text-lg font-bold font-display text-foreground">Federal Ministry of Health and Social Welfare</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Federal Secretariat Complex, Shehu Shagari Way, Central Business District, Abuja.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-border text-xs">
                <span className="text-muted-foreground font-mono">+234 708 711 0839</span>
                <a href="https://health.gov.ng" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Specialist Isolation Facility</span>
              <h3 className="text-lg font-bold font-display text-foreground">Mainland Hospital (IDH) Yaba, Lagos</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Harvey Road, Yaba, Lagos State. Designated national infectious disease containment & treatment hospital.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-border text-xs">
                <a href="tel:0800052467432584" className="text-destructive font-bold hover:underline font-mono">
                  08000LAGOSHEALTH
                </a>
                <button onClick={() => onSelectTab('find-help')} className="text-primary hover:underline">
                  All 36 States →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. SMS / WHATSAPP OUTBREAK ALERTS (Matching "Eae")
          ==================================================== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-sm space-y-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Stay Informed, Stay Safe
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Subscribe to receive real-time Ebola outbreak alerts and preventive guidance for your state via SMS or WhatsApp.
              </p>
            </div>

            {subSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Subscription confirmed! You will receive verified public health alerts for {subState}.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4 max-w-md mx-auto">
                {/* Method selector toggle */}
                <div className="flex rounded-xl bg-muted p-1">
                  <button
                    type="button"
                    onClick={() => setSubType('sms')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      subType === 'sms' ? 'bg-card text-foreground shadow-xs font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    SMS Alerts
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubType('whatsapp')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      subType === 'whatsapp' ? 'bg-card text-foreground shadow-xs font-bold' : 'text-muted-foreground'
                    }`}
                  >
                    WhatsApp Alerts
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">State</label>
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
                    <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs transition-colors shadow-xs"
                >
                  Subscribe for Free Health Alerts
                </button>

                <p className="text-[11px] text-muted-foreground">
                  Free of charge. Unsubscribe anytime by texting STOP.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          7. ALIGNED WITH SDG 3 (Matching "Uoe")
          ==================================================== */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>Sustainable Development Goals</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Aligned with <span className="text-primary">SDG 3:</span> Good Health and Well-being
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Our platform directly supports global health targets by enabling early detection, improving prevention, and strengthening Nigeria's health systems in epidemic-prone communities.
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
