import React from 'react';
import { Shield, HeartHandshake, Award, ExternalLink, Code2 } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { SupportedLanguage } from '../types';

interface AboutUsPageProps {
  language?: SupportedLanguage;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Shield className="w-4 h-4" />
            <span>{t.aboutUs.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.aboutUs.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.aboutUs.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-5xl">
        {/* Official Developer Attribution Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border-2 border-primary/20 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Code2 className="w-4 h-4" />
            <span>{t.aboutUs.devCreditBadge}</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {t.aboutUs.devCreditTitle}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {t.aboutUs.devCreditDesc}
          </p>
        </div>

      {/* Mission & Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-display font-bold text-foreground">{t.aboutUs.pillar1Title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t.aboutUs.pillar1Desc}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-display font-bold text-foreground">{t.aboutUs.pillar2Title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t.aboutUs.pillar2Desc}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-display font-bold text-foreground">{t.aboutUs.pillar3Title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t.aboutUs.pillar3Desc}
          </p>
        </div>
      </div>

      {/* Verification Methodology */}
      <section className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
        <h3 className="text-lg font-display font-bold text-foreground">
          Scientific & Epidemiological Methodology
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          EbolaGuard NG follows strict editorial and clinical governance rules:
        </p>
        <ul className="space-y-2 text-xs text-foreground/80 leading-relaxed list-disc list-inside">
          <li><strong>No Simulated Outbreaks:</strong> We never invent case numbers, death tolls, or quarantine statuses. If verified data for a jurisdiction is unavailable, we explicitly indicate it as unverified.</li>
          <li><strong>Species Distinction:</strong> We distinguish between the 6 distinct ebolavirus species, clarifying that vaccines like Ervebo only target the Zaire species.</li>
          <li><strong>Clinical Boundary:</strong> The AI Virtual Doctor operates under strict guardrails; it provides triage levels and emergency call-ahead protocols without claiming to be a human physician.</li>
        </ul>
      </section>

      {/* Official Health Agency Links */}
      <div className="p-6 rounded-2xl bg-secondary/50 border border-border space-y-4">
        <h3 className="text-sm font-display font-bold text-foreground">
          Official Public Health Agencies
        </h3>
        <div className="flex flex-wrap gap-4 text-xs">
          <a
            href="https://ncdc.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>NCDC Nigeria</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <a
            href="https://health.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>Federal Ministry of Health</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <a
            href="https://www.afro.who.int"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>WHO AFRO</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <a
            href="https://africacdc.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>Africa CDC</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};
