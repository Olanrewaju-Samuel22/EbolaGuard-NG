import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <FileText className="w-4 h-4" />
            <span>Terms of Service & Clinical Boundary Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Terms of Use & Medical Disclaimer
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Last revised: October 2026.
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
              EbolaGuard NG and the EbolaGuard Virtual Doctor are informational public health tools. They do NOT provide a clinical diagnosis, medical prescription, or definitive disease confirmation. They do NOT replace in-person consultation with a qualified doctor, clinical laboratory testing (RT-PCR), or hospital emergency departments.
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">1. Acceptance of Terms</h2>
          <p>
            By accessing or interacting with EbolaGuard NG, you agree to these Terms of Use and acknowledge the limitations of AI-assisted public health guidance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">2. Emergency Care Protocol</h2>
          <p>
            If you or a person in your care experience severe difficulty breathing, acute unexplained haemorrhaging, sudden loss of consciousness, or have had direct exposure to a confirmed Ebola case, you agree to contact the NCDC emergency hotline (6232) or local emergency services immediately and follow the call-ahead protocol.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">3. Accuracy of Public Health Data</h2>
          <p>
            While every effort is made to maintain up-to-date synchronisation with NCDC and WHO Africa bulletins, epidemiological statuses in high-risk zones can change rapidly. EbolaGuard NG disclaims liability for actions taken without consulting verified public health authorities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1F2937]">4. Attribution</h2>
          <p>
            EbolaGuard NG is developed by <strong>OLANREWAJU SAMUEL</strong>. All verified source content remains the property of the respective publishing authorities (NCDC, WHO, FMOH, Africa CDC).
          </p>
        </section>
      </div>
      </div>
    </div>
  );
};
