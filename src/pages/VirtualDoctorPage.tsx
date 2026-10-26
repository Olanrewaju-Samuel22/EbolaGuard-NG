import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  PhoneCall,
  Volume2,
  VolumeX,
  Mic,
  AlertTriangle,
  Shield,
  Building2,
  RotateCcw,
  CheckCircle2,
  Check,
  ArrowRight
} from 'lucide-react';
import { SupportedLanguage, VirtualDoctorTriageResult } from '../types';
import { consultVirtualDoctor } from '../lib/ai-service';
import { useTranslation } from '../contexts/LanguageContext';
import { FormattedMessage } from '../components/FormattedMessage';

interface VirtualDoctorPageProps {
  onSelectTab: (tab: string) => void;
  language?: SupportedLanguage;
}

export const VirtualDoctorPage: React.FC<VirtualDoctorPageProps> = ({
  onSelectTab,
  language: propLanguage
}) => {
  const { language: ctxLanguage, t } = useTranslation();
  const activeLanguage = propLanguage || ctxLanguage;

  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Form & consultation states
  const [step, setStep] = useState<'welcome' | 'form' | 'result'>('welcome');
  const [concernText, setConcernText] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [durationDays, setDurationDays] = useState<number>(2);
  const [hasExposureRisk, setHasExposureRisk] = useState<boolean>(false);
  const [hasSevereBleeding, setHasSevereBleeding] = useState<boolean>(false);
  const [hasBreathingDifficulty, setHasBreathingDifficulty] = useState<boolean>(false);
  const [hasAlteredConsciousness, setHasAlteredConsciousness] = useState<boolean>(false);
  const [ageGroup, setAgeGroup] = useState<string>('adult');
  const [locationState, setLocationState] = useState<string>('Lagos');

  // Async & error feedback states
  const [isConsulting, setIsConsulting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [triageResult, setTriageResult] = useState<VirtualDoctorTriageResult | null>(null);

  const NIGERIA_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  // 9 canonical symptom cards identified by stable keys
  const symptomOptions = [
    { key: 'fever', label: t.symptoms.feverLabel },
    { key: 'fatigue', label: t.symptoms.fatigueLabel },
    { key: 'headache', label: t.symptoms.headacheLabel },
    { key: 'musclePain', label: t.symptoms.musclePainLabel },
    { key: 'soreThroat', label: t.symptoms.soreThroatLabel },
    { key: 'vomiting', label: t.symptoms.vomitingLabel },
    { key: 'diarrhea', label: t.symptoms.diarrheaLabel },
    { key: 'abdominalPain', label: t.symptoms.abdominalPainLabel },
    { key: 'bleeding', label: t.symptoms.bleedingLabel }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setSpeechSupported(true);
    }
  }, []);

  const handleToggleVoiceInput = () => {
    if (!speechSupported) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang =
        activeLanguage === 'yo' ? 'yo-NG' :
        activeLanguage === 'ha' ? 'ha-NG' :
        activeLanguage === 'ig' ? 'ig-NG' : 'en-NG';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setConcernText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setValidationError(null);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSpeakText = (textToRead: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle symptom by stable key
  const toggleSymptom = (key: string) => {
    setValidationError(null);
    setSelectedSymptoms((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleSubmitConsultation = async () => {
    // Prevent duplicate submissions
    if (isConsulting) return;

    // Validation: Require either symptom text or at least one symptom / emergency flag
    const hasText = concernText.trim().length >= 4;
    const hasSymptoms = selectedSymptoms.length > 0;
    const hasEmergencyFlags = hasSevereBleeding || hasBreathingDifficulty || hasAlteredConsciousness || hasExposureRisk;

    if (!hasText && !hasSymptoms && !hasEmergencyFlags) {
      setValidationError(
        t.virtualDoctor.validationError ||
        'Please describe your symptoms in the text box or select at least one symptom from the list below.'
      );
      return;
    }

    setValidationError(null);
    setSubmitError(null);
    setIsConsulting(true);

    try {
      // Map keys to human-readable localized labels for the clinical engine
      const symptomLabels = selectedSymptoms.map(
        (key) => symptomOptions.find((opt) => opt.key === key)?.label || key
      );

      const result = await consultVirtualDoctor(
        concernText,
        {
          symptoms: symptomLabels,
          durationDays,
          hasExposureRisk,
          hasSevereBleeding,
          hasBreathingDifficulty,
          hasAlteredConsciousness,
          ageGroup,
          locationState
        },
        activeLanguage
      );

      if (result) {
        setTriageResult(result);
        setStep('result');
        window.scrollTo({ top: 100, behavior: 'smooth' });
      } else {
        throw new Error('Empty triage response received.');
      }
    } catch (err: unknown) {
      console.error('Consultation failed:', err);
      setSubmitError(
        t.virtualDoctor.consultationError ||
        'Unable to complete the online consultation. Your entered information is preserved. Please try submitting again.'
      );
    } finally {
      setIsConsulting(false);
    }
  };

  // Allow users to correct their answers and submit again
  const handleModifyAnswers = () => {
    if (isSpeaking && typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setStep('form');
    setValidationError(null);
    setSubmitError(null);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Full reset for a new patient
  const handleReset = () => {
    if (isSpeaking && typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setStep('welcome');
    setConcernText('');
    setSelectedSymptoms([]);
    setDurationDays(2);
    setHasExposureRisk(false);
    setHasSevereBleeding(false);
    setHasBreathingDifficulty(false);
    setHasAlteredConsciousness(false);
    setAgeGroup('adult');
    setLocationState('Lagos');
    setValidationError(null);
    setSubmitError(null);
    setTriageResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            <span>{t.virtualDoctor.badge}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.virtualDoctor.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.virtualDoctor.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-10 space-y-8">
        {/* STEP 1: WELCOME SCREEN */}
        {step === 'welcome' && (
          <div className="bg-card rounded-2xl p-6 sm:p-10 border border-border shadow-xs space-y-8">
            <div className="p-5 rounded-2xl bg-secondary/50 border border-border text-xs sm:text-sm text-foreground space-y-3">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm sm:text-base">
                <Shield className="w-5 h-5 text-primary" />
                <span>{t.virtualDoctor.welcomeHeader}</span>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {t.virtualDoctor.welcomeText}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="font-bold text-foreground text-sm block">{t.virtualDoctor.step1Title}</span>
                <p>{t.virtualDoctor.step1Desc}</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="font-bold text-foreground text-sm block">{t.virtualDoctor.step2Title}</span>
                <p>{t.virtualDoctor.step2Desc}</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="font-bold text-foreground text-sm block">{t.virtualDoctor.step3Title}</span>
                <p>{t.virtualDoctor.step3Desc}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={() => setStep('form')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-xs transition-all active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.virtualDoctor.startBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectTab('emergency')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-destructive/10 hover:bg-destructive/15 text-destructive font-bold text-xs border border-destructive/20 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-destructive" />
                <span>{t.common.emergencyCallText}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FORM (DETAILED SYMPTOM ASSESSMENT) */}
        {step === 'form' && (
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-xl font-bold font-display text-foreground">
                {t.virtualDoctor.formTitle || t.virtualDoctor.step1Title}
              </h2>
              <span className="text-xs text-muted-foreground font-medium">
                Step 2 of 3
              </span>
            </div>

            {/* Field 1: Describe Symptoms */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                {t.virtualDoctor.concernLabel}
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={concernText}
                  onChange={(e) => {
                    setConcernText(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder={t.virtualDoctor.concernPlaceholder}
                  className="w-full p-4 rounded-xl border border-input text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground"
                />
                {speechSupported && (
                  <button
                    type="button"
                    onClick={handleToggleVoiceInput}
                    className={`absolute right-3 bottom-3 px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isListening
                        ? 'bg-destructive border-destructive text-destructive-foreground animate-pulse'
                        : 'bg-card border-border text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Mic className={`w-3.5 h-3.5 ${isListening ? 'text-white' : 'text-primary'}`} />
                    <span>{isListening ? t.virtualDoctor.voiceListening : t.virtualDoctor.voiceInputBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Field 2: Select All Symptoms Currently Present */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  {t.virtualDoctor.symptomsLabel}
                </label>
                {selectedSymptoms.length > 0 && (
                  <span className="text-xs font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                    {selectedSymptoms.length} {t.virtualDoctor.symptomSelectedCount || 'selected'}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {symptomOptions.map((sym) => {
                  const isSelected = selectedSymptoms.includes(sym.key);
                  return (
                    <button
                      key={sym.key}
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      onClick={() => toggleSymptom(sym.key)}
                      className={`p-3.5 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs ring-1 ring-primary/40'
                          : 'border-border hover:border-primary/40 hover:bg-secondary text-foreground bg-card'
                      }`}
                    >
                      <span className="leading-snug">{sym.label}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ml-2 transition-colors ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'border border-border bg-background'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3, 4, 5: Duration, Age, Location Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  {t.virtualDoctor.durationLabel}
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value={1}>1 {t.common.days}</option>
                  <option value={2}>2 {t.common.days}</option>
                  <option value={3}>3 – 5 {t.common.days}</option>
                  <option value={7}>7+ {t.common.days}</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  {t.virtualDoctor.ageLabel}
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="adult">{t.virtualDoctor.adult}</option>
                  <option value="child">{t.virtualDoctor.child}</option>
                  <option value="elderly">{t.virtualDoctor.elderly}</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  {t.virtualDoctor.stateLabel}
                </label>
                <select
                  value={locationState}
                  onChange={(e) => setLocationState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {NIGERIA_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Safety & Emergency Screening Fields */}
            <div className="p-4 sm:p-5 rounded-xl bg-destructive/5 border border-destructive/20 space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                <span className="font-bold text-destructive uppercase tracking-wide block">
                  {t.symptoms.urgentWarning}
                </span>
              </div>

              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasExposureRisk}
                  onChange={(e) => setHasExposureRisk(e.target.checked)}
                  className="rounded text-destructive focus:ring-destructive mt-0.5 w-4 h-4 shrink-0"
                />
                <span className="text-foreground leading-relaxed">
                  {t.virtualDoctor.exposureLabel}
                </span>
              </label>

              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSevereBleeding}
                  onChange={(e) => setHasSevereBleeding(e.target.checked)}
                  className="rounded text-destructive focus:ring-destructive mt-0.5 w-4 h-4 shrink-0"
                />
                <span className="text-foreground leading-relaxed">
                  {t.virtualDoctor.bleedingLabel}
                </span>
              </label>

              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBreathingDifficulty}
                  onChange={(e) => setHasBreathingDifficulty(e.target.checked)}
                  className="rounded text-destructive focus:ring-destructive mt-0.5 w-4 h-4 shrink-0"
                />
                <span className="text-foreground leading-relaxed">
                  {t.virtualDoctor.breathingLabel}
                </span>
              </label>

              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAlteredConsciousness}
                  onChange={(e) => setHasAlteredConsciousness(e.target.checked)}
                  className="rounded text-destructive focus:ring-destructive mt-0.5 w-4 h-4 shrink-0"
                />
                <span className="text-foreground leading-relaxed">
                  {t.virtualDoctor.consciousnessLabel}
                </span>
              </label>
            </div>

            {/* Validation & Submit Feedback Banners */}
            {validationError && (
              <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {submitError && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setStep('welcome')}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ← {t.common.back}
              </button>

              <button
                type="button"
                onClick={handleSubmitConsultation}
                disabled={isConsulting}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isConsulting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>{t.virtualDoctor.analyzingText}</span>
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4" />
                    <span>{t.virtualDoctor.submitTriageBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT SCREEN (CLEAR IMMEDIATE DISPLAY) */}
        {step === 'result' && triageResult && (
          <div className="space-y-6">
            {/* Primary Triage Level Banner */}
            <div className={`p-6 sm:p-8 rounded-2xl border-2 shadow-xs space-y-4 ${
              triageResult.level === 3
                ? 'bg-destructive/10 border-destructive/80 text-foreground'
                : triageResult.level === 2
                ? 'bg-amber-500/10 border-amber-500/80 text-foreground'
                : 'bg-primary/10 border-primary/80 text-foreground'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white inline-block ${
                  triageResult.level === 3 ? 'bg-destructive' : triageResult.level === 2 ? 'bg-amber-600' : 'bg-primary'
                }`}>
                  {triageResult.level_name || (
                    triageResult.level === 3 ? t.virtualDoctor.level3Title :
                    triageResult.level === 2 ? t.virtualDoctor.level2Title :
                    t.virtualDoctor.level1Title
                  )}
                </span>

                {typeof window !== 'undefined' && 'speechSynthesis' in window && (
                  <button
                    type="button"
                    onClick={() => handleSpeakText(`${triageResult.level_name}. ${triageResult.summary}`)}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold bg-card text-foreground px-3 py-1.5 rounded-lg border border-border cursor-pointer hover:bg-secondary"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-destructive" /> : <Volume2 className="w-4 h-4 text-primary" />}
                    <span>{isSpeaking ? t.virtualDoctor.stopListenBtn : t.virtualDoctor.listenBtn}</span>
                  </button>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground leading-snug">
                {triageResult.summary}
              </h2>

              {/* Warning signs list if detected */}
              {triageResult.warning_signs_detected && triageResult.warning_signs_detected.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-foreground block mb-1">
                    Detected Symptoms & Indicators:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {triageResult.warning_signs_detected.map((sign, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-card/80 border border-border text-foreground font-medium">
                        {sign}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Level 3 Mandatory Call-Ahead Alert */}
              {triageResult.level === 3 && (
                <div className="p-4 rounded-xl bg-destructive text-white text-xs sm:text-sm font-semibold space-y-1 shadow-xs">
                  <p className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-white shrink-0" />
                    <span className="font-bold">{t.common.emergency}:</span>
                  </p>
                  <p className="font-normal leading-relaxed">
                    {t.virtualDoctor.callAheadNotice}
                  </p>
                </div>
              )}
            </div>

            {/* Recommended Actions */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h3 className="font-display font-bold text-base text-foreground">
                {t.nav.getGuidance}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {triageResult.recommended_actions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="text-foreground flex-1">
                      <FormattedMessage content={act} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safe Self-Care & Monitoring Protocol */}
            {triageResult.safe_self_care && triageResult.safe_self_care.length > 0 && (
              <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
                <h3 className="font-display font-bold text-base text-foreground">
                  Care & Hydration Precautions
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {triageResult.safe_self_care.map((care, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <div className="text-foreground flex-1">
                        <FormattedMessage content={care} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Emergency Contacts Card */}
            <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
              <h3 className="font-display font-bold text-sm text-foreground">
                {t.footer.emergencyContacts}
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-secondary/50">
                <div>
                  <span className="font-bold text-foreground text-sm block">{t.common.emergencyCallText}</span>
                  <span className="text-xs text-muted-foreground">Toll-Free across MTN, Airtel, Glo, 9mobile</span>
                </div>
                <a
                  href="tel:6232"
                  className="px-5 py-2.5 rounded-xl bg-destructive text-white font-mono font-bold text-sm hover:bg-destructive/90 transition-colors inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t.common.hotline}</span>
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-secondary/40 border border-border text-[11px] text-muted-foreground leading-relaxed">
              {triageResult.disclaimer || 'This is an educational AI assessment, NOT a clinical diagnosis. Symptoms alone cannot confirm or rule out Ebola or any other condition. Consult a licensed healthcare provider.'}
            </div>

            {/* Actions: Correct Answers / Find Hospital / New Assessment */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleModifyAnswers}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs sm:text-sm border border-border inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-primary" />
                <span>{t.virtualDoctor.editAnswersBtn || 'Review & Edit Answers'}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => onSelectTab('find-help')}
                  className="px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs sm:text-sm font-semibold border border-border inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>{t.nav.facilities} ({locationState})</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {t.virtualDoctor.newConsultationBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualDoctorPage;
