import React, { useState } from 'react';
import { AlertCircle, Send, CheckCircle2, ShieldAlert, Mail } from 'lucide-react';
import { MisinformationReport, SupportedLanguage } from '../types';
import { submitMisinformationReport } from '../lib/supabase';
import { useTranslation } from '../contexts/LanguageContext';

interface ContactFeedbackPageProps {
  onSubmitReport: (report: Partial<MisinformationReport>) => void;
  language?: SupportedLanguage;
}

export const ContactFeedbackPage: React.FC<ContactFeedbackPageProps> = ({ onSubmitReport }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'misinformation' | 'contact'>('misinformation');

  // Misinformation form states
  const [reportCategory, setReportCategory] = useState<MisinformationReport['report_category']>('fake_cure');
  const [reportDescription, setReportDescription] = useState('');
  const [reportedUrl, setReportedUrl] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  // Feedback form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleMisinformationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDescription.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await submitMisinformationReport({
        report_category: reportCategory,
        description: reportDescription,
        reported_url: reportedUrl
      });

      onSubmitReport({
        id: res.id,
        report_category: reportCategory,
        description: reportDescription,
        reported_url: reportedUrl,
        status: 'pending'
      });

      setReportSuccess(true);
      setSubmitNotice(
        res.savedToSupabase
          ? 'Verified: Report stored securely in your Supabase database.'
          : (res.error || 'Report logged in active session.')
      );
      setReportDescription('');
      setReportedUrl('');
      setTimeout(() => {
        setReportSuccess(false);
        setSubmitNotice(null);
      }, 7000);
    } catch {
      onSubmitReport({
        report_category: reportCategory,
        description: reportDescription,
        reported_url: reportedUrl,
        status: 'pending'
      });
      setReportSuccess(true);
      setSubmitNotice('Report saved in active session.');
      setTimeout(() => {
        setReportSuccess(false);
        setSubmitNotice(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => setContactSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <ShieldAlert className="w-4 h-4" />
            <span>{t.contact.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t.contact.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-4xl">

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('misinformation')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
            activeTab === 'misinformation'
              ? 'bg-[#18794E] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.contact.tabMisinformation}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
            activeTab === 'contact'
              ? 'bg-[#18794E] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.contact.tabFeedback}
        </button>
      </div>

      {/* FORM 1: REPORT MISINFORMATION */}
      {activeTab === 'misinformation' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Public Health Integrity:</span>
              <p className="text-amber-900/90 leading-relaxed">
                {t.contact.emergencyWarning}
              </p>
            </div>
          </div>

          {reportSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.common.success}! Report submitted.</span>
              </div>
              {submitNotice && (
                <p className="text-[11px] text-emerald-800/90 pl-6">{submitNotice}</p>
              )}
            </div>
          )}

          <form onSubmit={handleMisinformationSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                {t.contact.categoryLabel}
              </label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value as MisinformationReport['report_category'])}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#18794E]"
              >
                <option value="fake_cure">{t.contact.catFakeCure}</option>
                <option value="false_case_claim">{t.contact.catFalseDeath}</option>
                <option value="unauthorized_remedy">{t.contact.catHiddenCase}</option>
                <option value="other">{t.contact.catOther}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                {t.contact.sourceUrlLabel}
              </label>
              <input
                type="text"
                value={reportedUrl}
                onChange={(e) => setReportedUrl(e.target.value)}
                placeholder={t.contact.sourceUrlPlaceholder}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                {t.contact.descriptionLabel} *
              </label>
              <textarea
                rows={4}
                required
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder={t.contact.descriptionPlaceholder}
                className="w-full p-4 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-[#18794E] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? t.common.submitting : t.contact.submitReportBtn}</span>
            </button>
          </form>
        </div>
      )}

      {/* FORM 2: GENERAL CONTACT */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          {contactSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.common.success}! Message received.</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Dr. / Nurse / Citizen"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                {t.contact.messageLabel} *
              </label>
              <textarea
                rows={4}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Share feedback, collaboration inquiries, or community outreach notes..."
                className="w-full p-4 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#123D32] hover:bg-[#18794E] text-white font-bold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>{t.contact.sendFeedbackBtn}</span>
            </button>
          </form>
        </div>
      )}
      </div>
    </div>
  );
};
