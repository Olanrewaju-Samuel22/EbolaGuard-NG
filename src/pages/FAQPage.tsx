import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, PhoneCall } from 'lucide-react';
import { FAQItem, SupportedLanguage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface FAQPageProps {
  faqs: FAQItem[];
  onSelectTab: (tab: string) => void;
  language?: SupportedLanguage;
}

export const FAQPage: React.FC<FAQPageProps> = ({ faqs, onSelectTab }) => {
  const { t } = useTranslation();
  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || 'faq-1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFAQ = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>{t.faq.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.faq.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-5xl">

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.faq.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E] bg-gray-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#18794E]"
          >
            <option value="all">{t.faq.catAll}</option>
            <option value="general">{t.faq.catBasics}</option>
            <option value="transmission">{t.faq.catTransmission}</option>
            <option value="treatment">{t.faq.catMedical}</option>
            <option value="prevention">{t.faq.catPrevention}</option>
            <option value="myths">{t.faq.catMyths}</option>
          </select>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base text-[#1F2937]">
                  {faq.question}
                </span>
                <span className="p-1 rounded-full bg-gray-100 text-gray-600 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
                  <p>{faq.answer}</p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-400">
                    <span className="uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {t.common.filter}: {faq.category}
                    </span>
                    <span>· {t.common.verified} {t.common.source}: NCDC & WHO Protocol</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Strip */}
      <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#123D32]">
            {t.faq.calloutTitle}
          </h3>
          <p className="text-xs text-emerald-900/80">
            {t.faq.calloutDesc}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('assistant')}
            className="px-4 py-2.5 rounded-lg bg-[#18794E] hover:bg-emerald-800 text-white font-bold text-xs"
          >
            {t.assistant.title}
          </button>
          <a
            href="tel:6232"
            className="px-4 py-2.5 rounded-lg bg-[#C62828] hover:bg-red-700 text-white font-bold text-xs inline-flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.faq.callNcdcBtn}</span>
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};
