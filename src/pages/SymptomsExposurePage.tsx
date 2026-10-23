import React, { useState } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  Stethoscope,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface SymptomsExposurePageProps {
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
}

export const SymptomsExposurePage: React.FC<SymptomsExposurePageProps> = ({
  onSelectTab
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [hadContact, setHadContact] = useState<boolean | null>(null);
  const [recentTravel, setRecentTravel] = useState<boolean | null>(null);
  const [hasBleeding, setHasBleeding] = useState<boolean | null>(null);

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const symptomList = [
    { id: 'fever', label: 'Sudden High Fever (>38°C / 100.4°F)', category: 'early', desc: 'Abrupt onset of high body temperature and chills.' },
    { id: 'fatigue', label: 'Severe Weakness / Exhaustion', category: 'early', desc: 'Overwhelming physical fatigue, difficulty standing.' },
    { id: 'headache', label: 'Intense Severe Headache', category: 'early', desc: 'Throbbing frontal or generalized headache.' },
    { id: 'muscle_pain', label: 'Muscle Aches & Joint Pain', category: 'early', desc: 'Diffuse body pain, particularly in back and limbs.' },
    { id: 'sore_throat', label: 'Sore Throat / Painful Swallowing', category: 'early', desc: 'Inflammation of pharynx, painful swallowing.' },
    { id: 'vomiting', label: 'Persistent Vomiting & Nausea', category: 'gastro', desc: 'Inability to keep liquids down, gastrointestinal distress.' },
    { id: 'diarrhea', label: 'Severe Watery Diarrhoea', category: 'gastro', desc: 'Frequent copious loose stools, risk of rapid dehydration.' },
    { id: 'abdominal_pain', label: 'Acute Abdominal Cramps', category: 'gastro', desc: 'Sharp or generalized stomach pain.' },
    { id: 'bleeding', label: 'Unexplained Bleeding or Bruising', category: 'severe', desc: 'Bleeding gums, blood in vomit/stool, or unusual bruises.' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span>Clinical Symptomatology & Exposure Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Symptoms and Exposure Assessment
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Learn how Ebola manifestations progress, why laboratory confirmation is vital, and what immediate steps to take if potential exposure has occurred.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-6xl">

      {/* MANDATORY PROMINENT WARNING BOX */}
      <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-200 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-red-950">
              URGENT PUBLIC HEALTH WARNING
            </h2>
            <blockquote className="text-sm font-medium text-red-900 leading-relaxed italic border-l-4 border-red-600 pl-4 py-1">
              "If you develop compatible symptoms after possible exposure or contact with a suspected or confirmed case, seek urgent guidance from public health authorities or a qualified healthcare professional. Call ahead before visiting a healthcare facility and explain your symptoms and possible exposure."
            </blockquote>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 sm:pl-14">
          <a
            href="tel:6232"
            className="px-4 py-2.5 rounded-lg bg-[#C62828] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wide inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call NCDC Emergency: 6232 (Toll Free)</span>
          </a>
          <button
            onClick={() => onSelectTab('virtual-doctor')}
            className="px-4 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-red-950 font-bold text-xs border border-red-300 inline-flex items-center gap-2 transition-colors"
          >
            <Stethoscope className="w-4 h-4 text-red-600" />
            <span>Consult AI Virtual Doctor</span>
          </button>
        </div>
      </div>

      {/* Symptoms Chronological Progression */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937]">
            Typical Clinical Timeline
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Ebola virus disease symptoms typically evolve through distinct phases after the incubation window (2 to 21 days).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phase 1 */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Clock className="w-4 h-4" />
              <span>Phase 1 (Days 1 – 3)</span>
            </div>
            <h3 className="text-base font-bold text-[#1F2937]">Early Non-Specific Signs</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Resembles malaria or influenza. Sudden onset of fever, severe weakness, headache, sore throat, and muscle aches.
            </p>
            <div className="pt-2 text-[11px] text-gray-500 font-medium bg-gray-50 p-2.5 rounded border border-gray-100">
              Often treated presumptively as malaria in West Africa. Medical assessment is needed if no improvement after 48h.
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <Clock className="w-4 h-4" />
              <span>Phase 2 (Days 4 – 7)</span>
            </div>
            <h3 className="text-base font-bold text-[#1F2937]">Gastrointestinal Manifestations</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Copious watery diarrhoea, frequent vomiting, severe abdominal pain, chest pain, and maculopapular rash. Rapid dehydration can occur.
            </p>
            <div className="pt-2 text-[11px] text-amber-900/80 font-medium bg-amber-50 p-2.5 rounded border border-amber-100">
              High risk of electrolyte collapse. Oral and intravenous rehydration therapy is lifesaving at this stage.
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-white rounded-xl p-5 border border-red-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <Clock className="w-4 h-4" />
              <span>Phase 3 (Days 7+)</span>
            </div>
            <h3 className="text-base font-bold text-[#1F2937]">Severe Complications</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Multi-organ failure, severe metabolic acidosis, and in some cases, haemorrhagic manifestations (bleeding from mucous membranes, petechiae, blood in stools).
            </p>
            <div className="pt-2 text-[11px] text-red-900/80 font-medium bg-red-50 p-2.5 rounded border border-red-100">
              Requires immediate intensive supportive hospital care and monitored fluid therapy.
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Symptom Checker Card */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937]">
            Interactive Symptom & Exposure Checklist
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Select any symptoms you or someone in your care are experiencing. This tool provides safe educational guidance and does not calculate unsupported diagnostic probabilities.
          </p>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {symptomList.map((sym) => {
            const isSelected = selectedSymptoms.includes(sym.id);
            return (
              <button
                key={sym.id}
                type="button"
                onClick={() => toggleSymptom(sym.id)}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-[#18794E] bg-emerald-50/60 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                  isSelected ? 'bg-[#18794E] border-[#18794E] text-white' : 'border-gray-300 bg-white'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#1F2937] block">
                    {sym.label}
                  </span>
                  <span className="text-[11px] text-gray-500 leading-snug block">
                    {sym.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Exposure questions */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-[#1F2937]">
            Epidemiological Risk Context (Last 21 Days)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Q1 */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <p className="font-semibold text-gray-800">
                Contact with sick or deceased person with unexplained fever/bleeding?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHadContact(true)}
                  className={`px-3 py-1.5 rounded-md font-semibold ${hadContact === true ? 'bg-red-600 text-white' : 'bg-white border text-gray-700'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHadContact(false)}
                  className={`px-3 py-1.5 rounded-md font-semibold ${hadContact === false ? 'bg-[#18794E] text-white' : 'bg-white border text-gray-700'}`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Q2 */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <p className="font-semibold text-gray-800">
                Recent travel to a confirmed Ebola outbreak zone or forest spillover area?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRecentTravel(true)}
                  className={`px-3 py-1.5 rounded-md font-semibold ${recentTravel === true ? 'bg-amber-600 text-white' : 'bg-white border text-gray-700'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setRecentTravel(false)}
                  className={`px-3 py-1.5 rounded-md font-semibold ${recentTravel === false ? 'bg-[#18794E] text-white' : 'bg-white border text-gray-700'}`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Q3 */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <p className="font-semibold text-gray-800">
                Any active severe bleeding (mouth, nose, vomit, stool)?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHasBleeding(true)}
                  className={`px-3 py-1.5 rounded-md font-semibold ${hasBleeding === true ? 'bg-red-600 text-white' : 'bg-white border text-gray-700'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHasBleeding(false)}
                  className={`px-3 py-1.5 rounded-md font-semibold ${hasBleeding === false ? 'bg-[#18794E] text-white' : 'bg-white border text-gray-700'}`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Referral Card */}
        {(selectedSymptoms.length > 0 || hadContact !== null) && (
          <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#123D32]">
                Triage Summary & Guidance
              </span>
              <span className="text-[11px] text-gray-500">Educational Assessment</span>
            </div>
            {hasBleeding || (hadContact && selectedSymptoms.length > 0) ? (
              <p className="text-red-800 font-semibold leading-relaxed">
                🚨 High-Priority Warning: You reported serious symptoms or contact history. Immediately contact NCDC Toll-Free at 6232. Call ahead to the health facility before arrival so infection prevention protocols can be initiated.
              </p>
            ) : selectedSymptoms.length > 0 ? (
              <p className="leading-relaxed text-gray-700">
                Your selected symptoms ({selectedSymptoms.join(', ')}) require evaluation by a licensed clinician to test for malaria, typhoid, or other common conditions. Drink fluids and consult the Virtual Doctor.
              </p>
            ) : (
              <p className="text-gray-700">
                No acute symptoms flagged. Continue standard hand hygiene and monitor health for 21 days following any travel.
              </p>
            )}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onSelectTab('virtual-doctor')}
                className="px-4 py-2 rounded-lg bg-[#18794E] hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Launch Virtual Doctor Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>
      </div>
    </div>
  );
};
