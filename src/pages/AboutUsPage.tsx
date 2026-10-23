import React from 'react';
import { Shield, HeartHandshake, Award, ExternalLink, Code2 } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <Shield className="w-4 h-4" />
            <span>Mission & Public Health Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            About EbolaGuard NG
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A dedicated Nigerian public health intelligence portal engineered to democratize verified Ebola awareness, counter dangerous health misinformation, and provide clinical-grade AI triage guidance to underserved communities.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-5xl">
        {/* Official Developer Attribution Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border-2 border-primary/20 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Code2 className="w-4 h-4" />
            <span>Official Developer Credit</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Developed by OLANREWAJU SAMUEL
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            EbolaGuard NG was conceptualized and developed by <strong>OLANREWAJU SAMUEL</strong> as a high-fidelity digital response to public health crises in Nigeria and West Africa, blending robust software engineering with verified epidemiological science.
          </p>
        </div>

      {/* Mission & Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18794E] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1F2937]">Verified Information</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every statistic, fact, and health advisory is strictly grounded in official publications from the Nigeria Centre for Disease Control (NCDC), Federal Ministry of Health, and WHO.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1F2937]">Early Awareness</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Educating citizens to identify early febrile manifestations and exposure risks early, enabling prompt hospital presentation before complications develop.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#123D32] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1F2937]">Safer Communities</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Eliminating community stigma against survivors, ensuring safe and dignified burial education, and debunking toxic rumours like saltwater bathing.
          </p>
        </div>
      </div>

      {/* Verification Methodology */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-[#1F2937]">
          Scientific & Epidemiological Methodology
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          EbolaGuard NG follows strict editorial and clinical governance rules:
        </p>
        <ul className="space-y-2 text-xs text-gray-700 leading-relaxed list-disc list-inside">
          <li><strong>No Simulated Outbreaks:</strong> We never invent case numbers, death tolls, or quarantine statuses. If verified data for a jurisdiction is unavailable, we explicitly indicate it as unverified.</li>
          <li><strong>Species Distinction:</strong> We distinguish between the 6 distinct ebolavirus species, clarifying that vaccines like Ervebo only target the Zaire species.</li>
          <li><strong>Clinical Boundary:</strong> The AI Virtual Doctor operates under strict guardrails; it provides triage levels and emergency call-ahead protocols without claiming to be a human physician.</li>
        </ul>
      </section>

      {/* Official Health Agency Links */}
      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
        <h3 className="text-sm font-bold text-[#1F2937]">
          Official Public Health Agencies
        </h3>
        <div className="flex flex-wrap gap-4 text-xs">
          <a
            href="https://ncdc.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#18794E] hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>NCDC Nigeria</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <a
            href="https://health.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#18794E] hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>Federal Ministry of Health</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <a
            href="https://www.afro.who.int"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#18794E] hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>WHO AFRO</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <a
            href="https://africacdc.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#18794E] hover:underline font-semibold inline-flex items-center gap-1"
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
