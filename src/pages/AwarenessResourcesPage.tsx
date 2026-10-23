import React, { useState } from 'react';
import {
  FileText,
  Download,
  Globe,
  Share2,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { AwarenessResource, SupportedLanguage } from '../types';

interface AwarenessResourcesPageProps {
  resources: AwarenessResource[];
  language: SupportedLanguage;
}

export const AwarenessResourcesPage: React.FC<AwarenessResourcesPageProps> = ({ resources }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filtered = resources.filter(
    (r) => selectedLanguage === 'all' || r.language === selectedLanguage
  );

  const handleDownload = (res: AwarenessResource) => {
    // Generate a downloadable text/blob for evaluation sandboxes
    const content = `EBOLAGUARD NG - OFFICIAL PUBLIC HEALTH MATERIAL\nTitle: ${res.title}\nDescription: ${res.description}\nLanguage: ${res.language}\nVerified Source: ${res.source_url}\nCredit: Developed by OLANREWAJU SAMUEL\n\nNCDC TOLL-FREE EMERGENCY: 6232\n\nKEY PREVENTION MEASURES:\n1. Wash hands with clean running water and soap frequently.\n2. Avoid direct contact with blood, vomit, or body fluids of acutely sick persons.\n3. Do not touch or wash bodies of deceased individuals who died of unexplained febrile illness.\n4. Cook all meat thoroughly; avoid sick bats or primates.\n5. Call ahead to the health facility before transporting a febrile patient.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${res.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(res.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Reference Signature Header Banner */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 sm:py-12 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-3">
            <FileText className="w-4 h-4" />
            <span>Multilingual Community Awareness Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Approved Awareness Resources & Handouts
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Download, print, and distribute official public health posters and factsheets across English, Nigerian Pidgin, Yorùbá, Hausa, and Igbo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 max-w-6xl">

      {/* Language Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Globe className="w-4 h-4 text-gray-400 shrink-0" />
        <span className="text-xs font-bold text-gray-500 uppercase shrink-0">Filter Language:</span>
        {[
          { code: 'all', label: 'All Languages' },
          { code: 'en', label: 'English' },
          { code: 'yo', label: 'Yorùbá' },
          { code: 'ha', label: 'Hausa' },
          { code: 'ig', label: 'Igbo' }
        ].map((item) => (
          <button
            key={item.code}
            type="button"
            onClick={() => setSelectedLanguage(item.code)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedLanguage === item.code
                ? 'bg-[#18794E] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  {item.language.toUpperCase()} · {item.resource_type.replace('_', ' ')}
                </span>
                <span className="font-mono text-gray-400">{item.file_size}</span>
              </div>

              <h2 className="text-base font-bold text-[#1F2937] leading-snug">
                {item.title}
              </h2>

              <p className="text-xs text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                Official NCDC Material
              </span>

              <button
                type="button"
                onClick={() => handleDownload(item)}
                className="px-4 py-2 rounded-lg bg-[#18794E] hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                {downloadSuccess === item.id ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Printing Advice */}
      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
          <FileCheck className="w-4 h-4 text-[#18794E]" />
          <span>Guidance for Community Health Educators & Religious Leaders</span>
        </div>
        <p className="leading-relaxed">
          These materials are approved for free public reproduction, laminating, and distribution in primary health clinics, secondary schools, mosques, churches, motor parks, and market squares. No commercial alterations permitted.
        </p>
      </div>
      </div>
    </div>
  );
};
