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
import { useTranslation } from '../contexts/LanguageContext';

interface SymptomsExposurePageProps {
  onSelectTab: (tab: string) => void;
  language?: SupportedLanguage;
}

export const SymptomsExposurePage: React.FC<SymptomsExposurePageProps> = ({
  onSelectTab,
  language: propLanguage
}) => {
  const { language: ctxLanguage, t } = useTranslation();
  const activeLanguage = propLanguage || ctxLanguage;

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [hadContact, setHadContact] = useState<boolean | null>(null);

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const symptomList = [
    { id: 'fever', label: t.symptoms.feverLabel, category: 'early', desc: t.symptoms.earlyDesc },
    { id: 'fatigue', label: t.symptoms.fatigueLabel, category: 'early', desc: t.symptoms.earlyDesc },
    { id: 'headache', label: t.symptoms.headacheLabel, category: 'early', desc: t.symptoms.earlyDesc },
    { id: 'muscle_pain', label: t.symptoms.musclePainLabel, category: 'early', desc: t.symptoms.earlyDesc },
    { id: 'sore_throat', label: t.symptoms.soreThroatLabel, category: 'early', desc: t.symptoms.earlyDesc },
    { id: 'vomiting', label: t.symptoms.vomitingLabel, category: 'gastro', desc: t.symptoms.gastroDesc },
    { id: 'diarrhea', label: t.symptoms.diarrheaLabel, category: 'gastro', desc: t.symptoms.gastroDesc },
    { id: 'abdominal_pain', label: t.symptoms.abdominalPainLabel, category: 'gastro', desc: t.symptoms.gastroDesc },
    { id: 'bleeding', label: t.symptoms.bleedingLabel, category: 'severe', desc: t.symptoms.severeDesc }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span>{t.symptoms.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.symptoms.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.symptoms.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-5xl">
        {/* Urgent Public Health Distinction Callout */}
        <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-foreground">
            <p className="font-bold text-amber-900">
              {t.symptoms.urgentWarning}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.symptoms.callAheadReminder}
            </p>
          </div>
        </div>

        {/* 3-Phase Progression Timeline */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-display text-foreground">
            {activeLanguage === 'pcm' ? '3 Stages of Ebola Signs' : activeLanguage === 'yo' ? 'Ipele Mẹ́ta Àwọn Àmì Àrùn' : activeLanguage === 'ha' ? 'Matakai 3 Na Alamomin Cutar' : activeLanguage === 'ig' ? 'Ọkwa Atọ nke Ihe Ịrịba Ama' : '3-Phase Clinical Progression Timeline'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                {t.symptoms.earlyTitle}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.symptoms.earlyDesc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                {t.symptoms.gastroTitle}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.symptoms.gastroDesc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-2">
              <span className="text-xs font-bold text-destructive uppercase tracking-wider block">
                {t.symptoms.severeTitle}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.symptoms.severeDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Checklist */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold font-display text-foreground">
              {t.symptoms.checkerTitle}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t.symptoms.checkerInstruction}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {symptomList.map((s) => {
              const isSelected = selectedSymptoms.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleSymptom(s.id)}
                  className={`p-3.5 rounded-xl text-left border text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs'
                      : 'border-border hover:bg-secondary text-foreground bg-background'
                  }`}
                >
                  <span>{s.label}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0 ml-1.5" />}
                </button>
              );
            })}
          </div>

          {/* Exposure Questionnaire */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-3">
            <span className="text-xs font-bold text-foreground block">
              {t.symptoms.exposureQuestion}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setHadContact(true)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  hadContact === true ? 'bg-destructive text-white' : 'bg-card border border-border text-foreground hover:bg-secondary'
                }`}
              >
                {activeLanguage === 'pcm' ? 'Yes (I touch am)' : activeLanguage === 'yo' ? 'Bẹ́ẹ̀ni' : activeLanguage === 'ha' ? 'Eh' : activeLanguage === 'ig' ? 'Ee' : 'Yes'}
              </button>
              <button
                type="button"
                onClick={() => setHadContact(false)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  hadContact === false ? 'bg-primary text-white' : 'bg-card border border-border text-foreground hover:bg-secondary'
                }`}
              >
                {activeLanguage === 'pcm' ? 'No (I no touch am)' : activeLanguage === 'yo' ? 'Rárá' : activeLanguage === 'ha' ? 'A\'a' : activeLanguage === 'ig' ? 'Mba' : 'No'}
              </button>
            </div>
          </div>

          {/* Result Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border">
            <button
              onClick={() => onSelectTab('virtual-doctor')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t.virtualDoctor.title} →</span>
            </button>

            <a
              href="tel:6232"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-destructive text-white font-bold text-xs hover:bg-destructive/90 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.common.emergencyCallText}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SymptomsExposurePage;
