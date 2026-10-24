import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { SupportedLanguage } from '../types';

interface TermsOfUsePageProps {
  language?: SupportedLanguage;
}

export const TermsOfUsePage: React.FC<TermsOfUsePageProps> = () => {
  const { t } = useTranslation();
  const tr = t.terms;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <FileText className="w-4 h-4" />
            <span>{tr.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {tr.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {tr.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 max-w-4xl">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">CRITICAL MEDICAL DISCLAIMER:</span>
              <p className="leading-relaxed">
                {t.disclaimer.short}
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{tr.term1Title}</h2>
            <p>{tr.term1Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{tr.term2Title}</h2>
            <p>{tr.term2Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{tr.term3Title}</h2>
            <p>{tr.term3Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1F2937]">{tr.term4Title}</h2>
            <p>{tr.term4Text}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
