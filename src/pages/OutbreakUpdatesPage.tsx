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
import { OutbreakUpdate } from '../types';

interface OutbreakUpdatesPageProps {
  updates: OutbreakUpdate[];
  onSelectUpdate: (update: OutbreakUpdate) => void;
  selectedUpdateModal: OutbreakUpdate | null;
  onCloseModal: () => void;
}

export const OutbreakUpdatesPage: React.FC<OutbreakUpdatesPageProps> = ({
  updates,
  onSelectUpdate,
  selectedUpdateModal,
  onCloseModal
}) => {
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
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Activity className="w-4 h-4" />
            <span>Real-time Public Health Surveillance Feed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Verified Outbreak Updates & Advisories
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Official epidemiological announcements, border screenings, and health ministry directives verified directly against NCDC, WHO Africa, and Africa CDC repositories.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-6xl">

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search updates by keyword, location, or advisory..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E] bg-gray-50/50"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#18794E]"
          >
            <option value="all">All Categories</option>
            <option value="announcement">Official Announcements</option>
            <option value="advisory">Public Advisories</option>
            <option value="guideline_change">Clinical Guidelines</option>
            <option value="contact_tracing">Surveillance / Tracing</option>
          </select>

          {/* Publisher Filter */}
          <select
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#18794E]"
          >
            <option value="all">All Official Sources</option>
            <option value="NCDC">NCDC Nigeria</option>
            <option value="WHO">WHO Africa</option>
            <option value="Ministry">Federal Ministry of Health</option>
          </select>
        </div>
      </div>

      {/* Updates Grid */}
      <div className="space-y-4">
        {filteredUpdates.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
            <p className="text-sm font-semibold text-gray-600">
              No verified updates match your filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPublisher('all');
              }}
              className="mt-3 text-xs font-bold text-[#18794E] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredUpdates.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectUpdate(item)}
              className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#18794E] transition-all cursor-pointer space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded uppercase tracking-wider text-[11px]">
                    {item.publisher}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.location}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Published: {new Date(item.source_published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[#1F2937] group-hover:text-[#18794E] transition-colors leading-snug">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                {item.summary}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  Last verified: {new Date(item.verified_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="font-semibold text-[#18794E] group-hover:underline">
                  Read Full Official Advisory →
                </span>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Modal for Full Article View */}
      {selectedUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedUpdateModal.publisher}
                  </span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-600">{selectedUpdateModal.location}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937]">
                  {selectedUpdateModal.title}
                </h3>
              </div>
              <button
                onClick={onCloseModal}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-600 space-y-1">
              <div className="flex items-center justify-between">
                <span><strong>Source Publication Date:</strong> {new Date(selectedUpdateModal.source_published_at).toLocaleDateString()}</span>
                <span><strong>Verification Date:</strong> {new Date(selectedUpdateModal.verified_at).toLocaleDateString()}</span>
              </div>
              <p>
                <strong>Source Authority:</strong> {selectedUpdateModal.publisher} (Verified Public Health Feed)
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedUpdateModal.content}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <a
                href={selectedUpdateModal.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#18794E] hover:underline"
              >
                <span>View Original Publication on {selectedUpdateModal.publisher}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onCloseModal}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
