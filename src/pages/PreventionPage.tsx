import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Download,
  AlertOctagon,
  Users,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface PreventionPageProps {
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
}

export const PreventionPage: React.FC<PreventionPageProps> = ({ onSelectTab }) => {
  const [activeTab, setActiveTab] = useState<'public' | 'healthcare' | 'burial'>('public');

  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Shield className="w-4 h-4" />
            <span>Evidence-Based Infection Control Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Ebola Prevention & Community Protection
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive, actionable hygiene measures, safe caregiving principles, healthcare worker precautions, and safe burial practices grounded in Nigerian public health directives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-6xl">

      {/* Critical Role Boundary Callout */}
      <div className="p-5 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-4">
        <AlertOctagon className="w-6 h-6 text-[#0F766E] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-teal-950">
          <p className="font-bold">
            Public Safety Distinction: Trained Professionals vs. General Public
          </p>
          <p className="text-teal-900/90 leading-relaxed">
            Ordinary visitors and community members should <strong>NEVER</strong> attempt to handle medical waste, disinfect heavily contaminated bedding, draw blood, or wash the remains of someone suspected of having died from a haemorrhagic fever. These high-risk tasks are strictly restricted to trained personnel wearing full certified Personal Protective Equipment (PPE).
          </p>
        </div>
      </div>

      {/* Tab Switcher: Public vs Healthcare Workers vs Safe Burials */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('public')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
            activeTab === 'public'
              ? 'bg-[#18794E] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          General Public & Households
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('healthcare')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
            activeTab === 'healthcare'
              ? 'bg-[#18794E] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Healthcare Workers & Clinics
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('burial')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
            activeTab === 'burial'
              ? 'bg-[#18794E] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Safe & Dignified Burials
        </button>
      </div>

      {/* TAB CONTENT: General Public */}
      {activeTab === 'public' && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1: Hand Hygiene */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#18794E] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-[#1F2937]">Rigorous Hand Hygiene</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Wash hands frequently with clean running water and soap for at least 20 seconds. If water is unavailable, use alcohol-based hand rub with at least 60% alcohol.
              </p>
              <div className="pt-2 text-[11px] text-emerald-800 font-medium">
                Wash after using restrooms, before cooking or eating, and after touching communal surfaces.
              </div>
            </div>

            {/* Step 2: Avoid Fluid Contact */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#18794E] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-[#1F2937]">Avoid Direct Fluid Contact</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Never touch blood, vomit, saliva, sweat, urine, or diarrhoea of any person showing symptoms of acute illness. Avoid sharing clothes, towels, or bedding.
              </p>
              <div className="pt-2 text-[11px] text-emerald-800 font-medium">
                Keep an acutely ill family member in a separate room and call NCDC 6232 immediately.
              </div>
            </div>

            {/* Step 3: Wildlife Precautions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#18794E] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-[#1F2937]">Wildlife & Bushmeat Safety</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Avoid touching, hunting, or butchering wild animals found dead or acting sick in the forest, especially fruit bats, monkeys, chimpanzees, and forest duikers.
              </p>
              <div className="pt-2 text-[11px] text-emerald-800 font-medium">
                Cook all meat thoroughly before consumption; heat destroys viral agents.
              </div>
            </div>
          </div>

          {/* Do's and Don'ts Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-[#18794E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What To Do (Safe Practices)</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 leading-relaxed">
                <li>✓ Keep hand sanitiser accessible when traveling or commuting.</li>
                <li>✓ Monitor body temperature twice daily if you have traveled recently.</li>
                <li>✓ Call ahead to any clinic or hospital if someone has fever + vomiting.</li>
                <li>✓ Reassure, support, and care for survivors without social stigma.</li>
                <li>✓ Rely exclusively on verified news from NCDC (ncdc.gov.ng) and WHO.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-red-700 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>What NOT To Do (Dangerous Missteps)</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 leading-relaxed">
                <li>✗ NEVER drink or bathe in saltwater or bleach solutions.</li>
                <li>✗ NEVER hide a sick relative at home without medical reporting.</li>
                <li>✗ NEVER touch, wash, or kiss the body of a deceased person who died with fever.</li>
                <li>✗ NEVER take unverified street medicines or unregulated herbs.</li>
                <li>✗ NEVER spread unverified social media voice notes or text rumors.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: Healthcare Workers */}
      {activeTab === 'healthcare' && (
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#1F2937]">
              Infection Prevention & Control (IPC) Protocol for Healthcare Facilities
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Based on the National Guidelines for Viral Haemorrhagic Fevers (NCDC & Federal Ministry of Health).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123D32]">
                1. Standard Precautions at Triage
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Every patient entering outpatient departments must undergo non-contact infrared thermal temperature screening. Place febrile patients with compatible epidemiologic history into a designated isolation holding space immediately.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123D32]">
                2. Personal Protective Equipment (PPE)
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Full fluid-resistant coverall, double gloves, N95 respirator / fluid-resistant mask, face shield or goggles, waterproof apron, and boot covers. Never compromise on trained doffing supervision (the "buddy system").
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123D32]">
                3. Safe Sharps & Specimen Handling
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Use puncture-resistant sharps disposal containers. Triple-package viral haemorrhagic diagnostic blood samples following IATA international infectious substance guidelines for transport to the NCDC National Reference Laboratory.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123D32]">
                4. Environmental Cleaning & Disinfection
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                0.5% sodium hypochlorite (household bleach diluted 1:10) for surfaces and biological spills; 0.05% for hands or skin disinfection when soap is unavailable. Allow a minimum 15-minute contact dwell time for chlorine solutions.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: Safe Burials */}
      {activeTab === 'burial' && (
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#1F2937]">
              Safe & Dignified Burial Practices
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Traditional mourning ceremonies involving physical contact with the body of a deceased patient are one of the most documented amplifiers of Ebola transmission.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <p className="font-bold">Why Bodies of Ebola Victims Are So Dangerous:</p>
            <p className="leading-relaxed">
              At the time of death, the concentration of active Ebola virus in the body tissues and skin is at its absolute peak. Direct contact with skin or fluids during washing or dressing transmits massive viral loads to family members and undertakers.
            </p>
          </div>

          <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
            <h4 className="font-bold text-gray-900 text-sm">Key Principles for Families and Religious Leaders:</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Alert Health Authorities:</strong> Notify the NCDC (6232) or the State Ministry of Health immediately when an unexplained death occurs following high fever.</li>
              <li><strong>Safe Burial Teams:</strong> A dedicated, PPE-equipped Red Cross / public health safe burial team will sanitize the body and place it in a leak-proof body bag.</li>
              <li><strong>Dignity & Faith:</strong> Prayers, final viewings, and religious eulogies are fully accommodated from a safe physical distance (minimum 2 metres) without touching the deceased.</li>
            </ul>
          </div>
        </section>
      )}

      {/* Approved Downloadable Posters & Guides */}
      <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#1F2937]">
              Official Awareness Resources & Guides
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Download approved public health infographics and posters to display in health clinics, schools, and worship centers.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('resources')}
            className="self-start sm:self-auto text-xs font-bold text-[#18794E] hover:underline"
          >
            View All Multilingual Resources →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1F2937] block">
                5 Steps Community Poster
              </span>
              <span className="text-[11px] text-gray-500">English & Pidgin · PDF (1.4 MB)</span>
            </div>
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); onSelectTab('resources'); }}
              className="p-2 rounded-lg bg-emerald-50 text-[#18794E] hover:bg-[#18794E] hover:text-white transition-colors"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1F2937] block">
                Itọsọna Idilọwọ Aarun (Yorùbá)
              </span>
              <span className="text-[11px] text-gray-500">Yoruba Handout · PDF (980 KB)</span>
            </div>
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); onSelectTab('resources'); }}
              className="p-2 rounded-lg bg-emerald-50 text-[#18794E] hover:bg-[#18794E] hover:text-white transition-colors"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1F2937] block">
                Hanyoyin Kariya (Hausa)
              </span>
              <span className="text-[11px] text-gray-500">Hausa Handout · PDF (1.1 MB)</span>
            </div>
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); onSelectTab('resources'); }}
              className="p-2 rounded-lg bg-emerald-50 text-[#18794E] hover:bg-[#18794E] hover:text-white transition-colors"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
