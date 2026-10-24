import React, { useState, useMemo } from 'react';
import {
  Activity,
  Search,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  Filter,
  X
} from 'lucide-react';
import { OutbreakUpdate, SupportedLanguage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface OutbreakUpdatesPageProps {
  updates: OutbreakUpdate[];
  onSelectUpdate: (update: OutbreakUpdate) => void;
  selectedUpdateModal: OutbreakUpdate | null;
  onCloseModal: () => void;
  language?: SupportedLanguage;
}

export const OutbreakUpdatesPage: React.FC<OutbreakUpdatesPageProps> = ({
  updates,
  onSelectUpdate,
  selectedUpdateModal,
  onCloseModal,
  language: propLanguage
}) => {
  const { language: ctxLanguage, t } = useTranslation();
  const activeLanguage = propLanguage || ctxLanguage;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');

  const filteredUpdates = useMemo(() => {
    return updates.filter((u) => {
      const matchesSearch =
        u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || u.category === selectedCategory;
      const matchesPublisher = selectedPublisher === 'all' || u.publisher.toLowerCase().includes(selectedPublisher.toLowerCase());
      return matchesSearch && matchesCategory && matchesPublisher;
    });
  }, [updates, searchQuery, selectedCategory, selectedPublisher]);

  return (
    <div className="min-h-screen bg-background">
      {/* Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Activity className="w-4 h-4" />
            <span>{t.updates.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.updates.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.updates.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-6xl">
        {/* Filter and Search Bar */}
        <div className="bg-card p-4 sm:p-5 rounded-2xl border border-border shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.updates.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input text-xs sm:text-sm focus:outline-none focus:border-primary bg-background"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-input text-xs sm:text-sm text-foreground bg-card focus:outline-none focus:border-primary"
            >
              <option value="all">{t.updates.filterAll}</option>
              <option value="announcement">{t.updates.filterAnnouncements}</option>
              <option value="advisory">{t.updates.filterAdvisories}</option>
              <option value="guideline_change">{t.updates.filterGuidelines}</option>
            </select>

            {/* Publisher Filter */}
            <select
              value={selectedPublisher}
              onChange={(e) => setSelectedPublisher(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-input text-xs sm:text-sm text-foreground bg-card focus:outline-none focus:border-primary"
            >
              <option value="all">{activeLanguage === 'pcm' ? 'All Sources' : activeLanguage === 'yo' ? 'Gbogbo Orísun' : activeLanguage === 'ha' ? 'Duk Tushe' : activeLanguage === 'ig' ? 'Ebe Ozi Niile' : 'All Official Sources'}</option>
              <option value="NCDC">NCDC Nigeria</option>
              <option value="WHO">WHO Africa</option>
              <option value="Ministry">Federal Ministry of Health</option>
            </select>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="space-y-4">
          {filteredUpdates.length === 0 ? (
            <div className="p-12 text-center bg-card rounded-2xl border border-border">
              <p className="text-sm font-semibold text-muted-foreground">
                {activeLanguage === 'pcm' ? 'No update match wetin you find.' : activeLanguage === 'yo' ? 'Kò sí ìròyìn tó bá ìwádìí rẹ mu.' : activeLanguage === 'ha' ? 'Babu labarin da ya dace da bincikenka.' : activeLanguage === 'ig' ? 'Enweghị ozi dabara na ihe ị chọrọ.' : 'No verified updates match your filter criteria.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPublisher('all');
                }}
                className="mt-3 text-xs font-bold text-primary hover:underline"
              >
                {t.common.clear}
              </button>
            </div>
          ) : (
            filteredUpdates.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectUpdate(item)}
                className="group bg-card rounded-2xl p-6 border border-border shadow-xs hover:shadow-md hover:border-primary transition-all cursor-pointer space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded uppercase tracking-wider text-[11px]">
                      {item.publisher}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{item.location}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{t.alert.publishedLabel}: {new Date(item.source_published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.common.verified}</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {t.alert.verifiedOn} {new Date(item.verified_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="font-semibold text-primary group-hover:underline">
                    {t.alert.readFullBrief} →
                  </span>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Modal for Full Article View */}
        {selectedUpdateModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 border border-border">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {selectedUpdateModal.publisher}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground leading-snug">
                    {selectedUpdateModal.title}
                  </h3>
                </div>
                <button
                  onClick={onCloseModal}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                  aria-label={t.common.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{selectedUpdateModal.location}</span>
                </span>
                <span>·</span>
                <span>{t.alert.publishedLabel}: {new Date(selectedUpdateModal.source_published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span>·</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.updates.verifiedStamp}</span>
                </span>
              </div>

              <div className="prose prose-sm max-w-none text-foreground text-xs sm:text-sm leading-relaxed space-y-4">
                <p className="font-medium text-foreground bg-secondary/50 p-4 rounded-xl border border-border">
                  {selectedUpdateModal.summary}
                </p>
                <div className="whitespace-pre-line text-muted-foreground">
                  {selectedUpdateModal.content}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <a
                  href={selectedUpdateModal.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                >
                  <span>{t.updates.viewSource}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onCloseModal}
                  className="px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 font-bold"
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OutbreakUpdatesPage;
