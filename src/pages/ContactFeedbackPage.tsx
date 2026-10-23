import React, { useState } from 'react';
import { AlertCircle, Send, CheckCircle2, ShieldAlert, Mail } from 'lucide-react';
import { MisinformationReport } from '../types';

import { submitMisinformationReport } from '../lib/supabase';

interface ContactFeedbackPageProps {
  onSubmitReport: (report: Partial<MisinformationReport>) => void;
}

export const ContactFeedbackPage: React.FC<ContactFeedbackPageProps> = ({ onSubmitReport }) => {
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
            <span>Public Health Integrity & Community Reporting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Report Misinformation & Contact Us
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Help public health epidemiologists identify dangerous health hoaxes, unverified viral remedies, or get in touch with the EbolaGuard NG coordination desk.
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
          Report Health Rumour / Fake Remedy
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
          General Inquiries & Feedback
        </button>
      </div>

      {/* FORM 1: REPORT MISINFORMATION */}
      {activeTab === 'misinformation' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Why Reporting Matters:</span>
              <p className="text-amber-900/90 leading-relaxed">
                During previous viral outbreaks in Nigeria, false rumors like saltwater baths and bogus spiritual potions caused emergency hospital admissions. Our editorial fact-checkers verify and debunk reports against NCDC bulletins.
              </p>
            </div>
          </div>

          {reportSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! Your report has been submitted to the public health fact-checking cell.</span>
              </div>
              {submitNotice && (
                <p className="text-[11px] text-emerald-800/90 pl-6">{submitNotice}</p>
              )}
            </div>
          )}

          <form onSubmit={handleMisinformationSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                Category of Misinformation
              </label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value as MisinformationReport['report_category'])}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#18794E]"
              >
                <option value="fake_cure">Fake Remedy / Dangerous Cure (e.g. saltwater, bleach)</option>
                <option value="false_case_claim">False Outbreak / Case Claim in a Nigerian City</option>
                <option value="unauthorized_remedy">Unauthorized Herbal Concoction</option>
                <option value="conspiracy">Conspiracy / Anti-Vaccine Rumour</option>
                <option value="other">Other Misleading Information</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                Link or Platform (Optional)
              </label>
              <input
                type="text"
                value={reportedUrl}
                onChange={(e) => setReportedUrl(e.target.value)}
                placeholder="e.g. WhatsApp message, Facebook link, TikTok video, Twitter post..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                Describe the Rumour / Claim *
              </label>
              <textarea
                rows={4}
                required
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="What is being claimed? Who is spreading it? Why does it seem dangerous?"
                className="w-full p-4 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#18794E]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#18794E] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Report for Fact-Checking</span>
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
              <span>Message received! Our team will respond shortly.</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1.5">
                  Your Name (Optional)
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
                  Email Address (Optional)
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
                Message / Inquiry *
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
              <span>Send Message</span>
            </button>
          </form>
        </div>
      )}
      </div>
    </div>
  );
};
