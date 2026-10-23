import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  PhoneCall,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  AlertTriangle,
  Shield,
  Building2,
  RotateCcw,
  CheckCircle2,
  Check
} from 'lucide-react';
import { SupportedLanguage, VirtualDoctorTriageResult } from '../types';
import { consultVirtualDoctor } from '../lib/ai-service';

interface VirtualDoctorPageProps {
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
}

export const VirtualDoctorPage: React.FC<VirtualDoctorPageProps> = ({
  onSelectTab,
  language
}) => {
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
  const [isConsulting, setIsConsulting] = useState(false);
  const [triageResult, setTriageResult] = useState<VirtualDoctorTriageResult | null>(null);

  const NIGERIA_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const symptomOptions = [
    'High Fever / Chills',
    'Severe Weakness / Prostration',
    'Frontal Headache',
    'Muscle / Joint Aches',
    'Sore Throat',
    'Nausea / Vomiting',
    'Watery Diarrhoea',
    'Abdominal Pain',
    'Unexplained Bleeding or Bruising',
    'Loss of Appetite'
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
      recognition.lang = language === 'yo' ? 'yo-NG' : language === 'ha' ? 'ha-NG' : language === 'ig' ? 'ig-NG' : 'en-NG';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setConcernText((prev) => (prev ? `${prev} ${transcript}` : transcript));
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

  const toggleSymptom = (s: string) => {
    if (selectedSymptoms.includes(s)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== s));
    } else {
      setSelectedSymptoms([...selectedSymptoms, s]);
    }
  };

  const handleSubmitConsultation = async () => {
    setIsConsulting(true);
    try {
      const result = await consultVirtualDoctor(
        concernText,
        {
          symptoms: selectedSymptoms,
          durationDays,
          hasExposureRisk,
          hasSevereBleeding,
          hasBreathingDifficulty,
          hasAlteredConsciousness,
          ageGroup,
          locationState
        },
        language
      );
      setTriageResult(result);
      setStep('result');
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } finally {
      setIsConsulting(false);
    }
  };

  const handleReset = () => {
    if (isSpeaking && typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setStep('welcome');
    setConcernText('');
    setSelectedSymptoms([]);
    setHasExposureRisk(false);
    setHasSevereBleeding(false);
    setHasBreathingDifficulty(false);
    setHasAlteredConsciousness(false);
    setTriageResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner matching reference Vde */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-4">
            <span>🛡️</span>
            <span>AI-Powered Assessment & Virtual Doctor</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            AI-Powered Risk Assessment
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Answer a few questions about your symptoms and exposure history to receive personalized risk guidance — designed for communities across Nigeria.
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
                <span>Welcome Message & Transparency Notice</span>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                "Hello. I'm the <strong>EbolaGuard Virtual Doctor</strong>, an AI health assistant. I can help you understand your symptoms, provide general health guidance, and identify when you need medical attention. I cannot confirm a diagnosis or replace a licensed healthcare professional. If you may be experiencing a medical emergency, seek emergency help immediately."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="font-bold text-foreground text-sm block">1. Describe Symptoms</span>
                <p>Input fever duration, weakness, and potential exposure context.</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="font-bold text-foreground text-sm block">2. Safety Triage</span>
                <p>Categorizes cases into Level 1 (General), Level 2 (Clinic), or Level 3 (Emergency).</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="font-bold text-foreground text-sm block">3. Safe Guidance</span>
                <p>Receive call-ahead instructions, hydration tips, and nearest hospital contacts.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={() => setStep('form')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-xs transition-all active:scale-95 text-center"
              >
                Start Free Risk Assessment →
              </button>

              <button
                onClick={() => onSelectTab('emergency')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-destructive/10 hover:bg-destructive/15 text-destructive font-bold text-xs border border-destructive/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-destructive" />
                <span>Call Emergency (6232)</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FORM */}
        {step === 'form' && (
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-8">
            <div>
              <h2 className="text-xl font-bold font-display text-foreground">
                Step 1: Describe your health concern
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Describe your symptoms, or use voice dictation.
              </p>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={concernText}
                onChange={(e) => setConcernText(e.target.value)}
                placeholder="e.g. Sudden high fever for 2 days, body weakness and headache..."
                className="w-full p-4 rounded-xl border border-input text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background"
              />
              {speechSupported && (
                <button
                  type="button"
                  onClick={handleToggleVoiceInput}
                  className={`absolute right-3 bottom-3 p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isListening
                      ? 'bg-destructive border-destructive text-destructive-foreground animate-pulse'
                      : 'bg-card border-border text-foreground hover:bg-secondary'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 text-primary" />
                  <span>{isListening ? 'Listening...' : 'Voice Dictate'}</span>
                </button>
              )}
            </div>

            {/* Symptoms Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Step 2: Check matching symptoms
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {symptomOptions.map((sym) => {
                  const isSelected = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`p-3 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs'
                          : 'border-border hover:bg-secondary text-foreground bg-card'
                      }`}
                    >
                      <span>{sym}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration & State */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Duration
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value={1}>Less than 24 hours</option>
                  <option value={2}>1 – 2 days</option>
                  <option value={3}>3 – 5 days</option>
                  <option value={7}>More than 7 days</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Age Range
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="infant">Under 5 years</option>
                  <option value="child">Child (5 – 17)</option>
                  <option value="adult">Adult (18 – 64)</option>
                  <option value="elderly">Elderly (65+)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  State in Nigeria
                </label>
                <select
                  value={locationState}
                  onChange={(e) => setLocationState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-input text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {NIGERIA_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Emergency Warnings Checklist */}
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 space-y-2.5 text-xs">
              <span className="font-bold text-destructive uppercase tracking-wide block">
                Emergency Flags & Exposure History:
              </span>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasExposureRisk}
                  onChange={(e) => setHasExposureRisk(e.target.checked)}
                  className="rounded text-destructive focus:ring-destructive mt-0.5"
                />
                <span className="text-foreground">
                  Direct contact with a suspected or confirmed Ebola patient, or attended a traditional burial.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSevereBleeding}
                  onChange={(e) => setHasSevereBleeding(e.target.checked)}
                  className="rounded text-destructive focus:ring-destructive mt-0.5"
                />
                <span className="text-foreground">
                  Active bleeding from gums, nose, vomit, stool, or unusual large bruises.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBreathingDifficulty}
                  onChange={(e) => setHasBreathingDifficulty(e.target.checked)}
                  className="rounded text-destructive focus:ring-destructive mt-0.5"
                />
                <span className="text-foreground">
                  Severe shortness of breath or chest pain.
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setStep('welcome')}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleSubmitConsultation}
                disabled={isConsulting}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2"
              >
                {isConsulting ? (
                  <span>Analyzing Clinical Presentation...</span>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4" />
                    <span>Evaluate Risk & Get Guidance</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT */}
        {step === 'result' && triageResult && (
          <div className="space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl border-2 shadow-sm space-y-4 ${
              triageResult.level === 3
                ? 'bg-destructive/10 border-destructive text-destructive-foreground'
                : triageResult.level === 2
                ? 'bg-amber-500/10 border-amber-500 text-amber-950'
                : 'bg-primary/10 border-primary text-foreground'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${
                  triageResult.level === 3 ? 'bg-destructive' : triageResult.level === 2 ? 'bg-amber-600' : 'bg-primary'
                }`}>
                  Triage Level {triageResult.level}: {triageResult.level_name}
                </span>

                {typeof window !== 'undefined' && 'speechSynthesis' in window && (
                  <button
                    type="button"
                    onClick={() => handleSpeakText(`${triageResult.level_name}. ${triageResult.summary}`)}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold bg-card text-foreground px-3 py-1.5 rounded-lg border border-border"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-destructive" /> : <Volume2 className="w-4 h-4 text-primary" />}
                    <span>{isSpeaking ? 'Stop Audio' : 'Listen Guidance'}</span>
                  </button>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                {triageResult.summary}
              </h2>

              {triageResult.level === 3 && (
                <div className="p-4 rounded-xl bg-destructive text-white text-xs sm:text-sm font-bold space-y-1">
                  <p>🚨 EMERGENCY PROTOCOL:</p>
                  <p className="font-normal">
                    Call NCDC Toll-Free <strong>6232</strong> immediately. If visiting a hospital, CALL AHEAD to explain your symptoms and possible exposure so healthcare workers can prepare protective isolation before you arrive.
                  </p>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h3 className="font-display font-bold text-base text-foreground">
                Recommended Actions
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {triageResult.recommended_actions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-foreground">{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
              <h3 className="font-display font-bold text-sm text-foreground">
                Verified Emergency Hotline
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-secondary/50">
                <div>
                  <span className="font-bold text-foreground text-sm block">NCDC Toll-Free 24/7 Hotline</span>
                  <span className="text-xs text-muted-foreground">Free call on MTN, Airtel, Glo, 9mobile</span>
                </div>
                <a
                  href="tel:6232"
                  className="px-5 py-2.5 rounded-xl bg-destructive text-white font-mono font-bold text-sm hover:bg-destructive/90 transition-colors"
                >
                  Call 6232
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onSelectTab('find-help')}
                className="px-4 py-2.5 rounded-xl bg-secondary text-foreground text-xs font-bold hover:bg-secondary/80 border border-border"
              >
                Find Hospitals in {locationState}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90"
              >
                New Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
