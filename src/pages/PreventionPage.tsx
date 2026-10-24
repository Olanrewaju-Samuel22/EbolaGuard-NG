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
import { useTranslation } from '../contexts/LanguageContext';

interface PreventionPageProps {
  onSelectTab: (tab: string) => void;
  language?: SupportedLanguage;
}

export const PreventionPage: React.FC<PreventionPageProps> = ({
  onSelectTab,
  language: propLanguage
}) => {
  const { language: ctxLanguage, t } = useTranslation();
  const activeLanguage = propLanguage || ctxLanguage;

  const [activeTab, setActiveTab] = useState<'public' | 'healthcare' | 'burial'>('public');

  return (
    <div className="min-h-screen bg-background">
      {/* Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Shield className="w-4 h-4" />
            <span>{t.prevention.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.prevention.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.prevention.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-6xl">
        {/* Critical Role Boundary Callout */}
        <div className="p-5 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-4">
          <AlertOctagon className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-foreground">
            <p className="font-bold text-teal-950">
              {t.prevention.roleWarningTitle}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.prevention.roleWarningText}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('public')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'public'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {t.prevention.tabPublic}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('healthcare')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'healthcare'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {t.prevention.tabHealthcare}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('burial')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'burial'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {t.prevention.tabBurial}
          </button>
        </div>

        {/* TAB CONTENT: General Public */}
        {activeTab === 'public' && (
          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Step 1: Hand Hygiene */}
              <div className="bg-card rounded-xl p-6 border border-border shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="text-base font-bold text-foreground">{t.prevention.handwashingTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.prevention.handwashingText}
                </p>
              </div>

              {/* Step 2: Avoid Fluid Contact */}
              <div className="bg-card rounded-xl p-6 border border-border shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {activeLanguage === 'pcm' ? 'No Touch Body Fluid' : activeLanguage === 'yo' ? 'Yẹra fún Omi Ara' : activeLanguage === 'ha' ? 'Guje wa Taba Ruwan Jiki' : activeLanguage === 'ig' ? 'Zere Imetụ Mmiri Ahụ Aka' : 'Avoid Direct Fluid Contact'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.aboutEbola.transmissionDirect}
                </p>
              </div>

              {/* Step 3: Wildlife Precautions */}
              <div className="bg-card rounded-xl p-6 border border-border shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="text-base font-bold text-foreground">{t.prevention.foodSafetyTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.prevention.foodSafetyText}
                </p>
              </div>
            </div>

            {/* Do's and Don'ts Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-card rounded-xl p-6 border border-emerald-500/30 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.prevention.dosListTitle}</span>
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                  <li>✓ {t.prevention.handwashingText}</li>
                  <li>✓ {activeLanguage === 'pcm' ? 'Call hospital 6232 before you carry person go clinic.' : activeLanguage === 'yo' ? 'Pe 6232 ṣáájú kí o tó lọ sí ilé-ìwòsàn.' : activeLanguage === 'ha' ? 'Kira 6232 kafin ka tafi asibiti.' : activeLanguage === 'ig' ? 'Kpọọ 6232 tupu ị gaa ụlọ ọgwụ.' : 'Call ahead to clinic or hospital if someone has high fever + vomiting.'}</li>
                  <li>✓ {activeLanguage === 'pcm' ? 'Support sick people and survivors without stigma.' : activeLanguage === 'yo' ? 'Ṣe àtìlẹ́yìn fún àwọn tó ti wòsàn láìsí ẹ̀tanú.' : activeLanguage === 'ha' ? 'Taimaka wa wadanda suka warke ba tare da nuna bambanci ba.' : activeLanguage === 'ig' ? 'Kwado ndị gbakere na-enweghị ịkpọasị.' : 'Support survivors with compassion; negative test means non-contagious.'}</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-destructive/30 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-destructive flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span>{t.prevention.dontsListTitle}</span>
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                  <li>✗ {t.prevention.saltMythTitle}: {t.prevention.saltMythText}</li>
                  <li>✗ {activeLanguage === 'pcm' ? 'NEVER wash or hug dead body of person wey die of fever.' : activeLanguage === 'yo' ? 'MÁ ṢE fọ òkú ẹni tó kú nípase ibà.' : activeLanguage === 'ha' ? 'KADA ka wanke gawar wanda ya mutu da zazzabi.' : activeLanguage === 'ig' ? 'ASALA ozu onye ahụ ọkụ gburu.' : 'NEVER wash or kiss the remains of anyone who died with unexplained fever.'}</li>
                  <li>✗ {activeLanguage === 'pcm' ? 'NEVER hide sick person inside house without calling doctor.' : activeLanguage === 'yo' ? 'MÁ ṢE fi aláìsàn pamọ́ sí ilé láì pe NCDC.' : activeLanguage === 'ha' ? 'KADA ka boye marar lafiya a gida ba tare da sanar da asibiti ba.' : activeLanguage === 'ig' ? 'EZOLA onye ọrịa n\'ụlọ n\'akpọghị NCDC.' : 'NEVER conceal an acutely ill patient at home without alerting health authorities.'}</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* TAB CONTENT: Healthcare Workers */}
        {activeTab === 'healthcare' && (
          <section className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                {t.prevention.tabHealthcare} (IPC Protocol)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Based on the National Guidelines for Viral Haemorrhagic Fevers (NCDC & Federal Ministry of Health).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 rounded-xl bg-secondary/50 border border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  1. Standard Precautions at Triage
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every patient entering outpatient departments must undergo non-contact infrared thermal temperature screening. Place febrile patients with compatible epidemiologic history into a designated isolation holding space immediately.
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-secondary/50 border border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  2. Personal Protective Equipment (PPE)
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Full fluid-resistant coverall, double gloves, N95 respirator / fluid-resistant mask, face shield or goggles, waterproof apron, and boot covers. Never compromise on trained doffing supervision (the "buddy system").
                </p>
              </div>
            </div>
          </section>
        )}

        {/* TAB CONTENT: Safe Burials */}
        {activeTab === 'burial' && (
          <section className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                {t.prevention.tabBurial}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.aboutEbola.transmissionBurials}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-foreground space-y-2">
              <p className="font-bold text-amber-900">Why Bodies of Ebola Victims Are So Dangerous:</p>
              <p className="leading-relaxed text-muted-foreground">
                At the time of death, the concentration of active Ebola virus in the body tissues and skin is at its absolute peak. Direct contact with skin or fluids during washing or dressing transmits massive viral loads to family members and undertakers.
              </p>
            </div>

            <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <h4 className="font-bold text-foreground text-sm">Key Principles for Families and Religious Leaders:</h4>
              <ul className="space-y-2 list-disc list-inside">
                <li>Notify the NCDC (6232) or State Ministry of Health immediately when an unexplained death occurs following high fever.</li>
                <li>A dedicated, PPE-equipped safe burial team will sanitize the body and place it in a leak-proof body bag.</li>
                <li>Prayers, final viewings, and religious eulogies are fully accommodated from a safe physical distance (minimum 2 metres) without touching the deceased.</li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
export default PreventionPage;
