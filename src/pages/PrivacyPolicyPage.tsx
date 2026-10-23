import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Lock className="w-4 h-4" />
            <span>Privacy & Data Protection Principles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Last revised: October 2026 · Compliant with the Nigeria Data Protection Act (NDPA).
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 max-w-4xl">

      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">1. Introduction</h2>
          <p>
            EbolaGuard NG is committed to safeguarding user privacy. We understand that health queries and potential symptom disclosures are sensitive. This Privacy Policy details our data collection, processing, and retention practices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">2. Anonymous AI Consultations</h2>
          <p>
            The EbolaGuard Virtual Doctor and AI Health Assistant do NOT require account creation or personal identity credentials. Users are never asked to provide government IDs, home addresses, or full legal names. Symptom checkboxes and text inputs are processed strictly to generate instant clinical triage guidance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">3. No Sale of Health Data</h2>
          <p>
            We do NOT sell, license, or monetize any user consultation or feedback data. We do not use user medical queries for advertising tracking or third-party profiling.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">4. Server-Side Security & AI Integration</h2>
          <p>
            All generative interactions with Gemini API occur via secure server-side proxy routes. API credentials and administrative keys are never transmitted to or exposed in the frontend client browser.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">5. Retention and Deletion</h2>
          <p>
            Consultation messages may be cached ephemerally for session continuity and automatically purged within 48 hours. Users may clear browser storage at any time to wipe local state.
          </p>
        </section>

        <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>EbolaGuard NG · Developed by OLANREWAJU SAMUEL</span>
        </div>
      </div>
      </div>
    </div>
  );
};
