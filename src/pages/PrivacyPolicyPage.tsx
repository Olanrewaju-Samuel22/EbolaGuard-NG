import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { SupportedLanguage } from '../types';

interface PrivacyPolicyPageProps {
  language?: SupportedLanguage;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = () => {
  const { t } = useTranslation();
  const p = t.privacy;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Lock className="w-4 h-4" />
            <span>{p.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {p.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {p.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 max-w-4xl">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{p.introTitle}</h2>
            <p>{p.introText}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{p.anonTitle}</h2>
            <p>{p.anonText}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{p.noSaleTitle}</h2>
            <p>{p.noSaleText}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{p.serverSecurityTitle}</h2>
            <p>{p.serverSecurityText}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{p.retentionTitle}</h2>
            <p>{p.retentionText}</p>
          </section>

          <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.brandName} · {t.developerCredit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
