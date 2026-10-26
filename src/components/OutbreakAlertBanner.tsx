import React from 'react';
import { AlertCircle, ExternalLink, ChevronRight, X } from 'lucide-react';
import { OutbreakUpdate } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface OutbreakAlertBannerProps {
  update: OutbreakUpdate;
  onReadFullUpdate: (update: OutbreakUpdate) => void;
  onDismiss?: () => void;
}

export const OutbreakAlertBanner: React.FC<OutbreakAlertBannerProps> = ({
  update,
  onReadFullUpdate,
  onDismiss
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#0f3d2b] border-b border-[#165a3f] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Main message */}
          <div className="flex items-start gap-2.5 flex-1 pr-6">
            <span className="p-1 rounded bg-emerald-500/25 border border-emerald-400/35 text-emerald-200 shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-emerald-200" />
            </span>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-emerald-300">
                  {t.alert.officialBadge}:
                </span>
                <span className="text-white font-medium">
                  {update.title}
                </span>
                <span className="text-emerald-200/50 hidden sm:inline">·</span>
                <span className="text-emerald-200/90 text-xs">
                  {t.alert.locationLabel}: {update.location}
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 line-clamp-1">
                {update.summary}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-200/80 pt-0.5 flex-wrap">
                <span>{t.alert.publishedLabel}: {new Date(update.source_published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span aria-hidden="true">·</span>
                <span>{t.common.verified}: {new Date(update.verified_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span aria-hidden="true">·</span>
                <a
                  href={update.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-200 hover:text-white underline underline-offset-2"
                >
                  <span>{update.publisher}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
            <button
              onClick={() => onReadFullUpdate(update)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/90 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>{t.alert.readFullBrief}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-1 rounded text-emerald-200/80 hover:text-white hover:bg-white/10"
                aria-label={t.alert.dismiss}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OutbreakAlertBanner;
